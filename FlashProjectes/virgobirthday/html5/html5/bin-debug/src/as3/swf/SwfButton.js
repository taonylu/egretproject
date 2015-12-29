/**
 * Created by chenpeng on 2015/6/2.
 */
var egret;
(function (egret) {
    /*
     * flash.display.SimpleButton 映射为 SwfButton
     * 当前SwfButton不从as3.InteractiveObject继承，在flash中4个状态的实现原理和这里不一样。
    */
    var SwfButton = (function (_super) {
        __extends(SwfButton, _super);
        /**
         * 创建一个新的 SimpleButton 实例。可以将表示各种按钮状态的任意或全部显示对象都设置为构造函数中的参数。
         参数:
         upState SimpleButton 弹起状态的初始值。
         overState SimpleButton 经过状态的初始值。
         downState SimpleButton 按下状态的初始值。
         hitTestState SimpleButton hitTest 状态的初始值。
         */
        function SwfButton(upState, overState, downState, hitTestState) {
            if (upState === void 0) { upState = null; }
            if (overState === void 0) { overState = null; }
            if (downState === void 0) { downState = null; }
            if (hitTestState === void 0) { hitTestState = null; }
            _super.call(this);
            this.$upState = upState;
            this.$overState = overState;
            this.$downState = downState;
            this.$hitTestState = hitTestState;
            this.enabled = true;
            this.$init();
        }
        var __egretProto__ = SwfButton.prototype;
        Object.defineProperty(__egretProto__, "enabled", {
            get: function () {
                return this.$enabled;
            },
            set: function (value) {
                this.touchChildren = value;
                this.touchEnabled = value;
                this.$enabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "instanceName", {
            get: function () {
                return this.$instanceName;
            },
            set: function (value) {
                this.name = value;
                this.$instanceName = value;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.$init = function () {
            if (null != this.define && null != this.conf) {
                this.initWithDefine(this.define);
            }
            else {
                this.initWithDefine(null);
            }
        };
        __egretProto__.initWithDefine = function (define) {
            this.define = define;
            this.$addHit();
            this.$addUp();
            //this.$addOver();
            this.$addDown();
            this.$showState(SwfButton.STATE_UP);
        };
        // 添加有效点击区
        __egretProto__.$addHit = function () {
            if (null != this.define) {
                var hitTestState = this.$addStateChildrenFromDefine(this.define.hit);
                //hitTestState.touchChildren = true;
                this.$hitTestState = hitTestState;
            }
            else {
                this.$hitTestState = this.$addStateFromConstructor(this.$hitTestState);
            }
            this.$hitTestState.name = "hitTestState";
            this.$hitTestState.touchEnabled = true;
            this.$hitTestState.alpha = 0.01;
            this.$hitTestState.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            //this.$hitTestState.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.$hitTestState.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.$hitTestState.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        __egretProto__.onTouchBegin = function (event) {
            //console.log("down");
            this.$showState(SwfButton.STATE_DOWN);
        };
        __egretProto__.onTouchEnd = function (event) {
            //console.log("up")
            this.$showState(SwfButton.STATE_UP);
        };
        __egretProto__.onTouchReleaseOutside = function (event) {
            this.$showState(SwfButton.STATE_UP);
        };
        __egretProto__.onTouchTap = function (event) {
            //console.log("tap");
            this.$showState(SwfButton.STATE_UP);
        };
        __egretProto__.$addUp = function () {
            if (null != this.define) {
                this.$upState = this.$addStateChildrenFromDefine(this.define.up);
            }
            else {
                this.$upState = this.$addStateFromConstructor(this.$upState);
            }
            this.$upState.alpha = 1; //this.$hitTestState有可能本状态公用，在此重置alpha为1
            this.$upState.name = "upState";
        };
        //private $addOver():void{
        //    if(null != this.define){
        //        this.$overState = this.$addStateChildrenFromDefine(this.define.over);
        //    }else{
        //        this.$overState = this.$addStateFromConstructor(this.$overState);
        //    }
        //    this.$upState.alpha = 1;//this.$hitTestState有可能本状态公用，在此重置alpha为1
        //}
        __egretProto__.$addDown = function () {
            if (null != this.define) {
                this.$downState = this.$addStateChildrenFromDefine(this.define.down);
            }
            else {
                this.$downState = this.$addStateFromConstructor(this.$downState);
            }
            this.$downState.alpha = 1; //this.$hitTestState有可能本状态公用，在此重置alpha为1
            this.$downState.name = "downState";
        };
        // 判断并添加状态
        __egretProto__.$addStateFromConstructor = function (state) {
            if (null == state) {
                state = new egret.Sprite();
            }
            this.addChild(state);
            return state;
        };
        /**
         * 该状态的显示子对象列表，加入到一个容器中并返回
         * @param children
         * @returns {egret.Sprite}
         */
        __egretProto__.$addStateChildrenFromDefine = function (children) {
            var con = new egret.Sprite();
            con.touchChildren = con.touchEnabled = false;
            this.addChild(con);
            if (null == children || 0 == children.length) {
                return con;
            }
            else {
                for (var index = 0; index < children.length; index++) {
                    var dis = children[index];
                    var def = this.conf.resDefs[dis.characterId];
                    if (def) {
                        switch (def.t) {
                            case egret.Config.RESImage:
                                this.$addImage(def, con, dis);
                                break;
                            case egret.Config.RESShape:
                                this.$addShape(def, con, dis);
                                break;
                            case egret.Config.RESSprite:
                                this.$addSprite(def, con, dis);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            return con;
        };
        __egretProto__.$showState = function (state) {
            this.$upState.visible = false;
            //this.$overState.visible = false;
            this.$downState.visible = false;
            this.$hitTestState.visible = true;
            this.$hitTestState.alpha = 0.01;
            if (SwfButton.STATE_UP == state) {
                this.$upState.visible = true;
                this.$upState.alpha = 1;
            }
            else if (SwfButton.STATE_DOWN == state) {
                this.$downState.visible = true;
                this.$downState.alpha = 1;
            }
            else {
                this.$upState.visible = true;
                this.$upState.alpha = 1;
            }
        };
        __egretProto__.$addImage = function (defImg, parentSP, po) {
            var imgDis = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, defImg.id);
            parentSP.addChild(imgDis);
            egret.S2PUtils.SetMatrixAndColorTransform(imgDis, po);
        };
        __egretProto__.$addShape = function (shape, parantSP, transInfo) {
            var shapeContainer = new egret.Sprite();
            parantSP.addChild(shapeContainer);
            egret.S2PUtils.SetTransform(shapeContainer, transInfo); // 设置placeobject的放置位置，颜色信息
            //shape png
            if (shape.isexportpng) {
                var shapePNG = egret.SwfRes.Pool_getByID(this.conf.path, this.conf, shape.id);
                shapeContainer.addChild(shapePNG);
                // 设置自身的偏移（图形在帧上不是放置在0,0点的）
                shapePNG.x = shape.x;
                shapePNG.y = shape.y;
            }
            //bitmap fill
            if (shape.hasOwnProperty(egret.DefineShape.Dynamic_Fillstyles)) {
                var fills = (shape[egret.DefineShape.Dynamic_Fillstyles]);
                var length = fills.length;
                for (var i = 0; i < length; i++) {
                    var fillstyle = fills[i];
                    this.$addImage((this.conf.resDefs[fillstyle.bitmapId]), shapeContainer, fillstyle);
                }
            }
        };
        __egretProto__.$addSprite = function (defsp, parantSP, po) {
            var mc = null;
            mc = new egret.SwfMovie(this.conf, "", defsp.id);
            parantSP.addChild(mc);
            // 更新属性
            egret.S2PUtils.SetTransform(mc, po);
        };
        SwfButton.STATE_UP = "up";
        //public static STATE_OVER:string = "over";
        SwfButton.STATE_DOWN = "down";
        return SwfButton;
    })(egret.Sprite);
    egret.SwfButton = SwfButton;
    SwfButton.prototype.__class__ = "egret.SwfButton";
})(egret || (egret = {}));
