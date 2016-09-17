/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.phone = "phone_mp3";
        this.sceneC_bgm = "sceneC_bgm_mp3";
        this.say = "say_mp3";
        this.soundList = {}; //声音列表
        this.loops = 1;
        this.soundList[this.phone] = "resource/assets/sound/phone.mp3";
        this.soundList[this.sceneC_bgm] = "resource/assets/sound/sceneC_bgm.mp3";
        this.soundList[this.say] = "resource/assets/sound/say.mp3";
    }
    var d = __define,c=SoundManager,p=c.prototype;
    p.play = function (soundName, loops) {
        if (loops === void 0) { loops = 1; }
        this.loops = loops;
        this.sound = RES.getRes(soundName);
        if (this.sound == null) {
            this.sound = new egret.Sound();
            this.sound.type = egret.Sound.MUSIC;
            this.sound.load(this.soundList[soundName]);
            this.sound.addEventListener(egret.Event.COMPLETE, this.onLoadSound, this);
        }
        else {
            this.onLoadSound();
        }
    };
    p.onLoadSound = function () {
        this.soundChannel = this.sound.play(0, this.loops);
    };
    p.stop = function () {
        this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadSound, this);
        if (this.soundChannel) {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
    };
    return SoundManager;
}());
egret.registerClass(SoundManager,'SoundManager');
