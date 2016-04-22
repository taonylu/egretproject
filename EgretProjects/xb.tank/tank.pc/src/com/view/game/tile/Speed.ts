/**
 * 加速地带
 * @author 
 *
 */
class Speed extends BaseTile{
    public static NAME:string = "Speed";
	public constructor() {
    	super();
    	this.canHit = false;
    	this.canWalk = true;
	}
}
