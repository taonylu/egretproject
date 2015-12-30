/**
 *
 * @author
 *
 */
var Example1 = (function (_super) {
    __extends(Example1, _super);
    function Example1() {
        _super.call(this);
        //-----------------------测试----------------------
        //1 声音  加载、播放, 有多种加载方式，URLLoader，Sound.load，RES.getRes()
        //2 声道  停止、播放  
        //3 effect和music区别， 不知道有什么区别...
        //4 声音延迟问题 ，设备相关
        //5 同一声音多次播放问题，设备相关
        //6 同一时间播放多个声音问题，设备相关
        this.effect1 = new egret.Sound();
        this.effect2 = new egret.Sound();
        this.music1 = new egret.Sound();
        this.music2 = new egret.Sound();
        this.loadSound(this.effect1, "effect1.mp3");
        this.loadSound(this.effect2, "effect2.wav");
        this.loadSound(this.music1, "music1.wav");
        this.loadSound(this.music2, "music2.wav");
        for (var i = 0; i < 4; i++) {
            var btn = new SimpleButton();
            btn.x = i * 120;
            btn.y = 20;
            btn.id = i;
            btn.touchEnabled = true;
            this.addChild(btn);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    var d = __define,c=Example1;p=c.prototype;
    p.onTouchTap = function (e) {
        if (e.target instanceof SimpleButton) {
            switch (e.target.id) {
                case 0:
                    this.channel && this.channel.stop();
                    this.channel = this.effect1.play(0, 1);
                    break;
                case 1:
                    this.effect2.play(0, 1);
                    break;
                case 2:
                    this.music1.play(0, 3);
                    break;
                case 3:
                    this.music2.play(0, 3);
                    break;
            }
        }
    };
    p.loadSound = function (sound, soundName) {
        sound.type = egret.Sound.MUSIC;
        sound.addEventListener(egret.Event.COMPLETE, this.loadOver, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
        sound.load("resource/" + soundName);
    };
    p.loadOver = function (e) {
        if (e.target == this.music2) {
            console.log("load over");
        }
    };
    p.loadError = function () {
        console.log("load error");
    };
    return Example1;
})(egret.Sprite);
egret.registerClass(Example1,"Example1");
