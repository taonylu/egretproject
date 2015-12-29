/**
 * 主页场景
 * @author 羊力大仙 
 * @date 2015.10.27
 */
class HomeScene extends BaseScene{

    private startBtn:eui.Button;
    private bird:BirdMC;
    private greenBar:GreenBarMC;

	public constructor() {
        super();
        this.skinName = "resource/myskins/scene/HomeSceneSkin.exml";
	}

    public onEnable():void{
        this.createBird();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch,this);
    }

    public onRemove():void{
        this.bird && this.bird.stop();
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch,this);
    }

    private createBird():void{
        if(this.bird == null){
            this.bird = new BirdMC();
            this.bird.x = (this.stage.stageWidth - this.bird.width)/2;
            this.bird.y = (this.stage.stageHeight - this.bird.height)/2;
            this.addChild(this.bird);
        }
        this.bird.play(-1);
    }

    private onStartBtnTouch():void{
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }


}

















