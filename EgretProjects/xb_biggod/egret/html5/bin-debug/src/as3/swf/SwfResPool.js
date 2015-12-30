var egret;
(function (egret) {
    var SwfResPool = (function () {
        function SwfResPool(_poolname, _resconf) {
            if (_resconf === void 0) { _resconf = null; }
            /**
             * 资源的配置文件
             */
            this.$resconf = null;
            /**
             * poolname标识本资源池
             */
            this.$poolname = "";
            // 资源池，防止过多创建资源，提升性能。防止频繁移除显示对象再创建导致闪烁
            this.$loadedResPool = {}; // 已加载资源的池 Vector.<object>
            this.$poolname = _poolname;
            this.$resconf = _resconf;
        }
        var __egretProto__ = SwfResPool.prototype;
        __egretProto__.Pool_recycle = function (target, objId, extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            var key = objId + egret.Config.GetExtendString(extendInfo);
            var objPool = null;
            if (this.$loadedResPool[key] != null) {
                objPool = this.$loadedResPool[key];
            }
            else {
                objPool = [];
            }
            if (objPool.indexOf(target) == -1) {
                objPool.push(target);
                if (target['clear']) {
                    target['clear']();
                }
                if (null != target["__type_name"]) {
                    switch (target["__type_name"]) {
                        case "egret.Sprite":
                        case "egret.SwfSprite":
                            target.x = 0;
                            target.y = 0;
                            target.scaleX = 1;
                            target.scaleY = 1;
                            target.rotation = 0;
                            target.alpha = 1;
                            break;
                        default:
                            break;
                    }
                }
            }
            if (null != target.instanceName) {
                target.instanceName = "";
            }
            this.$loadedResPool[key] = objPool;
        };
        __egretProto__.Pool_getByID = function (objId, extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            var target = null;
            var key = objId + egret.Config.GetExtendString(extendInfo);
            if (this.$loadedResPool[key] != null) {
                var objPool = this.$loadedResPool[key];
                if (objPool.length > 0) {
                    target = objPool.pop();
                    if (target['reset']) {
                        target['reset']();
                    }
                    return target;
                }
            }
            if (!this.$resconf) {
                switch (objId) {
                    case "egret.Sprite":
                        target = new egret.Sprite();
                        target["__type_name"] = "egret.Sprite";
                        break;
                    case "egret.SwfSprite":
                        target = new egret.SwfSprite();
                        target["__type_name"] = "egret.SwfSprite";
                        break;
                    default:
                        break;
                }
                if (null != target) {
                    target["__pool_key"] = key;
                }
            }
            else {
                var def = (this.$resconf.resDefs[objId]);
                switch (def.t) {
                    case egret.Config.RESImage:
                        var image = def;
                        var imageName = egret.Config.GetResName(image.id, egret.Config.RESImage, extendInfo);
                        var bitmapName = this.$resconf.resNamePrefix + imageName;
                        target = this.$createBitmap(bitmapName, def.id);
                        break;
                    case egret.Config.RESShape:
                        var shape = def;
                        var shapeName = egret.Config.GetResName(shape.id, egret.Config.RESShape, extendInfo);
                        bitmapName = this.$resconf.resNamePrefix + shapeName;
                        target = this.$createBitmap(bitmapName, def.id);
                        break;
                    case egret.Config.RESFont:
                        var font = def;
                        var picName = egret.Config.GetResName(font.id, egret.Config.RESFont, extendInfo);
                        bitmapName = this.$resconf.resNamePrefix + picName;
                        target = this.$createBitmap(bitmapName, def.id);
                        break;
                    case egret.Config.RESButton:
                        target = new egret.SwfButton();
                        target.conf = this.$resconf;
                        target.initWithDefine(def);
                        break;
                    case egret.Config.RESText:
                        target = new egret.SwfText(this.$resconf, def);
                        break;
                    case egret.Config.RESSprite:
                        target = new egret.SwfMovie(this.$resconf, "", def.id);
                        break;
                    default:
                        break;
                }
                if (null != target) {
                    target["__pool_key"] = key;
                    target.defId = def.id;
                    target["__def_id"] = def.id;
                    target.extendinfo = extendInfo;
                }
            }
            return target;
        };
        __egretProto__.$createBitmap = function (bitmapName, defId) {
            //var target = new egret.SwfSprite();
            var bitmap = new flash.Bitmap();
            bitmap.texture = RES.getRes(bitmapName);
            //target.addChild(bitmap);
            bitmap.cacheAsBitmap = true; // 9切会导致draw变为9，cacheAsBitmap让draw变回1
            var gridInfo = this.$resconf.getScalingGridInfo(defId);
            if (null != gridInfo) {
                bitmap.scale9Grid = new egret.Rectangle(gridInfo[0], gridInfo[1], gridInfo[2], gridInfo[3]);
            }
            return bitmap;
        };
        return SwfResPool;
    })();
    egret.SwfResPool = SwfResPool;
    SwfResPool.prototype.__class__ = "egret.SwfResPool";
})(egret || (egret = {}));
