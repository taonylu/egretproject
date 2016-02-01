/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        //window["playBGM"]();
        SoundManager.getInstance().playBGM();
        this.playAnim();
    };
    p.onRemove = function () {
    };
    //视图初始化
    p.initView = function () {
        //立刻验证以获取组件高宽
        this.validateNow();
        //获取舞台高宽
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        //初始场景1
        this.scene1.visible = true;
        this.initGuizi0X = this.guizi0.x;
        this.initGuizi1X = this.guizi1.x;
        this.initGuizi2X = this.guizi2.x;
        this.initMan0X = this.man0.x;
        this.man_talk1.alpha = 0;
        var stageWidth = GameConst.stage.stageWidth;
        this.guizi0.x = stageWidth;
        this.guizi1.x = stageWidth;
        this.guizi2.x = stageWidth;
        this.man0.x = stageWidth;
        //初始场景2
        this.scene2.visible = false;
        this.logo.x = -this.logo.width;
        this.posDesk.y = this.stageHeight;
        this.man1.y = this.stageHeight - this.man1.height;
        this.man1.x = this.stageWidth;
        this.man1_talk.y = this.man1.y - 200;
        this.man1_talk.alpha = 0;
        this.door.x = -this.door.width;
        this.door.y = this.man1.y - 306;
        this.doorClip.mask = this.doorClipMask;
        this.godGroup.visible = false;
        this.godGroup.y = this.man1.y - 606;
        this.startBtn.alpha = 0;
        this.ruleBtn.alpha = 0;
        this.godTalk.alpha = 0;
        //规则
        //this.ruleGroup.visible = false;
    };
    //开始播放动画
    p.playAnim = function () {
        var self = this;
        //钟上移
        egret.Tween.get(this.clockGroup).to({ y: 130, scaleX: 0.7, scaleY: 0.7 }, 300);
        //柜子出来
        egret.Tween.get(this.guizi0).wait(200).to({ x: this.initGuizi0X }, 500, egret.Ease.backOut);
        egret.Tween.get(this.guizi1).wait(400).to({ x: this.initGuizi1X }, 500, egret.Ease.backOut);
        egret.Tween.get(this.guizi2).wait(600).to({ x: this.initGuizi2X }, 500, egret.Ease.backOut);
        //人探头
        egret.Tween.get(this.man0).wait(700).to({ x: this.initMan0X }, 500, egret.Ease.getBackOut(1));
        egret.Tween.get(this.man_talk1).wait(1300).to({ alpha: 1 }, 1000).
            to({ alpha: 0 }, 1000).call(function () {
            self.playGuiZiBack();
        });
    };
    //播放柜子退出
    p.playGuiZiBack = function () {
        //钟退出
        egret.Tween.get(this.clockGroup).to({ y: -this.clockGroup.height }, 500, egret.Ease.backIn);
        //人退出
        egret.Tween.get(this.man0).to({ x: this.stageWidth + this.man0.width }, 300, egret.Ease.getBackIn(1));
        //柜子退出
        egret.Tween.get(this.guizi0).wait(200).to({ x: this.stageWidth + this.guizi0.width }, 500, egret.Ease.backIn);
        egret.Tween.get(this.guizi1).wait(400).to({ x: this.stageWidth + this.guizi1.width }, 500, egret.Ease.backIn);
        egret.Tween.get(this.guizi2).wait(600).to({ x: this.stageWidth + this.guizi2.width }, 500, egret.Ease.backIn);
        egret.Tween.get(this).wait(900).call(this.playCountMoney);
    };
    //播放结算界面
    p.playCountMoney = function () {
        //显示场景2
        this.scene2.visible = true;
        var self = this;
        //招牌和卷闸门左边进入
        egret.Tween.get(this.logo).to({ x: (this.stageWidth - this.logo.width) / 2 }, 500, egret.Ease.backOut);
        egret.Tween.get(this.door).wait(100).to({ x: (this.stageWidth - this.door.width) / 2 }, 500, egret.Ease.backOut);
        //pos机从下方进入
        egret.Tween.get(this.posDesk).wait(300).to({ y: this.stageHeight - this.posDesk.height + 50 }, 500, egret.Ease.getBackOut(1.2));
        //man1进入
        egret.Tween.get(this.man1).wait(500).to({ x: (this.stageWidth - this.man1.width) / 2 }, 500, egret.Ease.backOut);
        //man1说话
        egret.Tween.get(this.man1_talk).wait(1200).to({ alpha: 1 }, 800).wait(500).call(function () {
            self.playGodEnter();
        });
    };
    //财神进场
    p.playGodEnter = function () {
        var self = this;
        //人物和柜台机消失
        egret.Tween.get(this.man1).to({ alpha: 0 }, 1000);
        egret.Tween.get(this.posDesk).to({ alpha: 0 }, 1000);
        egret.Tween.get(this.man1_talk).to({ alpha: 0 }, 1000);
        //财神摇头摆手
        this.godGroup.visible = true;
        egret.Tween.get(this.godHand, { loop: true }).to({ rotation: 10 }, 500).to({ rotation: 0 }, 500);
        egret.Tween.get(this.godHead, { loop: true }).to({ y: this.godHead.y + 5 }, 500).to({ y: this.godHead.y }, 500);
        //财神的烟雾
        var smoke0X = this.smoke0.x; //左上
        egret.Tween.get(this.smoke0, { loop: true }).to({ x: smoke0X - 50, alpha: 0.1 }, 2000).to({ x: smoke0X, alpha: 1 });
        var smoke3X = this.smoke3.x; //左下
        egret.Tween.get(this.smoke3, { loop: true }).to({ x: smoke3X - 100, alpha: 0.1 }, 2000).to({ x: smoke3X, alpha: 1 });
        var smoke1X = this.smoke1.x; //右上
        egret.Tween.get(this.smoke1, { loop: true }).to({ x: smoke1X + 50, alpha: 0.1 }, 2000).to({ x: smoke1X, alpha: 1 });
        var smoke2X = this.smoke2.x; //右下
        egret.Tween.get(this.smoke2, { loop: true }).to({ x: smoke2X + 100, alpha: 0.1 }, 2000).to({ x: smoke2X, alpha: 1 });
        //门帘上卷
        egret.Tween.get(this.doorClip).to({ y: -this.doorClip.height }, 2000).wait(300).call(this.playStartUIEnter, this);
    };
    //播放游戏元素进场
    p.playStartUIEnter = function () {
        //门和招牌消失
        egret.Tween.get(this.doorBg).to({ alpha: 0 }, 500);
        egret.Tween.get(this.logo).to({ alpha: 0 }, 500);
        //游戏开始元素进场
        egret.Tween.get(this.startBtn).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.ruleBtn).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.godTalk).wait(1000).to({ alpha: 1 }, 500);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    //点击规则按钮
    p.onRuleBtnTouch = function () {
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().ruleUI);
        //this.ruleGroup.visible = true;
        //this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        //this.jiaohuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onJiaoHuoBtnTouch,this);
    };
    //点击关闭按钮
    p.onCloseBtnTouch = function () {
        //this.ruleGroup.visible = false;
        //this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtnTouch,this);
    };
    //点击叫货宝
    p.onJiaoHuoBtnTouch = function () {
        window.location.href = "http://www.dipo.pro";
    };
    //点击开始按钮
    p.onStartBtnTouch = function () {
        egret.Tween.removeAllTweens();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
