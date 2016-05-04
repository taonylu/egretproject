/**
 * 墙，分16块
 * @author
 *
 */
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        _super.call(this);
        this.wallList = new Array();
        this.type = TileEnum.wall; //类型
        this.skinName = "WallSkin";
        this.setType(TileEnum.wall);
        this.canHit = true;
        this.canWalk = false;
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
        this.reset();
    };
    //override 重置方块
    p.reset = function () {
        for (var i = 0; i < 16; i++) {
            this.wallList[i].visible = true;
        }
        this.life = 16;
    };
    //因为地图编辑没做一半的方块，这里手动设置砖块只剩哪一半，用于基地附近砖块显示，0上半，1下半，2左半，3右半，4左下，5右下
    p.setTileHalf = function (type) {
        switch (type) {
            case 0:
                for (var i = 8; i < 16; i++) {
                    this.wallList[i].visible = false;
                }
                this.life = 8;
                break;
            case 1:
                for (var i = 0; i < 8; i++) {
                    this.wallList[i].visible = false;
                }
                this.life = 8;
                break;
            case 2:
                for (var i = 0; i < 4; i++) {
                    for (var j = 2; j < 4; j++) {
                        this.wallList[i * 4 + j].visible = false;
                    }
                }
                this.life = 8;
                break;
            case 3:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 2; j++) {
                        this.wallList[i * 4 + j].visible = false;
                    }
                }
                this.life = 8;
                break;
            case 4:
                for (var i = 0; i < 16; i++) {
                    this.wallList[i].visible = false;
                }
                for (var i = 2; i < 4; i++) {
                    for (var j = 0; j < 2; j++) {
                        this.wallList[i * 4 + j].visible = true;
                    }
                }
                this.life = 4;
                break;
            case 5:
                for (var i = 0; i < 16; i++) {
                    this.wallList[i].visible = false;
                }
                for (var i = 2; i < 4; i++) {
                    for (var j = 2; j < 4; j++) {
                        this.wallList[i * 4 + j].visible = true;
                    }
                }
                this.life = 4;
                break;
        }
    };
    /**
     * 被攻击
     * @target 子弹
     * @return 返回地形是否被击毁
     */
    p.beAttacked = function (bullet) {
        var wall;
        for (var i = 0; i < 16; i++) {
            wall = this.wallList[i];
            if (wall.visible == true) {
                //转换砖块坐标为bullet所在容器坐标，再计算碰撞半径
                //子弹是横着移动，则计算y范围扩大到32
                if (bullet.speedX != 0) {
                    if (Math.abs(this.x + wall.x - 32 - bullet.x) < 24 && Math.abs(this.y + wall.y - 32 - bullet.y) < 40) {
                        wall.visible = false;
                        this.life--;
                    }
                }
                else {
                    //子弹是竖着移动，则判断x范围扩大到32
                    if (Math.abs(this.x + wall.x - 32 - bullet.x) < 40 && Math.abs(this.y + wall.y - 32 - bullet.y) < 24) {
                        wall.visible = false;
                        this.life--;
                    }
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
        var wall;
        for (var i = 0; i < 16; i++) {
            wall = this.wallList[i];
            if (wall.visible == true) {
                //将墙块坐标换成target容器坐标
                if (Math.abs(this.x + wall.x - 32 - nextX) < (8 + target.hitHalfWidth) && Math.abs(this.y + wall.y - 32 - nextY) < (8 + target.hitHalfWidth)) {
                    return true;
                }
            }
        }
        return false;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Wall.NAME).returnObject(this);
    };
    Wall.NAME = "Wall";
    return Wall;
}(BaseTile));
egret.registerClass(Wall,'Wall');
