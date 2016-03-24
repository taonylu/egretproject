/**
 * 游戏结果场景
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
        this.gridList = new Array(); //抽奖格子列表
        this.gridNum = 8; //格子数量
        this.timer = new egret.Timer(200); //抽奖格子滚动速度
        this.code = new QRCode(); //二维码图片
        this.http = new HttpUtil();
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < this.gridNum; i++) {
            this.gridList.push(this["grid" + i]);
        }
        this.code.createCode();
    };
    p.onEnable = function () {
        this.scoreGroup.visible = true;
        this.btnGroup.visible = false;
        this.luckGroup.visible = false;
        this.configListeners();
        this.reset();
    };
    p.onRemove = function () {
        this.deConfigListeners();
        //隐藏二维码
        this.code.hideCode();
    };
    p.configListeners = function () {
        this.teamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLuckBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.teamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLuckBtnTouch, this);
    };
    p.onTeamBtnTouch = function () {
        this.addChild(GameManager.getInstance().sharePanel);
    };
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    };
    p.onRankBtnTouch = function () {
        GameManager.getInstance().homeScene.sendRankRequest();
    };
    p.onLuckBtnTouch = function () {
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLuckBtnTouch, this);
        this.sendLuckRequest();
    };
    //设置场景
    p.setSceneValue = function (time, score, grass) {
        this.setTimeLabel(time);
        this.setScoreLabel(score);
        this.setGrasslabel(grass);
        var luckTime = egret.localStorage.getItem("lkl_luckTime");
        if (luckTime == "true") {
            this.btnGroup.visible = true;
            this.showCode();
        }
        else {
            this.luckGroup.visible = true;
        }
    };
    p.setTimeLabel = function (time) {
        this.timeLabel.text = time + "s";
    };
    p.setScoreLabel = function (score) {
        this.scoreLabel.text = score + "";
        this.totalScoreLabel.text = score + "";
    };
    p.setGrasslabel = function (grass) {
        this.grassLabel.text = grass + "";
    };
    //重置界面
    p.reset = function () {
        //重置翻拍
        var len = this.gridList.length;
        for (var i = 0; i < len; i++) {
            var grid = this.gridList[i];
            grid.showBack();
        }
    };
    //发送抽奖
    p.sendLuckRequest = function () {
        egret.log("sendLuck");
        if (GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "aa",
                data: { prizeName: "幸运奖", prizeIndex: 5, winMark: "N" }
            };
            this.revLuck(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revLuck;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = "http://wx.mcw9.com/ricolazt/lottery";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revLuck = function (res) {
        egret.log("revLuck:", res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code; //200成功
        var msg = json.msg; //描述消息
        var data = json.data;
        //
        if (status == true && code == 200) {
            this.prizeName = data.prizeName;
            this.winMark = data.winMark;
            this.startPlayLuck(data);
        }
        else {
            alert(msg);
            this.luckGroup.visible = false;
            this.btnGroup.visible = true;
            this.showCode();
        }
        //本地缓存抽奖
        egret.localStorage.setItem("lkl_luckTime", "true");
    };
    p.startPlayLuck = function (data) {
        this.timeLimit = this.gridNum + data.prizeIndex;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.reset();
        this.timer.start();
        this.gridList[0].showLight();
    };
    p.onTimer = function () {
        //显示抽奖格子
        var count = this.timer.currentCount % this.gridNum;
        if (count == 0) {
            this.gridList[this.gridNum - 1].showBack();
        }
        else {
            this.gridList[count - 1].showBack();
        }
        this.gridList[count].showLight();
        //时间结束
        if (this.timeLimit == this.timer.currentCount) {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.gridList[0].showLuck();
            this.gridList[1].showThx();
            this.gridList[2].showBigLuck();
            this.gridList[3].showThx();
            this.gridList[4].showLuck();
            this.gridList[5].showThx();
            this.gridList[6].showLuck();
            this.gridList[7].showThx();
            this.gridList[count].showLight();
            var self = this;
            egret.Tween.get(this).wait(3000).call(function () {
                self.luckComplete();
            }, this);
        }
    };
    //抽奖结束
    p.luckComplete = function () {
        //获奖
        if (this.winMark == "Y") {
            this.luckGroup.visible = false;
            var luckForm = GameManager.getInstance().luckForm;
            this.addChild(luckForm);
            luckForm.setView(this.prizeName);
        }
        else {
            this.luckGroup.visible = false;
            this.btnGroup.visible = true;
            this.showCode();
        }
    };
    //显示二维码
    p.showCode = function () {
        this.code.showCode();
        this.code.setPosition(this.codeGroup.x, this.codeGroup.y);
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
