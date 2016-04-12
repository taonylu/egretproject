/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    private socket:ClientSocket; //socket
    private orientation:egret.DeviceOrientation; //重力感应
    private centerZ:number;      //中心z位置
    private centerX:number;      //中心x位置
    private leftBtn:SimpleButton; //左、右、上箭头
    private rightBtn:SimpleButton;
    private upBtn:SimpleButton;
    private headImg:eui.Image;   //头像
    private nameLabel:eui.Label; //文本
    
    private centerLabel:eui.Label;  //中心位置，调试用文本
    private deviceLabel:eui.Label;  //当前设备角度
    private actionLabel:eui.Label;  //动作文本
    private statusLabel:eui.Label;  //手势状态
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
    }

    public onEnable(): void {
        this.resetGame();
        this.startGame();
    }

    public onRemove(): void {
        this.stopDevice();
    }

    
    private startGame(){
        this.configListeners();
        this.openDevice();
    }
    
    private resetGame(){
        egret.log("resetGame1");
        //重置感应
        this.gestureUp = false;
        this.gestureR = false;
        this.gestureL = false;
        this.centerZ = GameConst.centerZ;
        this.centerX = GameConst.centerX;
        this.centerLabel.text = "centerZ:" + this.centerZ + "  centerX:" + this.centerX;
        //头像、名称
        this.setRoleImg();
        this.setRoleName();
    }
    
    private gameOver(){
        this.resetGame();
    }
    
    private configListeners(){
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftBtnTouch, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onRightBtnTouch,this);
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onUpBtnTouch,this);
    }
    
    private onLeftBtnTouch(){
        egret.log("left touch");
        this.sendLeftAction();
    }
    
    private onRightBtnTouch() {
        this.sendRightAction();
    }
    
    private onUpBtnTouch() {
        this.sendUpAction();
    }
    
    //设置角色头像
    private setRoleImg() {
        this.headImg.texture = null;
        var role: number = UserManager.getInstance().roleID;
        this.headImg.texture = RES.getRes("head" + role + "_png");
    }
    
    //设置角色名字
    private setRoleName() {
        var role: number = UserManager.getInstance().roleID;
        this.nameLabel.text = UserManager.getInstance().roleNameList[role];
    }
    
    public openDevice() {
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        this.orientation.start();
    }
    
    private stopDevice(){
        this.orientation.stop();
        this.orientation.removeEventListener(egret.Event.CHANGE,this.onOrientation,this);
    }

    private deviceX: number = 0;
    private deviceZ: number = 0;
    private gestureUp:boolean = false;
    private gestureR:boolean = false;
    private gestureL:boolean = false;
    private angleLimit = 30;   //角度限制
    private angleReturn = 25;  //回复手势角度
    private onOrientation(e: egret.OrientationEvent) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
            "x轴角速度:" + this.deviceX  //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
            + "\nz轴角速度:" + this.deviceZ;    //0~360   北方为0(360)，向左0-360增加，向右360-0减少 
        this.statusLabel.text = "up:" + this.gestureUp + " R:" + this.gestureR  + " L:" + this.gestureL;
        //向上超过n度，则判定为跳跃
       // this.deviceLabel.text += "\naccX:" + this.deviceX.toFixed(2);
        if(this.deviceX >= this.angleLimit && this.gestureUp == false) {
            this.gestureUp = true;
            this.sendUpAction();
            this.upBtn.devieceDown();
            this.actionLabel.text = "Up:" + this.deviceX;
        } else if(this.deviceX <= this.angleReturn){
            this.gestureUp = false;
        }
        

        //当跳跃角度过大时，不计算左右判断
        if(this.deviceX > this.angleLimit){
            return;
        }

        //获取角速度变化
        var dist = Math.round(this.deviceZ - this.centerZ);
        
        //清除左右手势
        if((dist < this.angleReturn && dist > -this.angleReturn)) {
            this.gestureR = false;
            this.gestureL = false;
        }else if((dist > 180 && (360-dist)<this.angleReturn) || (dist<-180 && (360+dist)<this.angleReturn)){
            this.gestureR = false;
            this.gestureL = false;
        }

        
        //判断左
        if((dist >= this.angleLimit && dist < 180) || (dist >= (this.angleLimit - 360) && dist < -180)){
            if(this.gestureL == false && this.gestureR == false){
                this.gestureL = true;
                this.sendLeftAction();
                this.leftBtn.devieceDown();
                this.actionLabel.text = "L:" + this.deviceZ;
            } 
        //判断右    
        } else if((dist <= -this.angleLimit && dist > -180) || (dist < (360-this.angleLimit) && dist > 180 )){
            if(this.gestureR == false && this.gestureL == false){
                this.gestureR = true;
                this.sendRightAction();
                this.rightBtn.devieceDown();
                this.actionLabel.text = "R:" + this.deviceZ;
            } 
        } 
    }
    
    private sendRightAction(){
        this.socket.sendMessage("action",{ actionType: "right",openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:right",this.deviceZ,"-",this.centerZ,"=",this.deviceZ - this.centerZ);
    }
    
    private sendLeftAction() {
        this.socket.sendMessage("action",{ actionType: "left",openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:left",this.deviceZ,"-",this.centerZ,"=",this.deviceZ - this.centerZ);
    }
    
    private sendUpAction() {
        this.socket.sendMessage("action",{ actionType: "up",openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:up");
    }
    
    //接收游戏结束
    public resultData;
    public revGameOver(data){
        egret.log("revGameOver");
        console.log("revGameOver",data);
        if(GameConst.debug == true){
            data = {
                gameRankList: [
                                { headUrl:"resource/assets/home/head0.png", nickName:"A",score:999,rank:1},
                                { headUrl: "resource/assets/home/head0.png",nickName: "B",score: 999,rank: 1},
                                { headUrl: "resource/assets/home/head0.png",nickName: "C",score: 999,rank: 1},
                            ],
                rankList:[
                            {headUrl:"resource/assets/home/head0.png",nickName:"A",score:99},
                            { headUrl: "resource/assets/home/head0.png",nickName: "B",score: 99 },
                            { headUrl: "resource/assets/home/head0.png",nickName: "C",score: 99 }
                        ]
            }
        }
        this.resultData = data;
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    }
}









