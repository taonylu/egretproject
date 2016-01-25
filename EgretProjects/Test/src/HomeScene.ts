/**
 *
 * @author 
 *
 */
class HomeScene extends eui.Component{
    
    private title:eui.Image;
    
	public constructor() {
    	super();
      this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
    	this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
    	this.skinName = "HomeSceneSkin";
    	this.percentWidth = 100;
    	this.percentHeight = 100;
	}
	
    public createChildren(){
    	super.createChildren();
    
	}
	
    private onComplete(){
        
    }
    
    private initY:number = 0;
    
    private createComplete(){
       var self:HomeScene = this;
       
       this.validateNow();
       console.log(this.title.width,this.title.x);



    }
}
