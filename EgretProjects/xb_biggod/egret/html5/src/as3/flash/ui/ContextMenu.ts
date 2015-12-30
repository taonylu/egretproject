/**
 * Created by huitao on 2015/6/26.
 */
module flash
{
    export class ContextMenu
    {

        builtInItems : ContextMenuBuiltInItems;

        clipboardItems : ContextMenuClipboardItems;

        clipboardMenu : boolean;

        customItems : Array<any>;

        isSupported : boolean;

        items : Array<any>;

        numItems : number;

        addItemAt(item:NativeMenuItem, index:number):NativeMenuItem
        {
            return null;
        }

        constructor()
        {

        }

        clone():ContextMenu
        {
            return null;
        }

        containsItem(item:NativeMenuItem):boolean
        {
            return false;
        }

        display(stage:egret.Stage, stageX:number, stageY:number):void
        {

        }

        getItemAt(index:number):NativeMenuItem
        {
            return null;
        }

        getItemIndex(item:NativeMenuItem):number
        {
            return 0;
        }

        hideBuiltInItems():void
        {

        }

        removeAllItems():void
        {

        }

        removeItemAt(index:number):NativeMenuItem
        {
            return null;
        }

    }
}