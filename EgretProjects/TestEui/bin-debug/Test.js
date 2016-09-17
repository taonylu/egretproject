/**
 *
 * @author
 *
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
        this.skinName = "TestSkin";
    }
    var d = __define,c=Test,p=c.prototype;
    p.childrenCreated = function () {
        egret.startTick(this.aa, this);
    };
    p.aa = function (delta) {
        console.log(delta);
        return true;
    };
    return Test;
}(eui.Component));
egret.registerClass(Test,'Test');
