var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnityScene = (function (_super) {
    __extends(UnityScene, _super);
    function UnityScene() {
        var _this = _super.call(this) || this;
        //创建画布
        _this.create3DCanvas();
        //创建3d视口
        _this.createView3D();
        //创建方块
        _this.createCube();
        //摄像机控制
        _this.cameroController();
        //加载unity导出场景
        //this.loadScene();
        //加载unity导出角色
        //this.loadRole();
        //加载unity导出地形
        _this.loadTerrain();
        return _this;
    }
    /**创建3d画布*/
    UnityScene.prototype.create3DCanvas = function () {
        this.egret3DCanvas = new egret3d.Egret3DCanvas();
        this.egret3DCanvas.x = 0;
        this.egret3DCanvas.y = 0;
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.egret3DCanvas.start();
    };
    /**创建3d视口*/
    UnityScene.prototype.createView3D = function () {
        //var camera:egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.orthogonal);
        var camera = new egret3d.Camera3D(egret3d.CameraType.perspective);
        this.view3D = new egret3d.View3D(0, 0, window.innerWidth, innerHeight, camera);
        this.view3D.backColor = 0xffffff;
        this.view3D.camera3D.lookAt(new egret3d.Vector3D(0, 500, -500), new egret3d.Vector3D(0, 0, 0));
        this.egret3DCanvas.addView3D(this.view3D);
        this.camera = this.view3D.camera3D;
    };
    /**创建方块*/
    UnityScene.prototype.createCube = function () {
        var material = new egret3d.ColorMaterial(0xff0000);
        var model = new egret3d.CubeGeometry();
        this.cube = new egret3d.Mesh(model, material);
        this.view3D.addChild3D(this.cube);
    };
    UnityScene.prototype.cameroController = function () {
        //Hover
        // this.ctl = new egret3d.HoverController(this.view3D.camera3D, this.cube);
        // this.ctl.distance = 1000;
        // this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.updateCamera,this);
        //LookAt
        this.ctl = new egret3d.LookAtController(this.view3D.camera3D, this.cube);
        this.ctl.distance = 300;
        this.ctl.rotationX = 50; //初始旋转角度
        this.ctl.rotationY = 120;
        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.updateCamera, this);
    };
    UnityScene.prototype.updateCamera = function (evt) {
        this.ctl.update();
    };
    // 用插件导出Scene 然后加载json配置文件
    // 加载一个场景的配置
    UnityScene.prototype.loadScene = function () {
        // 这是个特效组
        var loader = new egret3d.QueueLoader();
        loader.load("resource/Example/MapConfig.json");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneComplete, this);
    };
    // 场景加载完成
    UnityScene.prototype.onSceneComplete = function (e) {
        var loader = e.target;
        var scene = loader.getAsset("resource/Example/MapConfig.json");
        // 替换场景 中的scene
        // 并把原来主摄像机加载当前场景
        this.view3D.scene = scene;
        this.view3D.scene.addChild(this.view3D.camera3D);
        // 如果主摄像机在 scene 节点中 则不需要再添加为子节点  但是需要设置 view.camera3D 
    };
    /**加载角色*/
    UnityScene.prototype.loadRole = function () {
        var queueLoader = new egret3d.QueueLoader();
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadRoleComplete, this);
        queueLoader.load("resource/Example/SkinnedModel/0_lingtong/MapConfig.json");
    };
    UnityScene.prototype.onLoadRoleComplete = function (e) {
        var role = e.data;
        this.view3D.addChild3D(role);
        role.skeletonAnimation.play();
    };
    /**加载地形*/
    UnityScene.prototype.loadTerrain = function () {
        var queueLoader = new egret3d.QueueLoader();
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTerrainComplete, this);
        queueLoader.load("resource/Example/MapConfig.json");
    };
    UnityScene.prototype.onLoadTerrainComplete = function (e) {
        var terrain = e.data;
        this.view3D.scene = terrain;
        this.view3D.scene.addChild(this.view3D.camera3D);
    };
    return UnityScene;
}(egret.DisplayObject));
__reflect(UnityScene.prototype, "UnityScene");
