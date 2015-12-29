/**
 * Created by huitao on 2015/6/26.
 */
module flash
{
    export class NativeMenu extends EventDispatcher
    {
        static isSupported:boolean =false;
        public items:Array<any> = null;
        public numItems:number = 0;
        private $_parent:NativeMenu;
        public parent():NativeMenu
        {
            return this.$_parent;
        }

        constructor()
        {
            super();
        }

        public containsItem(item:NativeMenuItem):boolean
        {
            return false;
        }
        public addItemAt(index:number):NativeMenuItem
        {
            return null;
        }
        public getItemByName(name:string):NativeMenuItem
        {
            return null;
        }
        public setItemIndex(item:NativeMenuItem,index:number):void
        {

        }
        public display(stage:egret.Stage,stageX:number,stageY:number):void
        {

        }
        public addSubmenu(submenu:NativeMenu, label:String):NativeMenuItem
        {
            return null;
        }

        public getItemIndex(item:NativeMenuItem):number
        {
            return 0
        }
        public removeItemAt(index:number):NativeMenuItem
        {
            return null;
        }
        public removeItem(item:NativeMenuItem):NativeMenuItem
        {
            return item;
        }
        public getItemAt(index:number):NativeMenuItem
        {
            return null;
        }
        public removeAllItems():void
        {

        }
        public addSubmenuAt(submenu:NativeMenu, index:number, label:String):NativeMenuItem
        {
            return null;
        }
        public addItem(item:NativeMenuItem):NativeMenuItem
        {
            return null;
        }

    }
}