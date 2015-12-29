/**
 * 已占用格子
 * @author 
 *
 */
class Grid extends egret.Bitmap{
    public static NAME: string = "Grid";
	public constructor() {
        super(RES.getRes("game_grid1_png"));
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
	}
	
}
