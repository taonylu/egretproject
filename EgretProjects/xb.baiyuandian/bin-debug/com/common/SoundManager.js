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
        this.channelList = {}; //声道列表
        this.soundList[this.get] = RES.getRes("get_mp3");
        this.soundList[this.bgm] = RES.getRes("bgm_mp3");
    }
    var d = __define,c=SoundManager,p=c.prototype;
    //播放声音
    p.play = function (soundName, loops) {
        if (loops === void 0) { loops = 1; }
        var snd = this.soundList[soundName];
        if (snd) {
            this.channelList[soundName] = snd.play(0, loops);
            return this.channelList[soundName];
        }
    };
    //停止声音
    p.stop = function (soundName) {
        var channel = this.channelList[soundName];
        if (channel) {
            channel.stop();
        }
    };
    p.playBgm = function () {
        if (this.bgmChannel != null) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
        this.bgmChannel = this.play(this.bgm, 0);
    };
    p.stopBgm = function () {
        if (this.bgmChannel) {
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
