/**
 * Created by huitao on 2015/5/11.
 */

module flash {
    export class HTTPStatusEvent extends egret.HTTPStatusEvent {
        constructor(type:string, bubbles?:boolean, cancelable?:boolean) {
            super(type, bubbles, cancelable);
        }
    }
}