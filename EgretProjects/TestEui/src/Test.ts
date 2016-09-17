/**
 *
 * @author 
 *
 */
class Test extends eui.Component{
    
	public constructor() {
    	super();
    	this.skinName = "TestSkin";
    	
	}

	private group:eui.Group;
	

	public childrenCreated(){

       egret.startTick(this.aa, this);

	}
    
	private aa(delta):boolean{
	    console.log(delta);
	    return true;
	}

  
}
