module egret {
	export class SwfMovie extends SwfSprite{
		private $frameRate:number = 24;
		public get frameRate():number{
			return this.$frameRate;
		}
		public set frameRate(value:number){
			value = Math.floor(value);//防止小数
			if(value < 1) value = 1;
			if(value > 60) value = 60;//帧率不超过60
			if(value == this.$frameRate) 	return;
			this.$frameRate = value;
			this.$frameIntervalTime = 1000 / this.$frameRate;
		}
		private $frameIntervalTime:number = 1000/24;//每一帧间隔时间 1000/$frameRate
		private $passedTime:number = 0;//自启动以来经过的时间
		private _eventPool:string[] = null;

		/// movieclip part start
		private $totalFrames:number = 1;
		public get totalFrames():number{
			return this.$totalFrames;
		}
		
		// readonly
		private $currentFrame:number = 1;
		public get currentFrame():number{
			return this.$currentFrame;
		}
		//read only
		private $isPlaying:boolean = false;
		public get isPlaying():boolean{
			return this.$isPlaying;
		}
		//readonly 未支持
		//public var currentFrameLabel:String;
		//readonly 未支持
		//public var currentLabel : String
		//public var numChildren:int = 0;
		//将播放头移到指定帧并播放
		public gotoAndPlay(frame: any): void{
			this.$isPlaying = true;
			if(null == this.conf) return;
			this.$currentFrame = frame
			this.$playFrame();
			if (this.$totalFrames > 1 && this._isAddedToStage) {
				this.setIsStopped(false);
			}else{
				//this.setIsStopped(true);
			}
		}
		//将播放头移到指定帧并停止
		public gotoAndStop(frame:any): void{
			this.$isPlaying = false;
			if(null == this.conf) return;
			this.$currentFrame = frame;
			this.$playFrame();
			this.setIsStopped(true);
		}
		//将播放头移到前一帧并停止
		public prevFrame(): void{
			this.$isPlaying = false;
			if(null == this.conf) return;
			this.$currentFrame -= 1;
			this.$currentFrame = this.$currentFrame < 1 ? this.$currentFrame:1;
			this.$playFrame();
			this.setIsStopped(true);
		}
		//跳到后一帧并停止
		public nextFrame(): void{
			this.$isPlaying = false;
			if(null == this.conf) return;
			this.$currentFrame += 1;
			this.$currentFrame = this.$currentFrame > this.$totalFrames ? 1 : this.$currentFrame;
			this.$playFrame();
			this.setIsStopped(true);
		}
		//继续播放当前动画
		public play():void{
			this.$isPlaying = true;
			this.$playFrame();
			if (this.$totalFrames > 1 && this._isAddedToStage) {
				this.setIsStopped(false);
			}else{
				//this.setIsStopped(true);
			}
		}
		//暂停播放动画
		public stop(): void{
			this.$isPlaying = false;
			this.setIsStopped(true);
		}
		/// movieclip part end

		private $isStopped:boolean = true;//默认是停止播放的
		//private _playTimes:number = 1;//播放次数
		//private setPlayTimes(value:number){
		//	if(value < 0 || value >= 1){
		//		this._playTimes = value < 0 ? -1 : Math.floor(value);
		//	}
		//}
		public _isAddedToStage:boolean = false;
		public _onAddToStage():void {
			super._onAddToStage();
			this._isAddedToStage = true;
			if(this.$isPlaying && this.$totalFrames>1){
				this.setIsStopped(false);
			}
		}
		public _onRemoveFromStage():void {
			super._onRemoveFromStage();
			this._isAddedToStage = false;
			this.setIsStopped(true);
		}
		private setIsStopped(value:boolean){
			if(this.$isStopped == value) return;
			this.$isStopped = value;
			if(value){
				//this._playTimes = 0;
				Ticker.getInstance().unregister(this.$onEnterFrame, this);
				//this.addEventListener(Event.ENTER_FRAME, this.$onEnterFrame, this);
			}else{
				//this._playTimes = this._playTimes == 0 ? 1 : this._playTimes;
				Ticker.getInstance().register(this.$onEnterFrame, this);
				//this.removeEventListener(Event.ENTER_FRAME, this.$onEnterFrame, this);
			}
		}
		private $defID:number = -1;//未初始化的为-1
		public set defID(value:number){
			this.$defID = value;
		}
		public get defID():number{
			return this.$defID;
		}

		/**
		 * @param _conf
		 * @param _symbolName
		 * @param id 非舞台对象一定要传入id或者symbol
		 */
		public constructor(conf:Resconfig = null, symbolName:string = "", id:number = -1){
			super();
			this.$setConf(conf, symbolName);
			if(id != -1){
				this.$defID = id;
			}
			if(this.$defID!=-1){
				var def:DefineSprite = <DefineSprite> (this.conf.resDefs[this.$defID]);
				this.$totalFrames = def.f;
				this.frameRate = 24;
				this.$currentFrame = 1;
				//this.$createFrame();//添加到舞台之后必须创建内容，否则取不到影片剪辑里的对象
				this.play();
			}
		}
		// 需要子类实现的方法，设置conf参数
		protected $setConf(conf:egret.Resconfig = null, symbolName:string = ""){
			if(conf != null){
				this.conf = conf;
				if(symbolName != ""){
					this.symbolName = symbolName;
				}
			}
			else{
				if(this['resConfig'] != null){
					this.conf = this['resConfig'];
					if(this['symbolName'] != ""){
						this.symbolName = this['symbolName'];
					}
				}
			}
			if(!this.conf){
				return;
			}
			if(this.symbolName != "" && null != this.conf.symbols[this.symbolName]){
				var symbol:SymbolClass = <SymbolClass> (this.conf.symbols[this.symbolName]);
				this.defID = symbol.id;
			}else{
				this.defID = 0;
			}
		}

		private __scale9BG_hasChecked:boolean = false;// 是否检查过九切背景
		private __scale9BG_tag:boolean = false;// 是否带九切背景
		// 检测是否是带九切的背景图 - 注意此方法只能执行一次
		public setBackGroundScale9Bitmap(){
			var child:any;
			var con:egret.DisplayObjectContainer = this;
			if(!this.__scale9BG_hasChecked){
				while(con && con.numChildren && (con.numChildren == 1)){
					child = con.getChildAt(0);
					if(child instanceof flash.Bitmap) {
						break;
					}else{
						con = child;
					}
				}
				this.__scale9BG_hasChecked = true;
				if(child instanceof flash.Bitmap && child.scale9Grid){
					this.__scale9BG_tag = true;
				}

				if(this.__scale9BG_tag){
					if(this.scaleX != 1 || this.scaleY != 1){
						var exScaleX:number = 1;
						var exScaleY:number = 1;
						con = this;
						while(con && con.numChildren && (con.numChildren == 1)){
							child = con.getChildAt(0);
							if(child instanceof flash.Bitmap) {
								child.scaleX = exScaleX;// 图片直接使用了父级的缩放值，注意：如果自己也有缩放值，可能会有显示错误。如果用child.scaleX *= exScaleX;累加值，父级重新设置缩放后会继续累加，也会错误
								child.scaleY = exScaleY;
								break;
							}else{
								exScaleX *= con.scaleX;
								exScaleY *= con.scaleY;
								con.scaleX = 1;
								con.scaleY = 1;
								con = child;
							}
						}
					}
				}
			}

		}
		// 每一个ticker判断是否执行播放帧，播放几帧。
		private $advanceTime(advancedTime:number):void{
			var self = this;
			var currentTime = self.$passedTime + advancedTime;
			self.$passedTime = currentTime % self.$frameIntervalTime;
			var num:number = currentTime / self.$frameIntervalTime;
			if(num < 1) return;
			while(num >= 1) {
				num--;
				//todo playnextframe
			}
		}

		private $onEnterFrame():void{
			var next:number = this.$currentFrame + 1;
			next = next > this.$totalFrames ? 1:next;
			if(next == this.$currentFrame){
				return;
			}
			this.$currentFrame = next;
			this.$playFrame();
		}
		/**
		 * 根据下标播放帧
		 * @param frame
		 */
		private $playFrame():void{
			this.$createFrame(this.$currentFrame);
		}
		private $curFrameObjs = {};//depth-Sprite映射
		/**
		 * 创建一帧的显示对象
		 * @param frame
		 * @return
		 *
		 */
		private $createFrame(frame:number = 0):void{
			var datas:Array<PlaceObject> = this.$getFrameData(this.$currentFrame, this.defID);
			this.$recycleRemovedObjs(datas);
			this.$placeObjects(datas, this, frame);
		}
		//回收这一帧中移除的显示对象
		private $recycleRemovedObjs(datas:any):any{
			var depthDic:any = {};
			var length:number = datas.length;
			for(var i:number = 0; i<length; i++) {
				var po:PlaceObject = datas[i];
				depthDic[po.depth] = po.id;
			}
			for(var key in this.$curFrameObjs)
			{
				if(depthDic[key] == this.$curFrameObjs[key]["__def_id"]){
					//保留
				}else{//下一帧不存在的回收
					this.$recycleInnerObj(this.$curFrameObjs[key]);
					var obj:egret.Sprite = <egret.Sprite>(this.$curFrameObjs[key]);
					obj.parent && this.$removeChildRef(obj, obj.parent);// 移除引用
					obj.parent && obj.parent.removeChild(obj);
					delete this.$curFrameObjs[key];
				}
			}
		}
		private $recycleInnerObj(obj:egret.DisplayObject):void{
			if(null == obj){
				return;
			}
			if(obj instanceof SwfSprite && 1 == (<SwfSprite>obj).numChildren){
				var result:boolean = SwfRes.Pool_recycle(this.conf.path, this.conf, <SwfSprite>obj, (<SwfSprite>obj).defId, (<SwfSprite>obj).extendinfo);
				if(result) return;
			}
			else if(obj instanceof SwfButton){
				var result:boolean = SwfRes.Pool_recycle(this.conf.path, this.conf, <SwfButton>obj, (<SwfButton>obj).defId);
				if(result) return;
			}
			else if(obj instanceof SwfText){
				var result:boolean = SwfRes.Pool_recycle(this.conf.path, this.conf, <SwfText>obj, (<SwfText>obj).defId);
				if(result) return;
			}
			if(obj['numChildren'] && obj['numChildren']>0){
				var child = obj['removeChildAt'](0);
				this.$recycleInnerObj(child);
			}
		}
		/**
		 * 一帧的所有对象的位移变换数据
		 * @param frame
		 * @param id
		 * @return
		 *
		 */
		private $getFrameData(frame:number, id:number = 0):PlaceObject[]{
			var datas:PlaceObject[];
			var spdef:DefineSprite = <DefineSprite> (this.conf.resDefs[id]);
			datas = <PlaceObject[]> (spdef.fd[frame-1]);
			return datas;
		}

		/**
		 * 填充DefineImage数据
		 */
		private $addImage(def:DefineImage, parantSP:egret.Sprite, po:PlaceObject):void{
			var imgDis:SwfSprite = null;
			if(null != this.$curFrameObjs[po.depth]){
				imgDis = this.$curFrameObjs[po.depth];
			}else {
				imgDis = SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
				this.$curFrameObjs[po.depth] = imgDis;
				imgDis["__def_id"] = def.id;
			}
			parantSP.addChild(imgDis);
			S2PUtils.SetTransform(<DisplayObject>imgDis, po);
		}
		/**
		 * 填充DefineShape数据
		 */
		private $addShape(def:DefineShape, parantSP:egret.Sprite, po:PlaceObject):void{
			var shapeContainer:egret.Sprite;
			if(null != this.$curFrameObjs[po.depth]){
				shapeContainer = this.$curFrameObjs[po.depth];
			}else{
				shapeContainer = new egret.Sprite();
				this.$curFrameObjs[po.depth] = shapeContainer;
				shapeContainer["__def_id"] = def.id;
				//shape png
				if(def.isexportpng){
					var shapePNG:SwfSprite = <SwfSprite>SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
					shapeContainer.addChild(shapePNG);
					// 设置自身的偏移（图形在帧上不是放置在0,0点的）
					shapePNG.x = def.x;
					shapePNG.y = def.y;
				}
				/* 位图填充已经改为在导出时绘制位图了
				//bitmap fill
				if(def.hasOwnProperty(DefineShape.Dynamic_Fillstyles)){
					var fills:FillStyle[] = <FillStyle[]> (def[DefineShape.Dynamic_Fillstyles]);
					var length:number = fills.length;
					for(var i:number = 0;i < length;i++){
						var fillstyle:FillStyle = fills[i];
						this.$addImage(<DefineImage> (this.conf.resDefs[fillstyle.bitmapId]), shapeContainer, fillstyle);
					}
				}*/
			}
			parantSP.addChild(shapeContainer);
			S2PUtils.SetTransform(shapeContainer, po);// 设置placeobject的放置位置，颜色信息
		}
		/**
		 * 填充DefineSprite型数据
		 * eg:[26:PlaceObject2] Depth: 10, CharacterID: 14, Matrix: (1,0,0,1,8579,4221), Name: stagemc3
		 * @param defsp
		 * @param parantSP
		 * @param po
		 * @param frame
		 *
		 */
		private $addSprite(defsp:DefineSprite, parantSP:SwfSprite, po:PlaceObject):void{
			var mc:egret.SwfMovie = null;
			if(null != this.$curFrameObjs[po.depth]){
				mc = this.$curFrameObjs[po.depth];
			}else{
				mc = new egret.SwfMovie(this.conf, "", defsp.id);
				this.$curFrameObjs[po.depth] = mc;
				mc["__def_id"] = defsp.id;
			}
			parantSP.addChild(mc);
			// 更新属性
			S2PUtils.SetTransform(mc, po);
			if(mc instanceof egret.SwfMovie){
				mc.setBackGroundScale9Bitmap();//SwfSprite在更新了缩放属性之后检查子对象里是不是有九切的位图
			}
			this.$saveChildRef(mc, parantSP, po);
		}
		private $addText(def:DefineText, parantSP:any, po:PlaceObject):void{
			var txt:egret.SwfText = null;
			if(null != this.$curFrameObjs[po.depth]){
				txt = this.$curFrameObjs[po.depth];
			}else{
				//txt = new egret.SwfText(this.conf, <DefineText>def);
				txt = SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
				this.$curFrameObjs[po.depth] = txt;
				txt["__def_id"] = def.id;
			}
			parantSP.addChild(txt);
			S2PUtils.SetTransform(txt, po);
			this.$saveChildRef(txt, parantSP, po);
		}
		private $addButton(def:DefineButton, parentSP:SwfSprite, po:PlaceObject):void{
			var btn:SwfButton = null;
			if(null != this.$curFrameObjs[po.depth]){
				btn = this.$curFrameObjs[po.depth];
			}else{
				btn = SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
				//btn = new SwfButton();
				//btn.id = def.id;
				//btn.conf = this.conf;
				//btn.initWithDefine(def);
				btn["__def_id"] = def.id;
				this.$curFrameObjs[po.depth] = btn;
			}
			parentSP.addChild(btn);
			S2PUtils.SetTransform(btn, po);
			this.$saveChildRef(btn, parentSP, po);
		}
		// 保存子对象的引用
		private $saveChildRef(child:any, parent:any, po:PlaceObject):void{
			if(null != po.instanceName && "" != po.instanceName){
				child["instanceName"] = po.instanceName;
				parent[po.instanceName] = child;
			}
		}
		// 移除子对象的引用
		private $removeChildRef(child:any, parent:any):void{
			if(null != child.instanceName && parent[child.instanceName]){
				delete parent[child.instanceName];
			}
		}

		private $addDisplayObject(po:PlaceObject, parantSP:SwfSprite, frame:number = 1):void{
			var defbase:DefineBase = <DefineBase>(this.conf.resDefs[po.id]);
			if(null == defbase){
				console.warn("defbase is null.", po);
				return;
			}
			switch(defbase.t){
				case Config.RESImage:
					this.$addImage(<DefineImage>defbase, parantSP, po);
					break;
				case Config.RESShape:
					this.$addShape(<DefineShape>defbase, parantSP, po);
					break;
				case Config.RESSprite:
					this.$addSprite(<DefineSprite>defbase, parantSP, po);
					break;
				case Config.RESText:
					this.$addText(<DefineText>defbase, parantSP, po);
					break;
				case Config.RESButton:
					this.$addButton(<DefineButton>defbase, parantSP, po);
					break;
				default:
					break;
			}
		}
		/**
		 * 按照深度排序
		 * @param po1
		 * @param po2
		 * @return 
		 * 
		 */		
		public static  sortOnDepth(po1:PlaceObject, po2:PlaceObject):number{
			if(po1.depth > po2.depth){
				return 1;
			}
			else if(po1.depth < po2.depth){
				return -1;
			}
			return 0;
		}
		
		private $placeObjects(datas:Array<PlaceObject>, parantSP:SwfSprite=null, frame:number = 1):egret.Sprite{
			if(null == parantSP){
				parantSP = new SwfSprite();
			}
			datas.sort(SwfMovie.sortOnDepth);
			var length:number = datas.length;
			for(var i:number = 0;i < length;i++){
				var po:PlaceObject = datas[i];
				this.$addDisplayObject(po, parantSP, frame);
			}
			return parantSP;
		}
	}
}