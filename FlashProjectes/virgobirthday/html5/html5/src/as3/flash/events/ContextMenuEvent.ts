/**
 * Created by huitao on 2015/6/26.
 */
module flash {
    export class ContextMenuEvent extends Event {
        contextMenuOwner:InteractiveObject
        static MENU_ITEM_SELECT:string = "menuItemSelect";
        static   MENU_SELECT:string = "menuSelect";
        isMouseTargetInaccessible:boolean = false;
        mouseTarget:InteractiveObject;

        constructor(type:string, bubbles?:boolean, cancelable?:boolean, mouseTarget:InteractiveObject = null, contextMenuOwner:InteractiveObject = null) {
            super(type, bubbles, cancelable);

            this.mouseTarget = mouseTarget;
            this.contextMenuOwner = contextMenuOwner;
        }
    }
}