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
    
    public showMessage(msg:string){
        this.x = (GameConst.stage.stageWidth - this.width)/2;
        this.y = (GameConst.stage.stageHeight - this.height)/2;
        LayerManager.getInstance().popLayer.addChild(this);
        this.msgLabel.text = msg;
    }
    
    public setFontSize(size:number){
        this.msgLabel.size = size;
    }
    
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}
