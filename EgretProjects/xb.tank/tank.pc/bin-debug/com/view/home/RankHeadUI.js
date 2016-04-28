/**
 * 首页的排行榜头像
 * @author
 *
 */
var RankHeadUI = (function (_super) {
    __extends(RankHeadUI, _super);
    function RankHeadUI() {
        _super.call(this);
        this.skinName = "RankHeadSKin";
    }
    var d = __define,c=RankHeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    //设置头像
    p.setHead = function (p1HeadUrl, p2HeadUrl) {
        if (p1HeadUrl != "") {
            this.p1HeadUI.loadImg(p1HeadUrl);
        }
        if (p2HeadUrl != "") {
            this.p2HeadUI.loadImg(p2HeadUrl);
        }
    };
    //设置历史关卡
    p.setHistory = function (stage, wave) {
        if (stage < 3) {
            this.stageLabel.text = "STAGE" + stage;
            this.waveLabel.text = "";
        }
        else {
            this.stageLabel.text = "S" + stage;
            this.waveLabel.text = "WAVE." + wave;
        }
    };
    p.clear = function () {
        this.stageLabel.text = "";
        this.waveLabel.text = "";
        this.p1HeadUI.clear();
        this.p2HeadUI.clear();
    };
    return RankHeadUI;
}(BaseUI));
egret.registerClass(RankHeadUI,'RankHeadUI');
