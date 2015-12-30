/**
 * Created by huitao on 2015/6/26.
 */
module flash {
    export class NativeMenuItem extends EventDispatcher {
        keyEquivalentModifiers:Array<any>;
        label:string;
        menu:NativeMenu;
        enabled:boolean;
        isSeparator:boolean;
        data:any;
        keyEquivalent:string;
        mnemonicIndex:number;
        submenu:NativeMenu;
        checked:boolean;
        name:string;

        constructor()
        {
            super();
        }

        public clone():NativeMenuItem
        {
            return this;
        }

        public toString():string
        {
            return "";
        }
    }
}
