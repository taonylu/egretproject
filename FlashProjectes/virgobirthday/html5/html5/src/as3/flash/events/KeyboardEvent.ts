/**
 * Created by huitao on 2015/6/19.
 */
module flash {
    export class KeyboardEvent extends egret.Event {

        static KEY_DOWN:string = "keyDown";
        static KEY_UP:string = "keyUp"
        public ctrlKey:boolean;
        public altKey:boolean;
        public shiftKey:boolean;
        public keyCode:number;
        public commandKey:boolean;
        public controlKey:boolean;
        public charCode:number = 0;
        public keyLocation:boolean;


        constructor(type:string, bubbles?:boolean, cancelable?:boolean) {
            super(type, bubbles, cancelable);
        }
    }
}