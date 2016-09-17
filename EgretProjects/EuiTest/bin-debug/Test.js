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
        this.tab.dataProvider = this.stak;
    };
    return Test;
}(eui.Component));
egret.registerClass(Test,'Test');
