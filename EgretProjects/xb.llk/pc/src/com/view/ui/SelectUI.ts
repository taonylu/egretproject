/**
选择框
*/
class SelectUI extends egret.Bitmap{

	public constructor() {
        super();
        this.bitmapData = RES.getRes("select0_png");
	}
    
    //停止动画，并从舞台移除
    public hide(): void {
        this.parent && this.parent.removeChild(this);
    }

    public play(block:BlockUI){
        this.x = (this.width - block.width)/2;
        this.y - (this.height - block.height) / 2;
        block.parent.addChild(this);
    }
    
}













