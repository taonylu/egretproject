/**
 * 河流
 * @author 
 *
 */
class River extends BaseTile{
    public static NAME:string = "River";
	public constructor() {
    	super();
    	this.skinName = "RiverSkin";
    	this.canHit = false;
    	this.canWalk = false;
	}
}
