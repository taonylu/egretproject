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
        /**背景音乐列表*/
        this.bgmList = {};
    }
    var d = __define,c=SoundManager,p=c.prototype;
    /**
     * 添加声音
     * @soundName 声音名
     */
    p.addEffect = function (soundName) {
        var sound = RES.getRes(soundName);
        if (sound) {
            this.soundList[soundName] = sound;
        }
        else {
            console.error("声音不存在:", soundName);
        }
    };
    /**
     * 添加背景音乐
     * @soundName 声音名
     */
    p.addBGM = function (soundName) {
        var sound = RES.getRes(soundName);
        if (sound) {
            this.bgmList[soundName] = sound;
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
        var sound = this.soundList[soundName];
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (this.bgmChannel) {
                this.bgmChannel.stop();
                this.bgmChannel = null;
            }
            this.bgmChannel = sound.play(0, Number.MAX_VALUE);
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
            //设置为允许，则自动播放背景音乐
            if (allow) {
                for (var key in this.bgmList) {
                    this.playBGM(key);
                    break;
                }
            }
            else {
                this.stopBGM();
            }
        }
    );
    return SoundManager;
}(SingleClass));
egret.registerClass(SoundManager,'SoundManager');
