/**
 * 声音管理类
 * @author chenkai
 * @date 2016/12/26
 *
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        _super.apply(this, arguments);
        /**允许播放音效*/
        this._allowEffect = true;
        /**允许播放背景音乐*/
        this._allowBGM = true;
        /**声音列表*/
        this.soundList = {};
    }
    var d = __define,c=SoundManager,p=c.prototype;
    /**
     * 添加声音
     * @soundName 声音名
     */
    p.addSound = function (soundName) {
        var sound = RES.getRes(soundName);
        if (sound) {
            this.soundList[soundName] = sound;
        }
        else {
            console.error("声音不存在:", soundName);
        }
    };
    /**
     * 播放声音
     * @soundName 声音名
     * @loop 循环次数
     */
    p.playEffect = function (soundName, loop) {
        if (loop === void 0) { loop = 1; }
        if (this.allowEffect == false) {
            return;
        }
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            sound.play(0, loop);
        }
        else {
        }
    };
    /**
     * 播放背景音乐
     * @soundName 声音名
     */
    p.playBGM = function (soundName) {
        if (this.allowBGM == false) {
            return;
        }
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (this.bgmChannel == null) {
                this.bgmChannel = sound.play(0, Number.MAX_VALUE);
            }
        }
        else {
        }
    };
    /**
     * 停止背景音乐
     */
    p.stopBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    /**暂停背景音乐*/
    p.pauseBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.volume = 0;
        }
    };
    /**继续背景音乐*/
    p.resumeBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.volume = 1;
        }
    };
    d(p, "allowEffect"
        /**是否允许播放音效*/
        ,function () {
            return this._allowEffect;
        }
        /**是否允许播放音效*/
        ,function (allow) {
            this._allowEffect = allow;
        }
    );
    d(p, "allowBGM"
        /**是否允许播放背景音乐*/
        ,function () {
            return this._allowBGM;
        }
        /**是否允许播放背景音乐*/
        ,function (allow) {
            this._allowBGM = allow;
        }
    );
    return SoundManager;
}(SingleClass));
egret.registerClass(SoundManager,'SoundManager');
