/**
 * Created by huitao on 2015/5/15.
 */
module flash {

    export class ReferenceError extends Error {

        constructor(message?:string, id?:number) {
            super(message, id);
            this.name = "ReferenceError";
        }

        public toString():string {
            return JSON.stringify(this);
        }
    }

}
