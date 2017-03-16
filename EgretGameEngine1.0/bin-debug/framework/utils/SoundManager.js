var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 声音管理类
 * @author chenkai
 * @date 2016/12/26
 *
 * Example:
 * //添加声音
 * App.Sound.addSound("bgm");
 * App.Sound.addSound("attack");
 *
 * //播放声音
 * App.Sound.playEffect("attack");
 * App.Sound.playBGM("bgm");
 *
 * //停止声音
 * App.Sound.StopBGM();
 *
 * //设置声音权限
 * App.Sound.allowEffect = true;
 * App.Sound.allowBGM = true;
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.apply(this, arguments) || this;
        /**允许播放音效*/
        _this._allowEffect = true;
        /**允许播放背景音乐*/
        _this._allowBGM = true;
        /**声音列表*/
        _this.soundList = {};
        return _this;
    }
    /**
     * 添加声音
     * @soundName 声音名
     */
    SoundManager.prototype.addSound = function (soundName) {
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
    SoundManager.prototype.playEffect = function (soundName, loop) {
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
    SoundManager.prototype.playBGM = function (soundName) {
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
    SoundManager.prototype.stopBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    /**暂停背景音乐*/
    SoundManager.prototype.pauseBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.volume = 0;
        }
    };
    /**继续背景音乐*/
    SoundManager.prototype.resumeBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.volume = 1;
        }
    };
    Object.defineProperty(SoundManager.prototype, "allowEffect", {
        /**是否允许播放音效*/
        get: function () {
            return this._allowEffect;
        },
        /**是否允许播放音效*/
        set: function (allow) {
            this._allowEffect = allow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "allowBGM", {
        /**是否允许播放背景音乐*/
        get: function () {
            return this._allowBGM;
        },
        /**是否允许播放背景音乐*/
        set: function (allow) {
            this._allowBGM = allow;
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}(SingleClass));
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map