/**
 * 校准页面
 * @author
 *
 */
var LockScene = (function (_super) {
    __extends(LockScene, _super);
    function LockScene() {
        _super.call(this, "LockSceneSkin");
        this.isLocked = false; //是否已经校准过
    }
    var d = __define,c=LockScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.msgLabel.text = "";
        this.openDevice();
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
    };
    p.onRemove = function () {
        this.stopDevice();
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnTouch, this);
    };
    //设置角色头像
    p.setRoleImg = function () {
        var role = UserManager.getInstance().roleID;
        this.headImg.texture = RES.getRes("head" + role + "_png");
    };
    //设置角色名字
    p.setRoleName = function () {
        var role = UserManager.getInstance().roleID;
        this.nameLabel.text = UserManager.getInstance().roleNameList[role];
    };
    //点击ok按钮
    p.onOkBtnTouch = function () {
        egret.Tween.get(this.okBtn).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
        this.msgLabel.text = "校准完成\n请等待游戏开始";
        GameConst.centerZ = this.deviceZ;
        GameConst.centerX = this.deviceX;
        //校准一次后，第二次校准不需要发送到服务端，因为校准的结果本来就跟pc和服务端无关
        if (this.isLocked == false) {
            this.sendLock();
        }
        this.isLocked = true;
    };
    //打开重力感应
    p.openDevice = function () {
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        this.orientation.start();
    };
    p.onOrientation = function (e) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
    };
    //关闭重力感应
    p.stopDevice = function () {
        this.orientation.stop();
        this.orientation.removeEventListener(egret.Event.CHANGE, this.onOrientation, this);
    };
    ////////////////////////////////////////////////////////////
    //------------------------[Socket通讯]----------------------
    ////////////////////////////////////////////////////////////
    //发送校准
    p.sendLock = function () {
        egret.log("sendLock");
        this.socket.sendMessage("lock");
    };
    //接收开始游戏
    p.revStartGame = function () {
        egret.log("revStartGame");
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    //接收分配角色
    p.revAssignRole = function (data) {
        egret.log("revAssignRole");
        var roleID = data.roleType;
        UserManager.getInstance().roleID = roleID;
        this.setRoleImg();
        this.setRoleName();
    };
    return LockScene;
}(BaseScene));
egret.registerClass(LockScene,'LockScene');
