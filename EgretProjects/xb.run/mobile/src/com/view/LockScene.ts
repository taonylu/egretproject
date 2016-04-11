/**
 * 校准页面
 * @author 
 *
 */
class LockScene extends BaseScene{
    private nameLabel:eui.Label;  //名字文本
    private headImg:eui.Image;    //头像图片
    private okBtn:eui.Button;      //ok按钮
    private socket:ClientSocket;  //socket
    private msgLabel:eui.Label;   //消息文本
    private orientation: egret.DeviceOrientation;  //重力感应
    
	public constructor() {
    	super("LockSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
        this.msgLabel.text = "";
        this.openDevice();
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
    }

    public onRemove(): void {
        this.stopDevice();
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOkBtnTouch,this);
    }
    
    //设置角色头像
    private setRoleImg(){
        var role:number = UserManager.getInstance().roleID;
        this.headImg.texture = RES.getRes("head" + role + "_png");
    }
    
    //设置角色名字
    private setRoleName(){
        var role:number = UserManager.getInstance().roleID;
        this.nameLabel.text = UserManager.getInstance().roleNameList[role];
    }
    
    //点击ok按钮
    private onOkBtnTouch(){
        this.msgLabel.text = "校准完成\n请等待游戏开始";
        GameConst.centerZ = this.deviceZ;
        GameConst.centerX = this.deviceX;
        //校准一次后，第二次校准不需要发送到服务端，因为校准的结果本来就跟pc和服务端无关
        if(this.isLocked == false) {
            this.sendLock();
        }
        this.isLocked = true;
    }
    
    //打开重力感应
    private openDevice() {
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        this.orientation.start();
    }

    //重力感应
    private deviceX;
    private deviceZ;
    private isLocked:boolean = false; //是否已经校准过
    private onOrientation(e: egret.OrientationEvent) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
    }
    
    //关闭重力感应
    private stopDevice(){
        this.orientation.stop();
        this.orientation.removeEventListener(egret.Event.CHANGE,this.onOrientation,this);
    }
    
    ////////////////////////////////////////////////////////////
    //------------------------[Socket通讯]----------------------
    ////////////////////////////////////////////////////////////
    
    //发送校准
    public sendLock() {
        egret.log("sendLock");
        this.socket.sendMessage("lock");
    }
    
    //接收开始游戏
    public revStartGame() {
        egret.log("revStartGame");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    }
    
    //接收分配角色
    public revAssignRole(data){
        egret.log("revAssignRole:", data.roleType);
        var roleID = data.roleType;
        UserManager.getInstance().roleID = roleID;
        this.setRoleImg();
        this.setRoleName();
    }
}













