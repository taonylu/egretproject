/**
 * 声音控制
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        //声音名
        this.die0 = "die0_mp3";
        this.die1 = "die1_mp3";
        this.die2 = "die2_mp3";
        this.bgm_home = "bgm_home_mp3";
        this.bgm_game = "bgm_game_mp3";
        this.gameover = "gameover_mp3";
        this.coin = "coin_mp3";
        this.countDown1 = "1_mp3";
        this.countDown2 = "2_mp3";
        this.countDown3 = "3_mp3";
        this.jump0 = "jump0_mp3";
        this.jump1 = "jump1_mp3";
        this.jump2 = "jump2_mp3";
        this.jump3 = "jump3_mp3";
        this.jump4 = "jump4_mp3";
        this.jumpList = [];
        this.soundList = {}; //声音列表
        this.channelList = {}; //声道列表
        this.addSound(this.bgm_home);
        this.addSound(this.bgm_game);
        this.addSound(this.gameover);
        this.addSound(this.die0);
        this.addSound(this.die1);
        this.addSound(this.die2);
        this.addSound(this.countDown1);
        this.addSound(this.countDown2);
        this.addSound(this.countDown3);
        this.addSound(this.coin);
        this.addSound(this.jump0);
        this.addSound(this.jump1);
        this.addSound(this.jump2);
        this.addSound(this.jump3);
        this.addSound(this.jump4);
        this.jumpList.push(this.jump0, this.jump1, this.jump2, this.jump3, this.jump4);
    }
    var d = __define,c=SoundManager,p=c.prototype;
    p.addSound = function (soundName) {
        this.soundList[soundName] = RES.getRes(soundName);
    };
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
    p.playDie = function () {
        var rand = Math.random();
        if (rand < 0.5) {
            this.play(this.die0);
        }
        else {
            this.play(this.die1);
        }
    };
    p.playJump = function () {
        this.play(this.jumpList[NumberTool.getRandomInt(0, this.jumpList.length - 1)]);
    };
    p.playCountDown = function (num) {
        if (num == 3) {
            this.play(this.countDown3);
        }
        else if (num == 2) {
            this.play(this.countDown2);
        }
        else if (num == 1) {
            this.play(this.countDown1);
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
