var Sample_AnimationModel = (function (_super) {
    __extends(Sample_AnimationModel, _super);
    function Sample_AnimationModel() {
        _super.call(this);
        this._xiaoQiao = null;
    }
    var d = __define,c=Sample_AnimationModel;p=c.prototype;
    p.onView3DInitComplete = function () {
        var _this = this;
        egret3d.AssetsManager.getInstance().addLoadAnimModel("resource/xiaoqiao/", "xiaoqiao.esm", ["idle_1.eam", "run_1.eam", "attack_1.eam", "death_1.eam", "skill_1.eam", "skill_2.eam", "skill_3.eam", "skill_4.eam"]);
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.onLoadComplete(e); });
        egret3d.AssetsManager.getInstance().startLoad();
        this._cameraCtl.setEyesLength(600);
        _super.prototype.onView3DInitComplete.call(this);
    };
    p.onKeyUp = function (keyCode) {
        switch (keyCode) {
            case egret3d.KeyCode.Key_1:
            case egret3d.KeyCode.Key_2:
            case egret3d.KeyCode.Key_3:
            case egret3d.KeyCode.Key_4:
            case egret3d.KeyCode.Key_5:
            case egret3d.KeyCode.Key_6:
            case egret3d.KeyCode.Key_7:
            case egret3d.KeyCode.Key_8:
                if (this._xiaoQiao != null) {
                    var index = egret3d.KeyCode.Key_8 - keyCode;
                    var animList = this._xiaoQiao.animation.skeletonAnimationController.getAnimList();
                    if (index >= animList.length)
                        return;
                    this._xiaoQiao.animation.skeletonAnimationController.play(animList[index]);
                }
                break;
        }
    };
    p.onLoadComplete = function (e) {
        var _this = this;
        this._xiaoQiao = egret3d.AssetsManager.getInstance().findAnimModel("resource/xiaoqiao/xiaoqiao.esm");
        this._xiaoQiao.y = -80;
        this._view3D.addChild3D(this._xiaoQiao);
        egret3d.Input.instance.addListenerKeyUp(function (keyCode) { return _this.onKeyUp(keyCode); });
    };
    return Sample_AnimationModel;
})(Sample_CreateSky);
egret.registerClass(Sample_AnimationModel,"Sample_AnimationModel");
