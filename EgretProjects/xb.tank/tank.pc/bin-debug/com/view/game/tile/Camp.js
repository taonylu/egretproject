/**
 *
 * @author
 *
 */
var Camp = (function (_super) {
    __extends(Camp, _super);
    function Camp() {
        _super.call(this);
        this.gameOverPos = new egret.Point();
        this.skinName = "CampSkin";
        this.setType(TileEnum.camp);
        this.canHit = true;
        this.canWalk = false;
    }
    var d = __define,c=Camp,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.reset();
    };
    //override
    p.beAttacked = function (target) {
        if (this.normal.visible) {
            return true;
        }
        else {
            return false;
        }
    };
    //override
    p.reset = function () {
        this.setNormal();
    };
    p.setNormal = function () {
        this.normal.visible = true;
        this.destoryImg.visible = false;
    };
    p.setGameOver = function () {
        this.normal.visible = false;
        this.destoryImg.visible = true;
    };
    Camp.NAME = "Camp";
    return Camp;
}(BaseTile));
egret.registerClass(Camp,'Camp');
