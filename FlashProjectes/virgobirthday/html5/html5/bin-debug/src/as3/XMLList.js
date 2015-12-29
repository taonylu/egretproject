/**
* Created by huitao on 4/28/2015.
*/
var flash;
(function (flash) {
    var XMLList = (function () {
        function XMLList(_value) {
            if (_value === void 0) { _value = null; }
            this._value = _value;
        }
        var __egretProto__ = XMLList.prototype;
        /**
         * 调用每个 XML 对象的 attributes() 方法，并返回每个 XML 对象属性的 XMLList 对象。
         * @returns {null}
         */
        __egretProto__.attributes = function () {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].attributes) {
                    list = this[p].attributes();
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].dotExpr) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        /**
         * 调用每个 XML 对象的 attributes() 方法，并返回每个 XML 对象属性的 XMLList 对象。
         * @param attributeName
         * @returns {XMLList}
         */
        __egretProto__.attribute = function (attributeName) {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].attribute) {
                    list = this[p].attribute(attributeName);
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].attribute) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        /**
         * 调用每个 XML 对象的 child() 方法，并返回包含有序结果的 XMLList 对象。
         * @param propertyName
         * @returns {*}
         */
        __egretProto__.child = function (propertyName) {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].child)
                    list = this[p].child(propertyName);
                rlt = rlt.concat(list);
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].dotExpr) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        __egretProto__.copy = function () {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].copy) {
                    list = this[p].copy();
                    rlt.push(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].copy) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        __egretProto__.descendants = function (_name) {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].descendants) {
                    list = this[p].descendants(_name);
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].descendants) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        __egretProto__.dotAt = function (_name, _value, exp, isexp) {
            if (exp === void 0) { exp = "=="; }
            if (isexp === void 0) { isexp = true; }
            var arr = new Array();
            var list = new XMLList();
            var xml = null;
            var num = 0;
            var rlt = [];
            for (var p in this) {
                xml = this[p];
                if (xml && xml.dotAt) {
                    rlt = rlt.concat(xml.dotAt(_name, _value, exp, isexp));
                }
            }
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].children) {
                        list[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return list;
        };
        __egretProto__.contains = function (_value) {
            var rets = false;
            for (var p in this) {
                if (this[p] && this[p].contains)
                    rets = this[p].contains(_value);
                if (rets == true)
                    return true;
            }
            return rets;
        };
        /**
         * 调用每个 XML 对象的 children() 方法，并返回包含结果的 XMLList 对象。
         * @returns {null}
         */
        __egretProto__.children = function () {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].children) {
                    list = this[p].children();
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].children) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        /**
         * 列出所有XML 对象的元素。
         * @param name
         * @returns {XMLList}
         */
        __egretProto__.elements = function (name) {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].elements) {
                    list = this[p].elements(name);
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].elements) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        /**
         * 检查 XMLList 对象是否包含复杂内容。
         */
        __egretProto__.hasComplexContent = function () {
            var list;
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].hasComplexContent && this[p].hasComplexContent()) {
                    return true;
                }
            }
            return false;
        };
        __egretProto__.hasSimpleContent = function () {
            return !this.hasComplexContent();
        };
        __egretProto__.hasOwnProperty = function (_value) {
            var rets = false;
            for (var p in this) {
                if (this[p] && this[p].hasOwnProperty) {
                    rets = this[p].hasOwnProperty(_value);
                    if (rets == true)
                        return true;
                }
            }
            return rets;
        };
        __egretProto__.parent = function () {
            var list;
            var rlt = new Array();
            //var num:number = 0;
            //var leng:number = this._value.length;
            //if(leng == 0) return undefined;
            //用于保存相同的个数
            var d = new flash.Dictionary();
            for (var p in this) {
                if (this[p] && this[p].dotExpr) {
                    d.setItem(this[p].parent() ? this[p].parent().$valueObj : this[p].parent(), p);
                }
            }
            if (d.map.length == 0 || d.map.length > 1) {
                return undefined;
            }
            return this[0].parent();
        };
        __egretProto__.toXMLString = function () {
            //对各个进行处理
            var ret = "";
            for (var p in this) {
                if (this[p] && this[p].dotExpr) {
                    ret = ret.concat((this[p]).toXMLString());
                }
            }
            return ret;
        };
        __egretProto__.length = function () {
            var num = 0;
            for (var p in this) {
                if (this[p] && this[p].toXMLString) {
                    num++;
                }
            }
            return num;
        };
        __egretProto__.dot = function (m) {
            var num = 0;
            var ret = new XMLList();
            var list;
            var rlt = [];
            if (typeof (m) == "number" && this[m]) {
                ret[0] = this[m];
            }
            else {
                for (var p in this) {
                    if (this[p] && this[p].dot) {
                        list = this[p].dot(m);
                        rlt = rlt.concat(list);
                    }
                }
            }
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].dot) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        __egretProto__.dotStar = function (m) {
            return this.dot();
        };
        __egretProto__.dotExpr = function (m, v, exp) {
            if (v === void 0) { v = null; }
            if (exp === void 0) { exp = ""; }
            var list = new XMLList();
            var rlt = [];
            for (var p in this) {
                if (this[p] && this[p].dotExpr) {
                    list = (this[p]).dotExpr(m, v, exp);
                    rlt = rlt.concat(list);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].dotExpr) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        __egretProto__.dotAtExpr = function (m, v, exp) {
            return this.dotAt(m, v, exp, true);
        };
        __egretProto__.dotDouble = function (m) {
            return this.descendants(m);
        };
        __egretProto__.dotDoubleStar = function (m) {
            return this.descendants();
        };
        __egretProto__.dotAlt = function (m, v, exp) {
            var list = new XMLList();
            var rlt = [];
            var xmlt;
            for (var p in this) {
                if (this[p] && this[p].dotAlt) {
                    xmlt = (this[p]).dotAlt(m, v, exp, false);
                    rlt = rlt.concat(xmlt);
                }
            }
            var num = 0;
            var ret = new XMLList();
            for (var i = 0; i < rlt.length; i++) {
                for (var a in rlt[i]) {
                    if (rlt[i][a] && rlt[i][a].dotExpr) {
                        ret[num] = rlt[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        return XMLList;
    })();
    flash.XMLList = XMLList;
    XMLList.prototype.__class__ = "flash.XMLList";
})(flash || (flash = {}));
