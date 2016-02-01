/**
 * 红包基类
 * @author
 *
 */
var BasePacket = (function (_super) {
    __extends(BasePacket, _super);
    function BasePacket(className, score, money, bg) {
        if (bg === void 0) { bg = null; }
        _super.call(this);
        //对象池类名、分值
        this.className = className;
        this.score = score;
        //新建红包背景
        this.bg = new egret.Bitmap(bg);
        this.bg.width = 175;
        this.bg.height = 272;
        this.addChild(this.bg);
        //新建红包数值
        if (money) {
            this.money = new egret.Bitmap(money);
            this.money.y = 20;
            this.money.x = (this.width - this.money.width) / 2 + 10;
            this.addChild(this.money);
        }
        //设置锚点
        this.anchorOffsetX = this.bg.width / 2;
        this.anchorOffsetY = this.bg.height / 2;
        //缓存位图
        //this.cacheAsBitmap = true;
        //设置点击
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var d = __define,c=BasePacket,p=c.prototype;
    //发射
    p.shoot = function () {
        //随机方向
        this.rotation = NumberTool.getRandomInt(-20, 20);
        //随机飞行时间
        var flyTime = 2000 + Math.random() * 500;
        //飞行目的地
        var dist = 1500; //最远飞行距离
        var hudu = this.rotation * Math.PI / 180;
        var targetX = GameConst.stage.stageWidth / 2 + dist * Math.sin(hudu);
        var targetY = GameConst.stage.stageHeight - dist * Math.cos(hudu);
        var self = this;
        egret.Tween.get(this).to({ x: targetX, y: targetY }, flyTime).call(function () {
            self.recycle();
        });
    };
    p.recycle = function () {
        this.rotation = 0;
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        ObjectPool.getPool(this.className).returnObject(this);
    };
    return BasePacket;
})(egret.DisplayObjectContainer);
egret.registerClass(BasePacket,'BasePacket');
