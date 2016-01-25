/**
 *
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.initY = 0;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "HomeSceneSkin";
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.onComplete = function () {
    };
    p.createComplete = function () {
        var self = this;
        this.validateNow();
        console.log(this.title.width, this.title.x);
    };
    return HomeScene;
})(eui.Component);
egret.registerClass(HomeScene,'HomeScene');
