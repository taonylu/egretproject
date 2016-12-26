/**
 * 主页
 * @author chenkai 
 * @date 2016/12/26
 */
class HomeScene extends BaseScene{
    private qrCode:eui.Rect;
    
    
	public constructor() {
    	super();
    	this.skinName = "HomeSceneSkin";
	}
	
	public childrenCreated(){
    	console.log("home childrenCreated");
	}
	
	public onEnable(){
        console.log("home onEnable");
        
        var img:QRCode = new QRCode();
        img.showCode("resource/assets/Button/button_down.png", this.qrCode);
	}
	
	public onRemove(){
    	 console.log("home onRemove");
	}
}
