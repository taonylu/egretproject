/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{

    private socket:ClientSocket = ClientSocket.getInstance();
    
    private centerGroup:eui.Group;
    private okBtn:eui.Rect;
    private centerLabel:eui.Label;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.centerGroup.visible = false;
    }

    public onEnable(): void {
        this.sendLogin();
    }

    public onRemove(): void {
        
    }
    
    //---------------测试目的-------------------
    //1. 重力感应x,y,z轴值变化
    //2. 摇一摇功能
    
    private deviceLabel: egret.TextField;
    public openDevice() {

        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        orientation.start();
    }

    private xPos: number = 0;
    private yPos: number = 0;
    private zPos: number = 0;
    private last_x: number = 0;
    private last_y: number = 0;
    private last_z: number = 0;
    private last_update: number = 0;
    private SHAKE_THRESHOLD: number = 0.25;  //摇动变化值/时间差  25/100大概值
    private shakeCount: number = 0;  //摇动次数
    private deviceX:number;
    private deviceY:number;
    private deviceZ:number;
    private lastDeviceX:number = 0;
    private lastDeviceY:number = 0;
    private lastDeviceZ:number = 0;
    private onOrientation(e: egret.OrientationEvent) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceY = parseFloat(e.gamma.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
             "x轴角速度:" + this.deviceX  //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
            + "\ny轴角速度:" + this.deviceY //-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
           + "\nz轴角速度:" + this.deviceZ;    //0~360   北方为0(360)，向左0-360增加，向右360-0减少
           
           if(this.allowSendOrientation &&( Math.abs(this.lastDeviceX - this.deviceX)>2 || Math.abs(this.lastDeviceZ - this.deviceZ)>2)){
               this.sendOrientation();
           }
    }
    
    private onOKBtnTouch(){
        this.sendLockOn();
    }
    
    //-------------------网络数据-------------------
    public sendLogin(){
        var rid = egret.getOption("rid");
        egret.log("send login:",rid,"userType:mobile");
        this.socket.sendMessage("login",{ rid: rid,userType:"mobile"},this.revLogin,this);
    }
    
    private revLogin(data){
        egret.log("rev login");
       this.centerGroup.visible = true;
       this.openDevice();
       this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    }
    
    private sendLockOn(){
        egret.log("send lockOn:",this.deviceX,this.deviceY,this.deviceZ);
        this.socket.sendMessage("lockOn",{deviceX:this.deviceX,deviceY:this.deviceY,deviceZ:this.deviceZ},
            this.revLockOn, this);
        
    }
    
    private allowSendOrientation:Boolean = false;
    private revLockOn(){
        egret.log("rev lockOn2");
        this.allowSendOrientation = true;
    }
    
    private count:number = 0;
    private sendOrientation(){
        this.count++;
        this.centerLabel.text = this.count + "";
        this.socket.sendMessage("drawLine",{ deviceX: this.deviceX,deviceY: this.deviceY,deviceZ: this.deviceZ});
    }
}















