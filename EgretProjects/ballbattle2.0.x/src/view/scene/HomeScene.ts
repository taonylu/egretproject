/**
*  文 件 名：HomeScene.ts
*  功    能：主页场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class HomeScene extends BaseScene{
    private startBtn: NarrowButton;
    public nameLabel: egret.gui.EditableText;
    public loadingUI: LoadingUI = new LoadingUI();
    public randomNameBtn:NarrowButton;
    public centerBtn:egret.gui.UIAsset;
    public relationshipBtn:egret.gui.UIAsset;
    public rankBtn:egret.gui.UIAsset;
    public skinBtn:egret.gui.UIAsset;
    
	public constructor() {
        super();
        this.skinName = skins.scene.HomeSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.randomNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomNameBtnTouch, this);
        this.playSceneAimation();
    }
    
    public onRemove(): void { 
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.randomNameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomNameBtnTouch, this);
        this.loadingUI.hide();
    }
    
    private onStartBtnTouch(): void {
        this.loadingUI.show();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SEND_START_REQUEST);
    }

    private onRandomNameBtnTouch(e:egret.TouchEvent):void{
        this.nameLabel.text = NameFactory.getInstance().getOne();
    }

    private playSceneAimation():void{
        var startY:number = this.centerBtn.y + 200;
        var endY:number = this.centerBtn.y;

        this.centerBtn.y = startY;
        this.relationshipBtn.y = startY;
        this.rankBtn.y = startY;
        this.skinBtn.y = startY;

        egret.Tween.get(this.centerBtn).to({y:endY},500,egret.Ease.circOut);
        egret.Tween.get(this.relationshipBtn).wait(200).to({y:endY},500,egret.Ease.circOut);
        egret.Tween.get(this.rankBtn).wait(400).to({y:endY},500,egret.Ease.circOut);
        egret.Tween.get(this.skinBtn).wait(600).to({y:endY},500,egret.Ease.circOut);
    }
}








