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
        this.playAnim();
    };
    p.onRemove = function () {
    };
    //视图初始化
    p.initView = function () {
        //初始柜子
        this.initGuizi0X = this.guizi0.x;
        this.initGuizi1X = this.guizi1.x;
        this.initGuizi2X = this.guizi2.x;
        var stageWidth = GameConst.stage.stageWidth;
        this.guizi0.x = stageWidth;
        this.guizi1.x = stageWidth;
        this.guizi2.x = stageWidth;
        this.man0.x = stageWidth;
    };
    //开始播放动画
    p.playAnim = function () {
        //钟上移
        egret.Tween.get(this.clockGroup).to({ y: 30 }, 500);
        //柜子出来
        egret.Tween.get(this.guizi0).wait(200).to({ x: this.initGuizi0X }, 500);
        egret.Tween.get(this.guizi1).wait(300).to({ x: this.initGuizi1X }, 500);
        egret.Tween.get(this.guizi2).wait(400).to({ x: this.initGuizi2X }, 500);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
