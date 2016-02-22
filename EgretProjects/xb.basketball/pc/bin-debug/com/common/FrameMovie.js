/**
 * 逐帧动画
 * 使用一张整图序列图，使用代码裁剪后拼成成动画
 * @author
 *
 */
var FrameMovie = (function (_super) {
    __extends(FrameMovie, _super);
    function FrameMovie(srcBm, row, col, cellWidth, cellHeight) {
        _super.call(this);
        this.textureList = new Array(); //纹理数组
        this.curFrame = 1; //当前帧，从1开始
        this.delay = 1000 / 20; //计时延迟
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var rect = new egret.Rectangle(j * cellHeight, i * cellWidth, cellWidth, cellHeight);
                var texture = new egret.RenderTexture();
                texture.drawToTexture(srcBm, rect, 1);
                this.textureList.push(texture);
            }
        }
        this.curFrame = 1;
        this.totalFrame = row * col;
        this.texture = this.textureList[this.curFrame - 1];
    }
    var d = __define,c=FrameMovie,p=c.prototype;
    p.play = function () {
        this.curFrame = 1;
        this.texture = this.textureList[this.curFrame - 1];
        this.startTimer();
    };
    p.stop = function () {
        this.stopTimer();
    };
    p.onTimerHandler = function () {
        this.curFrame++;
        if (this.curFrame > this.totalFrame) {
            this.curFrame = 1;
            this.stopTimer();
        }
        this.texture = this.textureList[this.curFrame - 1];
    };
    p.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(this.delay);
        }
        this.timer.delay = this.delay;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    };
    p.stopTimer = function () {
        if (this.timer) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            this.timer.stop();
        }
    };
    return FrameMovie;
})(egret.Bitmap);
egret.registerClass(FrameMovie,'FrameMovie');
