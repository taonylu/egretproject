/**
*  文 件 名：Rect.ts
*  功    能：六角型方块
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class Rect extends egret.Bitmap{
    public static NAME: string = "Rect";
    public id: number;
    public weight: number = 0;
    public isChecked: Boolean = false;  //碰撞检测中，防止同时被多个玩家同时吃掉

	public constructor() {
        super();
        this.weight = GameConst.rectInitWeight;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.cacheAsBitmap = true;
	}

    public reset(): void { 
        var rand: number = NumberTool.getRandomInt(0,3);
        this.texture = RES.getRes("sixrect" + rand + "_png");
        this.visible = false;
        this.isChecked = false;
    }
    
    public hide(): void {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Rect.NAME).returnObject(this);
    }
}
