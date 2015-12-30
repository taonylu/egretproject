var SoundM = (function (_super) {
    __extends(SoundM, _super);
    function SoundM() {
        _super.call(this);
    }
    var __egretProto__ = SoundM.prototype;
    SoundM.init = function () {
        var clazz = flash.ApplicationDomain.currentDomain.getDefinition("Welcome");
        SoundM.soundDict.setItem(SoundM.welcome, flash.As3As(new clazz(), flash.Sound));
    };
    SoundM.play = function (sound) {
        flash.As3As(SoundM.soundDict.getItem(sound), flash.Sound).play();
    };
    return SoundM;
})(egret.HashObject);
SoundM.prototype.__class__ = "SoundM";
SoundM.welcome = "Welcome";
SoundM.soundDict = new flash.Dictionary();
