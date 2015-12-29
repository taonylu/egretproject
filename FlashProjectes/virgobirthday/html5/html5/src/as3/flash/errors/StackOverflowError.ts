/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class StackOverflowError extends Error {
        constructor(message:string = "", id:number = 0) {
            super(message, id);
        }
    }


}