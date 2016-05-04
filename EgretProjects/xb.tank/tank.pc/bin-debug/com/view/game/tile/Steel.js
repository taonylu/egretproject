/**
 * 钢铁。
 * @author
 *
 */
var Steel = (function (_super) {
    __extends(Steel, _super);
    function Steel() {
        _super.call(this);
        this.steelList = new Array();
        this.type = TileEnum.steel; //类型
        this.skinName = "SteelSkin";
        this.setType(TileEnum.steel);
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
            this.steelList.push(steel);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.reset();
    };
    //override 重置方块
    p.reset = function () {
        for (var i = 0; i < 4; i++) {
            this.steelList[i].visible = true;
        }
        this.life = 4;
    };
    //因为地图编辑没做一半的方块，这里手动设置只剩哪一半，用于基地附近显示，0上半，1下半，2左半，3右半，4左下，5右下
    p.setTileHalf = function (type) {
        switch (type) {
            case 0:
                this.steelList[2].visible = false;
                this.steelList[3].visible = false;
                this.life = 2;
                break;
            case 1:
                this.steelList[0].visible = false;
                this.steelList[1].visible = false;
                this.life = 2;
                break;
            case 2:
                this.steelList[1].visible = false;
                this.steelList[3].visible = false;
                this.life = 2;
                break;
            case 3:
                this.steelList[0].visible = false;
                this.steelList[2].visible = false;
                this.life = 2;
                break;
            case 4:
                this.steelList[0].visible = false;
                this.steelList[1].visible = false;
                this.steelList[3].visible = false;
                this.life = 1;
                break;
            case 5:
                this.steelList[0].visible = false;
                this.steelList[1].visible = false;
                this.steelList[2].visible = false;
                this.life = 1;
                break;
        }
    };
    /**
     * 被攻击
     * @target 子弹
     * @return 返回击中是否有效
     */
    p.beAttacked = function (target) {
        if (target.power < 3) {
            return false;
        }
        var steel;
        var len = this.steelList.length;
        for (var i = 0; i < len; i++) {
            steel = this.steelList[i];
            if (steel.visible == true) {
                //转换坐标为bullet所在容器坐标，再计算碰撞半径
                if (Math.abs(this.x + steel.x - 32 - target.x) < 48 && Math.abs(this.y + steel.y - 32 - target.y) < 48) {
                    steel.visible = false;
                    this.life--;
                }
            }
        }
        if (this.life <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //碰撞检测，taraget是子弹或者坦克
    p.checkCollision = function (target) {
        //下一步坐标
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        //目标和地形的半径碰撞
        var steel;
        for (var i = 0; i < 4; i++) {
            steel = this.steelList[i];
            if (steel.visible == true) {
                //将墙块坐标换成target容器坐标
                if (Math.abs(this.x + steel.x - 32 - nextX) < (16 + target.hitHalfWidth) && Math.abs(this.y + steel.y - 32 - nextY) < (16 + target.hitHalfWidth)) {
                    return true;
                }
            }
        }
        return false;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Steel.NAME).returnObject(this);
    };
    Steel.NAME = "Steel";
    return Steel;
}(BaseTile));
egret.registerClass(Steel,'Steel');
