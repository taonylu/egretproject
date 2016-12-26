/**
 *
 * @author 
 *
 */
class RegisterPanel extends BasePanel{
	public constructor() {
    	super();
    	this.skinName = "RegisterPanelSkin";
	}
	
	public childrenCreated(){
    	console.log("registerPanel created");
	}
	
	public onEnable(){
    	console.log("registerPanel onEnable");
	}
	
	public onRemove(){
        console.log("registerPanel onRemove");
	}
}
