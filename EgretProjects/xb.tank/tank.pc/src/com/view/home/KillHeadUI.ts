/**
 * 击杀榜UI
 * @author 
 *
 */
class KillHeadUI extends BaseUI{
    private headUI:HeadUI;
    private killLabel:eui.BitmapLabel;
    private _Label:eui.BitmapLabel;
    private tank:eui.Image;
    
	public constructor() {
    	super();
    	this.skinName = "KillHeadUISkin";
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    
    public setValue(headUrl:string, kill:number){
        this.headUI.loadImg(headUrl);
        this.killLabel.text = "X  " + kill;
        this._Label.visible = true;
        this.tank.visible = true;
    }
    
    public clear(){
        this.headUI.clear();
        this.killLabel.text = "";
        this._Label.visible = false;
        this.tank.visible = false;
    }
}
