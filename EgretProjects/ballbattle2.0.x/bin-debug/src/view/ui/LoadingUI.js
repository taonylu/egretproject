/**
*  文 件 名：LoadingUI.ts
*  功    能: 加载时的遮罩，半透明黑色背景+圆形循环播放的进度条
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.graphics.beginFill(0x000000, 0.2);
        this.graphics.drawRect(0, 0, GameConst.StageWidth, GameConst.StageHeight);
        this.graphics.endFill();
        this.loadingMC = MCFactory.getOne("loadingmc2_json", "loadingmc2_png", "loadingmc2");
        this.loadingMC.x = this.width / 2 - this.loadingMC.width * 1.5;
        this.loadingMC.y = this.height / 2 - this.loadingMC.height * 1.5;
        this.addChild(this.loadingMC);
        this.touchEnabled = false;
    }
    var __egretProto__ = LoadingUI.prototype;
    __egretProto__.show = function () {
        LayerManager.getInstance().stage.addChild(this);
        this.loadingMC && this.loadingMC.gotoAndPlay(1, -1);
    };
    __egretProto__.hide = function () {
        if (this.parent) {
            LayerManager.getInstance().stage.removeChild(this);
            this.loadingMC.stop();
        }
    };
    return LoadingUI;
})(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
