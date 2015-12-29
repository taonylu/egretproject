/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    var LoaderInfo = (function (_super) {
        __extends(LoaderInfo, _super);
        function LoaderInfo() {
            _super.call(this);
            this.$loadGroupName = "";
        }
        var __egretProto__ = LoaderInfo.prototype;
        Object.defineProperty(__egretProto__, "applicationDomain", {
            get: function () {
                return this.$applicationDomain;
            },
            set: function (domain) {
                this.$applicationDomain = domain;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "content", {
            get: function () {
                return this.$content;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.initWidthLoader = function (loader, req) {
            this.loader = loader;
            var url = req.url;
            url = url.split("?")[0];
            var arr = url.split(".");
            var end = arr[arr.length - 1];
            if (end == "png" || end == "jpg" || end == "PNG" || end == "JPG") {
                if (this.$urlLoader == null) {
                    this.$urlLoader = new egret.URLLoader();
                    this.$urlLoader.addEventListener(egret.Event.COMPLETE, this.$onLoadComplete, this);
                }
                this.$urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                this.$urlLoader.load(req);
            }
            else if (end == "swf" || end == "SWF") {
                //this.$loadSWF(url.split(".")[0]);//不能处理scale.9.in.Flash.IDE.swf这种情况
                var pathAndName = url.substring(0, url.length - 4);
                this.$loadSWF(pathAndName);
            }
        };
        __egretProto__.$onLoadComplete = function (e) {
            var txt = this.$urlLoader.data;
            var bmd = new flash.BitmapData(txt._bitmapWidth, txt._bitmapHeight, false, 0, txt);
            this.$content = new flash.Bitmap(bmd);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        __egretProto__.$loadSWF = function (swfName) {
            //swfName:swf加载路径，与导出端的方式保持一致。支持中文名非法字符等
            swfName = encodeURI(swfName);
            var reg = /\./g;
            swfName = swfName.replace(reg, "_"); //替换scale.9.in.Flash.IDE为scale_9_in_Flash_IDE
            swfName = "swfres/" + swfName;
            this.$loadGroupName = swfName.split("/").join("_") + "_";
            var resJsonURL = "resource/" + swfName + "/res.json";
            RES.getResByUrl(resJsonURL, this.$getResComplete, this, RES.ResourceItem.TYPE_JSON);
        };
        __egretProto__.$getResComplete = function (p) {
            RES.parseConfig(p, "resource/"); //直接读取资源配置
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.$onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.$onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.$onResourceProgress, this);
            //console.log(this.$loadGroupName);
            RES.loadGroup(this.$loadGroupName);
        };
        __egretProto__.$onResourceLoadComplete = function (event) {
            // console.log("loaded group:" + event.groupName);
            if (event.groupName == this.$loadGroupName) {
                //必须在接收到本组加载成功后移除，不能放在if外面
                this.$removeEvents();
                RES.getResAsync(event.groupName + "config", this.$onLoadConfig, this);
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        __egretProto__.$onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.$onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        __egretProto__.$onResourceProgress = function (event) {
            if (event.groupName == this.$loadGroupName) {
                //console.log("$onResourceProgress  ", event.itemsLoaded, "  " + event.itemsTotal);
                var progressEvent = new egret.ProgressEvent(egret.ProgressEvent.PROGRESS, true, true, event.itemsLoaded, event.itemsTotal);
                this.dispatchEvent(progressEvent);
            }
        };
        __egretProto__.$removeEvents = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.$onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.$onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.$onResourceProgress, this);
        };
        __egretProto__.$onLoadConfig = function (obj) {
            var resConfig = new egret.Resconfig(obj);
            if (resConfig.picMerge) {
                resConfig.resNamePrefix = resConfig.relativeDir.split("/").join("_") + "pic.";
            }
            else {
                resConfig.resNamePrefix = resConfig.relativeDir.split("/").join("_");
            }
            resConfig.resModule = resConfig.relativeDir.split("/").join(".");
            //console.log(resConfig);
            if (this.$applicationDomain == flash.ApplicationDomain.currentDomain) {
                // 如果加载到主应用程序域中，不需要保存模块名。都加载到同一个模块中。
                this.$applicationDomain.resModule = "";
            }
            else {
                this.$applicationDomain.resModule = resConfig.resModule;
                this.$applicationDomain['name'] = resConfig.resModule;
            }
            for (var key in resConfig.symbols) {
                if (!resConfig.symbols.hasOwnProperty(key)) {
                    continue;
                }
                var symbol = resConfig.symbols[key];
                this.$applicationDomain.defNames.push(symbol.className);
                var def = resConfig.resDefs[symbol.id];
                if (null != def) {
                    if (egret.Config.RESSprite == def.t) {
                        var templateStr = SwfUtils.symbolTemplate;
                        var clsName = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        //var parentClsName:string = "egret.SwfMovie";
                        var reg = new RegExp("TemplateClass1", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if (egret.Config.RESStage == def.t) {
                        var clsDefine = egret.getDefinitionByName(symbol.className);
                        if (null != clsDefine) {
                            clsDefine.prototype.resConfig = resConfig;
                            clsDefine.prototype.symbolName = symbol.className;
                        }
                    }
                    else if (egret.Config.RESImage == def.t) {
                        var templateStr = SwfUtils.bitmapDataTemplate;
                        var clsName = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg = new RegExp("TemplateClass2", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if (egret.Config.RESButton == def.t) {
                        var templateStr = SwfUtils.buttonTemplate;
                        var clsName = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg = new RegExp("ButtonTemplate", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        /*reg = new RegExp("egret.SwfMovie", "g");
                        var parentClsName:string = "egret.SwfButton";
                        templateStr = templateStr.replace(reg, parentClsName);*/
                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if (egret.Config.RESSound == def.t) {
                        var templateStr = SwfUtils.soundTemplate;
                        var clsName = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg = new RegExp("SoundTemplate", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else {
                    }
                }
            }
            this.$content = new egret.SwfMovie(resConfig, "", 0); //舞台对象;
            //console.log(this.$applicationDomain.defNames);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        __egretProto__.addEventListener_as3 = function (type, listener, useCapture, priority, weak) {
            this.addEventListener(type, listener, null, useCapture, priority);
        };
        return LoaderInfo;
    })(egret.EventDispatcher);
    flash.LoaderInfo = LoaderInfo;
    LoaderInfo.prototype.__class__ = "flash.LoaderInfo";
})(flash || (flash = {}));
