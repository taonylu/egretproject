/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.runTimer = new egret.Timer(150); //跑步左右脚切换计时器
        this.leftFootPool = ObjectPool.getPool(LeftFoot.NAME, 4); //对象池
        this.rightFootPool = ObjectPool.getPool(RightFoot.NAME, 4);
        this.footList = [];
        this.numList = [];
        this.countDownTimer = new egret.Timer(720, 4); //倒计时4秒
        this.boxList = [];
        this.boxCount = 0; //当前获得的礼物盒数量
        this.tipList = [];
        this.gameTimeLimit = 15;
        this.gameTimer = new egret.Timer(1000);
        this.packetTimer = new egret.Timer(1000);
        this.bgCount = 1;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.boxList.push(this.box0, this.box1, this.box2);
        this.numList.push(this.num3, this.num2, this.num1, this.title);
        this.tipList.push(this.tip0, this.tip1, this.tip2);
        this.manStartY = this.runManGroup.y;
        this.initTipPosY = this.tip0.y;
    };
    p.onEnable = function () {
        this.resetBg(); //重置背景
        this.resetRunMan(); //重置奔跑圣诞老人
        this.resetBtn(); //重置按钮
        this.resetRule(); //重置规则
        this.resetCountDown(); //重置开始倒计时
        this.resetGameTimer(); //重置游戏倒计时
        this.resetBox(); //重置礼物盒
        this.resetTip(); //重置提示
        this.resetResult(); //重置结果
        this.resetShareFloat(); //重置分享浮层
    };
    p.onRemove = function () {
    };
    p.gameOver = function () {
        console.log("gameover");
        this.runBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRunBtnTouch, this);
        this.runBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRunBtnEnd, this);
        this.stopGameTimer();
        this.stopRunTimer();
        this.resetTip(); //重置提示
        this.showResultMan(); //显示结果
        this.removeChild(this.runManGroup); //隐藏奔跑圣诞老人
        this.numGroup.removeChild(this.runBtn); //隐藏跑步按钮
    };
    p.onStartBtnTouch = function () {
        //场景元素显示和隐藏
        this.numGroup.removeChild(this.startBtn);
        //倒计时
        this.countDown();
    };
    //开始游戏，倒计时3秒
    p.countDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDown, this);
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onCountDownComplete, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.numList[0].visible = true;
    };
    p.onCountDown = function () {
        var len = this.numList.length;
        for (var i = 0; i < len; i++) {
            this.numList[i].visible = false;
        }
        if (this.numList[this.countDownTimer.currentCount]) {
            this.numList[this.countDownTimer.currentCount].visible = true;
        }
    };
    p.onCountDownComplete = function () {
        var len = this.numList.length;
        for (var i = 0; i < len; i++) {
            this.numGroup.removeChild(this.numList[i]);
        }
        this.startGame();
    };
    p.startGame = function () {
        this.numGroup.addChild(this.runBtn);
        this.addChild(this.boxGroup);
        this.startGameTimer();
        this.startRunTimer();
    };
    p.onRunBtnTouch = function () {
        window["playClick"]();
        //按钮缩放
        //egret.Tween.get(this.runBtn).to({ scaleX: 0.95,scaleY: 0.95 },200);
        this.runBtn.scaleX = 0.95;
        this.runBtn.scaleY = 0.95;
        //拉近圣诞老人的距离
        this.runManGroup.y += 3.5; //每点击一次的移动距离
        this.runManGroup.scaleX += 0.01;
        this.runManGroup.scaleY += 0.01;
        //点亮礼物盒
        if (this.runManGroup.y > 550) {
            this.gameOver();
        }
        else if (this.boxCount < 3 && this.runManGroup.y > 500) {
            this.boxList[2].visible = true;
            this.showTip(2);
            this.boxCount = 3;
            window["playBox"]();
        }
        else if (this.boxCount < 2 && this.runManGroup.y > 350) {
            this.boxList[1].visible = true;
            this.showTip(1);
            this.boxCount = 2;
            window["playBox"]();
        }
        else if (this.boxCount < 1 && this.runManGroup.y > 250) {
            this.boxList[0].visible = true;
            this.showTip(0);
            this.boxCount = 1;
            window["playBox"]();
        }
    };
    p.onRunBtnEnd = function () {
        //按钮缩放
        //egret.Tween.get(this.runBtn).to({ scaleX: 1,scaleY: 1 },200);
        this.runBtn.scaleX = 1;
        this.runBtn.scaleY = 1;
    };
    p.onAgainBtnTouch = function () {
        window["playBGM"]();
        this.onEnable();
    };
    p.onShareBtnTouch = function () {
        this.addChild(this.shareGroup);
        var self = this;
        this.shareGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.shareGroup.parent && self.shareGroup.parent.removeChild(self.shareGroup);
        }, this);
    };
    p.onGetRedPacketTouch = function () {
        window["pauseBGM"]();
        LayerManager.getInstance().runScene(GameManager.getInstance().submitScene);
    };
    p.onRuleBtnTouch = function () {
        this.numGroup.addChild(this.startBtn);
        this.removeChild(this.ruleGroup);
    };
    p.startGameTimer = function () {
        this.addChild(this.gameTimeGroup);
        this.gameTimeGroup.addChild(this.gameTimeLabel);
        this.gameTimeGroup.addChild(this.gameSecondLabel);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimerHandler = function () {
        if (this.gameTimeLimit - this.gameTimer.currentCount < 0) {
            this.gameOver();
            return;
        }
        this.gameTimeLabel.text = (this.gameTimeLimit - this.gameTimer.currentCount).toString();
    };
    p.stopGameTimer = function () {
        this.gameTimer.stop();
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
    };
    p.startRunTimer = function () {
        this.runTimer.addEventListener(egret.TimerEvent.TIMER, this.onRunTimerHandler, this);
        this.runTimer.reset();
        this.runTimer.start();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onRunEnterFrame, this);
    };
    p.onRunTimerHandler = function () {
        var foot;
        if (this.runMan0.visible) {
            this.runMan0.visible = false;
            this.runMan1.visible = true;
            foot = this.rightFootPool.getObject();
            foot.x = this.runMan1.x + 110; //脚印位置
            foot.y = this.runMan1.y + 185;
        }
        else {
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
    };
    p.onRunEnterFrame = function () {
        //背景替换
        this.bgCount++;
        if (this.bgCount > 18) {
            this.bgCount = 1;
        }
        if (this.bgCount == 6) {
            this.bg1.visible = false;
            this.bg2.visible = true;
            this.bg3.visible = false;
        }
        else if (this.bgCount == 12) {
            this.bg1.visible = false;
            this.bg2.visible = false;
            this.bg3.visible = true;
        }
        else if (this.bgCount == 18) {
            this.bg1.visible = true;
            this.bg2.visible = false;
            this.bg3.visible = false;
        }
        //脚步移动
        var len = this.footList.length;
        var foot;
        for (var i = len - 1; i >= 0; i--) {
            foot = this.footList[i];
            foot.y += 5; //脚印移动距离
            if (foot instanceof RightFoot) {
                foot.x += 0.4;
            }
            else {
                foot.x -= 0.4;
            }
            foot.scaleX += 0.005;
            foot.scaleY += 0.005;
            if (foot.y >= GameConst.stage.stageHeight) {
                this.runManGroup.removeChild(foot);
                this.footList.splice(i, 1);
                foot.recycle();
            }
        }
    };
    p.stopRunTimer = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onRunEnterFrame, this);
        this.runTimer.removeEventListener(egret.TimerEvent.TIMER, this.onRunTimerHandler, this);
        this.runTimer.stop();
    };
    p.startPacketTimer = function () {
        this.packetTimer.addEventListener(egret.TimerEvent.TIMER, this.showManGetAnim, this);
        this.packetTimer.reset();
        this.packetTimer.start();
    };
    p.showManGetAnim = function () {
        if (this.man_get0.visible) {
            this.man_get0.visible = false;
            this.man_get1.visible = true;
        }
        else {
            this.man_get0.visible = true;
            this.man_get1.visible = false;
        }
    };
    p.stopPacketTimer = function () {
        this.packetTimer.stop();
        this.packetTimer.removeEventListener(egret.TimerEvent.TIMER, this.showManGetAnim, this);
    };
    p.showTip = function (num) {
        var len = this.tipList.length;
        for (var i = 0; i < len; i++) {
            this.tipList[i].visible = false;
        }
        var tip = this.tipList[num];
        tip.alpha = 0;
        tip.y = this.initTipPosY + 150;
        tip.visible = true;
        egret.Tween.get(tip).to({ y: this.initTipPosY, alpha: 1 }, 500);
    };
    p.resetRule = function () {
        this.addChild(this.ruleGroup);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    p.resetCountDown = function () {
        var len = this.numList.length;
        for (var i = 0; i < len; i++) {
            this.numList[i].visible = false;
            this.numGroup.addChild(this.numList[i]);
        }
    };
    p.resetGameTimer = function () {
        this.removeChild(this.gameTimeGroup);
        this.gameTimeLabel.text = this.gameTimeLimit.toString();
    };
    p.resetBox = function () {
        this.removeChild(this.boxGroup);
        var len = this.boxList.length;
        for (var i = 0; i < len; i++) {
            this.boxList[i].visible = false;
        }
        this.boxCount = 0;
    };
    p.resetTip = function () {
        var len = this.tipList.length;
        for (var i = 0; i < len; i++) {
            this.tipList[i].visible = false;
        }
    };
    p.resetBg = function () {
        this.bgCount = 0;
        this.bg1.visible = true;
        this.bg2.visible = false;
        this.bg3.visible = false;
    };
    p.resetRunMan = function () {
        this.addChild(this.runManGroup);
        this.runMan0.visible = true;
        this.runMan1.visible = false;
        this.runManGroup.y = this.manStartY;
        this.runManGroup.scaleX = 1;
        this.runManGroup.scaleY = 1;
        this.runBtn.scaleX = 1;
        this.runBtn.scaleY = 1;
        var len = this.footList.length;
        var foot;
        for (var i = 0; i < len; i++) {
            foot = this.footList[i];
            this.runManGroup.removeChild(foot);
            foot.recycle();
        }
        this.footList.length = 0;
    };
    p.resetBtn = function () {
        this.addChild(this.numGroup);
        this.startBtn.parent && this.numGroup.removeChild(this.startBtn);
        this.runBtn.parent && this.numGroup.removeChild(this.runBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.runBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRunBtnTouch, this);
        this.runBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onRunBtnEnd, this);
    };
    p.resetResult = function () {
        this.stopPacketTimer();
        this.removeChild(this.resultGroup);
        this.man_success.visible = false;
        this.man_fail.visible = false;
        this.man_get0.visible = false;
        this.man_get1.visible = false;
        this.shareBtn.visible = false;
        this.againBtn.visible = false;
    };
    p.resetShareFloat = function () {
        this.shareGroup.parent && this.removeChild(this.shareGroup);
    };
    p.showResultMan = function () {
        this.gameTimeGroup.removeChild(this.gameTimeLabel);
        this.gameTimeGroup.removeChild(this.gameSecondLabel);
        this.addChild(this.resultGroup);
        if (this.boxCount <= 2) {
            this.man_fail.visible = true;
        }
        else if (this.boxCount == 3) {
            this.man_success.visible = true;
        }
        var self = this;
        egret.Tween.get(this).wait(2000).call(function () {
            self.shareBtn.visible = true;
            self.againBtn.visible = true;
            self.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
            self.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
            if (self.boxCount == 3) {
                self.man_success.visible = false;
                self.getRedPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetRedPacketTouch, this);
                self.man_get0.visible = true;
                self.man_get1.visible = false;
                self.startPacketTimer();
            }
        }, this);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
