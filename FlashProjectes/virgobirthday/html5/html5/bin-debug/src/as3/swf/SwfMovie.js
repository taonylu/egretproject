var egret;
(function (egret) {
    var SwfMovie = (function (_super) {
        __extends(SwfMovie, _super);
        /**
         * @param _conf
         * @param _symbolName
         * @param id 非舞台对象一定要传入id或者symbol
         */
        function SwfMovie(conf, symbolName, id) {
            if (conf === void 0) { conf = null; }
            if (symbolName === void 0) { symbolName = ""; }
            if (id === void 0) { id = -1; }
            _super.call(this);
            this.$frameRate = 24;
            this.$frameIntervalTime = 1000 / 24; //每一帧间隔时间 1000/$frameRate
            this.$passedTime = 0; //自启动以来经过的时间
            this._eventPool = null;
            /// movieclip part start
            this.$totalFrames = 1;
            // readonly
            this.$currentFrame = 1;
            //read only
            this.$isPlaying = false;
            /// movieclip part end
            this.$isStopped = true; //默认是停止播放的
            //private _playTimes:number = 1;//播放次数
            //private setPlayTimes(value:number){
            //	if(value < 0 || value >= 1){
            //		this._playTimes = value < 0 ? -1 : Math.floor(value);
            //	}
            //}
            this._isAddedToStage = false;
            this.$defID = -1; //未初始化的为-1
            this.__scale9BG_hasChecked = false; // 是否检查过九切背景
            this.__scale9BG_tag = false; // 是否带九切背景
            this.$curFrameObjs = {}; //depth-Sprite映射
            this.$setConf(conf, symbolName);
            if (id != -1) {
                this.$defID = id;
            }
            if (this.$defID != -1) {
                var def = (this.conf.resDefs[this.$defID]);
                this.$totalFrames = def.f;
                this.frameRate = 24;
                this.$currentFrame = 1;
                //this.$createFrame();//添加到舞台之后必须创建内容，否则取不到影片剪辑里的对象
                this.play();
            }
        }
        var __egretProto__ = SwfMovie.prototype;
        Object.defineProperty(__egretProto__, "frameRate", {
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                value = Math.floor(value); //防止小数
                if (value < 1)
                    value = 1;
                if (value > 60)
                    value = 60; //帧率不超过60
                if (value == this.$frameRate)
                    return;
                this.$frameRate = value;
                this.$frameIntervalTime = 1000 / this.$frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "totalFrames", {
            get: function () {
                return this.$totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "currentFrame", {
            get: function () {
                return this.$currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isPlaying", {
            get: function () {
                return this.$isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        //readonly 未支持
        //public var currentFrameLabel:String;
        //readonly 未支持
        //public var currentLabel : String
        //public var numChildren:int = 0;
        //将播放头移到指定帧并播放
        __egretProto__.gotoAndPlay = function (frame) {
            this.$isPlaying = true;
            if (null == this.conf)
                return;
            this.$currentFrame = frame;
            this.$playFrame();
            if (this.$totalFrames > 1 && this._isAddedToStage) {
                this.setIsStopped(false);
            }
            else {
            }
        };
        //将播放头移到指定帧并停止
        __egretProto__.gotoAndStop = function (frame) {
            this.$isPlaying = false;
            if (null == this.conf)
                return;
            this.$currentFrame = frame;
            this.$playFrame();
            this.setIsStopped(true);
        };
        //将播放头移到前一帧并停止
        __egretProto__.prevFrame = function () {
            this.$isPlaying = false;
            if (null == this.conf)
                return;
            this.$currentFrame -= 1;
            this.$currentFrame = this.$currentFrame < 1 ? this.$currentFrame : 1;
            this.$playFrame();
            this.setIsStopped(true);
        };
        //跳到后一帧并停止
        __egretProto__.nextFrame = function () {
            this.$isPlaying = false;
            if (null == this.conf)
                return;
            this.$currentFrame += 1;
            this.$currentFrame = this.$currentFrame > this.$totalFrames ? 1 : this.$currentFrame;
            this.$playFrame();
            this.setIsStopped(true);
        };
        //继续播放当前动画
        __egretProto__.play = function () {
            this.$isPlaying = true;
            this.$playFrame();
            if (this.$totalFrames > 1 && this._isAddedToStage) {
                this.setIsStopped(false);
            }
            else {
            }
        };
        //暂停播放动画
        __egretProto__.stop = function () {
            this.$isPlaying = false;
            this.setIsStopped(true);
        };
        __egretProto__._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            this._isAddedToStage = true;
            if (this.$isPlaying && this.$totalFrames > 1) {
                this.setIsStopped(false);
            }
        };
        __egretProto__._onRemoveFromStage = function () {
            _super.prototype._onRemoveFromStage.call(this);
            this._isAddedToStage = false;
            this.setIsStopped(true);
        };
        __egretProto__.setIsStopped = function (value) {
            if (this.$isStopped == value)
                return;
            this.$isStopped = value;
            if (value) {
                //this._playTimes = 0;
                egret.Ticker.getInstance().unregister(this.$onEnterFrame, this);
            }
            else {
                //this._playTimes = this._playTimes == 0 ? 1 : this._playTimes;
                egret.Ticker.getInstance().register(this.$onEnterFrame, this);
            }
        };
        Object.defineProperty(__egretProto__, "defID", {
            get: function () {
                return this.$defID;
            },
            set: function (value) {
                this.$defID = value;
            },
            enumerable: true,
            configurable: true
        });
        // 需要子类实现的方法，设置conf参数
        __egretProto__.$setConf = function (conf, symbolName) {
            if (conf === void 0) { conf = null; }
            if (symbolName === void 0) { symbolName = ""; }
            if (conf != null) {
                this.conf = conf;
                if (symbolName != "") {
                    this.symbolName = symbolName;
                }
            }
            else {
                if (this['resConfig'] != null) {
                    this.conf = this['resConfig'];
                    if (this['symbolName'] != "") {
                        this.symbolName = this['symbolName'];
                    }
                }
            }
            if (!this.conf) {
                return;
            }
            if (this.symbolName != "" && null != this.conf.symbols[this.symbolName]) {
                var symbol = (this.conf.symbols[this.symbolName]);
                this.defID = symbol.id;
            }
            else {
                this.defID = 0;
            }
        };
        // 检测是否是带九切的背景图 - 注意此方法只能执行一次
        __egretProto__.setBackGroundScale9Bitmap = function () {
            var child;
            var con = this;
            if (!this.__scale9BG_hasChecked) {
                while (con && con.numChildren && (con.numChildren == 1)) {
                    child = con.getChildAt(0);
                    if (child instanceof flash.Bitmap) {
                        break;
                    }
                    else {
                        con = child;
                    }
                }
                this.__scale9BG_hasChecked = true;
                if (child instanceof flash.Bitmap && child.scale9Grid) {
                    this.__scale9BG_tag = true;
                }
                if (this.__scale9BG_tag) {
                    if (this.scaleX != 1 || this.scaleY != 1) {
                        var exScaleX = 1;
                        var exScaleY = 1;
                        con = this;
                        while (con && con.numChildren && (con.numChildren == 1)) {
                            child = con.getChildAt(0);
                            if (child instanceof flash.Bitmap) {
                                child.scaleX = exScaleX; // 图片直接使用了父级的缩放值，注意：如果自己也有缩放值，可能会有显示错误。如果用child.scaleX *= exScaleX;累加值，父级重新设置缩放后会继续累加，也会错误
                                child.scaleY = exScaleY;
                                break;
                            }
                            else {
                                exScaleX *= con.scaleX;
                                exScaleY *= con.scaleY;
                                con.scaleX = 1;
                                con.scaleY = 1;
                                con = child;
                            }
                        }
                    }
                }
            }
        };
        // 每一个ticker判断是否执行播放帧，播放几帧。
        __egretProto__.$advanceTime = function (advancedTime) {
            var self = this;
            var currentTime = self.$passedTime + advancedTime;
            self.$passedTime = currentTime % self.$frameIntervalTime;
            var num = currentTime / self.$frameIntervalTime;
            if (num < 1)
                return;
            while (num >= 1) {
                num--;
            }
        };
        __egretProto__.$onEnterFrame = function () {
            var next = this.$currentFrame + 1;
            next = next > this.$totalFrames ? 1 : next;
            if (next == this.$currentFrame) {
                return;
            }
            this.$currentFrame = next;
            this.$playFrame();
        };
        /**
         * 根据下标播放帧
         * @param frame
         */
        __egretProto__.$playFrame = function () {
            this.$createFrame(this.$currentFrame);
        };
        /**
         * 创建一帧的显示对象
         * @param frame
         * @return
         *
         */
        __egretProto__.$createFrame = function (frame) {
            if (frame === void 0) { frame = 0; }
            var datas = this.$getFrameData(this.$currentFrame, this.defID);
            this.$recycleRemovedObjs(datas);
            this.$placeObjects(datas, this, frame);
        };
        //回收这一帧中移除的显示对象
        __egretProto__.$recycleRemovedObjs = function (datas) {
            var depthDic = {};
            var length = datas.length;
            for (var i = 0; i < length; i++) {
                var po = datas[i];
                depthDic[po.depth] = po.id;
            }
            for (var key in this.$curFrameObjs) {
                if (depthDic[key] == this.$curFrameObjs[key]["__def_id"]) {
                }
                else {
                    this.$recycleInnerObj(this.$curFrameObjs[key]);
                    var obj = (this.$curFrameObjs[key]);
                    obj.parent && this.$removeChildRef(obj, obj.parent); // 移除引用
                    obj.parent && obj.parent.removeChild(obj);
                    delete this.$curFrameObjs[key];
                }
            }
        };
        __egretProto__.$recycleInnerObj = function (obj) {
            if (null == obj) {
                return;
            }
            if (obj instanceof egret.SwfSprite && 1 == obj.numChildren) {
                var result = egret.SwfRes.Pool_recycle(this.conf.path, this.conf, obj, obj.defId, obj.extendinfo);
                if (result)
                    return;
            }
            else if (obj instanceof egret.SwfButton) {
                var result = egret.SwfRes.Pool_recycle(this.conf.path, this.conf, obj, obj.defId);
                if (result)
                    return;
            }
            else if (obj instanceof egret.SwfText) {
                var result = egret.SwfRes.Pool_recycle(this.conf.path, this.conf, obj, obj.defId);
                if (result)
                    return;
            }
            if (obj['numChildren'] && obj['numChildren'] > 0) {
                var child = obj['removeChildAt'](0);
                this.$recycleInnerObj(child);
            }
        };
        /**
         * 一帧的所有对象的位移变换数据
         * @param frame
         * @param id
         * @return
         *
         */
        __egretProto__.$getFrameData = function (frame, id) {
            if (id === void 0) { id = 0; }
            var datas;
            var spdef = (this.conf.resDefs[id]);
            datas = (spdef.fd[frame - 1]);
            return datas;
        };
        /**
         * 填充DefineImage数据
         */
        __egretProto__.$addImage = function (def, parantSP, po) {
            var imgDis = null;
            if (null != this.$curFrameObjs[po.depth]) {
                imgDis = this.$curFrameObjs[po.depth];
            }
            else {
                imgDis = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
                this.$curFrameObjs[po.depth] = imgDis;
                imgDis["__def_id"] = def.id;
            }
            parantSP.addChild(imgDis);
            egret.S2PUtils.SetTransform(imgDis, po);
        };
        /**
         * 填充DefineShape数据
         */
        __egretProto__.$addShape = function (def, parantSP, po) {
            var shapeContainer;
            if (null != this.$curFrameObjs[po.depth]) {
                shapeContainer = this.$curFrameObjs[po.depth];
            }
            else {
                shapeContainer = new egret.Sprite();
                this.$curFrameObjs[po.depth] = shapeContainer;
                shapeContainer["__def_id"] = def.id;
                //shape png
                if (def.isexportpng) {
                    var shapePNG = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
                    shapeContainer.addChild(shapePNG);
                    // 设置自身的偏移（图形在帧上不是放置在0,0点的）
                    shapePNG.x = def.x;
                    shapePNG.y = def.y;
                }
            }
            parantSP.addChild(shapeContainer);
            egret.S2PUtils.SetTransform(shapeContainer, po); // 设置placeobject的放置位置，颜色信息
        };
        /**
         * 填充DefineSprite型数据
         * eg:[26:PlaceObject2] Depth: 10, CharacterID: 14, Matrix: (1,0,0,1,8579,4221), Name: stagemc3
         * @param defsp
         * @param parantSP
         * @param po
         * @param frame
         *
         */
        __egretProto__.$addSprite = function (defsp, parantSP, po) {
            var mc = null;
            if (null != this.$curFrameObjs[po.depth]) {
                mc = this.$curFrameObjs[po.depth];
            }
            else {
                mc = new egret.SwfMovie(this.conf, "", defsp.id);
                this.$curFrameObjs[po.depth] = mc;
                mc["__def_id"] = defsp.id;
            }
            parantSP.addChild(mc);
            // 更新属性
            egret.S2PUtils.SetTransform(mc, po);
            if (mc instanceof egret.SwfMovie) {
                mc.setBackGroundScale9Bitmap(); //SwfSprite在更新了缩放属性之后检查子对象里是不是有九切的位图
            }
            this.$saveChildRef(mc, parantSP, po);
        };
        __egretProto__.$addText = function (def, parantSP, po) {
            var txt = null;
            if (null != this.$curFrameObjs[po.depth]) {
                txt = this.$curFrameObjs[po.depth];
            }
            else {
                //txt = new egret.SwfText(this.conf, <DefineText>def);
                txt = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
                this.$curFrameObjs[po.depth] = txt;
                txt["__def_id"] = def.id;
            }
            parantSP.addChild(txt);
            egret.S2PUtils.SetTransform(txt, po);
            this.$saveChildRef(txt, parantSP, po);
        };
        __egretProto__.$addButton = function (def, parentSP, po) {
            var btn = null;
            if (null != this.$curFrameObjs[po.depth]) {
                btn = this.$curFrameObjs[po.depth];
            }
            else {
                btn = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, def.id);
                //btn = new SwfButton();
                //btn.id = def.id;
                //btn.conf = this.conf;
                //btn.initWithDefine(def);
                btn["__def_id"] = def.id;
                this.$curFrameObjs[po.depth] = btn;
            }
            parentSP.addChild(btn);
            egret.S2PUtils.SetTransform(btn, po);
            this.$saveChildRef(btn, parentSP, po);
        };
        // 保存子对象的引用
        __egretProto__.$saveChildRef = function (child, parent, po) {
            if (null != po.instanceName && "" != po.instanceName) {
                child["instanceName"] = po.instanceName;
                parent[po.instanceName] = child;
            }
        };
        // 移除子对象的引用
        __egretProto__.$removeChildRef = function (child, parent) {
            if (null != child.instanceName && parent[child.instanceName]) {
                delete parent[child.instanceName];
            }
        };
        __egretProto__.$addDisplayObject = function (po, parantSP, frame) {
            if (frame === void 0) { frame = 1; }
            var defbase = (this.conf.resDefs[po.id]);
            if (null == defbase) {
                console.warn("defbase is null.", po);
                return;
            }
            switch (defbase.t) {
                case egret.Config.RESImage:
                    this.$addImage(defbase, parantSP, po);
                    break;
                case egret.Config.RESShape:
                    this.$addShape(defbase, parantSP, po);
                    break;
                case egret.Config.RESSprite:
                    this.$addSprite(defbase, parantSP, po);
                    break;
                case egret.Config.RESText:
                    this.$addText(defbase, parantSP, po);
                    break;
                case egret.Config.RESButton:
                    this.$addButton(defbase, parantSP, po);
                    break;
                default:
                    break;
            }
        };
        /**
         * 按照深度排序
         * @param po1
         * @param po2
         * @return
         *
         */
        SwfMovie.sortOnDepth = function (po1, po2) {
            if (po1.depth > po2.depth) {
                return 1;
            }
            else if (po1.depth < po2.depth) {
                return -1;
            }
            return 0;
        };
        __egretProto__.$placeObjects = function (datas, parantSP, frame) {
            if (parantSP === void 0) { parantSP = null; }
            if (frame === void 0) { frame = 1; }
            if (null == parantSP) {
                parantSP = new egret.SwfSprite();
            }
            datas.sort(SwfMovie.sortOnDepth);
            var length = datas.length;
            for (var i = 0; i < length; i++) {
                var po = datas[i];
                this.$addDisplayObject(po, parantSP, frame);
            }
            return parantSP;
        };
        return SwfMovie;
    })(egret.SwfSprite);
    egret.SwfMovie = SwfMovie;
    SwfMovie.prototype.__class__ = "egret.SwfMovie";
})(egret || (egret = {}));
