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
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
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
        qrcdeLoader.load(window["qrcodeUrl"], 400, 400, window["logoUrl"]);
        this.qrcodeGroup.addChild(qrcdeLoader);
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //-----------------------------发送数据----------------------------------
    //-----------------------------接收数据----------------------------------
    //返回登录成功
    p.revLogin = function (data) {
        var status = data.status; //  -1 房间已经存在 ， 0 房间错误， 1 开放成功
        egret.log("登录成功，是否授权成功", status);
        if (status == 1) {
        }
        else if (status == 0) {
        }
    };
    //玩家加入
    p.revUserJoin = function (data) {
        var avatar = data.avatar; //用户头像
        var name = data.name; //用户名
        var uid = data.uid; //用户id
        egret.log("玩家加入,头像:" + avatar, "名字:" + name, "ID:" + uid);
        //设置用户名，选取一个空文本。因为可能出现靠前的玩家退出游戏。
        var index = -1;
        var headUI;
        for (var i = 0; i < this.userMax; i++) {
            headUI = this.headUIList[i];
            if (headUI.isEmpty()) {
                headUI.userID = uid;
                headUI.setNameLabel(name);
                headUI.loadImg(avatar);
                break;
            }
        }
        //保存用户
        var userVO = new UserVO();
        userVO.uid = uid;
        userVO.name = name;
        userVO.headImg = new egret.Bitmap(headUI.headImg.bitmapData);
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
        //删除用户
        delete UserManager.getInstance().userList[uid];
        //TODO 游戏中玩家退出，可能是大屏用户
    };
    //游戏开始
    p.revGameStart = function (data) {
        var mapData = data.mapData; //地图信息
        var luckyUser = data.luckyUser; //大屏幕显示的用户
        egret.log("游戏开始，幸运用户:", luckyUser);
        MapManager.getInstance().level = mapData;
        UserManager.getInstance().luckyUser = luckyUser;
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
