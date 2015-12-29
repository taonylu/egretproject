class Sample_MousePick extends Sample_CreateSky{

    protected _boxs: egret3d.Mesh[] = [null, null];
    protected _currentSelected: egret3d.Mesh = null;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        var directLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(100, 100, 100));
        directLight.diffuse = 0xffffff;
        lightGroup.addDirectLight(directLight);

        this._boxs[0] = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());
        this._boxs[0].x = -80;
        this._boxs[0].mouseEnable = true;
        this._boxs[0].addEventListener(egret3d.Event3D.MOUSE_CLICK, (e: egret3d.Event3D) => this.onMouseClick(e));
        this._boxs[0].material.lightGroup = lightGroup;
        this._view3D.addChild3D(this._boxs[0]);

        this._boxs[1] = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());
        this._boxs[1].x = 80;
        this._boxs[1].mouseEnable = true;
        this._boxs[1].addEventListener(egret3d.Event3D.MOUSE_CLICK, (e: egret3d.Event3D) => this.onMouseClick(e));
        this._boxs[1].material.lightGroup = lightGroup;
        this._view3D.addChild3D(this._boxs[1]);

        

        this._cameraCtl.setEyesLength(1000);

        super.onView3DInitComplete();
    }

    protected onMouseClick(e: egret3d.Event3D): void {
        this._currentSelected = e.currentTarget;
    }

    protected onUpdate(): void {

        if (this._currentSelected != null) {
            this._currentSelected.rotationY += this._delay / 4.0;
        }

        super.onUpdate();
    }
}