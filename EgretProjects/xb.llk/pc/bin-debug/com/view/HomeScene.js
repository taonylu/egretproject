/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.userMax = 8; //用户最大数量
        this.timeLimit = 10; //倒计时时间 
        this.countDownTimer = new egret.Timer(1000);
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        this.showShaLou();
    };
    p.onRemove = function () {
    };
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
    };
    //显示沙漏
    p.showShaLou = function () {
        this.shaLou.visible = true;
        this.countDownLabel.visible = false;
    };
    //开始倒计时
    p.startCountDown = function () {
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
        this.shaLou.visible = false;
        this.countDownLabel.visible = true;
        this.countDownLabel.text = this.timeLimit.toString();
    };
    p.onCountDownHandler = function (e) {
        var curTimeCount = this.timeLimit - this.countDownTimer.currentCount;
        //倒计时结束，则进入游戏
        if (curTimeCount < 0) {
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
            this.countDownTimer.stop();
            return;
        }
        if (curTimeCount < 10) {
            this.countDownLabel.text = "0" + curTimeCount.toString();
        }
        else {
            this.countDownLabel.text = curTimeCount.toString();
        }
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //-----------------------------发送数据----------------------------------
    //-----------------------------接收数据----------------------------------
    //玩家加入
    p.revUserJoin = function (data) {
        var headimgurl = data.headimgurl; //用户头像
        var nickname = data.nickname; //用户名
        var uid = data.uid; //用户id
        egret.log("玩家加入,头像:" + headimgurl, "名字:" + nickname, "ID:" + uid);
        //设置用户名，选取一个空文本。因为可能出现靠前的玩家退出游戏。
        var index = -1;
        var headUI;
        for (var i = 0; i < this.userMax; i++) {
            headUI = this.headUIList[i];
            if (headUI.isEmpty()) {
                headUI.userID = uid;
                headUI.setNameLabel(nickname);
                headUI.loadImg(headimgurl);
                break;
            }
        }
        //保存用户
        var userVO = new UserVO();
        userVO.uid = uid;
        userVO.name = name;
        userVO.headImg = new egret.Bitmap(headUI.headImg.bitmapData); //新建一张用户头像图片，用于技能显示
        UserManager.getInstance().userList[uid] = userVO;
    };
    //玩家退出
    p.revUserQuit = function (data) {
        var uid = data.uid; //用户id
        egret.log("玩家退出:", uid);
        //删除玩家头像
        for (var i = 0; i < this.userMax; i++) {
            if (this.headUIList[i].userID == uid) {
                this.headUIList[i].clear();
            }
        }
        //列表删除用户
        delete UserManager.getInstance().userList[uid];
        //TODO 游戏中玩家退出，可能是大屏用户
    };
    //游戏开始
    p.revGameStart = function (data) {
        var mapData = data.mapData; //地图信息
        var luckyUser = data.luckyUser; //大屏幕显示的用户
        egret.log("游戏开始，幸运用户:", luckyUser);
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0], mapData[1], mapData[2]);
        UserManager.getInstance().luckyUser = luckyUser;
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
