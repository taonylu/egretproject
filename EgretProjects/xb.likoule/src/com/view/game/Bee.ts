/**
 * 蜜蜂
 * @author 
 *
 */
class Bee extends SimpleMC{
    public direction:number = 0;  //0停 -1上 1下 
    public speedX:number = 5;
    public speedY:number = 8;
    
	public constructor() {
    	super("bee_png","bee_json","bee");
    	this.anchorOffsetX= this.width/2;
    	this.anchorOffsetY = this.height/2 + 30;
	}
}
