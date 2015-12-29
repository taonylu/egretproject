/**
 *
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    var __egretProto__ = SoundManager.prototype;
    SoundManager.play = function (name) {
        // if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) { 
        var snd = RES.getRes(name);
        snd.play();
        // } 
    };
    SoundManager.snd_nextLevel = "applause_mp3";
    SoundManager.snd_gameOver = "gameover_mp3";
    SoundManager.snd_pop = "pop_star_mp3";
    return SoundManager;
})();
SoundManager.prototype.__class__ = "SoundManager";
