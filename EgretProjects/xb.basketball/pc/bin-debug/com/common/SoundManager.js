/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.frame = "frame";
        this.floor = "floor";
        this.wang = "wang";
        this.bgm_home = "bgm_home";
        this.bgm_game = "bgm_game";
        this.soundList = {}; //声音列表
        this.channelList = {}; //声道列表
        this.soundList[this.frame] = RES.getRes("frame_mp3");
        this.soundList[this.floor] = RES.getRes("floor_mp3");
        this.soundList[this.wang] = RES.getRes("wang_mp3");
        this.soundList[this.bgm_home] = RES.getRes("bgm_home_mp3");
        this.soundList[this.bgm_game] = RES.getRes("bgm_game_mp3");
    }
    var d = __define,c=SoundManager,p=c.prototype;
    //播放声音
    p.play = function (soundName, volume, loops) {
        if (volume === void 0) { volume = 1; }
        if (loops === void 0) { loops = 1; }
        var snd = this.soundList[soundName];
        if (snd) {
            this.channelList[soundName] = snd.play(0, loops);
            this.channelList[soundName].volume = volume;
        }
    };
    //停止声音
    p.stop = function (soundName) {
        var channel = this.channelList[soundName];
        if (channel) {
            channel.stop();
        }
    };
    //播放背景音乐
    p.playBgm = function (bgmName, volume) {
        if (volume === void 0) { volume = 1; }
        if (this.bgmChannel) {
            this.bgmChannel.stop();
        }
        var bgm = this.soundList[bgmName];
        if (bgm) {
            this.bgmChannel = bgm.play();
            this.bgmChannel.volume = volume;
        }
    };
    //停止背景音乐
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
}());
egret.registerClass(SoundManager,'SoundManager');
