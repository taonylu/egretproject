/**
 * 草地
 * @author 
 *
 */
class Grass extends BaseTile{
    public static NAME:string = "Grass";
	public constructor() {
    	super();
    	this.skinName = "GrassSkin";
    	this.canHit = false;
    	this.canWalk = true;
      this.setType(TileEnum.grass);
	}

}
