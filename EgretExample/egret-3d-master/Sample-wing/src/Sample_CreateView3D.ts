class Sample_CreateView3D {

    protected _time: number = 0;
    protected _delay: number = 0;
    protected _timeDate: Date = null;
    protected _view3D: egret3d.View3D = null;
    protected _viewPort: egret3d.Rectangle = null;
    protected _cameraCtl: egret3d.LookAtController = null;

    public constructor(width: number = 800, height: number = 600) {

        this._viewPort = new egret3d.Rectangle(0, 0, width, height);

        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, this._viewPort, () => this.onInit3D());
    }

    protected onInit3D(): void {

        //创建View3D对象;
        this._view3D = new egret3d.View3D(this._viewPort);

        //创建像机控制器;
        this._cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());

        //设置像机视野距离;
        this._cameraCtl.setEyesLength(0.1);

        //View3D初始化完成;
        this.onView3DInitComplete();

        this._time = new Date().getTime();

        requestAnimationFrame(() => this.onUpdate());
    }

    protected onView3DInitComplete(): void {
    }
    
    protected onUpdate(): void {

        this._timeDate = new Date();

        this._delay = this._timeDate.getTime() - this._time;

        this._time = this._timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this._time, this._delay);

        requestAnimationFrame(() => this.onUpdate());
    }
}