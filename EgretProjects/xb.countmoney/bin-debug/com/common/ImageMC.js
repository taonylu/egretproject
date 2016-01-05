/**
 * 切换Image
 * 舞台上有多个Image，将Image保存到数组，然后播放
 * @author
 *
 */
var ImageMC = (function () {
    function ImageMC() {
        this.imgeList = []; //Image数组
        this.curFrame = 0; //当前帧，帧从0开始
        this.totalFrame = 0; //总帧数，等于图片总数
    }
    var d = __define,c=ImageMC,p=c.prototype;
    p.addImage = function (img) {
        this.imgeList.push(img);
        this.totalFrame++;
        if (this.totalFrame == 1) {
            this.curImg = img;
        }
        else {
            img.visible = false;
        }
    };
    p.nextFrame = function () {
        this.curFrame++;
        if (this.curFrame >= this.totalFrame) {
            this.curFrame = 0;
        }
        this.curImg.visible = false; //显示下一张图片
        this.curImg = this.imgeList[this.curFrame];
        this.curImg.visible = true;
    };
    return ImageMC;
})();
egret.registerClass(ImageMC,'ImageMC');
