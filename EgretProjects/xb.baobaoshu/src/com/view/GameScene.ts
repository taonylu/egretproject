/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private bg1: eui.Image;
    private bg2: eui.Image;
    private bg3: eui.Image;
    
    private startBtn: eui.Button;  //开始按钮 
    private runBtn: eui.Button;    //奔跑按钮
    
    private ruleBtn: eui.Image;    //规则按钮
    private ruleGroup: eui.Group;  //规则Group
    
    private runMan0: eui.Image;    //奔跑圣诞老人
    private runMan1: eui.Image;
    private runManGroup: eui.Group;
    private manStartY: number;     //圣诞老人起始位置
    private runTimer: egret.Timer = new egret.Timer(150);  //跑步左右脚切换计时器
    private leftFootPool: ObjectPool = ObjectPool.getPool(LeftFoot.NAME,4);  //对象池
    private rightFootPool: ObjectPool = ObjectPool.getPool(RightFoot.NAME,4);
    private footList: Array<BaseFoot> = [];
    
    private title: eui.Image;      //游戏开始，倒计时3秒
    private num1: eui.Image;
    private num2: eui.Image;
    private num3: eui.Image;
    private numGroup: eui.Group;   //倒计时Group
    private numList: Array<eui.Image> = [];
    private countDownTimer: egret.Timer = new egret.Timer(720,4); //倒计时4秒
    
    private box0: eui.Image; //礼物盒
    private box1: eui.Image;
    private box2: eui.Image;
    private boxGroup: eui.Group;
    private boxList: Array<eui.Image> = [];
    private boxCount: number = 0; //当前获得的礼物盒数量
    
    private tip0: eui.Image; //提示
    private tip1: eui.Image;
    private tip2: eui.Image;
    private tipList: Array<eui.Image> = [];
    private initTipPosY: number; 
    
    private resultGroup: eui.Group;   //结果
    private man_success: eui.Image;
    private man_fail: eui.Image;
    private man_get0: eui.Image;
    private man_get1: eui.Image;
    private againBtn: eui.Image;
    private shareBtn: eui.Image;
    private getRedPacketBtn: eui.Button;
    
    private gameTimeLabel: eui.Label;   //游戏倒计时
    private gameSecondLabel: eui.Label; //游戏数字旁的“s”
    private gameTimeGroup: eui.Group;
    private gameTimeLimit: number = 15;
    private gameTimer: egret.Timer = new egret.Timer(1000);
    
    private packetTimer: egret.Timer = new egret.Timer(1000);
    
    private shareGroup: eui.Group;  //分享浮层
    
	public constructor() {
        super("GameSceneSkin");
        
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.boxList.push(this.box0,this.box1,this.box2);
        this.numList.push(this.num3,this.num2,this.num1,this.title);
        this.tipList.push(this.tip0,this.tip1,this.tip2);
        this.manStartY = this.runManGroup.y;
        this.initTipPosY = this.tip0.y;
    }
	
    public onEnable(): void {
        this.resetBg();         //重置背景
        this.resetRunMan();     //重置奔跑圣诞老人
        this.resetBtn();        //重置按钮
        this.resetRule();       //重置规则
        this.resetCountDown();  //重置开始倒计时
        this.resetGameTimer();  //重置游戏倒计时
        this.resetBox();        //重置礼物盒
        this.resetTip();        //重置提示
        this.resetResult();     //重置结果
        this.resetShareFloat();  //重置分享浮层
    }
    
    public onRemove(): void {
        
    }

    
    public gameOver(): void {
        console.log("gameover");
        this.runBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onRunBtnTouch,this);
        this.runBtn.removeEventListener(egret.TouchEvent.TOUCH_END,this.onRunBtnEnd,this);
        this.stopGameTimer();
        this.stopRunTimer();
        this.resetTip();       //重置提示
        this.showResultMan();  //显示结果
        this.removeChild(this.runManGroup);      //隐藏奔跑圣诞老人
        this.numGroup.removeChild(this.runBtn);  //隐藏跑步按钮
    }
    
    
    private onStartBtnTouch(): void {
        //场景元素显示和隐藏
        this.numGroup.removeChild(this.startBtn);
        //倒计时
        this.countDown();
    }

    //开始游戏，倒计时3秒
    private countDown(): void {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDown,this);
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onCountDownComplete,this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.numList[0].visible = true;
    }
    
    private onCountDown(): void {
        var len: number = this.numList.length;
        for(var i: number = 0;i < len;i++) {
            this.numList[i].visible = false;
        }
        if(this.numList[this.countDownTimer.currentCount]) {
            this.numList[this.countDownTimer.currentCount].visible = true;
        }
    }
    
    private onCountDownComplete(): void {
        var len: number = this.numList.length;
        for(var i: number = 0;i < len;i++) {
            this.numGroup.removeChild(this.numList[i]);
        }
        this.startGame();
    }
    
    private startGame(): void {
       this.numGroup.addChild(this.runBtn);
       this.addChild(this.boxGroup);
       this.startGameTimer();
       this.startRunTimer();
    }
    
    private onRunBtnTouch(): void {
        window["playClick"]();
        //按钮缩放
        //egret.Tween.get(this.runBtn).to({ scaleX: 0.95,scaleY: 0.95 },200);
        this.runBtn.scaleX = 0.95;
        this.runBtn.scaleY = 0.95;
        
        //拉近圣诞老人的距离
        this.runManGroup.y += 3.5;           //每点击一次的移动距离
        this.runManGroup.scaleX += 0.01;
        this.runManGroup.scaleY += 0.01;
        
        //点亮礼物盒
        if(this.runManGroup.y > 550) {   //礼物盒点亮的距离条件
            this.gameOver();
        } else if(this.boxCount < 3 && this.runManGroup.y > 500) {
            this.boxList[2].visible = true;
            this.showTip(2);
            this.boxCount = 3;
            window["playBox"]();
        } else if(this.boxCount < 2 && this.runManGroup.y > 350) {
            this.boxList[1].visible = true;
            this.showTip(1);
            this.boxCount = 2;
            window["playBox"]();
        } else if(this.boxCount < 1 && this.runManGroup.y > 250) {
            this.boxList[0].visible = true;
            this.showTip(0);
            this.boxCount = 1;
            window["playBox"]();
        }
        
    }
    
    private onRunBtnEnd(): void {
    
        //按钮缩放
        //egret.Tween.get(this.runBtn).to({ scaleX: 1,scaleY: 1 },200);
        this.runBtn.scaleX = 1;
        this.runBtn.scaleY = 1;
    }

    private onAgainBtnTouch(): void {
        window["playBGM"]();
        this.onEnable();
    }
    
    private onShareBtnTouch(): void {
        this.addChild(this.shareGroup);
        var self: GameScene = this;
        this.shareGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            self.shareGroup.parent && self.shareGroup.parent.removeChild(self.shareGroup);
        },this);
    }
    
    private onGetRedPacketTouch(): void {
        window["pauseBGM"]();
        LayerManager.getInstance().runScene(GameManager.getInstance().submitScene);
    }
    
    private onRuleBtnTouch(): void {
        this.numGroup.addChild(this.startBtn);
        this.removeChild(this.ruleGroup);
    }
    
    private startGameTimer(): void {
        this.addChild(this.gameTimeGroup);
        this.gameTimeGroup.addChild(this.gameTimeLabel);
        this.gameTimeGroup.addChild(this.gameSecondLabel);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onGameTimerHandler(): void {
        if(this.gameTimeLimit - this.gameTimer.currentCount < 0) {
            this.gameOver();
            return;
        }
        this.gameTimeLabel.text = (this.gameTimeLimit - this.gameTimer.currentCount).toString();
    }
    
    private stopGameTimer(): void {
        this.gameTimer.stop();
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
    }
    
    private startRunTimer(): void {
        this.runTimer.addEventListener(egret.TimerEvent.TIMER,this.onRunTimerHandler,this);
        this.runTimer.reset();
        this.runTimer.start();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onRunEnterFrame,this);
    }
    
    private onRunTimerHandler(): void {
        var foot: BaseFoot;
        if(this.runMan0.visible) {  
            this.runMan0.visible = false;
            this.runMan1.visible = true;
            foot = this.rightFootPool.getObject();
            foot.x = this.runMan1.x + 110;   //脚印位置
            foot.y = this.runMan1.y + 185;
        } else {  
            this.runMan0.visible = true;
            this.runMan1.visible = false;
            foot = this.leftFootPool.getObject();
            foot.x = this.runMan1.x + 60;
            foot.y = this.runMan1.y + 185;
        }
        foot.scaleX = 1;
        foot.scaleY = 1;
        this.runManGroup.addChild(foot);
        this.footList.push(foot); 
    }
    
    private bgCount: number = 1;
    private onRunEnterFrame(): void {
        //背景替换
        this.bgCount++;
        if(this.bgCount > 18) {
            this.bgCount = 1;
        }
        if(this.bgCount == 6) {
            this.bg1.visible = false;
            this.bg2.visible = true;
            this.bg3.visible = false;
        } else if(this.bgCount == 12) {
            this.bg1.visible = false;
            this.bg2.visible = false;
            this.bg3.visible = true;
        } else if(this.bgCount == 18) {
            this.bg1.visible = true;
            this.bg2.visible = false;
            this.bg3.visible = false;
        } 
        
        //脚步移动
        var len: number = this.footList.length;
        var foot: BaseFoot;
        for(var i: number = len-1;i >=0;i--) {
            foot = this.footList[i];
            foot.y += 5;   //脚印移动距离
            if(foot instanceof RightFoot) {
                foot.x += 0.4;  
            } else {
                foot.x -= 0.4;
            }
            foot.scaleX += 0.005;
            foot.scaleY += 0.005;
            if(foot.y >= GameConst.stage.stageHeight) {
                this.runManGroup.removeChild(foot);
                this.footList.splice(i,1);
                foot.recycle();
            }
        }
    }
    
    private stopRunTimer(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onRunEnterFrame,this);
        this.runTimer.removeEventListener(egret.TimerEvent.TIMER,this.onRunTimerHandler,this);
        this.runTimer.stop();
    }
    
    private startPacketTimer(): void {
        this.packetTimer.addEventListener(egret.TimerEvent.TIMER,this.showManGetAnim,this);
        this.packetTimer.reset();
        this.packetTimer.start();
    }
    
    private showManGetAnim(): void {
        if(this.man_get0.visible) {
            this.man_get0.visible = false;
            this.man_get1.visible = true;
        } else {
            this.man_get0.visible = true;
            this.man_get1.visible = false;
        }
    }
    
    private stopPacketTimer(): void {
        this.packetTimer.stop();
        this.packetTimer.removeEventListener(egret.TimerEvent.TIMER,this.showManGetAnim,this);
    }
    
    private showTip(num: number): void {
        var len: number = this.tipList.length;
        for(var i: number = 0;i < len;i++) {
            this.tipList[i].visible = false;
        }
        var tip: eui.Image = this.tipList[num];
        tip.alpha = 0;
        tip.y = this.initTipPosY + 150;
        tip.visible = true;
        egret.Tween.get(tip).to({y:this.initTipPosY,alpha:1},500);
    }
    
    private resetRule(): void {
        this.addChild(this.ruleGroup);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRuleBtnTouch,this);
    }
    
    private resetCountDown(): void {
        var len: number = this.numList.length;
        for(var i: number = 0;i < len;i++) {
            this.numList[i].visible = false;
            this.numGroup.addChild(this.numList[i]);
        }
    }
    
    private resetGameTimer(): void {
        this.removeChild(this.gameTimeGroup);
        this.gameTimeLabel.text = this.gameTimeLimit.toString();
    }
    
    private resetBox(): void {
        this.removeChild(this.boxGroup);
        var len = this.boxList.length;
        for(var i: number = 0;i < len;i++) {
            this.boxList[i].visible = false;
        }
        this.boxCount = 0;
    }
    
    private resetTip(): void {
        var len = this.tipList.length;
        for(var i: number = 0;i < len;i++) {
            this.tipList[i].visible = false;
        }
    }
    
    private resetBg(): void {
        this.bgCount = 0;
        this.bg1.visible = true;
        this.bg2.visible = false;
        this.bg3.visible = false;
    }
    
    private resetRunMan(): void {
        this.addChild(this.runManGroup);
        this.runMan0.visible = true;
        this.runMan1.visible = false;
        this.runManGroup.y = this.manStartY;
        this.runManGroup.scaleX = 1;
        this.runManGroup.scaleY = 1;
        this.runBtn.scaleX = 1;
        this.runBtn.scaleY = 1;
        var len: number = this.footList.length;
        var foot: BaseFoot;
        for(var i: number = 0;i < len;i++) {
            foot = this.footList[i];
            this.runManGroup.removeChild(foot);
            foot.recycle();
        }
        this.footList.length = 0;
    }
    
    private resetBtn(): void {
        this.addChild(this.numGroup);
        this.startBtn.parent && this.numGroup.removeChild(this.startBtn);
        this.runBtn.parent && this.numGroup.removeChild(this.runBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.runBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onRunBtnTouch,this);
        this.runBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onRunBtnEnd,this);
    }
    
    private resetResult(): void {
        this.stopPacketTimer();
        this.removeChild(this.resultGroup);
        this.man_success.visible = false;
        this.man_fail.visible = false;
        this.man_get0.visible = false;
        this.man_get1.visible = false;
        this.shareBtn.visible = false;
        this.againBtn.visible = false;
    }
    
    private resetShareFloat(): void {
        this.shareGroup.parent && this.removeChild(this.shareGroup);
    }


    private showResultMan(): void {
        this.gameTimeGroup.removeChild(this.gameTimeLabel);
        this.gameTimeGroup.removeChild(this.gameSecondLabel);
        this.addChild(this.resultGroup);
        if(this.boxCount <= 2) {
            this.man_fail.visible = true;
        } else if(this.boxCount == 3) {
            this.man_success.visible = true;
            
        }
        
        var self: GameScene = this;
        egret.Tween.get(this).wait(2000).call(function() {
            self.shareBtn.visible = true;
            self.againBtn.visible = true;
            self.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
            self.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
            if(self.boxCount == 3) {
                self.man_success.visible = false;
                self.getRedPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetRedPacketTouch,this);
                self.man_get0.visible = true;
                self.man_get1.visible = false;
                self.startPacketTimer();
            }
        },this);
    }

    
}













