/**
 * 主类 
 * 测试Egret3D
 */
class Main extends egret.DisplayObject{
	/**画布*/
	private egret3DCanvas:egret3d.Egret3DCanvas;
	/**视口*/
	private view3D:egret3d.View3D;
	/**摄像机*/
	private camera:egret3d.Camera3D;
	/**方块*/
	private cube:egret3d.Mesh;
	/**地板*/
	private plane:egret3d.Mesh;
	/**贴图方块*/
	private textureCube:egret3d.Mesh;
	/**灯光组*/
	private lights:egret3d.LightGroup;

	public constructor() {
		super();

		//隐藏div图标
		let loadingMap = document.getElementById('loadingCon');
		loadingMap.hidden = true;

		//测试Unity插件导出
		new UnityScene();
		return;

		
		//创建3d画布
		this.create3DCanvas();
		//创建视口
		this.createView3D();
		//创建方块
		this.createCube();
		//创建地板
		this.createPanel();
		//自定义三角面
		this.createTriangle();
		//贴图材质
		this.createTextureCube();
		//键盘控制
		//this.keyControl();
		//创建灯光
		this.createLight();
		//加载测试 人物模型、骨骼动画
		this.loadTest();
		//声音测试
		this.soundTest();
		//Object3D测试
		this.object3DTest();
		//创建公告板
		this.createBillboard();
		//天空盒
		this.loaderSkyBox();
		//摄像机控制
		this.cameroController();
		//加载地形
		//this.loaderTerrain();
		//创建线框
		this.createWireframeForGeometry();
		//碰撞
		this.colliose();
		//粒子
		this.createParticle();
		//自定义粒子效果
		this.createComParticle();
		//GUI
		this.createGUI();

		console.log("Hello egret3D");
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

	/**创建地板*/
	private createPanel(){;
		var material:egret3d.ColorMaterial = new egret3d.ColorMaterial(0x00ff00);
		var model:egret3d.PlaneGeometry = new egret3d.PlaneGeometry();
		this.plane = new egret3d.Mesh(model, material);
		this.view3D.addChild3D(this.plane); 
	}

	/**自定义数据构造一个三角面片*/
	private createTriangle() {
		var geom: egret3d.Geometry = egret3d.GeometryUtil.createGeometry();
		var vb: number[] = [];
		var ib: number[] = [];
		// 0 1 2 坐标 3 4 5 6 颜色 7 8 uv
		vb.push(-50, -50, 0, 1, 0, 0, 1);
		vb.push(0, 50, 0, 0, 1, 0, 1);
		vb.push(50, -50, 0, 0, 0, 1, 1);
		// 加入3个顶点       
		// 设置顶点索引  3个索引  1个3角形面
		ib.push(0, 1, 2);
		// 把数据填充进Geometry
		geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR, vb, 3);
		geom.setVertexIndices(0, ib);
		// 使用Geometry 创建Mesh
		var mesh: egret3d.Mesh = new egret3d.Mesh(geom, new egret3d.ColorMaterial(0xffffff));
		// 设置双面渲染
		mesh.material.bothside = true;
		this.view3D.addChild3D(mesh);
		mesh.x = -200;
	}

	/**创建贴图材质方块*/
	private createTextureCube(){
		var material:egret3d.TextureMaterial = new egret3d.TextureMaterial();
		var model:egret3d.CubeGeometry = new egret3d.CubeGeometry();
		this.textureCube = new egret3d.Mesh(model, material);
		this.textureCube.x = 100;
		this.view3D.addChild3D(this.textureCube);
	}

	/**键盘按下值*/
	private key:number = -1;

	/**键盘控制 */
	private keyControl(){
		this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.onUpdate, this);
		egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
		egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_UP, this.onKeyUp, this);
	}

	/**键盘弹起*/
	private onKeyUp(e:egret3d.KeyEvent3D){
		this.key = -1;
	}

	/**键盘按下*/
	private onKeyDown(e:egret3d.KeyEvent3D){
		this.key = e.keyCode;
	}

	/**每帧执行*/
	private onUpdate(e:egret3d.Event3D){
		switch(this.key){
			case egret3d.KeyCode.Key_A:
				this.camera.x -= 1;
			break;
			case egret3d.KeyCode.Key_D:
				this.camera.x += 1;
			break;
			case egret3d.KeyCode.Key_W:
				this.camera.y += 1;
			break;
			case egret3d.KeyCode.Key_S:
				this.camera.y -= 1;
			break;
			case egret3d.KeyCode.Key_Q:
				this.camera.z += 1;
			break;
			case egret3d.KeyCode.Key_E:
				this.camera.z -= 1;
			break;
		}
	}

	/**创建灯光*/
	private createLight(){
		var light:egret3d.DirectLight = new egret3d.DirectLight();
		light.dir = new egret3d.Vector3D(-0.5,-0.5,1);
		light.diffuse = 0xff0000;
		this.lights = new egret3d.LightGroup();
		this.lights.addLight(light);

		this.cube.material.lightGroup = this.lights;
		this.plane.material.lightGroup = this.lights;
		this.textureCube.lightGroup = this.lights;
	}

	/**加载测试*/
	private loadTest(){
		var queueLoader:egret3d.QueueLoader = new egret3d.QueueLoader();
		queueLoader.load("resource/LingTong/Bonezero.esm");  //模型
		queueLoader.load("resource/LingTong/hero_12.png");   //贴图
		queueLoader.load("resource/LingTong/Idle.eam");      //骨骼动画
		queueLoader.load("resource/LingTong/Run.eam");       //骨骼动画
		queueLoader.load("resource/LingTong/Attack1.eam");   //骨骼动画
		queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadComplete, this);
	}

	/**加载完成*/
	private onLoadComplete(e:egret3d.LoaderEvent3D){
		var queueLoader:egret3d.QueueLoader = e.target;
		//获取模型
		var model:egret3d.Geometry = queueLoader.getAsset("resource/LingTong/Bonezero.esm");
		//获取贴图
		var texture:egret3d.TextureMaterial = new egret3d.TextureMaterial();
		texture.diffuseTexture = queueLoader.getAsset("resource/LingTong/hero_12.png");
		//获取动画
		var idle:egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/LingTong/Idle.eam");
		idle.animationName = "idle";
		var run:egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/LingTong/Run.eam");
		run.animationName = "run";
		var attack:egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/LingTong/Attack1.eam");
		attack.animationName = "attack";
		//创建网格
		var player:egret3d.Mesh = new egret3d.Mesh(model, texture);
		player.animation.skeletonAnimationController.addSkeletonAnimationClip(idle);
		player.animation.skeletonAnimationController.addSkeletonAnimationClip(run);
		player.animation.skeletonAnimationController.addSkeletonAnimationClip(attack);

		player.animation.play("run");
		player.y = 100;
		this.view3D.addChild3D(player);

		//pick事件
		this.cube.enablePick = true;
		this.cube.addEventListener(egret3d.PickEvent3D.PICK_CLICK, this.onPick, this);

		//touch事件
		egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, this.onTouchStart, this);

		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	/**pick事件
	 * TouchEvent3D和PickEvent3D区别。
	 * 1. pick电脑和手机都能触发。touch只能手机触摸。
	 * 2. pick能获取3d物体更多详细信息。
	 * 3. pick必须单体监听，这个单体必须enablePick=true。不能监听到egret3d.Input.
	 *    touch可以用input监听。
	*/
	private onPick(e:egret3d.PickEvent3D){
		console.log("pick");
		console.log("pick faceIndex:", e.pickResult.faceIndex);
		console.log("pick globalPosition:", e.pickResult.globalPosition);
		var target:egret3d.Mesh = e.target;
		target.material.diffuseColor = 0x0000ff;
	}

	/**
	 * 触摸
	 * 1. 触摸可以摸到多个物体。原理是射线穿透物体？
	 */
	private onTouchStart(e:egret3d.TouchEvent3D){
		console.log("touch");
		console.log("touch target:", e.target);
		console.log("touch target clientX:", e.targetTouches[0].clientX);
	}

	/**2d触摸*/
	private onTouchMove(e:egret.TouchEvent){
		//console.log("touch move");
		//this.view3D.camera3D.rotation.y += 1;
	}

	/**声音测试*/
	private soundTest(){
		egret3d.AudioManager.instance.createSound("resource/bgm.mp3", this.loadSoundSuccess);
	}

	/**加载声音完成*/
	private loadSoundSuccess(e){
		var audioManager:egret3d.AudioManager = egret3d.AudioManager.instance;
		//var channel:egret3d.Channel = audioManager.playSound(e,{volume:0.5, loop:true});
		//var channel3D:egret3d.Channel3d = audioManager.playSound3d(e, new egret3d.Vector3D(0,0,0), {volume:0.5, loop:true});
		//channel.pause();
		//channel.stop();
	}

	/**object3D测试*/
	private object3DTest(){
		var objA:egret3d.Object3D = new egret3d.Object3D();
		var objB:egret3d.Object3D = new egret3d.Object3D();
		objA.addChildAt(objB, 5);   //和2d的差不多一致...
		console.log(objA.childs[0]);
		console.log(objA.childs[5]);
	}

	/**公告板 一直朝像摄像头的一个东西...*/
	private createBillboard() {
		var billboard: egret3d.Billboard = new egret3d.Billboard(new egret3d.TextureMaterial());
		this.view3D.addChild3D(billboard);
		billboard.y = 300;
	}

	/**加载天空素材*/
	protected loaderSkyBox() {
		var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
		loader.load("resource/quanjing/pano_b.jpg");
		loader.load("resource/quanjing/pano_f.jpg");
		loader.load("resource/quanjing/pano_l.jpg");
		loader.load("resource/quanjing/pano_r.jpg");
		loader.load("resource/quanjing/pano_d.jpg");
		loader.load("resource/quanjing/pano_u.jpg");
		loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSkyBoxTexture, this);
	}

	/**天空盒资源加载完成 创建天空盒*/
	protected onSkyBoxTexture(e: egret3d.LoaderEvent3D) {
		var loader: egret3d.QueueLoader = e.target;
		var fr: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_f.jpg");
		var bk: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_b.jpg");
		var lf: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_l.jpg");
		var rt: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_r.jpg");
		var up: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_u.jpg");
		var dn: egret3d.ITexture = loader.getAsset("resource/quanjing/pano_d.jpg");
		// 创建cube贴图
		var cubeTexture: egret3d.CubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(bk,fr , lf, rt, up, dn); //bk和fr的图得换一下，反了
		// 创建cube geometry 和 cube 材质
		var sky: egret3d.Sky = new egret3d.Sky(new egret3d.CubeGeometry(10000, 10000, 10000), new egret3d.CubeTextureMaterial(cubeTexture), this.view3D.camera3D);
		// 设置天空盒 渲染模式为背面渲染
		sky.material.cullMode = egret3d.ContextConfig.FRONT;
		this.view3D.addChild3D(sky);
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

	/**加载地形*/
	private loaderTerrain(){
		var loader = new egret3d.QueueLoader();
		loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onTerrainComplete, this);
		// 高度图
		loader.load("resource/terrain/a.jpg");
		// 地形混合图
		//loader.load("resource/terrain/a.jpg");
		// 地表贴图 4张
		//loader.load("resource/terrain/a.jpg");
		//loader.load("resource/terrain/a.jpg");
	}

	/***/
	private onTerrainComplete(e:egret3d.LoaderEvent3D){
		 var loader: egret3d.QueueLoader = e.target;
		// 使用高度图创建地形
		var heightImage: egret3d.ImageTexture = <egret3d.ImageTexture>loader.getAsset("resource/terrain/a.jpg");
		var terrain: egret3d.Terrain = new egret3d.Terrain(heightImage, 2000, 500, 2000, 200, 200);
		var mat: egret3d.MaterialBase = terrain.material;
		//mat.gloss = 10.0;
		mat.repeat = true;
		this.view3D.addChild3D(terrain);
		// 给地形增加地形混合渲染方法
		// var terrainMethod: egret3d.TerrainARGBMethod = new egret3d.TerrainARGBMethod(
		// 	egret3d.CheckerboardTexture.texture,
		// 	egret3d.CheckerboardTexture.texture,
		// 	egret3d.CheckerboardTexture.texture,
		// 	egret3d.CheckerboardTexture.texture,
		// 	egret3d.CheckerboardTexture.texture);
		// mat.diffusePass.addMethod(terrainMethod);
		// terrainMethod.setUVTitling(0, 26.7, 26.7);
		// terrainMethod.setUVTitling(1, 16, 16);
		// terrainMethod.setUVTitling(2, 26.7, 26.7);
		// terrainMethod.setUVTitling(3, 26.7, 26.7);
		// // 设置混合贴图和地表贴图
		// terrainMethod.controlTexture = loader.getAsset("resource/terrain/a.jpg");
		// terrainMethod.splat_0_Texture = loader.getAsset("resource/terrain/a.jpg");
		// terrainMethod.splat_1_Texture = loader.getAsset("resource/terrain/a.jpg");
		// terrainMethod.splat_2_Texture = loader.getAsset("resource/terrain/a.jpg");
		// terrainMethod.splat_3_Texture = loader.getAsset("resource/terrain/a.jpg");
	}

	/**创建线框*/
	private createWireframeForGeometry(){
		// 用cube 的Geometry 创建线框
		var cubeWireframe: egret3d.Wireframe = new egret3d.Wireframe();
		cubeWireframe.fromGeometry(this.cube.geometry);
		// 把cube的线框绑定在cube上
		this.cube.addChild(cubeWireframe);
	}

	/**碰撞检测*/
	private colliose(){
		//点碰撞
		var pointResult:boolean = this.cube.bound.pointIntersect(new egret3d.Vector3D(0,0,0));
		console.log("pointResult:", pointResult);

		//射线碰撞
		var pickResult:egret3d.PickResult = new egret3d.PickResult();
		var ray:egret3d.Ray = new egret3d.Ray(new egret3d.Vector3D(100,100,100), new egret3d.Vector3D(-100,-100,-100));
		var rayResult = ray.IntersectMeshEx(this.cube, 1, pickResult);
		console.log("rayResult:", rayResult);   //射中不算，射穿才算？
		console.log("pickResult:", pickResult); //??

		//模型碰撞
		var modelResult:boolean = this.cube.bound.intersect(this.textureCube.bound);
		console.log("modelResult:", modelResult);
	}

	/**粒子效果*/
	private createParticle(){
		var queueLoader:egret3d.QueueLoader = new egret3d.QueueLoader();
		var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
		mat.ambientColor = 0xffffff;
		// 获取资源 这张贴图不是透明贴图 
		mat.diffuseTexture = queueLoader.getAsset("resource/doc/ice_0001.png");
		// 设置渲染模式  颜色叠加渲染出来的效果会受背景影响
		mat.blendMode = egret3d.BlendMode.ADD;
		var particle: egret3d.ParticleEmitter;
		var data: egret3d.ParticleData = new egret3d.ParticleData();
		data.followTarget = new egret3d.ParticleDataFollowTarget();
		// 设置最大粒子数量 
		data.property.particleCount = 1000;
		// 
		data.shape.type = egret3d.ParticleDataShapeType.Point;
		var moveSpeed: egret3d.ParticleDataMoveSpeed = new egret3d.ParticleDataMoveSpeed();
		moveSpeed.min = 80;
		moveSpeed.max = 100;
		data.moveSpeed = moveSpeed;
		var lifeData: egret3d.ParticleDataLife = data.life;
		lifeData.duration = 20;
		lifeData.min = lifeData.max = 2;
		var emission: egret3d.ParticleDataEmission = data.emission;
		emission.rate = 10;
		// 爆发的粒子数据
		emission.bursts = [];
		emission.bursts.push(new egret3d.Point(2.0, 25));
		emission.bursts.push(new egret3d.Point(4.0, 20));
		emission.bursts.push(new egret3d.Point(6.0, 45));
		// 数据矫正
		data.validate();
		// 创建跟随的cube
		this.cube = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 10));
		this.view3D.addChild3D(this.cube);
		// 数据准备好后创建粒子
		particle = new egret3d.ParticleEmitter(data, mat);
		// 设置跟随的对象
		particle.followTarget = this.cube;
		// 播放粒子
		particle.play();
		// 加入场景 
		this.view3D.addChild3D(particle);
	}

	//自定义粒子效果
	private particle:egret3d.ParticleEmitter;
	//创建一个粒子特效
	private createComParticle():void{
		var material: egret3d.MaterialBase = this.createMaterial();
		var particleData: egret3d.ParticleData = this.createParticleData();
		this.particle = new egret3d.ParticleEmitter(particleData, material);
		this.particle.play();
		this.view3D.addChild3D(this.particle);
	}
	//创建一个粒子数据
	private createParticleData(): egret3d.ParticleData {
		var data: egret3d.ParticleData = new egret3d.ParticleData();
		data.geometry.planeW = data.geometry.planeH = 30;
		var life: egret3d.ParticleDataLife = data.life;
		life.max = 6;
		life.min = 6;
		life.duration = 5;
		life.delay = 0.5;
		life.loop = true;
		var emission: egret3d.ParticleDataEmission = data.emission;
		emission.rate = 2;
		var property: egret3d.ParticleDataProperty = data.property;
		property.particleCount = 100;
		property.renderMode = egret3d.ParticleRenderModeType.StretchedBillboard;
		property.colorConst1.setTo(255, 255, 255, 255);
		property.colorConst2.setTo(255, 255, 255, 255);
		property.gravity = 5;
		var speed: egret3d.ParticleDataMoveSpeed = data.moveSpeed;
		speed.max = 50;
		speed.min = 50;
		var velocityOver: egret3d.VelocityOverLifeTimeData = new egret3d.VelocityOverLifeTimeData();
		speed.velocityOver = velocityOver;
		speed.velocityOver.type = egret3d.ParticleValueType.OneBezier;
		var xBezier: egret3d.BezierData = new egret3d.BezierData();
		xBezier.posPoints.push(new egret3d.Point(0, 0));
		xBezier.posPoints.push(new egret3d.Point(0.5, 20));
		xBezier.posPoints.push(new egret3d.Point(0.5, 20));
		xBezier.posPoints.push(new egret3d.Point(1.0, 8));
		xBezier.ctrlPoints.push(new egret3d.Point(0, 10));
		xBezier.ctrlPoints.push(new egret3d.Point(0.55, 20));
		xBezier.ctrlPoints.push(new egret3d.Point(0.55, 20));
		xBezier.ctrlPoints.push(new egret3d.Point(1.0, 8));
		speed.velocityOver.xBezier1 = xBezier;
		var yBezier: egret3d.BezierData = new egret3d.BezierData();
		yBezier.posPoints.push(new egret3d.Point(0, 0));
		yBezier.posPoints.push(new egret3d.Point(0.7, 40));
		yBezier.posPoints.push(new egret3d.Point(0.7, 40));
		yBezier.posPoints.push(new egret3d.Point(1.0, 16));
		yBezier.ctrlPoints.push(new egret3d.Point(0, 10));
		yBezier.ctrlPoints.push(new egret3d.Point(0.75, 40));
		yBezier.ctrlPoints.push(new egret3d.Point(0.76, 40));
		yBezier.ctrlPoints.push(new egret3d.Point(1.0, 20));
		speed.velocityOver.yBezier1 = yBezier;
		var zBezier: egret3d.BezierData = new egret3d.BezierData();
		zBezier.posPoints.push(new egret3d.Point(0, 0));
		zBezier.posPoints.push(new egret3d.Point(1, 0));
		zBezier.ctrlPoints.push(new egret3d.Point(0, 0));
		zBezier.ctrlPoints.push(new egret3d.Point(1, 0));
		speed.velocityOver.zBezier1 = zBezier;
		var colorOffset: egret3d.ParticleDataColorOffset = new egret3d.ParticleDataColorOffset();
		data.colorOffset = colorOffset;
		colorOffset.data.colors.push(new egret3d.Color(255.0, 0.0, 0.0, 255.0));
		colorOffset.data.colors.push(new egret3d.Color(0.0, 255.0, 0.0, 255.0));
		colorOffset.data.colors.push(new egret3d.Color(0.0, 0.0, 255.0, 255.0));
		colorOffset.data.colors.push(new egret3d.Color(0.0, 255.0, 0.0, 255.0));
		colorOffset.data.colors.push(new egret3d.Color(255.0, 0.0, 0.0, 128.0));
		colorOffset.data.colors.push(new egret3d.Color(255.0, 0.0, 0.0, 0.0));
		colorOffset.data.times.push(0.0);
		colorOffset.data.times.push(0.2);
		colorOffset.data.times.push(0.4);
		colorOffset.data.times.push(0.6);
		colorOffset.data.times.push(0.7);
		colorOffset.data.times.push(1.0);
		// var sizeBezier: egret3d.ParticleDataScaleBezier = new egret3d.ParticleDataScaleBezier();
		// data.scaleBezier = sizeBezier;
		// sizeBezier.data.posPoints.push(new egret3d.Point(0, 0));
		// sizeBezier.data.posPoints.push(new egret3d.Point(0.4, 2));
		// sizeBezier.data.posPoints.push(new egret3d.Point(0.4, 2));
		// sizeBezier.data.posPoints.push(new egret3d.Point(1.0, 0.2));
		// sizeBezier.data.ctrlPoints.push(new egret3d.Point(0, 1));
		// sizeBezier.data.ctrlPoints.push(new egret3d.Point(0.3, 2));
		// sizeBezier.data.ctrlPoints.push(new egret3d.Point(0.6, 2));
		// sizeBezier.data.ctrlPoints.push(new egret3d.Point(1.0, 0.2));
		data.validate();
		return data;
	}
	//创建一个材质球
	private createMaterial(): egret3d.MaterialBase {
		var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
		mat.bothside = true;
		mat.ambientColor = 0xffffff;
		mat.blendMode = egret3d.BlendMode.ADD;
		return mat;
	}

	/**创建GUI*/
	private createGUI(){
		var queueLoader:egret3d.QueueLoader = new egret3d.QueueLoader();
		queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadGUISkinComplete, this);
		queueLoader.loadDefaultGUISkin();
	}

	/**加载GUI完成*/
	private onLoadGUISkinComplete(){
		// var textField:egret3d.gui.UITextField = new egret3d.gui.UITextField();
		// textField.x = 100;
		// textField.y = 100;
		// textField.text = "Test TextField";
		// this.view3D.addGUI(textField);
	}

	
}

