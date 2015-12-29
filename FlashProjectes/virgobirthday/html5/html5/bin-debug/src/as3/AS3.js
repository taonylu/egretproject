/**
 * Created by mengj_000 on 2015/4/16.
 */
var flash;
(function (flash) {
    var progressTime = 0;
    flash.frame = 0;
    flash.stage;
    function init(stage) {
        flash.stage = stage;
        progressTime = (new Date()).getTime();
        stage.addEventListener(egret.Event.ENTER_FRAME, onNextFrame, null);
        new flash.BindManager();
    }
    flash.init = init;
    function onNextFrame(e) {
        flash.frame++;
    }
    function InitArray() {
        return null;
    }
    flash.InitArray = InitArray;
    function tranint(val, radix) {
        if (typeof val == "boolean") {
            if (val) {
                return 1;
            }
            return 0;
        }
        if (typeof val != "number")
            return parseInt(val);
        return Math.floor(val);
    }
    flash.tranint = tranint;
    function trannumber(val, radix) {
        if (typeof val != "number")
            return parseFloat(val);
        return val;
    }
    flash.trannumber = trannumber;
    function Boolean(val) {
        return val ? true : false;
    }
    flash.Boolean = Boolean;
    function isNaN(val) {
        return val == undefined ? true : false;
    }
    flash.isNaN = isNaN;
    function String(val) {
        return val + "";
    }
    flash.String = String;
    function uint(val) {
        return val == undefined ? 0 : val < 0 ? 0 : Math.floor(val);
    }
    flash.uint = uint;
    function XML_(val) {
        return new flash.XML(val);
    }
    flash.XML_ = XML_;
    function XMLList_(val) {
        return new flash.XMLList(val);
    }
    flash.XMLList_ = XMLList_;
    function As3is(value, type, implement) {
        if (value == null)
            return false;
        var name;
        if (type) {
            if (type == "Class") {
                if (value.prototype && value.prototype.__class__)
                    return true;
                return false;
            }
            if (typeof (type) == "string")
                name = type;
            else
                name = flash.getClassName(type);
            if (typeof (value) != "object") {
                if (typeof (value) == name)
                    return true;
                return false;
            }
            if (egret.getQualifiedClassName(value) == name)
                return true;
            var cls;
            if (value.__proto__ && value.__proto__.__proto__)
                cls = value.__proto__.__proto__;
            while (cls) {
                if (cls.__class__ == name)
                    return true;
                if (cls.__proto__)
                    cls = cls.__proto__;
                else
                    cls = null;
            }
        }
        else if (implement) {
            var className = null;
            try {
                className = egret.getQualifiedClassName(value);
            }
            catch (e) {
                className = null;
            }
            if (className == null) {
                return false;
            }
            var implements = classImplements.getItem(className);
            if (implements) {
                for (var i = 0; i < implements.length; i++) {
                    if (implements[i] == implement) {
                        return true;
                    }
                }
            }
            var cls;
            if (value.__proto__ && value.__proto__.__proto__)
                cls = value.__proto__.__proto__;
            while (cls) {
                implements = classImplements.getItem(cls.__class__);
                if (implements) {
                    for (var i = 0; i < implements.length; i++) {
                        if (implements[i] == implement) {
                            return true;
                        }
                    }
                }
                if (cls.__proto__)
                    cls = cls.__proto__;
                else
                    cls = null;
            }
        }
        return false;
    }
    flash.As3is = As3is;
    function As3As(value, type, implement) {
        if (As3is(value, type, implement) == false)
            return null;
        return value;
    }
    flash.As3As = As3As;
    function AS3Object(_val) {
        return _val;
    }
    flash.AS3Object = AS3Object;
    flash.sortOn = function (arr, fieldName, options) {
        var ch;
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i][fieldName] > arr[i + 1][fieldName]) {
                ch = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = ch;
                i = -1;
            }
        }
        return arr;
    };
    var AS3Array = (function () {
        function AS3Array() {
        }
        var __egretProto__ = AS3Array.prototype;
        AS3Array.CASEINSENSITIVE = 1;
        AS3Array.DESCENDING = 2;
        AS3Array.NUMERIC = 16;
        AS3Array.RETURNINDEXEDARRAY = 8;
        AS3Array.UNIQUESORT = 4;
        return AS3Array;
    })();
    flash.AS3Array = AS3Array;
    AS3Array.prototype.__class__ = "flash.AS3Array";
    function error(msg, id) {
        return new flash.Error(msg, id);
    }
    flash.error = error;
    function getTimer() {
        return (new Date()).getTime() - progressTime;
    }
    flash.getTimer = getTimer;
    function setTimeout(fun, time) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        function fun2() {
            var arg2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg2[_i - 0] = arguments[_i];
            }
            if (arg2.length > 0) {
                var arg3 = arg2[0];
                if (arg3.length == 0) {
                    fun.call(null);
                }
                else if (arg3.length == 1) {
                    fun.call(null, arg3[0]);
                }
                else if (arg3.length == 2) {
                    fun.call(null, arg3[0], arg3[1]);
                }
                else if (arg3.length == 3) {
                    fun.call(null, arg3[0], arg3[1], arg3[2]);
                }
                else if (arg3.length == 4) {
                    fun.call(null, arg3[0], arg3[1], arg3[2], arg3[3]);
                }
                else {
                    fun.call(null, arg3);
                }
            }
            else {
                fun.call(null);
            }
        }
        return egret.setTimeout(fun2, null, time, arg);
    }
    flash.setTimeout = setTimeout;
    function setInterval(fun, time) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        function fun2() {
            var arg2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg2[_i - 0] = arguments[_i];
            }
            if (arg2.length > 0) {
                var arg3 = arg2[0];
                if (arg3.length == 0) {
                    fun.call(null);
                }
                else if (arg3.length == 1) {
                    fun.call(null, arg3[0]);
                }
                else if (arg3.length == 2) {
                    fun.call(null, arg3[0], arg3[1]);
                }
                else if (arg3.length == 3) {
                    fun.call(null, arg3[0], arg3[1], arg3[2]);
                }
                else if (arg3.length == 4) {
                    fun.call(null, arg3[0], arg3[1], arg3[2], arg3[3]);
                }
                else {
                    fun.call(null, arg3);
                }
            }
            else {
                fun.call(null);
            }
        }
        return egret.setInterval(fun2, null, time, arg);
    }
    flash.setInterval = setInterval;
    function clearInterval(time) {
        egret.clearInterval(time);
    }
    flash.clearInterval = clearInterval;
    function clearTimeout(time) {
        egret.clearTimeout(time);
    }
    flash.clearTimeout = clearTimeout;
    function describeType(s) {
        var keys = Object.keys(s);
        console.log(keys);
        return null;
        //没有实现    
    }
    flash.describeType = describeType;
    function changeStringAny(str) {
        for (var i = 0; i < str.length; i++) {
            if (str.slice(i, i + 2) == "\\r") {
                str = str.slice(0, i) + "\r" + str.slice(i + 2, str.length);
            }
            if (str.slice(i, i + 2) == "\\n") {
                str = str.slice(0, i) + "\n" + str.slice(i + 2, str.length);
            }
            if (str.slice(i, i + 2) == "\\\\") {
                str = str.slice(0, i) + "\\" + str.slice(i + 2, str.length);
            }
        }
        return str;
    }
    flash.changeStringAny = changeStringAny;
    var bindId = 0;
    function bind(func, owner) {
        if (func == null)
            return null;
        if (func["__EgretBid__"] == null) {
            func["__EgretBid__"] = bindId;
            bindId++;
        }
        var bid = func["__EgretBid__"];
        if (owner["__EgretBO__"] == null) {
            owner["__EgretBO__"] = {};
        }
        if (!owner["__EgretBO__"][bid]) {
            var f = function () {
                return f["function"].apply(f["owner"], arguments);
            };
            f["function"] = func;
            f["owner"] = owner;
            owner["__EgretBO__"][bid] = f;
        }
        return owner["__EgretBO__"][bid];
    }
    flash.bind = bind;
    var classImplements;
    function implementsClass(cls, implements) {
        if (!classImplements)
            classImplements = new flash.Dictionary();
        classImplements.setItem(cls, implements);
    }
    flash.implementsClass = implementsClass;
    var ArgumentError = (function (_super) {
        __extends(ArgumentError, _super);
        function ArgumentError(msg, id) {
            _super.call(this, msg, id);
            this.name = "ArgumentError";
        }
        var __egretProto__ = ArgumentError.prototype;
        return ArgumentError;
    })(flash.Error);
    flash.ArgumentError = ArgumentError;
    ArgumentError.prototype.__class__ = "flash.ArgumentError";
    function navigateToURL(url, windowFlag) {
        if (windowFlag === void 0) { windowFlag = null; }
        window.open(url.url, windowFlag);
    }
    flash.navigateToURL = navigateToURL;
})(flash || (flash = {}));
