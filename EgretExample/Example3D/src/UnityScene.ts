class UnityScene extends egret.DisplayObject{
	/**画布*/
	private egret3DCanvas:egret3d.Egret3DCanvas;
	/**视口*/
	private view3D:egret3d.View3D;
	/**摄像机*/
	private camera:egret3d.Camera3D;
	/**方块*/
	private cube:egret3d.Mesh;

	public constructor() {
		super();
		//创建画布
		this.create3DCanvas();
		//创建3d视口
		this.createView3D();
		//创建方块
		this.createCube();
		//摄像机控制
		this.cameroController();
		//加载unity导出场景
		//this.loadScene();
		//加载unity导出角色
		//this.loadRole();
		//加载unity导出地形
		this.loadTerrain();
	}

	/**创建3d画布*/
	private create3DCanvas(){
		this.egret3DCanvas = new egret3d.Egret3DCanvas();
		this.egret3DCanvas.x = 0;
		this.egret3DCanvas.y = 0;
		this.egret3DCanvas.width = window.innerWidth;
		this.egret3DCanvas.height = window.innerHeight;
		this.egret3DCanvas.start();
	}

	/**创建3d视口*/
	private createView3D(){
		//var camera:egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.orthogonal);
		var camera:egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.perspective);
		this.view3D = new egret3d.View3D(0,0,window.innerWidth,innerHeight, camera);
		this.view3D.backColor = 0xffffff;
		this.view3D.camera3D.lookAt(new egret3d.Vector3D(0,500,-500), new egret3d.Vector3D(0,0,0));
		this.egret3DCanvas.addView3D(this.view3D);

		this.camera = this.view3D.camera3D;
	}

	/**创建方块*/
	private createCube(){
		var material:egret3d.ColorMaterial = new egret3d.ColorMaterial(0xff0000);
		var model:egret3d.CubeGeometry = new egret3d.CubeGeometry();
		this.cube = new egret3d.Mesh(model, material);
		this.view3D.addChild3D(this.cube);
	}

	/**摄像机控制 鼠标控制，镜头绕着某一物体旋转. 全景测试划过顶端和低端中心的时候，会顿一下
	 * LookAt和Hover区别
	 * Hover可对旋转角度和缓动速度控制
	*/
	//private ctl:egret3d.HoverController;
	private ctl:egret3d.LookAtController;

	private cameroController(){
		//Hover
		// this.ctl = new egret3d.HoverController(this.view3D.camera3D, this.cube);
		// this.ctl.distance = 1000;
		// this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.updateCamera,this);

		//LookAt
		this.ctl = new egret3d.LookAtController(this.view3D.camera3D, this.cube);
   		this.ctl.distance = 300;
		this.ctl.rotationX = 50;  //初始旋转角度
		this.ctl.rotationY = 120;
		this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.updateCamera,this);
	}

	private updateCamera(evt:egret3d.Event3D)
	{
		this.ctl.update();
	}

	// 用插件导出Scene 然后加载json配置文件
	// 加载一个场景的配置
	protected loadScene() {
		// 这是个特效组
		var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
		loader.load("resource/Example/MapConfig.json");
		loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneComplete, this);
	}
	// 场景加载完成
	protected onSceneComplete(e: egret3d.LoaderEvent3D) {
		var loader: egret3d.QueueLoader = e.target;
		var scene: egret3d.Scene3D = loader.getAsset("resource/Example/MapConfig.json");
		// 替换场景 中的scene
		// 并把原来主摄像机加载当前场景
		this.view3D.scene = scene;
		this.view3D.scene.addChild(this.view3D.camera3D);
		// 如果主摄像机在 scene 节点中 则不需要再添加为子节点  但是需要设置 view.camera3D 
	}

	private 
	/**加载角色*/
	private loadRole(){
		var queueLoader: egret3d.QueueLoader = new egret3d.QueueLoader();
		queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadRoleComplete, this);
		queueLoader.load("resource/Example/SkinnedModel/0_lingtong/MapConfig.json");
	}

	 protected onLoadRoleComplete(e: egret3d.LoaderEvent3D): void {
		var role: egret3d.Role = e.data;
		this.view3D.addChild3D(role);
		role.skeletonAnimation.play();
	}

	/**加载地形*/
	private loadTerrain(){
		var queueLoader: egret3d.QueueLoader = new egret3d.QueueLoader();
		queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTerrainComplete, this);
		queueLoader.load("resource/Example/MapConfig.json");
	}

	private onLoadTerrainComplete(e:egret3d.LoaderEvent3D){
		var terrain:egret3d.Scene3D = e.data;
		this.view3D.scene = terrain;
		this.view3D.scene.addChild(this.view3D.camera3D);

	}
}