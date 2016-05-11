/**
 * 过渡场景
 * @author 
 *
 */
class TransitionScene extends  BaseScene{
    private stageLabel:eui.BitmapLabel;   //第几关
    private endLessGroup:eui.Group;        //无尽模式说明
    private countDownTime:number = 3000;  //倒计时
    
	public constructor() {
        super("TransitionSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.countDownTime = GameConst.gameConfig.transitionCountDown*1000;
    }
    
    public onEnable(){
        window["changeBgColor"](GameConst.color7);
        this.setStageLabel();
    }
    
    public reset(){
        egret.Tween.removeTweens(this);
    }
    
    //设置第几关
    public setStageLabel(){
        this.stageLabel.text = "STAGE  " + MapManager.getInstance().curLevel;
        //无尽模式说明
        if(MapManager.getInstance().levelLimit == MapManager.getInstance().curLevel){
            this.endLessGroup.visible = true;
        }else{
            this.endLessGroup.visible = false;
        }
        //等待一段时间，进入游戏
        egret.Tween.get(this).wait(this.countDownTime).call(function(){
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);    
        });
    }
}
