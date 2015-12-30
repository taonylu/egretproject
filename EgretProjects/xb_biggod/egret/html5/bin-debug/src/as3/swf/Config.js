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
        Config.poolMaxItemNumber = 10; //缓存池最大同一对象数量
        /// 导出资源前缀
        Config.RESImage = 0; //image
        Config.RESShape = 1; //shape
        Config.RESSprite = 2; //sprite
        Config.RESText = 3; //text
        Config.RESFont = 4; //font
        Config.RESStage = 5; //stage只作为标识
        Config.RESButton = 6; //button
        Config.RESSound = 7; //sound
        // config names
        Config.ConfigStage = "stage";
        return Config;
    })();
    egret.Config = Config;
    Config.prototype.__class__ = "egret.Config";
})(egret || (egret = {}));
