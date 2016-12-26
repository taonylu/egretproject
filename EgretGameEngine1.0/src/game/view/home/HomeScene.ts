/**
 * 主页
 * @author chenkai 
 * @date 2016/12/26
 */
class HomeScene extends BaseScene{
    private qrCode:eui.Rect;
    private codeImg:eui.Image;
    
	public constructor() {
    	super();
    	this.skinName = "HomeSceneSkin";
	}
	
	public childrenCreated(){
    	console.log("home childrenCreated");
	}
	
	public onEnable(){
        console.log("home onEnable");
        this.test();
        
	}
	
	public onRemove(){
    	 console.log("home onRemove");
	}
	
	private test(){
    	  
	}
}











