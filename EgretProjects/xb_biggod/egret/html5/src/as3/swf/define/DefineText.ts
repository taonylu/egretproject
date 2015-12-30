
module egret {

	export class DefineText extends DefineBase{
		public static Static:number = 1;
		public static Dynamic:number = 2;
		
		public text:string = "";
		
		public htmlText:string = "";
		/**
		 * 字形文本（针对消除锯齿类的文本，存放文本索引，从对应的字体定义中读取字体图片）
		 * 静态文本使用消除锯齿会有这个属性
		 */		
		public glyphText:GlyphText = null;
		/**
		 * 静态文本 动态文本
		 */		
		public wasstatic:boolean = true;
		/**
		 * 只读属性 区分输入文本与其他,
		 * 默认是非输入文本true, 输入文本false
		 */		
		public readOnly:boolean = true;
		
		public password:boolean = false;
		
		public multiline:boolean;
		
		public wordWrap:boolean;
		
		public maxLength:number = 0;
		
		public x:number = 0;
		
		public y:number = 0;
		
		public w:number = 0;
		
		public h:number = 0;
		
		public size:number = 12;
		/**
		 * textcolor 
		 */		
		public tc:number = 0;
		/**
		 * text font 
		 */		
		public tf:string = "";
		
		public fontId:number = 0;
		/**
		 * text bold 
		 */		
		public tb:boolean = false;
		/**
		 * text align 
		 */		
		public ta:string = "left";
		/**
		 * italic 
		 */
		public ti:boolean = false;
		public border:boolean = false;

		public constructor(obj:any = null){
			super();
			this.createFromObject(obj);
			this.t = Config.RESText;
		}
		
		
		public saveKey(key:string, keyobj:any):boolean{
			if(key == "glyphText"){
				var glyphText:GlyphText = new GlyphText();
				if(null != keyobj){
					glyphText.info = new Array<RecordInfo>();
					var info:Array<any> = keyobj["info"];
					for(var index:number=0; index<info.length; index++){
						var recInfo:RecordInfo = new RecordInfo();
						recInfo.fromObject(info[index]);
						glyphText.info[index] = recInfo;
					}
				}
				if(this.hasOwnProperty(key)){
					this[key] = glyphText;
				}
				return true;
			}
			return false;
		}

		public createFromObject(obj:any):void {
			super.createFromObject(obj);
			if (null == obj) {
				return;
			}
			if (obj instanceof Array) {
				this.text = obj[2];
				this.htmlText = obj[3];
				//this.glyphText = obj[4];
				this.wasstatic = <boolean>obj[5];
				this.readOnly = <boolean>obj[6];
				this.password = <boolean>obj[7];
				this.multiline = <boolean>obj[8];
				this.wordWrap = <boolean>obj[9];
				this.maxLength = obj[10];
				this.x = obj[11];
				this.y = obj[12];
				this.w = obj[13];
				this.h = obj[14];
				this.size = obj[15];
				this.tc = obj[16];
				this.tf = obj[17];
				this.fontId = obj[18];
				this.tb = <boolean>obj[19];
				this.ta = obj[20];
				this.ti = <boolean>obj[21];
				this.border = <boolean>obj[22];
			}
		}
	}
}