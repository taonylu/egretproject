var egret;
(function (egret) {
    var Config = (function () {
        function Config() {
        }
        var __egretProto__ = Config.prototype;
        /**
         * 输出的文件名
         * @param characterId
         * @param resType
         * @param extendInfo 扩展字段，支持多个扩展信息，以-分隔
         * @return filename_resType_CharacterID-part1-xxx2
         *
         */
        Config.GetResName = function (characterId, resType, extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            var resname = "";
            resname = resType + "_" + characterId;
            resname += Config.GetExtendString(extendInfo);
            return resname;
        };
        Config.GetExtendString = function (extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            var extendstr = "";
            if (extendInfo != null) {
                if (extendInfo instanceof Array) {
                    var extendInfoArr = extendInfo;
                    var length = extendInfoArr.length;
                    for (var i = 0; i < length; i++) {
                        var str = extendInfoArr[i];
                        extendstr = extendstr + ("-" + str);
                    }
                }
                else
                    extendstr = extendstr + ("-" + extendInfo);
            }
            return extendstr;
        };
        Config.resDirName = "swfres\\";
        /**
         * 导出png图片，配置等的路径
         */
        Config.resDir = "C:\\Users\\chenpeng\\Documents\\e\\helloworld\\resource\\";
        Config.pngIDLength = 4;
        /// 开关
        /**
         * 矢量图按照有效像素来导出png
         */
        Config.Switch_DrawShapeByColor = true;
        /**
         * 矢量图按照endFill来切分成不同的位图 - 暂不支持，数据支持还没做到
         */
        Config.Switch_SplitDrawShape = false;
        /**
         * 打印矢量图的绘图脚本代码
         */
        Config.Switch_Log_ShowShapeAction = false;
        /**
         * 有效像素区与原矩形大小差距阀值
         */
        Config.DrawShapeByColorPixels = 1;
        /// 导出资源前缀
        Config.RESImage = "image";
        Config.RESShape = "shape";
        Config.RESSprite = "sprite";
        Config.RESText = "text";
        Config.RESFont = "font";
        Config.RESStage = "stage"; //stage只作为标识
        Config.RESButton = "button";
        Config.RESSound = "sound";
        // config names
        Config.ConfigStage = "stage";
        return Config;
    })();
    egret.Config = Config;
    Config.prototype.__class__ = "egret.Config";
})(egret || (egret = {}));
