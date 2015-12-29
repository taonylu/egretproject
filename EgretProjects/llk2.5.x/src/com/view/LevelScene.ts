/**
*  功    能：关卡选择界面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class LevelScene extends BaseScene{
    private backBtn: eui.Button;

    private levelBtnList: Array<LevelBtnUI> = [];

    private levelBtnMax: number = 6;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/LevelSceneSkin.exml";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.onEnable();
        this.createLevelBtn();
    }
    
    public onEnable(): void {
        this.initTitle();
        this.configListeners();
    }
    
    public onRemove(): void {
        this.deConfigListeners();
    }
    
    private configListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private deConfigListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private onTouchTap(e:egret.TouchEvent): void {
        console.log("点击关卡",e.target);
        if(e.target instanceof LevelBtnUI){
            var levelBtn: LevelBtnUI = <LevelBtnUI>e.target;
            GameManager.getInstance().startGame(levelBtn.levelNum);
        }else if(e.target == this.backBtn){
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }
    }
    
    private initTitle(): void {
        var titleUI: TitleUI = GameManager.getInstance().titleUI;
        this.addChild(titleUI);
        titleUI.setTitle("选择一个关卡");
    }
    
    public createLevelBtn(): void {
        for(var i: number = 1;i <= this.levelBtnMax;i++) {
            var levelBtn: LevelBtnUI = new LevelBtnUI();
            if(i % 2 == 0) {
                levelBtn.horizontalCenter = 120;
            } else {
                levelBtn.horizontalCenter = -120;
            }
            levelBtn.y = 170 * (Math.ceil(i / 2));
            levelBtn.levelNum = i;
            levelBtn.setLevelNumLabel(i);
            levelBtn.setTitleLabel("新手");
            levelBtn.setFishLabel(0);
            levelBtn.setStarLabel(0);
            this.addChild(levelBtn);
        }
    }
    
    
    
    
}
