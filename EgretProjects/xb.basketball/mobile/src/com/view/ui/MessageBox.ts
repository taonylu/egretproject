/**
 * 提示框
 * @author 
 *
 */
class MessageBox extends BaseUI{
    private msgLabel:eui.Label;
    
	public constructor() {
    	super("MessageBoxSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public showMessage(msg:string, size:number = 25){
        this.msgLabel.size = size;
        this.x = (GameConst.stage.stageWidth - this.width)/2;
        this.y = (GameConst.stage.stageHeight - this.height)/2;
        LayerManager.getInstance().popLayer.addChild(this);
        this.msgLabel.text = msg;
    }
    
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}
