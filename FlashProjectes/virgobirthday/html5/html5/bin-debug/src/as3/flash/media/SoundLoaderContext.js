/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var SoundLoaderContext = (function () {
        function SoundLoaderContext(bufferTime, checkPolicyFile) {
            if (bufferTime === void 0) { bufferTime = 1000; }
            if (checkPolicyFile === void 0) { checkPolicyFile = false; }
            /**
             * 在开始传输声音流之前，将其预加载到缓冲区中所用的秒数。
             * @type {number}
             */
            this.bufferTime = 1000;
            /**
             * 指定 Flash Player 是否应在开始加载声音之前，尝试从所加载声音的服务器下载跨域策略文件。
             * @type {boolean}
             */
            this.checkPolicyFile = false;
            this.bufferTime = bufferTime;
            this.checkPolicyFile = checkPolicyFile;
        }
        var __egretProto__ = SoundLoaderContext.prototype;
        return SoundLoaderContext;
    })();
    flash.SoundLoaderContext = SoundLoaderContext;
    SoundLoaderContext.prototype.__class__ = "flash.SoundLoaderContext";
})(flash || (flash = {}));
