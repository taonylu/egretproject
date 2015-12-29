/**
 *
 * @author 
 * 游戏介绍场景
 */
class IntroduceScene extends BaseScene{
    private bg1: eui.Image;
    private bg2: eui.Image;
    private bg3: eui.Image;
    private bgList: Array<eui.Image> = [];
    private hand: eui.Image;
    private curBgIndex: number = 0;
    
	public constructor() {
        super("resource/myskin/scene/IntroduceSceneSkin.exml");
        this.bgList.push(this.bg1,this.bg2,this.bg3);
	}
	
    public onEnable(): void {
        this.bgAnim();
        this.handAnimLeft();
    }
    
    public onRemove(): void {
        egret.Tween.removeAllTweens();
        this.hand.x = 50;
        this.addChild(this.bg1);
        this.curBgIndex = 0;
        
    }
    
    private bgAnim(): void {
        var self: IntroduceScene = this;
        egret.Tween.get(this).wait(1000).call(function() {
            self.curBgIndex++;
            if(self.curBgIndex >= self.bgList.length) {
                self.nextScene();
                return;
            }
            self.addChild(self.bgList[self.curBgIndex]);
            self.bgAnim();
        });
    }
    
    private handAnimLeft(): void {
        var self: IntroduceScene = this;
        egret.Tween.get(this.hand).to({ x: this.hand.x - 100 },500).call(function() {
            self.handAnimRight();
        });
    }
    
    private handAnimRight(): void {
        var self: IntroduceScene = this;
        egret.Tween.get(this.hand).to({ x: this.hand.x + 100 },500).call(function() {
            self.handAnimLeft();
        });
    }
    
    private nextScene(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
}
