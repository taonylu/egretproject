/**
*  文 件 名：Hero.ts
*  功    能：英雄
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        //创建主角
        this.addChild(new egret.Bitmap(RES.getRes("hero_png")));
        //创建主角碰撞点
        this.hitArea = new egret.Sprite();
        this.hitArea.graphics.beginFill(0x000000, 0);
        this.hitArea.graphics.drawRect(0, 0, 50, 50);
        this.hitArea.graphics.endFill();
        this.hitArea.x = this.width / 2 - this.hitArea.width / 2;
        this.hitArea.y = this.height / 2 - this.hitArea.height / 2;
        this.addChild(this.hitArea);
        //其他
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.cacheAsBitmap = true;
        this.bulletType = BulletA.NAME;
        this.reset();
    }
    var __egretProto__ = Hero.prototype;
    __egretProto__.onEnter = function () {
    };
    __egretProto__.reset = function () {
        this.moveSpeed = 10;
        this.shotSpeed = 5;
        this.shotTimeCount = 0;
        this.power = 1;
        this.life = 1;
        this.bLive = true;
    };
    __egretProto__.onShot = function () {
        if (this.bLive == false) {
            return false;
        }
        //射击计时
        this.shotTimeCount++;
        if (this.shotTimeCount >= this.shotSpeed) {
            this.shotTimeCount = 0;
            return true;
        }
        return false;
    };
    __egretProto__.beAttacked = function (power) {
        this.life -= power;
        if (this.life <= 0) {
            return true;
        }
        return false;
    };
    __egretProto__.onDestroy = function () {
    };
    return Hero;
})(BaseHero);
Hero.prototype.__class__ = "Hero";
