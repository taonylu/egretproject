/**
 * Created by chenpeng on 2015/6/2.
 */
module egret
{
    export class DefineButton extends DefineBase{

        public up:Array<egret.ButtonRecord>;//ButtonRecord
        public over:Array<egret.ButtonRecord>;
        public down:Array<egret.ButtonRecord>;
        public hit:Array<egret.ButtonRecord>;

        constructor(obj:any = null){
            super(obj);
            this.t = Config.RESButton;
        }
    }
}