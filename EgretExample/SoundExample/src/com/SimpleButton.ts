/**
 *
 * @author 
 *
 */
class SimpleButton extends egret.Sprite{
    public id: number;
	public constructor() {
        super();
        
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0,0,100,50);
        this.graphics.endFill();
	}
}
