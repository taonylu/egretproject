module egret {

	export class SwfSprite extends egret.Sprite{

		public conf:egret.Resconfig = null;// 配置的引用
		public symbolName:string = "";
		//资源定义id
		public defId:number;
		/**
		 * 
		 */		
		public extendinfo:any = null;
		/**
		 * 实例名
		 */		
		private $instanceName:string = "";
		public get instanceName():string
		{
			return this.$instanceName;
		}
		public set instanceName(value:string)
		{
			this.name = value;
			this.$instanceName = value;
		}

		//// 宽度与scaleX的关系：scaleX = width / measuredWidth;
		//public get scaleX():number{
		//	return this.$scaleX;
		//}
		//public set scaleX(value:number){
		//	this.width = value * this.measuredWidth;
		//}
		//public get scaleY():number{
		//	return this.$scaleY;
		//}
		//public set scaleY(value:number){
		//	this.height = value * this.measuredHeight;
		//}
		//// 覆盖父类的宽高值，随缩放值联动
		//public get width(){
		//	return this._getWidth();
		//}
		//public set width(value:number){
		//	var ratioW:number = value/this.width;
		//	this.setChildrenBitmapWidthAndHeight(this, ratioW);
		//	this._setWidth(value);
		//}
		//public get height():number{
		//	return this._getHeight();
		//}
		//public set height(value:number){
		//	var ratioH:number = value/this.height;
		//	this.setChildrenBitmapWidthAndHeight(this, 1, ratioH);
		//	this._setHeight(value);
		//}
		///**
		// * 父对象的缩放引起的缩放所有子对象位图
		// * @param child
		// * @param ratioW 新的宽度值/旧的宽度值
		// * @param ratioH 新的高度值/旧的高度值
		// */
		//private setChildrenBitmapWidthAndHeight(child:egret.DisplayObject, ratioW:number=1, ratioH:number=1){
		//	if(child instanceof flash.Bitmap){
		//		var bm:flash.Bitmap = <flash.Bitmap>(child);
		//		if(ratioW!=1){
		//			bm.width *= ratioW;
		//		}
		//		if(ratioH!=1){
		//			bm.height *= ratioH;
		//		}
		//	}
		//	else {
		//		if (child instanceof egret.DisplayObjectContainer) {
		//			var con:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>child;
		//			for (var index:number = 0; index < con.numChildren; index++) {
		//				this.setChildrenBitmapWidthAndHeight(con.getChildAt(index), ratioW, ratioH);
		//			}
		//		}
		//	}
		//}

		private $scale9Grid:egret.Rectangle;
		public get scale9Grid():egret.Rectangle{
			return this.$scale9Grid;
		}
		public set scale9Grid(value:egret.Rectangle){
			this.$scale9Grid = value;
			if(null!=value){
				// 设置所有的子对象图片的九宫格
				this.$setChildBitmapScale9Grid(this, this.$scale9Grid);
			}
		}
		private $setChildBitmapScale9Grid(child:egret.DisplayObject, grid:egret.Rectangle):boolean{
			if(child instanceof flash.Bitmap){
				var bm:flash.Bitmap = <flash.Bitmap>(child);
				bm.scale9Grid = grid;
				bm.cacheAsBitmap = true;// 设置9宫会导致draw升到9
				return true;
			}
			else{
				if(child instanceof egret.DisplayObjectContainer){
					var con:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>child;
					for(var index:number=0; index<con.numChildren; index++){
						var result:boolean = this.$setChildBitmapScale9Grid(<egret.DisplayObject>con.getChildAt(index), grid);
						if(result){
							return true;
						}
					}
				}
				return false;
			}
		}

		public constructor(){
			super();
		}
		
	}
}