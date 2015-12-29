/**
*  文 件 名：BaseSpore.ts
*  功    能：玩家基类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var BaseSpore = (function (_super) {
    __extends(BaseSpore, _super);
    function BaseSpore() {
        _super.call(this);
        this.skin = new egret.Bitmap();
        this.userID = 0;
        this.sporeID = 0;
        this.userName = "";
        this.nameText = new egret.TextField();
        this.speed = GameConst.playerMaxSpeed;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.mapWidth = 0; //地图高宽
        this.mapHeight = 0;
        this.radius = 0; //半径
        this.angle = 0;
        this.weight = 0;
        this.skinID = 0;
        this.friction = 0.1; //摩擦力
        this.frictionX = 0;
        this.frictionY = 0;
        this.isChecked = false; //已经检测过，防止同时被多个玩家吃掉
        this.isCanColliseSelf = false; //孢子分裂时，不能立刻检查和自己孢子的碰撞
        this.distX = 0;
        this.distY = 0;
        this.mapWidth = GameConst.MapWidth;
        this.mapHeight = GameConst.MapHeight;
        this.addChild(this.skin);
        this.addChild(this.nameText);
        this.nameText.text = "";
        this.nameText.x = 0;
        this.nameText.y = -this.nameText.height;
        this.nameText.textAlign = egret.HorizontalAlign.CENTER;
        this.nameText.textColor = 0xffffff;
        this.nameText.size = 15;
        this.reset();
    }
    var d = __define,c=BaseSpore;p=c.prototype;
    p.reset = function () {
        this.distX = 0;
        this.distY = 0;
        this.angle = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = GameConst.playerMaxSpeed;
        this.weight = GameConst.playerInitWeight;
        this.width = GameConst.playerInitRadius * 2;
        this.setSize();
        this.userID = 0;
        this.isChecked = false;
    };
    p.moveTo = function (targetX, targetY) {
        this.distX = targetX - this.x;
        this.distY = targetY - this.y;
        this.angle = Math.atan2(this.distY, this.distX);
        this.xSpeed = Math.cos(this.angle) * this.speed;
        this.ySpeed = Math.sin(this.angle) * this.speed;
    };
    p.moveToByAngle = function (angle) {
        if (angle <= Math.PI) {
            this.xSpeed = Math.cos(angle) * this.speed;
            this.ySpeed = Math.sin(angle) * this.speed;
        }
        else if (this.angle <= Math.PI) {
            this.frictionX = Math.cos(this.angle) * this.friction;
            this.frictionY = Math.sin(this.angle) * this.friction;
        }
        this.angle = angle;
    };
    p.onEnterFrame = function () {
        if (this.angle > Math.PI) {
            if (this.xSpeed == 0) {
            }
            else if (Math.abs(this.xSpeed) <= Math.abs(this.frictionX)) {
                this.xSpeed = 0;
            }
            else {
                this.xSpeed -= this.frictionX;
            }
            if (this.ySpeed == 0) {
            }
            else if (Math.abs(this.ySpeed) <= Math.abs(this.frictionY)) {
                this.ySpeed = 0;
            }
            else {
                this.ySpeed -= this.frictionY;
            }
        }
        this.tempX = this.x + this.xSpeed;
        this.tempY = this.y + this.ySpeed;
        if (this.tempX > 0 && this.tempX < this.mapWidth) {
            this.x = this.tempX;
        }
        else {
            this.xSpeed = 0;
        }
        if (this.tempY > 0 && this.tempY < this.mapHeight) {
            this.y = this.tempY;
        }
        else {
            this.ySpeed = 0;
        }
    };
    p.setSkin = function (skinID) {
        this.skinID = skinID;
        this.skin.texture = RES.getRes("monster" + skinID + "_png");
        this.setSize();
    };
    p.eat = function (weight) {
        this.weight += weight;
        this.width += weight * GameConst.addRaduisRate;
        this.setSize();
        this.speed -= weight * GameConst.addSpeedRate;
        if (this.speed < GameConst.playerMinSpeed) {
            this.speed = GameConst.playerMinSpeed;
        }
    };
    p.setName = function (name) {
        this.userName = name;
        this.nameText.text = name;
    };
    p.setSize = function () {
        this.height = this.width;
        this.skin.width = this.width;
        this.skin.height = this.width;
        this.radius = this.width / 2;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.width / 2;
    };
    p.tuPaoPao = function () {
        this.eat(-GameConst.paopaoWeight);
        var pp = new PaoPao();
        pp.userID = this.userID;
        pp.x = this.x;
        pp.y = this.y;
        pp.movefrom(this.x, this.y, this.angle);
        this.parent.addChild(pp);
        return pp;
    };
    p.fenLie = function () {
        var halfWeight = this.weight / 2;
        this.eat(-halfWeight);
        var player = new BaseSpore();
        player.reset();
        player.setName(this.userName);
        player.setSkin(this.skinID);
        player.eat(halfWeight);
        player.userID = this.userID;
        player.x = this.x;
        player.y = this.y;
        this.parent.addChild(player);
        return player;
    };
    p.moveFrom = function (xPos, yPos, angle) {
        xPos += Math.cos(angle) * GameConst.fenlieMoveDis;
        yPos += Math.sin(angle) * GameConst.fenlieMoveDis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos, y: yPos }, GameConst.fenlieTime, egret.Ease.quadOut).call(function () {
            this.isCanColliseSelf = true;
            if (self.x < 0) {
                self.x = 0;
            }
            else if (self.x > this.mapWidth) {
                self.x = this.mapWidth;
            }
            if (self.y < 0) {
                self.y = 0;
            }
            else if (self.y > this.mapHeight) {
                self.y = this.mapHeight;
            }
        }, this);
    };
    p.die = function () {
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.hide();
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return BaseSpore;
})(egret.DisplayObjectContainer);
egret.registerClass(BaseSpore,"BaseSpore");
