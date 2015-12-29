/**
 * Created by huitao on 2015/5/11.
 */
module flash {
    export class IOErrorEvent extends egret.IOErrorEvent {
        public text:string = "";

        constructor(type:string, bubbles?:boolean, cancelable?:boolean, text?:string) {
            super(type, bubbles, cancelable);
            this.text = text;
        }
    }

}
