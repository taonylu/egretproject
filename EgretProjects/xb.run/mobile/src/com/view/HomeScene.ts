/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private socket:ClientSocket ;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
       
    }

    public onRemove(): void {
        
    }
    
    //---------------测试目的-------------------
    //1. 重力感应x,y,z轴值变化
    //2. 摇一摇功能
    
    
    public openDevice() {
        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        orientation.start();
    }

    private deviceLabel: eui.Label;
    private deviceX:number;
    private deviceY:number;
    private deviceZ:number;
    private onOrientation(e: egret.OrientationEvent) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceY = parseFloat(e.gamma.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
             "x轴角速度:" + this.deviceX  //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
            + "\ny轴角速度:" + this.deviceY //-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
           + "\nz轴角速度:" + this.deviceZ;    //0~360   北方为0(360)，向左0-360增加，向右360-0减少
    }
    
    
    

}















