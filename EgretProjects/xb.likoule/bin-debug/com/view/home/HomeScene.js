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
        this.invitFailLabel.text = GameConst.config.invitFail;
    };
    p.onEnable = function () {
        //隐藏
        this.acceptGroup.visible = false;
        this.invitFailGroup.visible = false;
        this.beginGroup.visible = false;
        this.rankGroup.visible = true;
        //TODO 根据获取的变量显示Group
        this.beginGroup.visible = true;
        this.configListeners();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function (e) {
        switch (e.target) {
            case this.acceptBtn:
                break;
            case this.ruleBtn: //游戏规则
            case this.ruleBtn2:
                this.addChild(GameManager.getInstance().rulePanel);
                break;
            case this.closeBtn:
                break;
            case this.beginBtn:
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
                break;
            case this.teamBtn:
                //TODO 判断显示组队按钮
                this.addChild(GameManager.getInstance().teamForm);
                break;
            case this.rankBtn:
                this.addChild(GameManager.getInstance().rankPanle);
                break;
            case this.prizeBtn:
                this.addChild(GameManager.getInstance().prizePanel);
                break;
        }
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
