/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.get = "get";
        this.bgm = "bgm";
        this.soundList = {}; //声音列表
        this.soundList[this.get] = RES.getRes("get_mp3");
        this.soundList[this.bgm] = RES.getRes("bgm_mp3");
    }
    var d = __define,c=SoundManager,p=c.prototype;
    //播放声音
    p.play = function (soundName, loops) {
        if (loops === void 0) { loops = 1; }
        var snd = this.soundList[soundName];
        if (snd) {
            snd.play(0, loops);
        }
    };
    p.playBGM = function () {
        if (this.bgmChannel != null) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
        var bgm = this.soundList[this.bgm];
        if (bgm) {
            this.bgmChannel = bgm.play();
        }
    };
    p.stopBGM = function () {
        if (this.bgmChannel != null) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    SoundManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    };
    return SoundManager;
})();
egret.registerClass(SoundManager,'SoundManager');
