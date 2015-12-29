/**
*  文 件 名：Block.ts
*  功    能：方块
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        _super.call(this);
        var self = this;
        self.touchEnabled = true;
        self.bg = new egret.Bitmap(RES.getRes("facebg1_png"));
        self.flash = new egret.Bitmap(RES.getRes("faceflash_png"));
        self.selectBg = new egret.Bitmap(RES.getRes("facebg2_png"));
        self.face = new egret.Bitmap();
        self.addChild(self.bg);
        self.addChild(self.selectBg);
        self.addChild(self.flash);
        self.addChild(self.face);
        self.flash.visible = false;
        self.selectBg.visible = false;
        this.scaleX = 2;
        this.scaleY = 2;
        Block.cellWidth = this.width * this.scaleX;
    }
    var __egretProto__ = Block.prototype;
    //重置
    __egretProto__.reset = function () {
        this.stopFlash();
        this.flash.visible = false;
        this.selectBg.visible = false;
        this.bg.visible = true;
    };
    //设置皮肤 index=1~45
    __egretProto__.setSkin = function (index) {
        //        if(this.face.texture) { 
        //            this.face.texture.dispose();
        //        }
        this.face.texture = RES.getRes("face" + index + "_png");
        this.setCenter(this.face);
    };
    //设置ui在本容器居中
    __egretProto__.setCenter = function (ui) {
        ui.x = (this.width - ui.width) / 2;
        ui.y = (this.height - ui.height) / 2;
    };
    //设置选中状态
    __egretProto__.setSelect = function (bSelect) {
        if (bSelect) {
            this.selectBg.visible = true;
            this.bg.visible = false;
        }
        else {
            this.selectBg.visible = false;
            this.bg.visible = true;
        }
    };
    __egretProto__.startFlash = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(500);
        }
        this.timer.reset();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
        this.flash.visible = true;
    };
    __egretProto__.onTimerHandler = function (e) {
        this.flash.visible = !this.flash.visible;
    };
    __egretProto__.stopFlash = function () {
        if (this.timer) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            this.timer.stop();
        }
        this.flash.visible = false;
    };
    __egretProto__.hide = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            this.reset();
            ObjectPool.getPool(Block.NAME).returnObject(this);
        }
    };
    Block.NAME = "Block";
    return Block;
})(egret.Sprite);
Block.prototype.__class__ = "Block";
