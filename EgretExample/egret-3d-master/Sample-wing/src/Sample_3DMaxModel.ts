/**
 *
 * @author 
 *
 */
class Sample_3DMaxModel {
  
    private viewPort: egret3d.Rectangle; 
    private view3D: egret3d.View3D; 
    private delay: number = 0 ;
    private time: number = 0 ;
    private cameraController: egret3d.LookAtController;
	public constructor() {
    	  //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0,0,window.innerWidth,window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,new egret3d.Rectangle(0,0,this.viewPort.width,this.viewPort.height),() => this.init3D());
	}
	
    private init3D() {
        this.view3D = new egret3d.View3D( this.viewPort );
        
        var loadModel: egret3d.ModeLoader = new egret3d.ModeLoader("resource/robot/", "body.esm" ); 
        loadModel.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.checkComplete(e));
        loadModel.load();
         
        this.cameraController = new egret3d.LookAtController(this.view3D.camera3D,new egret3d.Object3D());
        this.cameraController.setEyesLength(400);
        
        requestAnimationFrame( ()=>this.update() );
    }
    
    private checkComplete(e:egret3d.Event3D) {
        var loader: egret3d.ModeLoader = <egret3d.ModeLoader>e.data; 
        var mesh: egret3d.Mesh = loader.mesh ;
        this.view3D.addChild3D(mesh);
    }
    
    private update() {
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.renden(this.time,this.delay);
        this.cameraController.update();
        window.requestAnimationFrame(() => this.update());
    }
  
}
