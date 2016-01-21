/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.line = "line";
        this.enterMan = "enterMan";
        this.enterWoman = "enterWoman";
        this.homeBgm = "homeBgm";
        this.gameBgm = "gameBgm";
        this.gameOver = "gameOver";
        this.soundList = {}; //声音列表
        this.channelList = {}; //声道列表
        this.soundList[this.line] = RES.getRes("line_mp3");
        this.soundList[this.enterMan] = RES.getRes("enter_man_mp3");
        this.soundList[this.enterWoman] = RES.getRes("enter_woman_mp3");
        this.soundList[this.homeBgm] = RES.getRes("bgm_home_mp3");
        this.soundList[this.gameBgm] = RES.getRes("bgm_game_mp3");
        this.soundList[this.gameOver] = RES.getRes("game_over_mp3");
    }
    var d = __define,c=SoundManager,p=c.prototype;
    //播放声音
    p.play = function (soundName, loops) {
        if (loops === void 0) { loops = 1; }
        var snd = this.soundList[soundName];
        if (snd) {
            this.channelList[soundName] = snd.play(0, loops);
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
    p.playBgm = function (bgmName) {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
        }
        var bgm = this.soundList[bgmName];
        if (bgm) {
            this.bgmChannel = bgm.play();
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
})();
egret.registerClass(SoundManager,'SoundManager');
