module egret {
	export class DefineImage extends DefineBase{
		public w:number = 0;
		public h:number = 0;
		
		public constructor(obj:any = null){
			super();
			this.createFromObject(obj);
		}
		public createFromObject(obj:any):void{
			super.createFromObject(obj);
			if(null == obj){
				return;
			}
			if(obj instanceof Array){
				this.h = obj[2];
				this.w = obj[3];
			}
		}
	}
}