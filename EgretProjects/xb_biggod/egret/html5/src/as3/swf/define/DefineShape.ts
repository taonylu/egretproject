
module egret {

	export class DefineShape extends DefineBase{
		//public var bounds:Rectangle;
		public x:number = 0;
		public y:number = 0;
		public w:number = 0;
		public h:number = 0;
		//是否导出了png图片
		public isexportpng:boolean = false;
		
		// 作为动态属性。纯矢量图形没有位图数据
		//public var fillstyles:Vector.<FillStyle> = new Vector.<FillStyle>();
		public static Dynamic_Fillstyles:string = "fillstyles";
		
		public constructor(obj:any = null){
			super();
			this.createFromObject(obj);
			this.t = Config.RESShape;
		}
		
		public createFromObject(obj:any):void{
			super.createFromObject(obj);
			if(null == obj){
				return;
			}
			if(obj instanceof Array){
				this.x = obj[2];
				this.y = obj[3];
				this.h = obj[4];
				this.w = obj[5];
				this.isexportpng = <boolean>obj[6];
			}
			//for(var key in obj){
			//	var fillstyles:Array<FillStyle> = new Array<FillStyle>();
			//	if(key == DefineShape.Dynamic_Fillstyles && obj[DefineShape.Dynamic_Fillstyles] != null){
			//		var fss:any[] = <any[]> (obj[DefineShape.Dynamic_Fillstyles]);
			//		var length:number = fss.length;
			//		for(var i:number = 0;i < length;i++){
			//			var o:any = fss[i];
			//			var fs:FillStyle = new FillStyle(o);
			//			fillstyles.push(fs);
			//		}
			//		this[DefineShape.Dynamic_Fillstyles] = fillstyles;
			//	}
			//	else{
			//		this[key] = obj[key];
			//	}
			//}
		}
	}
}