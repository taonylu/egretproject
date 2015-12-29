/**
 * Created by huitao on 2015/6/24.
 */
module flash {
    export class ScriptTimeoutError extends Error {
        constructor(message:string = "", id:number = 0) {
            super(message, id);
            this.name = "ScriptTimeoutError";
        }

        public toString():string {
            return "[message :" + this.message + ",errorId:" + this.errorId + " name :" + this.name+"]";
        }
    }

}