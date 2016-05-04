/**
 * 过渡场景
 * @author
 *
 */
var TransitionScene = (function (_super) {
    __extends(TransitionScene, _super);
    function TransitionScene() {
        _super.call(this, "TransitionSceneSkin");
    }
    var d = __define,c=TransitionScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        window["changeBgColor"](GameConst.color7);
        this.setStageLabel();
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
        egret.Tween.get(this).wait(2000).call(function () {
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        });
    };
    return TransitionScene;
}(BaseScene));
egret.registerClass(TransitionScene,'TransitionScene');
