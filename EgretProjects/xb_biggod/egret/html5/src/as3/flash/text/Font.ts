/**
 * Created by huitao on 5/4/2015.
 */
module flash {

    export class Font {
        /*[read-only] 嵌入字体的名称。 Font*/
        private $fontName:string = "";
        public get fontName():string
        {
            return this.$fontName;
        }

        /*[read-only] 字体的样式。  Font*/
        private $fontStyle:string = "";
        public get fontStyle():string
        {
            return this.$fontStyle;
        }

        /*[read-only] 字体的类型。*/
        private $fontType:string;
        public get fontType():string
        {
            return this.$fontType;
        }


        /**
         *  [static] 指定是否提供当前可用嵌入字体列表。 Font
         * @param enumerateDeviceFonts
         */
        static enumerateFonts(enumerateDeviceFonts:Boolean = false):any {
            return [];
        }

        /**
         * 指定能否使用当前指定的字体显示提供的字符串。 Font
         * @param str
         */
        public hasGlyphs(str:String):boolean {
            return false;
        }

        /**
         * [static] 在全局字体列表中注册一个字体类。
         * @param font
         */
        static registerFont(font:any):void {

        }

    }


}
