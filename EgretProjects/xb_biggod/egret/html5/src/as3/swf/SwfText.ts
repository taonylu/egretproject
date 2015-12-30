module egret {

	export class SwfText extends egret.DisplayObjectContainer{
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
		//资源定义id
		public defId:number;
		public resConf:Resconfig = null;

		private $flashText:TextField = new TextField();
		public get text():string{
			if(null != this.$flashText){
				return this.$flashText.text;
			}
			return "";
		}
		public set text(value:string){
			if(null != this.$flashText){
				this.$flashText.text = value;
			}
		}

		private $textFormat:flash.TextFormat;

		/**
		 * 指定应用于新插入文本（例如，使用 replaceSelectedText() 方法插入的文本或用户输入的文本）的格式。
		 * @returns {null}
		 */
		public get defaultTextFormat():flash.TextFormat
		{
			if(this.$textFormat == null){
				this.$textFormat = new flash.TextFormat();
			}
			return this.$textFormat;
		}

		public set defaultTextFormat(_value:flash.TextFormat)
		{
			this.$textFormat = _value;
			console.log("待实现~~~");
		}

		public constructor(_resConf:egret.Resconfig, text:egret.DefineText){
			super();
			this.resConf = _resConf;
			if(text.wasstatic && text.text == "" && text.glyphText != null){
				this.$createBitmapText(text);
			}else{
				this.$createStdText(text);
			}
		}
		/**
		 * egret 没有静态文本，只有动态文本与输入文本
		 * @param text
		 */
		private $createStdText(text:egret.DefineText):void{
			this.$flashText = new TextField();
			this.addChild(this.$flashText);
			if(text.readOnly){
				this.$flashText.type = TextFieldType.DYNAMIC;
			}
			else {
				this.$flashText.type = TextFieldType.INPUT;
			}

			this.$flashText.text = text.text;
			//this.$flashText.htmlText = text.htmlText;
			this.$flashText.x += text.x;
			this.$flashText.y += text.y;
			this.$flashText.height = text.h;
			this.$flashText.width = text.w;
			this.$flashText.multiline = text.multiline;
			//this.$flashText.wordWrap = text.wordWrap;//不要设置wordWarp，否则多行文本不会换行。wordWarp会将文本当成单词
			this.$flashText.maxChars = text.maxLength;
			this.$flashText.size = text.size;
			this.$flashText.bold = text.tb;
			this.$flashText.italic = text.ti;
			this.$flashText.textAlign = text.ta;
			this.$flashText.textColor = text.tc;
			this.$flashText._TF_Props_._textColorString = this.$toColorString(text.tc);// 等待egret 2.0.5更新后直接支持带alpha通道文本颜色后可删除
			this.$flashText.border = text.border;
			this.$flashText.displayAsPassword = text.password;
			this.$flashText.textAlign = text.ta;//文本水平对齐方式使用HorizontalAlign定义的常量
			this.$flashText.verticalAlign = egret.VerticalAlign.TOP;//默认值为 VerticalAlign.TOP。
		}
		// 等待egret 2.0.5更新后直接支持带alpha通道文本颜色后可删除
		private $toColorString(value:number):string {
			if (isNaN(value) || value < 0) {
				value = 0;
			}
			var color:string = value.toString(16).toUpperCase();
			while (color.length > 6) {
				color = color.slice(1, color.length);
			}
			while (color.length < 6) {
				color = "0" + color;
			}
			return "#" + color;
		}
		/**
		 * 创建位图文本，消除锯齿文本以位图的形式创建。
		 * @param text
		 */
		private $createBitmapText(text:egret.DefineText):void{
			// 静态文本 使用glyp字体
			if(text.text == "" && text.glyphText != null){
				var shapePNGParent:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
				this.addChild(shapePNGParent);
				shapePNGParent.x += text.x;
				shapePNGParent.y += text.y;

				var totalAdvance:number = 0;
				for(var index:number=0;index<text.glyphText.info.length; index++){
					var rec:RecordInfo = text.glyphText.info[index];
					for(var glypindex:number=0;glypindex<rec.glyp.length;glypindex++){
						var shapePNG:SwfSprite = SwfRes.Pool_getByID(this.resConf.path, this.resConf, rec.fontId, <SwfSprite><any> (rec.glyp[glypindex]));
						var colorTF:egret.ColorTransform = new egret.ColorTransform(rec.color.rm, rec.color.gm, rec.color.bm, rec.color.am, rec.color.ro, rec.color.go, rec.color.bo, rec.color.ao);
						shapePNG.transform.colorTransform = colorTF;//已经可以改变显示对象的颜色了
						shapePNG.alpha = rec.color.am;//设置透明度
						shapePNGParent.addChild(shapePNG);
						shapePNG.x = totalAdvance;
						totalAdvance += rec.advances[glypindex];
						//trace(shapePNGParent.x , totalAdvance, rec.advances[glypindex]);
					}
				}
			}
		}
		public clear():void{
			this.text = ""
			this.instanceName = "";
		}
	}
}