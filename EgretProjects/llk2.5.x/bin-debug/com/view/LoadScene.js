/**
*  功    能：加载场景
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
var LoadScene = (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        _super.call(this);
        this.skinName = "resource/myskins/LoadSceneSkin.exml";
    }
    var d = __define,c=LoadScene;p=c.prototype;
    p.setLoadLabel = function (str) {
        this.loadLabel.text = str;
    };
    return LoadScene;
})(BaseScene);
egret.registerClass(LoadScene,"LoadScene");
