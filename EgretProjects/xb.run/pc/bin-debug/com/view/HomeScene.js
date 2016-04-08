/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.codeLoader = new QRCodeLoader(); //二维码
        this.countDownTimer = new egret.Timer(1000); //倒计时计时器
        this.countDownLimit = 15; //倒计时限制
        this.headList = new Array(); //头像UI
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
        this.initView();
    };
    p.onEnable = function () {
        this.resetScene(); //重置场景
    };
    p.onRemove = function () {
    };
    //初始化视图
    p.initView = function () {
        this.initHead(); //初始化头像相关
        this.initCountDown(); //初始化倒计时相关
    };
    //重置场景
    p.resetScene = function () {
        this.createQRCode(); //创建二维码
        this.clearHead(); //清理头像
        this.clearUserManager(); //清理用户列表
    };
    //初始化头像相关
    p.initHead = function () {
        this.headList.push(this.head0, this.head1, this.head2);
        this.head0.infoLabel.text = "选择暴躁鹿";
        this.head1.infoLabel.text = "选择嘻哈兔";
        this.head2.infoLabel.text = "选择悠悠熊猫";
    };
    //初始化倒计时相关
    p.initCountDown = function () {
        this.countDownLimit = (GameConst.debug) ? 1 : 15;
    };
    //清理头像
    p.clearHead = function () {
        this.head0.clear();
        this.head1.clear();
        this.head2.clear();
    };
    //清理用户列表
    p.clearUserManager = function () {
        UserManager.getInstance().clearAllUser(); //清理用户列表
    };
    //生成二维码
    p.createQRCode = function () {
        //随机房间号
        this.rid = (new Date()).getTime() + NumberTool.getVerificationCode(6);
        //index创建二维码图片
        window["createQRCode"](this.rid);
        //加载二维码图片
        var codeLoader = new QRCodeLoader();
        var gameConfig = window["gameConfig"];
        codeLoader.load(gameConfig.codeData, gameConfig.codeWidth, gameConfig.codeHeight, gameConfig.logoUrl);
        this.codeGroup.addChild(codeLoader);
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    };
    //倒计时处理
    p.onCountDownHandler = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        //TODO 显示倒计时
        //倒计时结束，开始校准
        if (count < 0) {
            this.stopCountDown();
            LayerManager.getInstance().runScene(GameManager.getInstance().lockScene);
            this.sendStartLock();
        }
    };
    //停止倒计时
    p.stopCountDown = function () {
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.stop();
    };
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //发送登录
    p.sendLogin = function () {
        egret.log("sendLogin：", this.rid);
        var rid = this.rid;
        if (GameConst.debug) {
            this.socket.sendMessage("login", { rid: rid, userType: "pc" }, this.revLogin, this);
        }
        else {
            this.socket.sendMessage("login", { rid: rid }, this.revLogin, this);
        }
    };
    //接收登录
    p.revLogin = function (data) {
        egret.log("rev login:", data);
        var success = data.success;
        var msg = data.msg;
        if (success) {
        }
        else {
        }
    };
    //接收用户进入
    p.revUserJoin = function (data) {
        egret.log("rev userJoin:", data);
        //判断当前人数
        var userManager = UserManager.getInstance();
        if (userManager.isOverUserLimit()) {
            egret.log("超出人数");
            return;
        }
        //添加用户信息
        var userVO = new UserVO();
        userVO.openid = data.openid;
        userVO.headUrl = data.headUrl;
        userVO.nickName = data.nickName;
        userManager.addUser(userVO);
        //添加用户头像
        for (var i = 0; i < 3; i++) {
            var headUI = this.headList[i];
            if (headUI.isEmpty()) {
                headUI.setUserInfo(userVO);
                userVO.role = i;
                //发送用户角色
                this.sendRole(i);
                break;
            }
        }
        //如果是第一个人进入，则开始倒计时
        if (UserManager.getInstance().userList.length == 1) {
            this.startCountDown();
        }
        else {
        }
    };
    //用户离开
    p.revUserQuit = function (data) {
        egret.log("rev userQuit:", data);
        var openid = data.openid;
        var gameScene = GameManager.getInstance().gameScene;
        //如果是home场景
        if (this.parent) {
            //清理用户列表
            var userManager = UserManager.getInstance();
            userManager.deleteUser(openid);
            //清理用户头像
            for (var i = 0; i < 3; i++) {
                var headUI = this.headList[i];
                if (headUI.openid == openid) {
                    headUI.clear();
                }
            }
            //TODO 如果没人则停止计时
            if (UserManager.getInstance().userList.length == 0) {
                this.stopCountDown();
            }
        }
        else if (gameScene.parent) {
        }
    };
    //发送开始校准
    p.sendStartLock = function () {
        egret.log("sendStartLock");
        this.socket.sendMessage("startLock");
    };
    //发送分配角色
    p.sendRole = function (roleType) {
        egret.log("assignRole");
        this.socket.sendMessage("assignRole", { roleType: roleType });
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
