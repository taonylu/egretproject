/**
 * 结果界面
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.qrcode = new QRCode();
        this.qrcode.createCode();
        this.resultGroup.y = GameConst.stage.stageHeight - this.resultGroup.height;
        this.htmlText = new HTMLText();
        var xPos = 80 / 640 * document.body.clientWidth;
        var yPos = (this.resultGroup.y + 310) / 1150 * document.body.clientHeight;
        this.htmlText.setPosition(xPos, yPos);
        this.setPrizeLabel("");
        this.setCodeLabel("");
    };
    p.onEnable = function () {
        //显示二维码
        var yPos = document.body.clientHeight * (820 / 1150);
        this.qrcode.showCode(20, yPos, 70, 70);
        this.setPrizeLabel(GameConst.prizeJson.msg); //奖品描述
        this.setCodeLabel(GameConst.prizeJson.prizenum); //优惠券码
        this.setPrizeImg(GameConst.prizeJson.prizeid); //奖品图片         
    };
    p.onRemove = function () {
        this.qrcode.hideCode();
    };
    p.setPrizeLabel = function (prize) {
        this.prizeLabel.text = prize;
    };
    p.setCodeLabel = function (code) {
        //this.codeLabel.text = code;
        this.htmlText.setValue(code);
    };
    p.setPrizeImg = function (prizeid) {
        this.moneyImg.visible = false;
        this.itemImg.visible = false;
        this.moneybg.visible = false;
        if (prizeid >= 1 && prizeid <= 5) {
            this.itemImg.visible = true;
            this.itemImg.texture = RES.getRes("prize" + prizeid + "_png");
        }
        else if (prizeid >= 6 && prizeid <= 9) {
            this.moneybg.visible = true;
            this.moneyImg.visible = true;
            this.moneyImg.texture = RES.getRes("prize" + prizeid + "_png");
        }
    };
    return ResultScene;
})(BaseScene);
egret.registerClass(ResultScene,'ResultScene');
