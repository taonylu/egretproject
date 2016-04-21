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
        var wall;
        var isHit = false;
        for (var i = 0; i < 16; i++) {
            wall = this.steelList[i];
            if (wall.visible == true) {
                if (Math.abs(wall.x - 32 - target.x) < 48 && Math.abs(wall.y - 32 - target.y) < 48) {
                    wall.visible = false;
                    isHit = true;
                }
            }
        }
        return isHit;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool("Steel").returnObject(this);
    };
    return Steel;
}(BaseUI));
egret.registerClass(Steel,'Steel');
