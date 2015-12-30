/**
 * Created by chenpeng on 2015/6/11.
 */
module egret
{
    export class DefineSound extends DefineBase
    {
        constructor(obj:any = null){
            super(obj);
            this.createFromObject(obj);
        }
        public createFromObject(obj:any):void {
            super.createFromObject(obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
            }
        }
    }
}