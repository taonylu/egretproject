/**
 *
 * @author
 *
 */
var Example1 = (function (_super) {
    __extends(Example1, _super);
    function Example1() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.componentCreated, this);
        this.skinName = "resource/myskin/Example1Skin.exml";
        console.log("example1");
    }
    var d = __define,c=Example1,p=c.prototype;
    p.componentCreated = function () {
        console.log("created");
        //        this.video = new egret.Video();
        //        this.video.x = 0;                       //设置视频坐标x
        //        this.video.y = 0;                       //设置视频坐标y
        //       // this.video.width = 400;                 //设置视频宽
        //       // this.video.height = 800;                //设置视频高
        //        //this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        //        //this.video.poster = "resource/post.png"; //设置loding图
        //        this.video.load("resource/assets/trailer.mp4");
        //        this.addChild(this.video);              //将视频添加到舞台
        //        //监听视频加载完成
        //        //this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        //        //监听视频加载失败
        //        //this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        //        
        //        var btnPlay: eui.Button = new eui.Button(); //新建播放按钮
        //        btnPlay.label = "播放";
        //        btnPlay.x = this.video.x + 20;
        //        btnPlay.y = this.video.y + this.video.height + 20;
        //        this.addChild(btnPlay);
        //        //监听按钮行为，当按下时调用播放函数。
        //        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        this.video = new egret.Video();
        this.video.height = Example1.stage.stageHeight;
        this.video.width = 320 * Example1.stage.stageHeight / 176;
        this.video.x = -(this.video.width - Example1.stage.stageWidth) / 2;
        this.video.y = 0;
        this.video.fullscreen = false;
        this.video.touchEnabled = true;
        this.video.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play, this);
        this.video.load("resource/assets/movie.mp4");
        this.addChild(this.video);
    };
    p.onLoad = function (e) {
    };
    p.onLoadErr = function (e) {
        console.log("video load error happened");
    };
    p.play = function (e) {
        this.video.play();
    };
    return Example1;
})(eui.Component);
egret.registerClass(Example1,'Example1');
