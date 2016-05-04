/**
 * 过渡场景
 * @author 
 *
 */
class TransitionScene extends  BaseScene{
    private stageLabel:eui.BitmapLabel;   //第几关
    private endLessGroup:eui.Group;        //无尽模式说明
    
	public constructor() {
        super("TransitionSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public onEnable(){
        window["changeBgColor"](GameConst.color7);
        this.setStageLabel();
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
        egret.Tween.get(this).wait(2000).call(function(){
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);    
        });
    }
}
