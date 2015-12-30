
module egret {

	export class DefineFont extends DefineBase{
		// [75:DefineFont3] ID: 16, FontName: Times New Roman Bold, Italic: false, Bold: true, Glyphs: 0
		/**
		 *  FontName
		 */		
		public fn:string = "";
		/**
		 *  Italic
		 */	
		public fi:boolean = false;
		/**
		 *  Bold
		 */	
		public fb:boolean = false;
		
		public constructor(obj:any = null){
			super();
			this.createFromObject(obj);
		}

		public createFromObject(obj:any):void {
			super.createFromObject(obj);
			if (null == obj) {
				return;
			}
			if (obj instanceof Array) {
				this.fn = obj[2];
				this.fi = <boolean>obj[3];
				this.fb = <boolean>obj[4];
			}
		}
	}
}