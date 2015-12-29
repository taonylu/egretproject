var egret;
(function (egret) {
    var Resconfig = (function () {
        function Resconfig(obj) {
            if (obj === void 0) { obj = null; }
            /**
             * 资源全路径
             */
            this.path = ""; //"C:/Users/chenpeng/Documents/e/helloworld/resource/swfres/testres/testpos/file1/"
            /**
             * 相对路径
             */
            this.relativeDir = ""; //swfres/testres/testpos/file1/
            // relativeDir转换来的相对路径字符串
            this.resNamePrefix = ""; //swfres_testres_testpos_file1_
            // swf的图片是否合并为图集了
            this.picMerge = false;
            // 资源包路径
            this.resModule = ""; //swfres.testres.testpos.file1.
            /**
             * 舞台的所有对象
             */
            //public var stage:DefineStage = new DefineStage();
            /**
             * 所有对象的定义
             */
            this.resDefs = {};
            /**
             * 所有的链接类定义
             */
            this.symbols = {};
            /**
             * 所有的9切信息
             */
            this.scalingGrids = {};
            this.createFromObject(obj);
        }
        var __egretProto__ = Resconfig.prototype;
        /**
         * 需要从Object对象反序列化到Resconfig对象
         * @param target
         *
         */
        __egretProto__.createFromObject = function (target) {
            if (null == target) {
                return;
            }
            for (var key in target) {
                if ("symbols" == key) {
                    var temp_symbols = target[key];
                    for (var symbol_key in temp_symbols) {
                        var newSymbol = new egret.SymbolClass(temp_symbols[symbol_key]);
                        this.symbols[symbol_key] = newSymbol;
                    }
                }
                else if ("resDefs" == key) {
                    var new_resdef = {};
                    var temp_resdef = target[key];
                    for (var tagid = 0 in temp_resdef) {
                        var tagobj = temp_resdef[tagid];
                        switch (tagobj.t) {
                            case egret.Config.RESImage:
                                var img = new egret.DefineImage(tagobj);
                                new_resdef[tagid] = img;
                                break;
                            case egret.Config.RESShape:
                                var shape = new egret.DefineShape(tagobj);
                                new_resdef[tagid] = shape;
                                break;
                            case egret.Config.RESSprite:
                                var sprite = new egret.DefineSprite(tagobj);
                                new_resdef[tagid] = sprite;
                                break;
                            case egret.Config.RESStage:
                                var stage = new egret.DefineStage(tagobj);
                                new_resdef[tagid] = stage;
                                break;
                            case egret.Config.RESText:
                                var text = new egret.DefineText(tagobj);
                                new_resdef[tagid] = text;
                                break;
                            case egret.Config.RESFont:
                                var font = new egret.DefineFont(tagobj);
                                new_resdef[tagid] = font;
                                break;
                            case egret.Config.RESButton:
                                var button = new egret.DefineButton(tagobj);
                                new_resdef[tagid] = button;
                                break;
                            case egret.Config.RESSound:
                                var sound = new egret.DefineSound(tagobj);
                                new_resdef[tagid] = sound;
                            default:
                                break;
                        }
                    }
                    this.resDefs = new_resdef;
                }
                else {
                    this[key] = target[key];
                }
            }
        };
        /**
         * 位图的9宫格信息，Rectangle类型的数据保存在数组中
         * @param id
         * @returns {*}
         */
        __egretProto__.getScalingGridInfo = function (id) {
            if (null == this.scalingGrids) {
                return null;
            }
            return this.scalingGrids[id];
        };
        return Resconfig;
    })();
    egret.Resconfig = Resconfig;
    Resconfig.prototype.__class__ = "egret.Resconfig";
})(egret || (egret = {}));
