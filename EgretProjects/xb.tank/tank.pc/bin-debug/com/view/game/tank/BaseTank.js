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
        this.speed = 4; //移动速度
        this.speedX = 0; //x，y轴移动速度
        this.speedY = 0;
        this.power = 0; //子弹威力
        this.life = 0; //生命值
        this.shootTime = 0; //射击间隔时间，单位ms
        this.shootCount = 0; //射击计时，单位帧
        this.hitWidth = 64; //碰撞检测范围，因为切图大小并不是64x64，所以不能取width判断碰撞范围，这里自定义一个变量
        this.hitHalfWidth = 32;
        this.shooting = false; //连续射击
        this.bulletCount = 0; //发射出的子弹数，用于限制射击
        this.snd = SoundManager.getInstance();
        //自动移动
        this.turnCount = 60;
        this.className = egret.getQualifiedClassName(this);
    }
    var d = __define,c=BaseTank,p=c.prototype;
    //重置状态
    p.reset = function () {
        this.speedX = 0;
        this.speedY = 0;
        this.isHaveItem = false;
        this.shootCount = 0;
        this.shooting = false;
        this.bulletCount = 0;
    };
    //移动
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    //播放移动动画
    p.playMoveAnim = function () {
    };
    //设置威力
    p.setPower = function (power) {
        if (power >= 3) {
            power = 3;
        }
        this.power = power;
    };
    //设置行动
    p.actionHandler = function (actionType) {
        //当坦克停止时，播放动画
        if (this.speedX == 0 && this.speedY == 0 && actionType != ActionEnum.stopMove) {
            this.playMoveAnim();
            if (this.type == TankEnum.player) {
                this.snd.playMove(this.playerNo);
            }
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
                if (this.type == TankEnum.player) {
                    this.snd.stopMove(this.playerNo);
                }
                break;
        }
    };
    //自动转向，优先往下
    p.autoTurn = function () {
        if (this.direction != DirectionEnum.down && Math.random() > 0.6) {
            var actionType = ActionEnum.down;
        }
        else {
            actionType = NumberTool.getRandomInt(ActionEnum.up, ActionEnum.right);
        }
        this.actionHandler(actionType);
    };
    p.autoMove = function () {
        //        this.turnCount--;
        //        if(this.turnCount < 0){
        //            this.turnCount = Math.round(120 + Math.random()*120);  //每隔一段时间自动转向
        //            this.autoTurn();
        //        }else{
        this.move();
        //  }
    };
    //更新射击时间
    p.updateShootCount = function () {
        if (this.shooting) {
            this.shoot();
        }
        else {
            this.shootCount++;
        }
    };
    //射击
    p.shoot = function () {
        this.shootCount++;
        this.shooting = true; //临时增加连续射击
        if (this.type == TankEnum.player && this.bulletCount <= 0) {
            if (this.shootCount < (this.shootTime / 16 - 10)) {
                this.shootCount = this.shootTime / 16 - 10; //重置射击间隔时间
            }
        }
        if (this.shootCount * 16 >= this.shootTime) {
            if (this.bulletCount < 2) {
                this.bulletCount++;
                if (this.bulletCount <= 0) {
                    this.bulletCount = 1;
                }
            }
            else {
                return;
            }
            if (this.type == TankEnum.player) {
                this.snd.play(this.snd.fire);
            }
            this.shootCount = 0;
            var bullet = GameFactory.getInstance().bulletPool.getObject();
            bullet.type = this.type;
            bullet.setPower(this.power);
            bullet.x = this.x;
            bullet.y = this.y;
            bullet.owner = this;
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
    //停止射击
    p.stopShoot = function () {
        this.shooting = false;
    };
    //检查下一步位置的碰撞，预测下一步将碰撞，则不能行走
    p.checkNextCollision = function (target) {
        var myX = this.x + this.speedX;
        var myY = this.y + this.speedY;
        if (Math.abs(target.x - myX) < 64 && Math.abs(target.y - myY) < 64) {
            return true;
        }
        return false;
    };
    //检查当前位置的碰撞，防止坦克粘在一起
    p.checkCollision = function (target) {
        if (Math.abs(target.x - this.x) < 64 && Math.abs(target.y - this.y) < 64) {
            return true;
        }
        return false;
    };
    /**
     * 被击中
     * bullet 子弹
     * return 返回是否击毁坦克
     */
    p.beAttacked = function (bullet) {
        this.life -= bullet.power;
        if (this.life <= 0) {
            return true;
        }
        return false;
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
