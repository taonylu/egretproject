/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class IOError extends Error {
        constructor(message?:string, id?:number) {
            super(message, id);
            this.name = "IOError";
        }
    }
}