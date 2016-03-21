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
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.btnGroup.visible = false;
        this.luckGroup.visible = false;
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.teamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.teamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeamBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
    };
    p.onTeamBtnTouch = function () {
        //TODO 组队比拼
    };
    p.onAgainBtnTouch = function () {
        //TODO 再玩一次
    };
    p.onRankBtnTouch = function () {
        //TODO 排行榜
    };
    //设置场景
    p.setSceneValue = function (time, score, grass) {
        this.setTimeLabel(time);
        this.setScoreLabel(score);
        this.setGrasslabel(grass);
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
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
