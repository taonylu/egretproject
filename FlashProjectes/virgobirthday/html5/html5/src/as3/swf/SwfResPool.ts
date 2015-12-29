
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
		
		public constructor(_poolname:string, _resconf:Resconfig){
			this.$poolname = _poolname;
			this.$resconf = _resconf;
		}
		
		// 资源池，防止过多创建资源，提升性能。防止频繁移除显示对象再创建导致闪烁
		private $loadedResPool:any = {};// 已加载资源的池 Vector.<object>

		public Pool_recycle(target:any, objID:number, extendInfo:any = null):void{
			var key:string = objID + Config.GetExtendString(extendInfo);
			var objPool:any[] = null;
			if(this.$loadedResPool[key] != null){
				objPool = this.$loadedResPool[key];
			}
			else{
				objPool	= [];
			}
			if(objPool['indexOf'](target) == -1){
				objPool.push(target);
			}
			target.instanceName = "";
			this.$loadedResPool[key] = objPool;
		}
		
		public Pool_getByID(objID:number, extendInfo:any = null):SwfSprite{
			var target:any = null;
			var key:string = objID + Config.GetExtendString(extendInfo);
			if(this.$loadedResPool[key] != null){
				var objPool = this.$loadedResPool[key];
				if(objPool.length > 0){
					target = objPool.pop();
					return target;
				}
			}
			var def:DefineBase = <DefineBase>(this.$resconf.resDefs[objID]);
			switch(def.t){
				case Config.RESImage:
					var image:DefineImage = <DefineImage> def;
					var imageName:string = Config.GetResName(image.id, Config.RESImage, extendInfo);
					var bitmapName:string = this.$resconf.resNamePrefix + imageName;
					target = this.$createBitmap(bitmapName, def);
					break;
				case Config.RESShape:
					var shape:DefineShape = <DefineShape> def;
					var shapeName:string = Config.GetResName(shape.id, Config.RESShape, extendInfo);
					bitmapName = this.$resconf.resNamePrefix + shapeName;
					target = this.$createBitmap(bitmapName, def);
					break;
				case Config.RESFont:// 从字形字体里读取文字图片
					var font:DefineFont = <DefineFont>def;
					var picName:string = Config.GetResName(font.id, Config.RESFont, extendInfo);
					bitmapName = this.$resconf.resNamePrefix + picName;
					target = this.$createBitmap(bitmapName, def);
					break;
				case Config.RESButton:
					target = new SwfButton();
					target.conf = this.$resconf;
					target.initWithDefine(<egret.DefineButton>def);
					break;
				case Config.RESText:
					target = new egret.SwfText(this.$resconf, <egret.DefineText>def);
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
			return target;
		}
		private $createBitmap(bitmapName:string, def:DefineBase):egret.SwfSprite{
			var target = new egret.SwfSprite();
			var bitmap:flash.Bitmap = this.$createBitmapByName(bitmapName);
			target.addChild(bitmap);
			bitmap.cacheAsBitmap = true;// 9切会导致draw变为9，cacheAsBitmap让draw变回1
			var gridInfo:any = this.$resconf.getScalingGridInfo(def.id);
			if(null != gridInfo){//设置位图的9宫格
				bitmap.scale9Grid = new egret.Rectangle(gridInfo[0], gridInfo[1], gridInfo[2], gridInfo[3]);
			}
			return target;
		}
		/**
		 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
		 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
		 */
		private $createBitmapByName(name: string): flash.Bitmap {
			var result: flash.Bitmap = new flash.Bitmap();
			var texture: egret.Texture = RES.getRes(name);
			//console.log("", name, texture);
			result.texture = texture;
			return result;
		}
		public onIOError(event:IOErrorEvent):void{
			// TODO Auto-generated method stub
			console.log(event.toString());
		}
		
		/*protected function onLoadFondPicComplete(event:Event):void
		{
		// TODO Auto-generated method stub
		var loaderinfo:LoaderInfo = event.target as LoaderInfo;
		var dis:DisplayObject = loaderinfo.content as DisplayObject;
		var prew:Number = dis.width;
		dis.width = 20;// 等宽大小，默认宽度值
		var ratio:Number = dis.width/prew;
		dis.height = dis.height * ratio;
		if(dis.height > dis.width)
		{
		dis.height = 20;
		}
		}*/
		
	}
}