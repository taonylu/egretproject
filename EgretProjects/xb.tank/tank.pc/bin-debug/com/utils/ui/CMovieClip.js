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
        this.delay = 1000 / 24; //每帧计时
        this.timer = new egret.Timer(this.delay);
    }
    var d = __define,c=CMovieClip,p=c.prototype;
    /**
     * 添加图片
     * @bmName 图片名称
     * @startIndex 起始数字
     * @endIndex 终止数字
     * 例如图片 img0.png img1.png img2.png，则addTexture("img",0,2)
     */
    p.addTexture = function (bmName, startIndex, endIndex) {
        this.textureList.length = 0;
        this.texture = null;
        for (var i = startIndex; i <= endIndex; i++) {
            this.textureList.push(RES.getRes(bmName + i + "_png"));
            console.log(bmName + i + "_png");
        }
        //显示第一帧
        this.texture = this.textureList[0];
        this.totalFrame = this.textureList.length;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    //播放动画
    p.play = function () {
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
            return;
        }
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
            this.delay = Math.round(1000 / value);
            this.timer && (this.timer.delay = this.delay);
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
}(egret.Bitmap));
egret.registerClass(CMovieClip,'CMovieClip');
//# sourceMappingURL=CMovieClip.js.map