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
        this.speedX = 0;
        this.speedY = 0;
        this.power = 0; //子弹威力
        this.life = 0; //生命值
        this.shootTime = 0; //射击间隔时间，单位ms
        this.shootCount = 0; //射击计时，单位帧
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
    //设置方向
    p.setDirection = function (direction) {
        this.direction = direction;
        this.play();
        switch (this.direction) {
            case ActionEnum.up:
                this.speedX = 0;
                this.speedY = -this.speed;
                this.rotation = 0;
                break;
            case ActionEnum.down:
                this.speedX = 0;
                this.speedY = this.speed;
                this.rotation = 180;
                break;
            case ActionEnum.left:
                this.speedX = -this.speed;
                this.speedY = 0;
                this.rotation = -90;
                break;
            case ActionEnum.right:
                this.speedX = this.speed;
                this.speedY = 0;
                this.rotation = 90;
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
        if (this.direction != ActionEnum.down) {
            this.direction = ActionEnum.down;
        }
        else {
            this.direction = NumberTool.getRandomInt(ActionEnum.up, ActionEnum.right);
        }
        this.setDirection(this.direction);
    };
    p.autoMove = function () {
        this.turnCount--;
        if (this.turnCount < 0) {
            this.turnCount = Math.round(60 + Math.random() * 100); //每隔一段时间自动转向
            this.autoTurn();
        }
        else {
            this.move();
        }
    };
    //自动射击
    p.autoShoot = function () {
        this.shootCount++;
        if (this.shootCount * 16 >= this.shootTime) {
            this.shootCount = 0;
            this.shoot();
        }
    };
    //射击
    p.shoot = function () {
        var bullet = GameFactory.getInstance().bulletPool.getObject();
        bullet.type = this.type;
        bullet.power = this.power;
        switch (this.direction) {
            case ActionEnum.up:
                bullet.speedY = -bullet.speed;
                break;
            case ActionEnum.down:
                bullet.speedY = bullet.speed;
                break;
            case ActionEnum.left:
                bullet.speedX = -bullet.speed;
                break;
            case ActionEnum.right:
                bullet.speedX = bullet.speed;
                break;
        }
        return bullet;
    };
    /**
     * 被击中
     * bullet 子弹
     * return 返回是否击中有效
     */
    p.beAttacked = function (bullet) {
        return true;
    };
    //重置状态
    p.reset = function () {
    };
    //回收
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseTank;
}(CMovieClip));
egret.registerClass(BaseTank,'BaseTank');
