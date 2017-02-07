/**
 *
 * @author 
 *
 */
class GameScene extends BaseScene{
	public constructor() {
    	super();
    	this.skinName = "GameSceneSkin";
	}
	
	public childrenCreated(){
    	console.log("game childrenCreated");
	}
	
	public onEnable(){
    	console.log("game onEnable");
	}
	
	public onRemove(){
    	console.log("game onRemove");
	}
}