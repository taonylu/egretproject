/**
*  
*/
class BaseUI extends eui.Component {
    public inited: Boolean = false;

    public constructor(skinName: string) {
        super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.componentCreated,this);
        this.skinName = skinName;
    }

    public componentCreated(): void {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.componentCreated,this);
        this.inited = true;
    }
}
