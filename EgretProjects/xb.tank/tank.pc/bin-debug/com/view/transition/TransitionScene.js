/**
 * 过渡场景
 * @author
 *
 */
var TransitionScene = (function (_super) {
    __extends(TransitionScene, _super);
    function TransitionScene() {
        _super.call(this, "TransitionSceneSkin");
        this.countDownTime = 3000; //倒计时
    }
    var d = __define,c=TransitionScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.countDownTime = GameConst.gameConfig.transitionCountDown * 1000;
    };
    p.onEnable = function () {
        window["changeBgColor"](GameConst.color7);
        this.setStageLabel();
    };
    p.reset = function () {
        egret.Tween.removeTweens(this);
    };
    //设置第几关
    p.setStageLabel = function () {
        this.stageLabel.text = "STAGE  " + MapManager.getInstance().curLevel;
        //无尽模式说明
        if (MapManager.getInstance().levelLimit == MapManager.getInstance().curLevel) {
            this.endLessGroup.visible = true;
        }
        else {
            this.endLessGroup.visible = false;
        }
        //等待一段时间，进入游戏
        egret.Tween.get(this).wait(this.countDownTime).call(function () {
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        });
    };
    return TransitionScene;
}(BaseScene));
egret.registerClass(TransitionScene,'TransitionScene');
