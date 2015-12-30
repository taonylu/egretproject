
module egret {

	export class SwfResPool{
		/**
		 * 资源的配置文件
		 */		
		private $resconf:Resconfig = null;
		/**
		 * poolname标识本资源池
		 */		
		private $poolname:string = "";
		
		public constructor(_poolname:string, _resconf:Resconfig = null){
			this.$poolname = _poolname;
			this.$resconf = _resconf;
		}
		
		// 资源池，防止过多创建资源，提升性能。防止频繁移除显示对象再创建导致闪烁
		private $loadedResPool:any = {};// 已加载资源的池 Vector.<object>

		public Pool_recycle(target:any, objId, extendInfo:any = null):void{
			var key:string = objId + Config.GetExtendString(extendInfo);
			var objPool:Array<any> = null;
			if(this.$loadedResPool[key] != null){
				objPool = this.$loadedResPool[key];
			}
			else{
				objPool	= [];
			}
			if(objPool.indexOf(target) == -1){// && Config.poolMaxItemNumber > objPool.length
				objPool.push(target);
				if(target['clear']){//回收清理
					target['clear']();
				}
				if(null != target["__type_name"]){
					switch (target["__type_name"]){
						case "egret.Sprite":
						case "egret.SwfSprite":
							target.x = 0;
							target.y = 0;
							target.scaleX = 1;
							target.scaleY = 1;
							target.rotation = 0;
							target.alpha = 1;
							break;
						default :
							break;
					}
				}
			}
			if(null != target.instanceName){
				target.instanceName = "";
			}
			this.$loadedResPool[key] = objPool;
		}
		
		public Pool_getByID(objId, extendInfo:any = null):any{
			var target:any = null;
			var key:string = objId + Config.GetExtendString(extendInfo);
			if(this.$loadedResPool[key] != null){
				var objPool = this.$loadedResPool[key];
				if(objPool.length > 0){
					target = objPool.pop();
					if(target['reset']){//回收清理
						target['reset']();
					}
					return target;
				}
			}
			if(!this.$resconf){//其他对象
				switch (objId){
					case "egret.Sprite":
						target = new egret.Sprite();
						target["__type_name"] = "egret.Sprite";
						break;
					case "egret.SwfSprite":
						target = new egret.SwfSprite();
						target["__type_name"] = "egret.SwfSprite";
						break;
					default :
						break;
				}
				if(null != target){
					target["__pool_key"] = key;
				}
			}else{
				var def:DefineBase = <DefineBase>(this.$resconf.resDefs[objId]);
				switch(def.t){
					case Config.RESImage:
						var image:DefineImage = <DefineImage> def;
						var imageName:string = Config.GetResName(image.id, Config.RESImage, extendInfo);
						var bitmapName:string = this.$resconf.resNamePrefix + imageName;
						target = this.$createBitmap(bitmapName, def.id);
						break;
					case Config.RESShape:
						var shape:DefineShape = <DefineShape> def;
						var shapeName:string = Config.GetResName(shape.id, Config.RESShape, extendInfo);
						bitmapName = this.$resconf.resNamePrefix + shapeName;
						target = this.$createBitmap(bitmapName, def.id);
						break;
					case Config.RESFont:// 从字形字体里读取文字图片
						var font:DefineFont = <DefineFont>def;
						var picName:string = Config.GetResName(font.id, Config.RESFont, extendInfo);
						bitmapName = this.$resconf.resNamePrefix + picName;
						target = this.$createBitmap(bitmapName, def.id);
						break;
					case Config.RESButton:
						target = new SwfButton();
						target.conf = this.$resconf;
						target.initWithDefine(<egret.DefineButton>def);
						break;
					case Config.RESText:
						target = new egret.SwfText(this.$resconf, <egret.DefineText>def);
						break;
					case Config.RESSprite:
						target = new egret.SwfMovie(this.$resconf, "", def.id);
						break;
					default:
						break;
				}
				if(null != target){
					target["__pool_key"] = key;
					target.defId = def.id;
					target["__def_id"] = def.id;
					target.extendinfo = extendInfo;
				}
			}
			return target;
		}
		private $createBitmap(bitmapName:string, defId):any{
			//var target = new egret.SwfSprite();
			var bitmap:flash.Bitmap = new flash.Bitmap();
			bitmap.texture = RES.getRes(bitmapName);
			//target.addChild(bitmap);
			bitmap.cacheAsBitmap = true;// 9切会导致draw变为9，cacheAsBitmap让draw变回1
			var gridInfo:any = this.$resconf.getScalingGridInfo(defId);
			if(null != gridInfo){//设置位图的9宫格
				bitmap.scale9Grid = new egret.Rectangle(gridInfo[0], gridInfo[1], gridInfo[2], gridInfo[3]);
			}
			return bitmap;
		}
	}
}