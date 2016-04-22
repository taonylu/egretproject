/**
 * 钢铁。
 * @author
 *
 */
var Steel = (function (_super) {
    __extends(Steel, _super);
    function Steel() {
        _super.call(this, "SteelSkin");
        this.steelList = new Array();
        this.type = TileEnum.steel; //类型
        this.life = 0; //生命值
        this.canHit = false; //可以被击中
        this.canWalk = false; //能够行走
        this.canHit = true;
        this.canWalk = false;
    }
    var d = __define,c=Steel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < 4; i++) {
            var steel = this["steel" + i];
            steel.anchorOffsetX = steel.width / 2;
            steel.anchorOffsetY = steel.height / 2;
            steel.x += steel.width / 2;
            steel.y += steel.height / 2;
            this.steelList.push(this["steel" + i]);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    //重置方块
    p.reset = function () {
        for (var i = 0; i < 4; i++) {
            this.steelList[i].visible = true;
        }
    };
    /**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效
     */
    p.beAttacked = function (target) {
        var steel;
        var isHit = false;
        var len = this.steelList.length;
        for (var i = 0; i < len; i++) {
            steel = this.steelList[i];
            if (steel.visible == true) {
                if (Math.abs(this.x + steel.x - 32 - target.x) < 48 && Math.abs(this.y + steel.y - 32 - target.y) < 48) {
                    steel.visible = false;
                    isHit = true;
                }
            }
        }
        return isHit;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Steel.NAME).returnObject(this);
    };
    Steel.NAME = "Steel";
    return Steel;
}(BaseUI));
egret.registerClass(Steel,'Steel');
