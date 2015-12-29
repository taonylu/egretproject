/**
*  文 件 名：SubmitPanel.ts
*  功    能：提交分数
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
class SubmitPanel extends egret.gui.SkinnableComponent{
    private submitBtn: egret.gui.Group;
    private scoreLabel: egret.gui.Label;
    
	public constructor() {
        super();
        this.skinName = skins.ui.SubmitPanelSkin;
	}
	
    public childrenCreated(): void { 
        this.submitBtn.touchEnabled = true;
        this.submitBtn.touchChildren = false;
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    public setScoreLabel(): void { 
        var facade: ApplicationFacade = ApplicationFacade.getInstance();
        var gameMediator:GameMediator = <GameMediator>facade.retrieveMediator(GameMediator.NAME);
        var score: number = gameMediator.gameScene.score;
        var leftTime: number = gameMediator.gameScene.leftTime;
        if(leftTime >= 0) { 
            score += leftTime;
        }
        
        if(this.initialized) {
            this.scoreLabel.text = "总得分:" + score;
        } else {
            var self: SubmitPanel = this;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE,function(): void {
                self.scoreLabel.text = "总得分" + score;
            },this);
        }
            
    }
    
    private onTouchTap(): void { 
        console.log("submit score...");
        
        var facade: ApplicationFacade = ApplicationFacade.getInstance();
        var gameMediator:GameMediator = <GameMediator>facade.retrieveMediator(GameMediator.NAME);
        var score: number = gameMediator.gameScene.score;
        var leftTime: number = gameMediator.gameScene.leftTime;
        if(leftTime >= 0) { 
            score += leftTime;
        }
        
        var userDataProxy: UserDataProxy = <UserDataProxy>facade.retrieveProxy(UserDataProxy.NAME);
        var json:SubmitScoreJSON = new SubmitScoreJSON();  

        json.name = userDataProxy.userName;
        json.score = score;
        
        ClientSocket.getInstance().send(json.getJSONString());
        
        //模拟接收
//        var json: RankJSON = new RankJSON();
//        json.cmd = 1001;
//        json.len = 2;
//        json.name[0] = "a";
//        json.score[0] = 1;
//        json.name[1] = "b";
//        json.score[1] = 123;
//        ClientSocket.getInstance().msgHandler(json.getJSONString());    
    }
    
    public hide(): void { 
        this.parent && LayerManager.getInstance().uiPopLayer.removeElement(this);
    }
}
