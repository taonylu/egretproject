/**
 * 提交页面
 * @author
 *
 */
var SubmitScene = (function (_super) {
    __extends(SubmitScene, _super);
    function SubmitScene() {
        _super.call(this, "SubmitSceneSkin");
        this.textBgList = new Array();
    }
    var d = __define,c=SubmitScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.textBgList.push(this.textBg0, this.textBg1, this.textBg2);
        this.telLabel.prompt = "请填写手机号码";
    };
    p.onEnable = function () {
        this.setScoreLabel();
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.onSubmitBtnTouch = function () {
        this.submitScore();
    };
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    //显示用了多少时间开了多少红包
    p.setScoreLabel = function () {
        this.textBg0.visible = false;
        this.textBg1.visible = false;
        this.textBg2.visible = false;
        this.textBgList[NumberTool.getRandomInt(0, 2)].visible = true;
        var gameScene = GameManager.getInstance().gameScene;
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        GameConst.historyScore = (GameConst.historyScore > gameScene.score) ? GameConst.historyScore : gameScene.score;
        this.historyScoreLabel.text = GameConst.historyScore.toString();
    };
    //提交积分
    p.submitScore = function () {
        var http = SingleHttp.getInstance();
        http.completeHandler = this.completeHandler;
        http.errorHandler = this.errorHandler;
        var url = "" + window["url"];
        var score = "score=" + GameManager.getInstance().gameScene.score;
        var csrf = "&_csrf=" + window["_csrf"];
        var tel = "&tel=" + this.telLabel.text;
        var msg = score + csrf + tel;
        http.send(url, egret.HttpMethod.POST, msg, this);
    };
    //返回获奖列表
    p.completeHandler = function (data) {
        console.log("接收返回数据:" + data);
        GameConst.rankJson = JSON.parse(data);
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    };
    //获取获奖列表失败
    p.errorHandler = function () {
        alert("提交地址错误");
    };
    return SubmitScene;
})(BaseScene);
egret.registerClass(SubmitScene,'SubmitScene');
