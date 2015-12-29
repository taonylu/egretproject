/**
 * 获奖文本
 * @author
 *
 */
var LuckText = (function (_super) {
    __extends(LuckText, _super);
    function LuckText() {
        _super.call(this, "LuckTextSkin");
        this.__name = "";
        this.__prize = "";
    }
    var d = __define,c=LuckText,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.setNameLabel(this.__name);
        this.setPrizeLabel(this.__prize);
    };
    p.setNameLabel = function (nickname) {
        this.__name = nickname;
        if (this.inited) {
            this.nameLabel.text = this.__name;
        }
    };
    p.setPrizeLabel = function (prize) {
        this.__prize = prize;
        if (this.inited) {
            this.prizeLabel.text = this.__prize;
        }
    };
    return LuckText;
})(BaseUI);
egret.registerClass(LuckText,'LuckText');
