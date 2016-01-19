/**
* 游戏方块
*/
class BlockUI extends egret.Bitmap{
    public static NAME: string = "BlockUI";
    public skinID: number;  //皮肤ID
    public row: number;     //行
    public col: number;     //列
    
	public constructor() {
        super();
        this.touchEnabled = true;
	}
    
	//设置皮肤外观Texture
    public setSkin(skinID:number): void {
        this.touchEnabled = true;
        this.texture = RES.getRes("block" + skinID + "_png");
        this.skinID = skinID;
    }
	
    //方块回收
    public hide(): void {
        var self: BlockUI = this;
        this.touchEnabled = false;
        egret.Tween.get(this).to({alpha: 0.2 },300,egret.Ease.quadOut).call(function(): void {
            self.parent && self.parent.removeChild(self);
            ObjectPool.getPool(BlockUI.NAME).returnObject(self);
            self.alpha = 1;
        });
    }

    //立刻隐藏，防止方块动画未播放完成，再次使用该方块
    public hideImmediately():void{
        egret.Tween.removeTweens(this);
        this.touchEnabled = false;
        this.parent && this.parent.removeChild(this);
        this.alpha = 1;
    }
    
}
