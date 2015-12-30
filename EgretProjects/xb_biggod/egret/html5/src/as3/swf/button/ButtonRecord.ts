/**
 * Created by chenpeng on 2015/6/9.
 */
module egret
{
    export class ButtonRecord
    {
        public characterId:number;
        public color:egret.EColorTransform;
        public sx:Number = 1;//x缩放
        public sy:Number = 1;//y缩放
        public r:Number = 0;//旋转角度
        public tx:Number = 0;
        public ty:Number = 0;

        constructor(){

        }

        public fromSlimData(sd:any){
            if(sd instanceof Array){
                this.characterId = sd[0];
                this.tx = sd[1];
                this.ty = sd[2];
                this.r = sd[3];
                this.sx = sd[4];
                this.sy = sd[5];
                this.color = new egret.EColorTransform(sd[6]);
            }
        }
    }
}