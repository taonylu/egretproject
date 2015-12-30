/**
 * Created by chenpeng on 2015/8/20.
 */
module flash
{
    export class StaticText extends egret.DisplayObject
    {
        private $text:string="";
        public get text():string{
            return this.$text;
        }
    }
}