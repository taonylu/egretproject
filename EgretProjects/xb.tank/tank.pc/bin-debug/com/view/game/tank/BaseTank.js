/**
 * 坦克基类
 * @author
 *
 */
var BaseTank = (function (_super) {
    __extends(BaseTank, _super);
    function BaseTank(imgName, start, end) {
        _super.call(this);
        this.className = ""; //类名
        this.skin = ""; //坦克皮肤
        this.speed = 4; //移动速度
        this.speedX = 0;
        this.speedY = 0;
        this.direction = ""; //移动方向
        this.power = 0; //子弹威力
        this.life = 0; //生命值
        this.shootTime = 0; //射击间隔时间，单位ms
        this.shootCount = 0; //射击计时，单位帧
        this.className = egret.getQualifiedClassName(this);
        this.addTexture(imgName, start, end);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=BaseTank,p=c.prototype;
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    p.setDirection = function (direction) {
        this.direction = direction;
        switch (this.direction) {
            case "up":
                this.speedX = 0;
                this.speedY = -this.speed;
                this.rotation = 0;
                break;
            case "down":
                this.speedX = 0;
                this.speedY = this.speed;
                this.rotation = 180;
                break;
            case "left":
                this.speedX = -this.speed;
                this.speedY = 0;
                this.rotation = -90;
                break;
            case "right":
                this.speedX = this.speed;
                this.speedY = 0;
                this.rotation = 90;
                break;
            case "stopMove":
                this.speedX = 0;
                this.speedY = 0;
                break;
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
            case "up":
                bullet.speedY = -bullet.speed;
                break;
            case "down":
                bullet.speedY = bullet.speed;
                break;
            case "left":
                bullet.speedX = -bullet.speed;
                break;
            case "right":
                bullet.speedX = bullet.speed;
                break;
        }
        //子弹添加到场景中
        var gameScene = GameManager.getInstance().gameScene;
        gameScene.bulletGroup.addChild(bullet);
        if (bullet.type == TankEnum.player) {
            gameScene.playerBulletList.push(bullet);
        }
        else {
            gameScene.enemyBulletList.push(bullet);
        }
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
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BaseTank;
}(CMovieClip));
egret.registerClass(BaseTank,'BaseTank');
