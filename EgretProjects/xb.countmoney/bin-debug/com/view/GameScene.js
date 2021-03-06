/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.totalPacket = 0; //当前红包总数
        this.timeLimit = 10; //时间限制
        this.resultUI = new ResultUI(); //结果UI
        this.countDownUI = new CountDownUI(); //倒计时UI
        this.bFirstGame = true; //是否首次游戏，第一次游戏会有杂物，第二次则不出现杂物
        this.isDrag = false; //是否拖拽状态
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
        this.initFallPacket();
        this.initCountPacket();
    };
    p.onEnable = function () {
        this.playArrowAnim();
        this.startGame();
    };
    p.onRemove = function () {
        egret.Tween.removeTweens(this.arrow);
    };
    p.startGame = function () {
        //重置游戏
        this.resetGame();
        //每次游戏前查看我获得奖品数量，用来确定游戏结束后，我是否能进入拆红包页面
        this.sendMyPrizeRequest();
        if (this.bFirstGame) {
            this.bFirstGame = false;
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFirstGameTouchBegin, this);
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onFirstGameTouchEnd, this);
        }
        else {
            this.countDownUI.show();
            this.countDownUI.addEventListener("countComplete", this.countComplete, this);
        }
    };
    p.resetGame = function () {
        //重置下落的红包位置
        this.resetAllPacketMoney();
        //重置飞出红包
        this.resetCountPacket();
        //重置时间
        this.setTimeLabel(this.timeLimit.toString());
        //重置红包总数
        this.totalPacket = 0;
        this.setPacketLabel(this.totalPacket.toString());
    };
    p.gameOver = function () {
        //停止计时器
        this.stopTimer();
        //移除监听
        this.staticPacket.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        //显示结果面板
        this.resultUI.showInScene(this, this.totalPacket);
    };
    //倒计时结束
    p.countComplete = function () {
        this.addEventListener(egret.TouchEvent.ENTER_FRAME, this.onFallPacket, this);
        this.staticPacket.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.startTimer();
    };
    //初始化界面元素
    p.initView = function () {
        this.staticPacket.y = GameConst.stage.stageHeight - 520;
        //箭头位置
        this.initArrowY = this.staticPacket.y - 150;
        this.arrow.y = this.initArrowY;
    };
    //播放箭头动画
    p.playArrowAnim = function () {
        this.arrow.y = this.initArrowY;
        egret.Tween.get(this.arrow, { loop: true }).to({ y: this.initArrowY - 20 }, 500).to({ y: this.initArrowY }, 500);
    };
    //第一次游戏滑动屏幕，触摸开始
    p.onFirstGameTouchBegin = function (e) {
        this.beginY = e.stageY;
    };
    //第一次游戏滑动屏幕，触摸结束
    p.onFirstGameTouchEnd = function (e) {
        if (GameManager.getInstance().ruleUI.parent) {
            return;
        }
        if (this.beginY - e.stageY > 50) {
            //移除监听
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFirstGameTouchBegin, this);
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onFirstGameTouchEnd, this);
            //杂物退散
            var self = this;
            egret.Tween.get(this.item_paper0).to({ x: -300 }, 500);
            egret.Tween.get(this.item_paper1).to({ x: 800 }, 500);
            egret.Tween.get(this.item_p0).to({ x: -300 }, 500);
            egret.Tween.get(this.item_p1).to({ x: 800 }, 500);
            egret.Tween.get(this.item_p2).to({ x: 900 }, 700).call(function () {
                self.startGame();
            }, this);
        }
    };
    p.onTouchBegin = function (e) {
        if (this.curDragPacket) {
            return;
        }
        this.beginY = e.stageY;
        this.isDrag = true;
        this.curDragPacket = this.countPacketList.pop();
        this.curDragPacket.x = this.staticPacket.x;
        this.curDragPacket.y = this.staticPacket.y;
        this.countGroup.addChild(this.curDragPacket);
    };
    p.onTouchMove = function (e) {
        if (this.isDrag && this.curDragPacket) {
            this.curDragPacket.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    };
    p.onTouchEnd = function (e) {
        //滑动距离超过50，则将红包飞出
        if (this.isDrag && this.curDragPacket && (this.staticPacket.y - this.curDragPacket.y > 50)) {
            //播放音效
            window["playCountSnd"]();
            //根据距离计算滑动时间       当前所需时间=  当前位置/起始位置*起始位置到终点时间 
            var time = (this.curDragPacket.y / this.staticPacket.y) * 500;
            var tempMoney = this.curDragPacket;
            this.curDragPacket = null;
            var self = this;
            egret.Tween.get(tempMoney).to({ y: -tempMoney.height }, time).call(function () {
                self.countPacketList.push(tempMoney);
            });
            //计算红包
            this.totalPacket++;
            this.setPacketLabel(this.totalPacket.toString());
        }
        else if (this.curDragPacket) {
            this.curDragPacket.y = -this.curDragPacket.height;
            this.countPacketList.push(this.curDragPacket);
            this.curDragPacket = null;
        }
        //重置拖拽状态
        this.isDrag = false;
    };
    //初始化数红包数组
    p.initCountPacket = function () {
        this.countPacketList = new Array();
        var bm;
        for (var i = 0; i < 15; i++) {
            bm = new egret.Bitmap(RES.getRes("game_packet_png"));
            this.countPacketList.push(bm);
        }
    };
    //重置飞出红包
    p.resetCountPacket = function () {
        //拖拽的红包
        if (this.curDragPacket) {
            this.curDragPacket.y = -this.curDragPacket.height;
            this.countPacketList.push(this.curDragPacket);
            this.curDragPacket = null;
        }
        //重置所有红包位置
        var len = this.countPacketList.length;
        var bm;
        for (var i = 0; i < len; i++) {
            bm = this.countPacketList[i];
            bm.y = -bm.height;
        }
    };
    //初始化下落的红包
    p.initFallPacket = function () {
        this.fallPacketList = new Array();
        var bm;
        for (var i = 0; i < 3; i++) {
            bm = new egret.Bitmap(RES.getRes("game_fall_png"));
            bm.anchorOffsetX = bm.width / 2;
            bm.anchorOffsetY = bm.height / 2;
            this.fallPacketList.push(bm);
            this.resetFallPacketPos(bm);
            this.fallPacketGroup.addChild(bm);
        }
        this.fallEdge = GameConst.stage.stageHeight + bm.height;
    };
    //下落红包处理函数
    p.onFallPacket = function () {
        var len = this.fallPacketList.length;
        var bm;
        for (var i = 0; i < len; i++) {
            bm = this.fallPacketList[i];
            bm.rotation += 10; //下落红包旋转和位置
            bm.y += 20;
            if (bm.y >= this.fallEdge) {
                this.resetFallPacketPos(bm);
            }
        }
    };
    //重置下落红包位置
    p.resetFallPacketPos = function (bm) {
        bm.y = -bm.height - Math.random() * 1000; //随机红包位置，舞台以上红包高度+600位置内随机
        bm.x = Math.random() * 640; //640舞台宽度
    };
    //重置所有下落的红包位置
    p.resetAllPacketMoney = function () {
        var len = this.fallPacketList.length;
        for (var i = 0; i < len; i++) {
            this.resetFallPacketPos(this.fallPacketList[i]);
        }
    };
    p.setPacketLabel = function (str) {
        this.packetLabel.text = str;
    };
    p.setTimeLabel = function (str) {
        this.timeLabel.text = str + " s";
    };
    p.startTimer = function () {
        if (this.gameTimer == null) {
            this.gameTimer = new egret.Timer(800); //计时为800ms减1
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimer = function () {
        var time = this.timeLimit - this.gameTimer.currentCount;
        this.setTimeLabel(time.toString());
        if (time <= 0) {
            this.gameOver();
        }
    };
    p.stopTimer = function () {
        if (this.gameTimer != null) {
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        }
    };
    //----------------------------------[查看我获得的奖品数量]-------------------------
    //发送查看我的奖品请求，查看我到底拆了多少次红包
    p.sendMyPrizeRequest = function () {
        var http = SingleHttp.getInstance();
        http.completeHandler = this.revMyPrize;
        http.errorHandler = this.onMyPrizeError;
        var url = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/prizeList";
        var msg = "";
        http.send(url, egret.HttpMethod.GET, msg, this);
    };
    //接收我的奖品请求结果
    p.revMyPrize = function (result) {
        var json = JSON.parse(result);
        var myPrizeNum = 0;
        for (var item in json) {
            myPrizeNum++;
        }
        GameConst.myPrizeNum = myPrizeNum;
    };
    //我的奖品请求错误
    p.onMyPrizeError = function (e) {
        console.log("请求错误");
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
