/**
 * 上传和编辑照片场景
 * @author
 *
 */
var EditFaceScene = (function (_super) {
    __extends(EditFaceScene, _super);
    function EditFaceScene() {
        _super.call(this, "EditFaceSceneSkin");
        this.http = new HttpUtil(); //http
    }
    var d = __define,c=EditFaceScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.configListeners();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.chooseImgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseImgBtnTouch, this);
        this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.chooseImgBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseImgBtnTouch, this);
        this.testBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtnTouch, this);
    };
    //选择图片
    p.onChooseImgBtnTouch = function () {
        //选择相册图片
        var self = this;
        var chooseImageBody = {
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                egret.log("选择相册的ID:", localIds);
                self.selectID = localIds[0];
                //self.showPic(localIds[0]);
            },
            fail: function () {
                egret.log("上传失败");
            }
        };
        wx.chooseImage(chooseImageBody);
    };
    //测颜值，上传图片到微信服务端，将返回的图片ID传递给信步服务端对接face++，再传数据回来
    p.onTestBtnTouch = function () {
        egret.log("上传图片:", this.selectID);
        var self = this;
        wx.uploadImage({
            localId: this.selectID,
            isShowProgressTips: 1,
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                self.serverID = serverId;
                self.uploadImageToXB();
            },
            fail: function () {
                //TODO show error msg
            }
        });
    };
    //图片上传微信服务端后，发消息给xb服务端
    p.uploadImageToXB = function () {
        this.http.completeHandler = this.revUploadImageToXB;
        this.http.httpMethod = egret.HttpMethod.POST;
        var data = "mediaId=" + this.serverID
            + "&teamName=" + MyTeam.getInstance().myTeamName
            + "&_csrf=" + GameConst.csrf;
        this.http.send("http://wx.mcw9.com/face360/upload", data, this);
    };
    p.revUploadImageToXB = function (data) {
        egret.log("revUploadImage:", data);
        var json = JSON.parse(data);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var face_width = json.width;
        var face_height = json.height;
        var face_center = json.center;
        egret.log(msg);
        if (code == 200) {
            var data = json.data;
            var age = data.age;
            var gender = data.gender;
            var fscore = data.fscore;
            var isCaptain = data.isCaptain;
        }
        else {
        }
    };
    //显示图片
    p.showPic = function (url) {
        var imgload = new egret.ImageLoader();
        imgload.addEventListener(egret.Event.COMPLETE, function () {
            var bm = new egret.Bitmap(imgload.data);
            this.addChild(bm);
        }, this);
        imgload.load(url);
    };
    return EditFaceScene;
})(BaseScene);
egret.registerClass(EditFaceScene,'EditFaceScene');
