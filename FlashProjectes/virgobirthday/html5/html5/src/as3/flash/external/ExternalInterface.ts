/**
 * Created by egret on 15-6-19.
 */
module flash {
    export class ExternalInterface {
        public static available():boolean {
            return true;
        }

        public static call(funcName:string, ...args:any[]):void {
            console.log("调用js函数:" + funcName);
        }

        public static addCallback(funcName:string, callBack:Function):void {
            console.log("设置js回调:" + funcName);
        }
    }
}
