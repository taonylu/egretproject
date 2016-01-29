/**
 *
 * @author
 *
 */
var Example1 = (function (_super) {
    __extends(Example1, _super);
    function Example1() {
        _super.call(this);
        this.bWalk = true;
        console.log(dragonBones.DragonBones.DATA_VERSION);
        //获取资源
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        //工厂类，获取骨架
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        //设置骨架显示对象
        this.armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(this.armature.display);
        this.armature.display.x = 200;
        this.armature.display.y = 200;
        this.armature.display.scaleX = 0.5;
        this.armature.display.scaleY = 0.5;
        this.armature2 = dragonbonesFactory.buildArmature("robot");
        this.addChild(this.armature2.display);
        this.armature2.display.x = 600;
        this.armature2.display.y = 200;
        this.armature2.display.scaleX = 0.5;
        this.armature2.display.scaleY = 0.5;
        //世界时钟
        dragonBones.WorldClock.clock.add(this.armature);
        dragonBones.WorldClock.clock.add(this.armature2);
        //播放指定动画
        this.armature.animation.gotoAndPlay("Walk", -1, -1, 0);
        this.armature2.animation.gotoAndPlay("Walk", -1, -1, 0);
        //鼠标监听
        Main.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock.clock.advanceTime(0.01); }, this);
    }
    var d = __define,c=Example1;p=c.prototype;
    p.onTouchTap = function () {
        if (this.bWalk) {
            this.armature.animation.gotoAndPlay("Run", -1, -1, 0);
            this.armature2.animation.gotoAndPlay("Run", -1, -1, 0);
        }
        else {
            this.armature.animation.gotoAndPlay("Walk", -1, -1, 0);
            this.armature2.animation.gotoAndPlay("Walk", -1, -1, 0);
        }
        this.bWalk = !this.bWalk;
    };
    return Example1;
})(egret.Sprite);
egret.registerClass(Example1,"Example1");
