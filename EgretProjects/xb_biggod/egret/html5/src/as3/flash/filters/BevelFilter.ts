/**
 * Created by chenpeng on 2015/9/6.
 */
module flash
{
    export class BevelFilter extends BitmapFilter
    {
        constructor(distance:number = 4.0, angle:number = 45, highlightColor:number = 0xFFFFFF, highlightAlpha:number = 1.0, shadowColor:number = 0x000000, shadowAlpha:number = 1.0, blurX:number = 4.0, blurY:number = 4.0, strength:number = 1, quality:number = 1, type:string = "inner", knockout:boolean = false){
            super();
        }

        //斜角的角度。
        public angle : number
        //水平模糊量，以像素为单位。
        public blurX : number
        //垂直模糊量，以像素为单位。
        public blurY : number
        //斜角的偏移距离。
        public distance : number
        //加亮颜色的 Alpha 透明度值。
        public highlightAlpha : number
        //斜角的加亮颜色。
        public highlightColor : number
        //应用挖空效果 (true)，这将有效地使对象的填色变为透明，并显示文档的背景颜色。
        public knockout : boolean
        //应用滤镜的次数。
        public quality : number
        //阴影颜色的 Alpha 透明度值。
        public shadowAlpha : number
        //斜角的阴影颜色。
        public shadowColor : number
        //印记或跨页的强度。
        public strength : number
        //斜角在对象上的位置。
        public type : string
    }
}