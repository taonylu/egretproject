/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        //=============[声音]=============
        this.snd = SoundManager.getInstance();
        this.userMax = 8; //用户最大数量
        this.timeLimit = 20; //倒计时时间 
        this.countDownTimer = new egret.Timer(1000); //计时器
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        this.snd.playBgm(this.snd.homeBgm);
        this.showShaLou();
    };
    p.onRemove = function () {
    };
    p.reset = function () {
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    p.initView = function () {
        //初始头像
        this.headUIList = new Array();
        for (var i = 0; i < this.userMax; i++) {
            this.headUIList.push(this["headUI" + i]);
        }
        //生成二维码
        var qrcdeLoader = new QRCodeLoader();
        qrcdeLoader.load(window["qrcodeUrl"], window["codeWidth"], window["codeHeight"], window["logoUrl"]);
        this.qrcodeGroup.addChild(qrcdeLoader);
        //游戏规则
        this.gameIntroLabel.text = "1 扫描二维码，进入房间，点击“加入游戏”开始排队，每局最多8名玩家\n\n" +
            "2 当玩家达到4名就开始倒计时，倒计时期间新玩家也可以加入游戏\n\n" +
            "3 每局游戏有三个关卡，只要有三位玩家完成三关，游戏结束\n\n" +
            "4 游戏期间借助道具让你更有优势\n";
    };
    //显示沙漏
    p.showShaLou = function () {
        this.shaLou.visible = true;
        this.countDownLabel.visible = false;
    };
    p.resetHeadUI = function () {
        var len = this.headUIList.length;
        for (var i = 0; i < len; i++) {
            this.headUIList[i].reset();
        }
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.countDownLabel.visible = true;
        if (this.timeLimit < 10) {
            this.countDownLabel.text = "0" + this.timeLimit.toString();
        }
        else {
            this.countDownLabel.text = this.timeLimit.toString();
        }
    };
    //倒计时处理
    p.onCountDownHandler = function (e) {
        var curTimeCount = this.timeLimit - this.countDownTimer.currentCount;
        //倒计时结束，则进入游戏
        if (curTimeCount < 0) {
            this.stopCountDown();
            return;
        }
        //个位数计时补0
        if (curTimeCount < 10) {
            this.countDownLabel.text = "0" + curTimeCount.toString();
        }
        else {
            this.countDownLabel.text = curTimeCount.toString();
        }
    };
    //停止倒计时
    p.stopCountDown = function () {
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.stop();
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //=====================接收数据======================
    //返回登录成功
    p.revLogin = function (data) {
        var status = data; //  -1 房间已经存在 ， 0 房间错误， 1 开放成功
        egret.log("登录返回，房间状态：", status);
        switch (status) {
            case 1:
                break;
            case 0:
                break;
            case -1:
                break;
            default:
        }
    };
    //玩家加入
    p.revUserJoin = function (data) {
        var headimgurl = data.headimgurl; //用户头像
        var nickname = data.nickname; //用户名
        var uid = data.uid; //用户id
        var sex = data.sex; //用户性别 1男 2女
        egret.log("玩家加入,头像:" + headimgurl, "名字:" + nickname, "ID:" + uid, "sex:", sex);
        //保存用户
        var userVO = new UserVO();
        userVO.uid = uid;
        userVO.name = nickname;
        UserManager.getInstance().storeUser(userVO);
        //设置用户名，选取列表靠前的一个空文本。因为可能出现靠前的玩家退出游戏。
        var index = -1;
        var headUI;
        for (var i = 0; i < this.userMax; i++) {
            headUI = this.headUIList[i];
            if (headUI.isEmpty()) {
                userVO.headUI = headUI;
                headUI.userID = uid;
                headUI.setNameLabel(nickname);
                headUI.loadImg(headimgurl);
                //播放用户加入声音
                if (sex == 1) {
                    this.snd.play(this.snd.enterMan);
                }
                else if (sex == 2) {
                    this.snd.play(this.snd.enterWoman);
                }
                break;
            }
        }
    };
    //倒计时
    p.revCountDown = function (data) {
        var time = data.time;
        egret.log("倒计时:" + time);
        this.timeLimit = time / 1000;
        this.shaLou.visible = false;
        this.startCountDown();
    };
    //清除倒计时
    p.revClearCountDown = function (data) {
        egret.log("停止倒计时");
        this.stopCountDown();
        this.showShaLou();
    };
    //玩家退出
    p.revUserQuit = function (data) {
        var uid = data.uid; //用户id
        egret.log("玩家退出:", uid);
        //列表删除用户
        UserManager.getInstance().deleteUser(uid);
        //TODO 游戏中玩家退出，可能是大屏用户
    };
    //游戏开始
    p.revGameStart = function (data) {
        var mapData = data.mapData; //地图信息
        var luckyUser = data.luckyUser; //大屏幕显示的用户
        egret.log("游戏开始，幸运用户:", luckyUser);
        //记录地图信息
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0], mapData[1], mapData[2]);
        //记录幸运用户
        UserManager.getInstance().luckyUser = luckyUser;
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
