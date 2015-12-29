/**
 * 格子背景
 * @author 
 *
 */
class GridBg extends egret.Bitmap{
    public row: number;
    public col: number;
    public bHave: Boolean = false;   //是否已经占用
    public parentNode: GridBg;        
	public constructor() {
        super(RES.getRes("game_grid0_png"));
        this.touchEnabled = true;
	}
	
    public clean(): void {
        this.parentNode = null;
    }
    
    public getPos(): any {
        return [this.row,this.col];
    }
}
