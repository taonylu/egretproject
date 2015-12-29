/**
 * Created by huitao on 2015/5/15.
 */
module flash {
    export class ErrorEvent extends Event {

        static ERROR:string = "error";

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);
        }
    }
}
