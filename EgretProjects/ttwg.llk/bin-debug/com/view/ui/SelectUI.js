/**
*  功    能：选择框
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var SelectUI = (function (_super) {
    __extends(SelectUI, _super);
    function SelectUI() {
        _super.call(this);
        this.timer = new egret.Timer(300);
        this.selectMini = new egret.Bitmap(RES.getRes("select0_png"));
        this.selectBig = new egret.Bitmap(RES.getRes("select1_png"));
        this.addChild(this.selectMini);
        this.addChild(this.selectBig);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
    }
    var d = __define,c=SelectUI;p=c.prototype;
    //在目标处播放动画
    p.play = function (target) {
        this.x = target.x - 15;
        this.y = target.y - 15;
        target.parent.addChild(this);
        this.timer.reset();
        this.timer.start();
        this.selectMini.visible = true;
        this.selectBig.visible = false;
    };
    //停止动画，并从舞台移除
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.timer.stop();
        this.selectMini.visible = true;
        this.selectBig.visible = false;
    };
    //每隔时间切换显示状态
    p.onTimerHandler = function (e) {
        if (this.timer.currentCount % 2 == 0) {
            this.selectMini.visible = true;
            this.selectBig.visible = false;
        }
        else {
            this.selectMini.visible = false;
            this.selectBig.visible = true;
        }
    };
    return SelectUI;
})(egret.Sprite);
egret.registerClass(SelectUI,"SelectUI");
