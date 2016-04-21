/**
 * 墙，分16块
 * @author
 *
 */
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        _super.call(this, "WallSkin");
        this.wallList = new Array();
        this.type = TileEnum.wall; //类型
        this.life = 0; //生命值
    }
    var d = __define,c=Wall,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < 16; i++) {
            var wall = this["wall" + i];
            wall.anchorOffsetX = wall.width / 2;
            wall.anchorOffsetY = wall.height / 2;
            wall.x += wall.width / 2;
            wall.y += wall.height / 2;
            this.wallList.push(wall);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    //重置方块
    p.reset = function () {
        for (var i = 0; i < 16; i++) {
            this.wallList[i].visible = true;
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
            wall = this.wallList[i];
            if (wall.visible == true) {
                if (Math.abs(wall.x - 32 - target.x) < 40 && Math.abs(wall.y - 32 - target.y) < 40) {
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
        ObjectPool.getPool("Wall").returnObject(this);
    };
    return Wall;
}(BaseUI));
egret.registerClass(Wall,'Wall');
