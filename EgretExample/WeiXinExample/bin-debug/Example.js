/**
 *
 * @author
 *
 */
var Example = (function () {
    //---------------------测试官方提供的weixin-------------------
    function Example() {
        egret.log("测试微信接口2");
        var bodyConfig = new BodyConfig();
        //body配置
        bodyConfig.debug = window["wx_debug"];
        bodyConfig.appId = window["wx_appid"];
        bodyConfig.timestamp = window["wx_timestamp"];
        bodyConfig.nonceStr = window["wx_nonceStr"];
        bodyConfig.signature = window["wx_signature"];
        bodyConfig.jsApiList = ["onMenuShareTimeline", "BodyMenuShareAppMessage", "chooseImage", "previewImage",
            "uploadImage", "downloadImage", "startRecord", "openLocation", "getLocation"];
        egret.log(bodyConfig.debug);
        egret.log(bodyConfig.appId);
        egret.log(bodyConfig.timestamp);
        egret.log(bodyConfig.nonceStr);
        egret.log(bodyConfig.signature);
        if (wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            //接口验证失败
            wx.error(function () {
                egret.log("接口验证失败");
            });
            //接口验证成功
            wx.ready(function () {
                //分享朋友圈
                var body = new BodyMenuShareTimeline();
                wx.onMenuShareTimeline(body);
                body.title = "123";
                body.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                body.link = "http://www.baidu.com";
                body.success = function () {
                    egret.log("分享成功");
                };
                body.fail = function () {
                    egret.log("分享失败");
                };
                body.cancel = function () {
                    egret.log("分享删除");
                };
                //分享好友
                var bodyFriend = new BodyMenuShareAppMessage();
                wx.onMenuShareAppMessage(bodyFriend);
                bodyFriend.title = "分享给好友";
                bodyFriend.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                bodyFriend.link = "http://www.baidu.com";
                bodyFriend.desc = "分享好友描述";
                bodyFriend.success = function () {
                    egret.log("分享好友");
                };
            });
        }
        //打开相册
        var self = this;
        var openImgs;
        var chooseBtn = this.getSprite();
        chooseBtn.x = 0;
        chooseBtn.y = 0;
        chooseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //选择相册图片
            var chooseImageBody = {
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    openImgs = localIds;
                    egret.log("选择相册的ID:", localIds);
                    self.showPic(localIds[0]);
                },
                fail: function () {
                    egret.log("上传失败");
                }
            };
            wx.chooseImage(chooseImageBody);
        }, this);
        //上传图片，只能序列上传，再传递完一张后，传递另一张
        var serverImgs;
        var uploadBtn = this.getSprite();
        uploadBtn.x = 100;
        uploadBtn.y = 0;
        uploadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.uploadImage({
                localId: openImgs[0] + "",
                isShowProgressTips: 1,
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    serverImgs = serverId;
                }
            });
        }, this);
        //下载图片
        var downloadBtn = this.getSprite();
        downloadBtn.x = 200;
        downloadBtn.y = 0;
        downloadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.downloadImage({
                serverId: serverImgs,
                isShowProgressTips: 1,
                success: function (res) {
                    var localId = res.localId; // 返回图片下载后的本地ID
                    self.showPic(localId);
                }
            });
        }, this);
        //开始录音
        var recordBtn = this.getSprite();
        recordBtn.x = 300;
        recordBtn.y = 0;
        recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.startRecord({});
        }, this);
        //获取地理位置
        var location = { latitude: "", longitude: "" };
        var getLocationBtn = this.getSprite();
        getLocationBtn.x = 0;
        getLocationBtn.y = 100;
        getLocationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    location.latitude = latitude;
                    location.longitude = longitude;
                    egret.log("获取地理位置speed:", speed, "accuracy:", accuracy);
                }
            });
        }, this);
        //微信内置地图查看地理位置
        var openLocationBtn = this.getSprite();
        openLocationBtn.x = 100;
        openLocationBtn.y = 100;
        openLocationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            wx.openLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                name: '啊',
                address: '哦',
                scale: 20,
                infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转（并没有跳转链接）
            });
        }, this);
    }
    var d = __define,c=Example,p=c.prototype;
    //显示图片
    p.showPic = function (url) {
        var imgload = new egret.ImageLoader();
        imgload.addEventListener(egret.Event.COMPLETE, function () {
            var bm = new egret.Bitmap(imgload.data);
            bm.width = 100;
            bm.height = 100;
            bm.x = 300;
            bm.y = 300;
            GameConst.stage.addChild(bm);
            //截取图片后保存到本地，然后上传到微信
            //1. 获取本地相册图片
            //2. 图片使用ImageLoader加载成Bitmap
            //3. 使用renderTexture进行截取部分图片
            //4. 截取的部分图片无法使用toDataURL，由于跨域问题
            /*
            var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(bm);
            
            var bm2: egret.Bitmap = new egret.Bitmap(renderTexture);
            bm2.width = 100;
            bm2.height = 100;
            bm2.x = 400;
            bm2.y = 400;
            GameConst.stage.addChild(bm2);
            
            
            
            egret.log("绘制纹理:",renderTexture.textureWidth, renderTexture.textureHeight);
            var base64 = renderTexture.toDataURL("image/jpeg");
            egret.log("base64:",base64);
            
            //弹出提示框。
            renderTexture.saveToFile("image/jpeg","down.jpeg",new egret.Rectangle(20,20,20,20));
            
            wx.uploadImage({
                localId: "down.jpeg", // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                
                }
            });
            */
        }, this);
        imgload.load(url);
    };
    p.getSprite = function () {
        var sp = new egret.Sprite();
        sp.touchEnabled = true;
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawRect(0, 0, 90, 50);
        sp.graphics.endFill();
        GameConst.stage.addChild(sp);
        return sp;
    };
    return Example;
})();
egret.registerClass(Example,'Example');
