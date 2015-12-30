/**
 * Created by huitao on 2015/5/8.
 */
module flash {
    export class Event extends egret.Event {
        static CANCEL:string = "cancel";
        static FULLSCREEN:string = "fullScreen";
        static ID3:string = "id3";
        static INIT:string = "init";
        static MOUSE_LEAVE:string = "mouseLeave";
        static OPEN:string = "open";
        static SCROLL:string = "scroll";
        static SELECT:string = "select";
        static SOUND_COMPLETE:string = "soundComplete";
        static TAB_CHILDREN_CHANGE:string = "tabChildrenChange";
        static TAB_ENABLED_CHANGE:string = "tabEnabledChange";
        static TAB_INDEX_CHANGE:string = "tabIndexChange";
        static UNLOAD:string = "unload";
        static CONTEXT3D_CREATE:string = "context3dCreate";

        constructor(type:string, bubbles?:boolean, cancelable?:boolean) {
            super(type, bubbles, cancelable);
        }
    }
}
