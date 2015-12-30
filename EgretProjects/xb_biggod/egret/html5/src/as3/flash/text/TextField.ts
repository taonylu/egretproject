/**
 * Created by huitao on 5/4/2015.
 */

module flash {

    export class TextField extends egret.TextField {
        /**
         * 如果设置为 true 且文本字段没有焦点，Flash Player 将以灰色突出显示文本字段中的所选内容。
         */
        private $alwaysShowSelection:boolean;

        public get alwaysShowSelection():boolean {
            return this.$alwaysShowSelection;
        }

        public set alwaysShowSelection(_value:boolean) {
            this.$alwaysShowSelection = _value;
        }

        private $antiAliasType:string;
        /**
         * 用于此文本字段的消除锯齿类型。  TextField
         */
        public get antiAliasType():string {
            return this.$antiAliasType;
        }

        public set antiAliasType(_value:string) {
            this.$antiAliasType = _value;
        }

        /**
         * 控制文本字段的自动大小调整和对齐。  TextField
         */
        public get autoSize():string {
            return this.textAlign;
        }

        public set autoSize(_value:string) {
            //this._autoSize = _value;
            this.textAlign = _value;
        }

        /**
         * [read-only] 一个整数（从 1 开始的索引），指示指定文本字段中当前可以看到的最后一行。  TextField
         */
        public get bottomScrollV():number {
            return 0;
        }

        private $condenseWhite:boolean
        //一个布尔值，它指定是否应删除具有 HTML 文本的文本字段中的额外空白（空格、换行符等）。  TextField

        public get condenseWhite():boolean {
            return this.$condenseWhite;
        }

        public set condenseWhite(_value:boolean) {
            this.$condenseWhite = _value;
        }

        /**
         * 指定应用于新插入文本（例如，使用 replaceSelectedText() 方法插入的文本或用户输入的文本）的格式。
         * @returns {null}
         */
        public get defaultTextFormat():TextFormat {
            if (this.$textFormat == null) {
                this.$textFormat = new TextFormat();
            }
            return this.$textFormat;
        }

        public set defaultTextFormat(_value:TextFormat) {
            this.$textFormat = _value;
            this.setTextFormat(_value);
        }

        private $embedFonts:boolean;
        /**
         * 指定是否使用嵌入字体轮廓进行呈现。
         */
        public get embedFonts():boolean {
            return this.$embedFonts;
        }

        public set embedFonts(_value:boolean) {
            this.$embedFonts = _value;
        }

        /**
         * 用于此文本字段的网格固定类型。  TextField
         */
        private $gridFitType:string

        public get gridFitType():string {
            return this.$gridFitType;
        }

        public set gridFitType(_value:string) {
            this.$gridFitType = _value;
        }

        // 包含文本字段内容的 HTML 表示形式。 TextField
        public get htmlText():string {
            return this.$htmlTxt;
        }

        private $htmlTxt:string;

        public set htmlText(_value:string) {
            this.$htmlTxt = _value;
            var html:egret.HtmlTextParser = new egret.HtmlTextParser();
            var arr:Array<egret.ITextElement> = html.parser(_value);
            this.textFlow = arr;
        }

        //   [read-only] 文本字段中的字符数。  TextField
        public get length():number {
            return this.text.length;
        }

        private $maxScrollH:number;
        public get maxScrollH():number {
            return this.$maxScrollH;
        }

        public set maxScrollH(_value:number) {
            this.$maxScrollH = _value;
        }

        private $mouseWheelEnabled:boolean;
        //一个布尔值，指示当用户单击某个文本字段且用户滚动鼠标滚轮时，Flash Player 是否应自动滚动多行文本字段。  TextField
        public get mouseWheelEnabled():boolean {
            return this.$mouseWheelEnabled;
        }

        public set mouseWheelEnabled(_value:boolean) {
            this.$mouseWheelEnabled = _value;
        }

        private $restrict:string;
        /**
         * 指示用户可输入到文本字段中的字符集。
         */
        public get restrict():string {
            return this.$restrict;
        }

        public set restrict(_value:string) {
            this.$restrict = _value;
        }

        //public scrollH : number
        //当前水平滚动位置。  TextField
        public get scrollH():number {
            return 0;
        }

        private $selectable:boolean;

        //一个布尔值，指示文本字段是否可选。  TextField
        public get selectable():boolean {
            return this.$selectable;
        }

        public set selectable(_value:boolean) {
            this.$selectable = _value;
        }


        private $sharpness:number
        //此文本字段中字型边缘的清晰度。  TextField
        public get sharpness():number {
            return this.$sharpness;
        }

        public set sharpness(_value:number) {
            this.$sharpness = _value;
        }

        private $styleSheet:StyleSheet;

        public get styleSheet():StyleSheet {
            return this.$styleSheet;
        }

        //将样式表附加到文本字段。  TextField
        public set styleSheet(_value:StyleSheet) {
            this.$styleSheet = _value;
        }

        private $thickness:number
        //此文本字段中字型边缘的粗细。  TextField
        public get thickness():number {
            return this.$thickness;
        }

        public set thickness(_value:number) {
            this.$thickness = _value;
        }

        /**
         * 指定在复制和粘贴文本时是否同时复制和粘贴其格式。
         */
        private $useRichTextClipboard:boolean;

        public get useRichTextClipboard():boolean {
            return this.$useRichTextClipboard;
        }

        public set useRichTextClipboard(_value:boolean) {
            this.$useRichTextClipboard = _value;
        }


        /**
         * 一个布尔值，指示文本字段是否自动换行。
         */
        private $wordWrap:boolean;

        public get wordWrap():boolean {
            return this.$wordWrap;
        }

        public set wordWrap(_value:boolean) {
            this.$wordWrap = _value;
        }

        constructor() {
            super();
        }

        /**
         * 返回一个矩形，该矩形是字符的边框。 TextField
         * @param charIndex
         */
        public getCharBoundaries(charIndex:number):egret.Rectangle {
            return null;
        }

        /**
         * 在 x 和 y 参数指定的位置返回从零开始的字符索引值。 TextField
         * @param x
         * @param y
         * @returns {number}
         */
        public getCharIndexAtPoint(x:Number, y:Number):number {
            return 0;
        }

        /**
         * 如果给定一个字符索引，则返回同一段落中第一个字符的索引。 TextField
         * @param charIndex
         * @returns {number}
         */
        public getFirstCharInParagraph(charIndex:number):number {
            return 0;
        }

        /**
         * 返回给定 id 或已使用 <img> 标签添加到 HTML 格式文本字段中的图像或 SWF 文件的 DisplayObject 引用。 TextField
         * @param id
         * @returns {null}
         */
        public getImageReference(id:string):egret.DisplayObject {
            return null;
        }

        /**
         * 在 x 和 y 参数指定的位置返回从零开始的行索引值。
         * @param x
         * @param y
         */
        public getLineIndexAtPoint(x:number, y:number):number {
            return 0;
        }

        /**
         * 返回 charIndex 参数指定的字符所在的行的索引值（从零开始）。
         * @param charIndex
         * @returns {number}
         */
        public getLineIndexOfChar(charIndex:number):number {
            return 0;
        }

        /**
         * 返回特定文本行中的字符数。 TextField
         * @param lineIndex
         * @returns {number}
         */
        public getLineLength(lineIndex:number):number {
            return 0;
        }

        /**
         * 返回给定文本行的度量信息。 TextField
         * @param lineIndex
         */
        public getLineMetrics(lineIndex:number):TextLineMetrics {
            return null;
        }

        /**
         * 返回 lineIndex 参数指定的行中第一个字符的字符索引。
         * @param lineIndex
         * @returns {number}
         */
        public getLineOffset(lineIndex:number):number {
            return 0;
        }

        /**
         * 返回 lineIndex 参数指定的行的文本。 TextField
         * @param lineIndex
         */
        public getLineText(lineIndex:number):string {
            return null;
        }

        /**
         * 如果给定一个字符索引，则返回包含给定字符的段落的长度。
         * @param charIndex
         * @returns {number}
         */
        public getParagraphLength(charIndex:number):number {
            return 0;
        }

        /**
         * 返回 TextFormat 对象，其中包含 beginIndex 和 endIndex 参数指定的文本范围的格式信息。
         * @param beginIndex
         * @param endIndex
         * @returns {null}
         */
        public getTextFormat(beginIndex:number = -1, endIndex:number = -1):TextFormat {
            return this.$textFormat;
        }

        /**
         * 使用 value 参数的内容替换当前所选内容。
         * @param value
         */
        public replaceSelectedText(value:string):void {

        }

        /**
         * 使用 newText 参数的内容替换 beginIndex 和 endIndex 参数指定的字符范围。 TextField
         * @param beginIndex
         * @param endIndex
         * @param newText
         */
        public replaceText(beginIndex:number, endIndex:number, newText:string):void {

        }

        /**
         * 将第一个字符和最后一个字符的索引值（使用 beginIndex 和 endIndex 参数指定）指定的文本设置为所选内容。
         * @param beginIndex
         * @param endIndex
         */
        public setSelection(beginIndex:number, endIndex:number):void {
            this._setSelection(beginIndex, endIndex);
        }

        private $textFormat:TextFormat = new TextFormat();

        /**
         * 将 format 参数指定的文本格式应用于文本字段中的指定文本。
         * @param format
         * @param beginIndex
         * @param endIndex
         */
        public setTextFormat(format:TextFormat, beginIndex:number = -1, endIndex:number = -1):void {
            if (this.$textFormat) {
                this.$textFormat.clearText(this);
            }
            format.setText(this);
            this.$textFormat = format;

            if (format.font != null) {
                this.fontFamily = format.font;
            }
            if (format.size != null) {
                this.size = format.size;
            }
            if (format.color != null) {
                this.textColor = format.color;
            }
            if (format.bold != null) {
                this.bold = <boolean>format.bold;
            }

            if (format.italic != null) {
                this.italic = format.italic;
            }
            //this.underline = format.underline;
            //this.url = format.url;
            //this.target = format.target;
            if (format.align != null) {
                this.autoSize = format.align;
            }
            //this.leftMargin = format.leftMargin;
            //this.rightMargin = format.rightMargin;
            //this.indent = format.indent;
            if (format.leading != null) {
                this.lineSpacing = format.leading;
            }
        }
    }
}

