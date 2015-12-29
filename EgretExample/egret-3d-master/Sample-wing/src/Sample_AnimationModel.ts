class Sample_AnimationModel extends Sample_CreateSky {

    protected _xiaoQiao: egret3d.Mesh = null;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        egret3d.AssetsManager.getInstance().addLoadAnimModel("resource/xiaoqiao/", "xiaoqiao.esm",
            ["idle_1.eam", "run_1.eam", "attack_1.eam", "death_1.eam", "skill_1.eam", "skill_2.eam", "skill_3.eam", "skill_4.eam"]);

        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.onLoadComplete(e));

        egret3d.AssetsManager.getInstance().startLoad();

        this._cameraCtl.setEyesLength(600);

        super.onView3DInitComplete();
    }

    protected onKeyUp(keyCode:number): void {
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

                    var index: number = egret3d.KeyCode.Key_8 - keyCode;

                    var animList: string[] = this._xiaoQiao.animation.skeletonAnimationController.getAnimList();

                    if (index >= animList.length)
                        return;

                    this._xiaoQiao.animation.skeletonAnimationController.play(animList[index]);
                }
                break;
        }
    }

    protected onLoadComplete(e: egret3d.Event3D): void {

        this._xiaoQiao = egret3d.AssetsManager.getInstance().findAnimModel("resource/xiaoqiao/xiaoqiao.esm");

        this._xiaoQiao.y = -80;

        this._view3D.addChild3D(this._xiaoQiao);

        egret3d.Input.instance.addListenerKeyUp((keyCode: number) => this.onKeyUp(keyCode));
    }
}