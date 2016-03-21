/**
 * 奖品格子
 * @author
 *
 */
var PrizeGrid = (function (_super) {
    __extends(PrizeGrid, _super);
    function PrizeGrid() {
        _super.call(this);
        this.skinName = "PrizeGridSkin";
    }
    var d = __define,c=PrizeGrid,p=c.prototype;
    p.hideAll = function () {
        this.back.visible = false;
        this.resultBg.visible = false;
        this.light.visible = false;
        this.thx.visible = false;
        this.luck.visible = false;
        this.bigLuck.visible = false;
    };
    //显示选中时高亮
    p.showLight = function () {
        this.light.visible = true;
    };
    //显示未有结果前的格子背景
    p.showBack = function () {
        this.hideAll();
        this.back.visible = true;
    };
    //谢谢参与
    p.showThx = function () {
        this.hideAll();
        this.resultBg.visible = true;
        this.thx.visible = true;
    };
    //幸运奖
    p.showLuck = function () {
        this.hideAll();
        this.resultBg.visible = true;
        this.luck.visible = true;
    };
    //幸运大奖
    p.showBigLuck = function () {
        this.hideAll();
        this.resultBg.visible = true;
        this.bigLuck.visible = true;
    };
    return PrizeGrid;
}(eui.Component));
egret.registerClass(PrizeGrid,'PrizeGrid');
