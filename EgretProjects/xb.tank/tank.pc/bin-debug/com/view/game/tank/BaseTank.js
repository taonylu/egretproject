/**
 * 坦克基类
 * @author
 *
 */
var BaseTank = (function (_super) {
    __extends(BaseTank, _super);
    function BaseTank(pngName, jsonName, mcName) {
        _super.call(this, pngName, jsonName, mcName);
        this.className = ""; //类名
        this.skin = ""; //坦克皮肤
        this.speed = 0; //移动速度
        this.speedX = 0;
        this.speedY = 0;
        this.direction = 0; //移动方向 -1停 0上 1下 2左 3右
        this.power = 0; //子弹威力
        this.life = 0; //生命值
        this.shootTime = 0; //射击间隔时间，单位ms
        this.shootCount = 0; //射击计时，单位帧
        this.className = egret.getQualifiedClassName(this);
    }
    var d = __define,c=BaseTank,p=c.prototype;
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
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
            case 0:
                bullet.speedY = -bullet.speed;
                break;
            case 1:
                bullet.speedY = bullet.speed;
                break;
            case 2:
                bullet.speedX = -bullet.speed;
                break;
            case 3:
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
}(SimpleMC));
egret.registerClass(BaseTank,'BaseTank');
