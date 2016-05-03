/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.start_stage = "start_stage_mp3";
        this.lose = "lose_mp3";
        this.gift_life = "gift_life_mp3";
        this.gift_bomb = "gift_bomb_mp3";
        this.gift = "gift_mp3";
        this.fire_reach_wall = "fire_reach_wall_mp3";
        this.fire = "fire_mp3";
        this.user_move = "user_move_mp3";
        this.soundList = {}; //声音列表
        this.channelList = {}; //声道列表
        this.addSound(this.start_stage);
        this.addSound(this.lose);
        this.addSound(this.gift_life);
        this.addSound(this.gift_bomb);
        this.addSound(this.gift);
        this.addSound(this.fire_reach_wall);
        this.addSound(this.fire);
        this.addSound(this.user_move);
    }
    var d = __define,c=SoundManager,p=c.prototype;
    p.addSound = function (soundName) {
        this.soundList[soundName] = RES.getRes(soundName);
    };
    //播放声音
    p.play = function (soundName, loops, volume) {
        if (loops === void 0) { loops = 1; }
        if (volume === void 0) { volume = 1; }
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
