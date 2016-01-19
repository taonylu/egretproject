/**
* 游戏方块
*/
var BlockUI = (function (_super) {
    __extends(BlockUI, _super);
    function BlockUI() {
        _super.call(this);
        this.touchEnabled = true;
    }
    var d = __define,c=BlockUI,p=c.prototype;
    //设置皮肤外观Texture
    p.setSkin = function (skinID) {
        this.touchEnabled = true;
        this.texture = RES.getRes("block" + skinID + "_png");
        this.skinID = skinID;
    };
    //方块回收
    p.hide = function () {
        var self = this;
        this.touchEnabled = false;
        egret.Tween.get(this).to({ alpha: 0.2 }, 300, egret.Ease.quadOut).call(function () {
            self.parent && self.parent.removeChild(self);
            ObjectPool.getPool(BlockUI.NAME).returnObject(self);
            self.alpha = 1;
        });
    };
    //立刻隐藏，防止方块动画未播放完成，再次使用该方块
    p.hideImmediately = function () {
        egret.Tween.removeTweens(this);
        this.touchEnabled = false;
        this.parent && this.parent.removeChild(this);
        this.alpha = 1;
    };
    BlockUI.NAME = "BlockUI";
    return BlockUI;
})(egret.Bitmap);
egret.registerClass(BlockUI,'BlockUI');
