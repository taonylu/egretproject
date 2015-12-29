/**
 *
 * @author
 * 自定义MovieClip, 初始帧为1
 */
var CMovieClip = (function (_super) {
    __extends(CMovieClip, _super);
    function CMovieClip() {
        _super.call(this);
        this.textureList = []; //保存纹理列表
        this.curFrame = 0; //当前帧
        this.totalFrame = 0; //总帧数
        this.frameTime = 20; //每帧计时
    }
    var d = __define,c=CMovieClip;p=c.prototype;
    //添加图片
    p.addTexture = function (bmName) {
        this.textureList.push(RES.getRes(bmName));
        this.totalFrame = this.textureList.length;
        //只显示第一帧
        if (this.totalFrame == 1) {
            this.texture = this.textureList[0];
        }
    };
    //播放动画
    p.play = function () {
        this.startTimer();
    };
    //跳转到指定帧并播放
    p.gotoAndPlay = function (frame) {
        this.gotoAndStop(frame);
        this.play();
    };
    //停止动画
    p.stop = function () {
        this.stopTimer();
    };
    //跳转并停留在指定帧，从第1帧开始
    p.gotoAndStop = function (frame) {
        this.texture = this.textureList[frame - 1];
        this.curFrame = frame;
    };
    p.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(this.frameTime);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    };
    p.onTimerHandler = function () {
        this.curFrame++;
        if (this.curFrame > this.totalFrame) {
            this.curFrame = 1;
        }
        this.gotoAndStop(this.curFrame);
    };
    p.stopTimer = function () {
        if (this.timer != null) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            this.timer.stop();
        }
    };
    d(p, "frameRate",undefined
        ,function (value) {
            this.frameTime = value;
            this.timer && (this.timer.delay = value);
        }
    );
    //销毁
    p.destory = function () {
        this.stopTimer();
        this.timer = null;
        var len = this.textureList.length;
        for (var i = 0; i < len; i++) {
            this.textureList[i].dispose();
        }
        this.textureList.length = 0;
    };
    return CMovieClip;
})(egret.Bitmap);
egret.registerClass(CMovieClip,"CMovieClip");
