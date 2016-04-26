/**
 * 坦克基类
 * @author
 *
 */
var BaseTank = (function (_super) {
    __extends(BaseTank, _super);
    function BaseTank() {
        _super.call(this);
        this.className = ""; //类名
        this.skin = ""; //坦克皮肤
        this.speed = 4; //移动速度
        this.speedX = 0; //x，y轴移动速度
        this.speedY = 0;
        this.power = 0; //子弹威力
        this.life = 0; //生命值
        this.shootTime = 0; //射击间隔时间，单位ms
        this.shootCount = 0; //射击计时，单位帧
        this.hitWidth = 64; //碰撞检测范围，因为切图大小并不是64x64，所以不能取width判断碰撞范围，这里自定义一个变量
        this.hitHalfWidth = 32;
        //自动移动
        this.turnCount = 60;
        this.className = egret.getQualifiedClassName(this);
    }
    var d = __define,c=BaseTank,p=c.prototype;
    //移动
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    //播放移动动画，敌方坦克不会停止移动
    p.playMove = function () {
    };
    //设置行动
    p.actionHandler = function (actionType) {
        if (this.speedX == 0 && this.speedY == 0 && actionType != ActionEnum.stopMove) {
            this.playMove();
        }
        switch (actionType) {
            case ActionEnum.up:
                this.speedX = 0;
                this.speedY = -this.speed;
                this.rotation = 0;
                this.direction = DirectionEnum.up;
                break;
            case ActionEnum.down:
                this.speedX = 0;
                this.speedY = this.speed;
                this.rotation = 180;
                this.direction = DirectionEnum.down;
                break;
            case ActionEnum.left:
                this.speedX = -this.speed;
                this.speedY = 0;
                this.rotation = -90;
                this.direction = DirectionEnum.left;
                break;
            case ActionEnum.right:
                this.speedX = this.speed;
                this.speedY = 0;
                this.rotation = 90;
                this.direction = DirectionEnum.right;
                break;
            case ActionEnum.stopMove:
                this.speedX = 0;
                this.speedY = 0;
                this.stop();
                break;
        }
    };
    //自动转向，优先往下
    p.autoTurn = function () {
        if (this.direction != DirectionEnum.down) {
            var actionType = ActionEnum.down;
        }
        else {
            actionType = NumberTool.getRandomInt(ActionEnum.up, ActionEnum.right);
        }
        this.actionHandler(actionType);
    };
    p.autoMove = function () {
        this.turnCount--;
        if (this.turnCount < 0) {
            this.turnCount = Math.round(120 + Math.random() * 100); //每隔一段时间自动转向
            this.autoTurn();
        }
        else {
            this.move();
        }
    };
    //更新射击时间
    p.updateShootCount = function () {
        this.shootCount++;
    };
    //射击
    p.shoot = function () {
        this.shootCount++;
        if (this.shootCount * 16 >= this.shootTime) {
            this.shootCount = 0;
            var bullet = GameFactory.getInstance().bulletPool.getObject();
            bullet.type = this.type;
            bullet.power = this.power;
            bullet.x = this.x;
            bullet.y = this.y;
            switch (this.direction) {
                case DirectionEnum.up:
                    bullet.rotation = 0;
                    bullet.speedY = -bullet.speed + (this.power - 1); //子弹根据威力加速
                    break;
                case DirectionEnum.down:
                    bullet.rotation = 180;
                    bullet.speedY = bullet.speed + (this.power - 1);
                    break;
                case DirectionEnum.left:
                    bullet.rotation = -90;
                    bullet.speedX = -bullet.speed + (this.power - 1);
                    break;
                case DirectionEnum.right:
                    bullet.rotation = 90;
                    bullet.speedX = bullet.speed + (this.power - 1);
                    break;
            }
            var gameScene = GameManager.getInstance().gameScene;
            gameScene.bulletList.push(bullet);
            gameScene.bulletGroup.addChild(bullet);
        }
    };
    /**
     * 被击中
     * bullet 子弹
     * return 返回是否击中有效
     */
    p.beAttacked = function (bullet) {
        if (Math.abs(bullet.x - this.x) < 48 && (Math.abs(bullet.y - this.y) < 48)) {
            return true;
        }
        return false;
    };
    //重置状态
    p.reset = function () {
        this.isHaveItem = false;
        this.shootCount = 0;
    };
    //回收
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseTank;
}(SimpleMC));
egret.registerClass(BaseTank,'BaseTank');
//# sourceMappingURL=BaseTank.js.map