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
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.curFrame++;
        if (this.curFrame > this.totalFrame) {
            this.curFrame = 1;
            this.stop();
        }
        this.texture = this.textureList[this.curFrame - 1];
    };
    p.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    return FrameMovie;
})(egret.Bitmap);
egret.registerClass(FrameMovie,'FrameMovie');
