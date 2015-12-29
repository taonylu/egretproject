/**
 * 白色的方块，用于形成镂空效果
 * @author 
 *
 */
class RectUI extends egret.Sprite{
    
    public ID: number;
    
	public constructor() {
        super();
        
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(0, 0, GameConst.cellWidth, GameConst.cellWidth);
        this.graphics.endFill();
	}
}
