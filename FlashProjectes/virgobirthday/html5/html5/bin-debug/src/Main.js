var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        var _self__ = this;
        if (this.stage)
            this.init();
        else
            _self__.addEventListener(egret.Event.ADDED_TO_STAGE, flash.bind(this.init, this), null);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.init = function (e) {
        if (e === void 0) { e = null; }
        var _self__ = this;
        _self__.removeEventListener(egret.Event.ADDED_TO_STAGE, flash.bind(this.init, this), null);
        this.progressText = new flash.TextField();
        this.progressText.width = 300;
        this.progressText.x = this.stage.stageWidth / 2 - this.progressText.width / 2;
        this.progressText.y = this.stage.stageHeight / 2 - this.progressText.height / 2;
        this.progressText.textColor = 0xffffff;
        var format = new flash.TextFormat();
        format.size = 50;
        format.align = flash.TextFormatAlign.CENTER;
        this.progressText.defaultTextFormat = format;
        this.addChild(this.progressText);
        this.progressText.text = "123";
        var context = new flash.LoaderContext(false, flash.ApplicationDomain.currentDomain, null);
        this.loader = new flash.Loader();
        this.loader.contentLoaderInfo.addEventListener(egret.ProgressEvent.PROGRESS, flash.bind(this.onProgress, this), null);
        this.loader.contentLoaderInfo.addEventListener(egret.Event.COMPLETE, flash.bind(this.onComplete, this), null);
        this.loader.load(new egret.URLRequest("birthday.swf"), context);
    };
    __egretProto__.onProgress = function (e) {
        this.progressText.text = flash.tranint((e.bytesLoaded / e.bytesTotal) * 100) + "%";
    };
    __egretProto__.onComplete = function (e) {
        var _self__ = this;
        _self__.removeChild(this.progressText);
        this.addChild(new BirthdayScene());
    };
    return Main;
})(egret.Sprite);
Main.prototype.__class__ = "Main";
