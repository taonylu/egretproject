class Sample_LoadScene extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {
        egret3d.AssetsManager.getInstance().addLoadScene("resource/scene");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.onLoadComplete(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    protected onLoadComplete(e: egret3d.Event3D): void {

        var meshList: egret3d.Mesh[] = egret3d.AssetsManager.getInstance().findScene("resource/scene");

        var container: egret3d.Object3D = new egret3d.Object3D();

        for (var i: number = 0; i < meshList.length; i++) {
            container.addChild(meshList[i]);
        }

        this._view3D.addChild3D(container);
    }
}