/**
*  文 件 名：GameScene.ts
*  功    能： 游戏场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class GameScene extends BaseScene{
    private gameGroup: egret.gui.Group;      //游戏Group容器
    private gameSprite:GameSprite;           //游戏Sprite容器
    private tishiBtn: egret.gui.UIAsset;     //提示按钮
    private sortBtn: egret.gui.UIAsset;      //重排按钮
    private progressBg: egret.gui.UIAsset;   //进度条背景
    private progressBar: egret.gui.UIAsset;  //进度条
    private timeLabel: egret.gui.Label;      //计时文本
    private scoreLabel: egret.gui.Label;     //得分文本
    private quitBtn: egret.gui.UIAsset;      //退出按钮

    public submitPanel: SubmitPanel;  //提交分数面板
    public rankPanel: RankPanel;        //排行榜
    
    public timer: egret.Timer;              //游戏计时器
    public timeLimit:number = 30;           //时间限制
    public leftTime:number = 0;            //剩余时间
    
    public score:number;                    //得分

	public constructor() {
        super();
        this.skinName = skins.scene.GameSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.gameSprite = new GameSprite;
        this.gameSprite.touchEnabled = true;
        this.gameSprite.gameScene = this;
        
        var uiAsset: egret.gui.UIAsset = new egret.gui.UIAsset();
        uiAsset.source = this.gameSprite;
        uiAsset.touchChildren = true;
        this.gameGroup.addElement(uiAsset);
        
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.startGame();
    }
    
    public onRemove(): void { 
        
    }
    
    //开始游戏
    public startGame(): void { 
        //初始化游戏
        this.gameSprite.init();
        //面板
        this.submitPanel && this.submitPanel.hide();
        this.rankPanel && this.rankPanel.hide();
        //设置进度条
        this.leftTime = this.timeLimit;
        this.setProgress();
        //设置分数
        this.score = 0;
        this.addScore(0);
        //添加监听
        this.tishiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTishiBtnTouch,this);
        this.sortBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSortBtnTouch,this);
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onQuitBtnTouch,this);
        //开始计时
        this.startTimer();
    }
    
    //重玩游戏
    public playAgain(): void { 
        this.gameSprite.resetGame();
        this.startGame();
        
    }
    
    private onTishiBtnTouch(): void { 
        console.log("click tishi...");
        this.gameSprite.tishi();
    }
    
    private onSortBtnTouch(): void { 
        console.log("click sort...");
        this.gameSprite.sortBlock();
    }
    
    private onQuitBtnTouch(): void { 
        this.stopTimer();
        this.gameSprite.resetGame();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SHOW);
    }
    
    private startTimer(): void { 
        if(this.timer == null) { 
            this.timer = new egret.Timer(1000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    }
    
    public stopTimer(): void { 
        if(this.timer != null) { 
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        }
    }
    
    
    private onTimerHandler(e: egret.TimerEvent): void { 
        this.leftTime = this.timeLimit - this.timer.currentCount;
        if(this.leftTime > -1) {
            this.setProgress();
        } else { 
            this.gameSprite.gameLose();
        }
    }
    
    private setProgress(): void { 
        this.timeLabel.text = this.leftTime.toString();
        this.progressBar.scaleX = this.leftTime / this.timeLimit;
    }
       
    public addScore(add:number): void { 
        this.score += add;
        this.scoreLabel.text = "得分：" + this.score;
    }
    
    public showSubmitPanel(): void { 
        if(this.submitPanel == null) { 
            this.submitPanel = new SubmitPanel();
        }
        this.submitPanel.setScoreLabel();
        LayerManager.getInstance().uiPopLayer.addElement(this.submitPanel);
    }
    
    public hideSubmitPanel(): void { 
        this.submitPanel &&  this.submitPanel.hide();
    }
    
    public showRank(data:any): void { 
        this.hideSubmitPanel();
        this.showRankPanel(data);
    }
    
    public showRankPanel(data:RankJSON): void { 
        if(this.rankPanel == null) { 
            this.rankPanel = new RankPanel();
        }
        LayerManager.getInstance().uiPopLayer.addElement(this.rankPanel);
        if(this.rankPanel.initialized) {
            this.rankPanel.showRank(data);
        } else {
            var self: GameScene = this;
            this.rankPanel.childrenCreated = function(): void { 
                self.rankPanel.onEnable();
                self.rankPanel.showRank(data);
            }
        }
        
    }
    
    public hideRankPanel(): void { 
        if(this.rankPanel != null) { 
            this.rankPanel.hide();
        }
    }
    
}




