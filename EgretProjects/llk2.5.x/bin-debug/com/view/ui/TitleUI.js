/**
*  功    能：顶部标题UI
*  内    容： 鱼、星星数量和标题
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
var TitleUI = (function (_super) {
    __extends(TitleUI, _super);
    function TitleUI() {
        _super.call(this);
        this.skinName = "resource/myskins/TitleUISkin.exml";
        this.horizontalCenter = 0;
    }
    var d = __define,c=TitleUI;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.setTitle = function (title) {
        this.tempTitle = title;
        if (this.inited) {
            this.titleLabel.text = this.tempTitle;
        }
    };
    return TitleUI;
})(BaseUI);
egret.registerClass(TitleUI,"TitleUI");
