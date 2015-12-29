/**
*  文 件 名：HomeScene.ts
*  功    能：开始页面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/11
*  修改日志：
*/
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = skins.scene.HomeSceneSkin;
    }
    var __egretProto__ = HomeScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.inputLabel.text = "";
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    __egretProto__.onRemove = function () {
        this.inputLabel.text = "";
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    __egretProto__.onStartBtnTouch = function () {
        console.log("click startBtn...");
        if (this.inputLabel.text != "") {
            var json = new LoginJSON();
            json.userID = this.inputLabel.text;
            ClientSocket.getInstance().send(json.getJSONString());
        }
    };
    return HomeScene;
})(BaseScene);
HomeScene.prototype.__class__ = "HomeScene";
