/**
 *
 * @author
 *
 */
var Camp = (function (_super) {
    __extends(Camp, _super);
    function Camp() {
        _super.call(this);
        this.skinName = "CampSkin";
        this.setType(TileEnum.camp);
        this.canHit = true;
        this.canWalk = false;
        this.gameOverPos.x = this.destory.x;
        this.gameOverPos.y = this.destory.y;
        this.reset();
    }
    var d = __define,c=Camp,p=c.prototype;
    //override
    p.beAttacked = function (target) {
        return true;
    };
    //override
    p.reset = function () {
        this.setNormal();
    };
    p.setNormal = function () {
        this.normal.visible = true;
        this.gameOver.visible = false;
        this.destory.visible = false;
    };
    p.setGameOver = function () {
        this.normal.visible = false;
        this.gameOver.visible = true;
        this.destory.visible = true;
        this.gameOver.x = this.gameOverPos.x;
        this.gameOver.y = this.gameOverPos.y;
        egret.Tween.get(this.gameOver).to({ y: this.gameOverPos.y - 64 }, 1000);
    };
    Camp.NAME = "Camp";
    return Camp;
}(BaseTile));
egret.registerClass(Camp,'Camp');
