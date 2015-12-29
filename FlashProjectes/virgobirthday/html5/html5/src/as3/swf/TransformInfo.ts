module egret {
	export class TransformInfo{

		public constructor(){
		}
		/**
		 * 转换矩阵
		 */
		//public m:egret.Matrix = null;
		//public var matrix:Matrix = new Matrix();
		
		// 如果图像有旋转会影响缩放值, 旋转之后图形缩放值
		public sx:number = 1;
		public sy:number = 1;
		public r:number = 0;//旋转角度
		public tx:number = 0;
		public ty:number = 0;
		
		// 颜色变换
		public color:EColorTransform = null;
		public createFromObject(obj:any):void{
			if(null == obj){
				return;
			}
			for(var key in obj){
				if(key == "m" && null != obj[key]){
					var em:egret.Matrix = new egret.Matrix();
					S2PUtils.TransFromObject(em, obj[key]);
					if(this.hasOwnProperty(key)){
						this[key] = em;
					}
				}
				else if(key == "color" && null != obj[key]){
					var c:EColorTransform = new EColorTransform();
					S2PUtils.TransFromObject(c, obj[key]);
					if(this.hasOwnProperty(key)){
						this[key] = c;
					}
				}
				else{
					this[key] = obj[key];
				}
			}
		}
	}
}