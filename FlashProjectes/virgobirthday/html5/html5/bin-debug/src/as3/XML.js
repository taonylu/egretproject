/**
 * Created by huitao on 4/28/2015.
 */
var flash;
(function (flash) {
    var XML = (function () {
        function XML(_value, _vobj, _parent) {
            this.$value = _value;
            this.$valueObj = _vobj == undefined ? egret.XML.parse(this.$value) : _vobj;
        }
        var __egretProto__ = XML.prototype;
        /**
         * 将给定子项追加到该 XML 对象属性的末尾。
         * @param child
         * @returns {XML}
         */
        __egretProto__.appendChild = function (child) {
            var temp = egret.XML.parse(child);
            if (this.$valueObj["children"] != undefined) {
                this.$valueObj["children"].push(temp);
            }
            else {
                this.$valueObj["children"] = [temp];
            }
            this.$value = this.loop(this.$valueObj);
            this.freshen(this.$parent);
            //使用后需要刷新所有节点
            return this;
        };
        /**
         * 将提供的 child 对象的副本插入 XML 元素中，并放在该元素的任何现有 XML 属性前面。
         * @param child
         * @returns {XML}
         */
        __egretProto__.prependChild = function (child) {
            var temp = egret.XML.parse(child);
            if (this.$valueObj["children"] != undefined) {
                this.$valueObj["children"].unshift(temp);
            }
            else {
                this.$valueObj["children"] = [temp];
            }
            this.$value = this.loop(this.$valueObj);
            this.freshen(this.$parent);
            //使用后需要刷新所有节点
            return this;
        };
        /**
         * 刷新父节点的数据
         * @param xml
         */
        __egretProto__.freshen = function (xml) {
            if (xml == null || !(xml instanceof XML))
                return;
            if (xml["_parent"] != undefined && xml["_parent"] != null) {
                this.freshen(xml["_parent"]);
            }
            else {
                xml._value = this.loop(xml._valueObj);
            }
        };
        /**
         * var xml:string ="<enrollees><student id=\"239\"><class name=\"Algebra\" /><class name=\"Spanish 2\"/></student><student id=\"206\"><class name=\"Trigonometry\" /><class name=\"Spanish 2\" /></student></enrollees>";
         * var myXml:XML = new XML(xml);
         * console.log(myXml.descendants("*"));
         * console.log(myXml.descendants("class"));
         *
         * 返回包含给定 name 参数的 XML 对象的所有后代（子级、孙级、曾孙级等）。
         * @param _name
         * @returns {XMLList}
         */
        __egretProto__.descendants = function (_name) {
            //如果是星号（*）则匹配所有节点
            if (_name == undefined)
                _name = "*";
            var arr = new Array();
            if (this.$valueObj["children"] != undefined) {
                for (var prop in this.$valueObj["children"]) {
                    this.loopKey(_name, this.$valueObj["children"][prop], arr);
                }
            }
            var xmlList = new flash.XMLList();
            for (var i = 0; i < arr.length; i++) {
                xmlList[i] = arr[i];
            }
            xmlList[i] = this;
            return xmlList;
        };
        /**
         *
         * @param _name 属性民币
         * @param _value 属性值
         * @param _exp 符号
         * @returns {as3.XMLList}
         */
        __egretProto__.dotAt = function (_name, _value, _exp, isexp) {
            if (_value === void 0) { _value = ""; }
            if (_exp === void 0) { _exp = "=="; }
            if (isexp === void 0) { isexp = true; }
            var arr = new Array();
            var list = this.descendants("*");
            var xml = null;
            var num = 0;
            for (var p in list) {
                xml = list[p];
                if (xml && xml.$valueObj && xml.$valueObj.hasOwnProperty("$" + _name) == true) {
                    if (_value == undefined || _value == "") {
                        if (!isexp)
                            xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                        arr.push(xml);
                    }
                    else if (_exp == "==") {
                        if (xml.$valueObj["$" + _name] == _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "!=") {
                        if (xml.$valueObj["$" + _name] != _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == ">=") {
                        if (xml.$valueObj["$" + _name] >= _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "<=") {
                        if (xml.$valueObj["$" + _name] <= _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == ">") {
                        if (xml.$valueObj["$" + _name] > _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "<") {
                        if (xml.$valueObj["$" + _name] < _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "&&") {
                        if (xml.$valueObj["$" + _name] && _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "||") {
                        if (xml.$valueObj["$" + _name] || _value) {
                            if (!isexp)
                                xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                }
            }
            var ret = new flash.XMLList();
            for (var i = 0; i < arr.length; i++) {
                ret[i] = arr[i];
            }
            return ret;
        };
        /**
         *
         * @param _name 要匹配的key 标签
         * @param _vobj json格式的数据
         * @param _con 传入的数组保存 xml
         * @returns {XML}
         */
        __egretProto__.loopKey = function (_name, _vobj, _con) {
            var myxml;
            if (_vobj.hasOwnProperty("children")) {
                for (var prop in _vobj["children"]) {
                    myxml = this.loopKey(_name, _vobj["children"][prop], _con);
                }
            }
            if (_vobj["name"] != undefined && (_vobj["name"] == _name || "*" == _name)) {
                myxml = new XML(this.loop(_vobj), _vobj);
                _con.push(myxml);
            }
            return myxml;
        };
        /**
         * 返回其名称与 attributeName 参数相符的属性的 XML 值。
         * @param attributeName
         * @returns {XMLList}
         */
        __egretProto__.attribute = function (attributeName) {
            var xmlList;
            var ret = "";
            var b = (this.$valueObj["$" + attributeName] != undefined);
            var xml;
            if (b) {
                ret = this.$valueObj["$" + attributeName];
                xml = new XML(ret, this.$valueObj);
                xmlList = new flash.XMLList();
                xmlList[0] = xml;
            }
            else {
                xmlList = new flash.XMLList();
            }
            return xmlList;
        };
        __egretProto__.namespace = function (val) {
            if (val == undefined || val == "*") {
                var namespace = new flash.NameSpace();
                if (this.$valueObj != null) {
                    if (this.$valueObj["prefix"] != undefined) {
                        namespace.prefix = this.$valueObj["prefix"];
                    }
                    if (this.$valueObj["namespace"] != undefined) {
                        namespace.uri = this.$valueObj["namespace"];
                    }
                }
            }
        };
        __egretProto__.parent = function () {
            return this.$parent;
        };
        /**
         * 返回给定 XML 对象的属性值列表。
         * @returns {XMLList}
         */
        __egretProto__.attributes = function () {
            //var temp:Object = egret.XML.parse(this._value);
            var ats = egret.XML.getAttributes(this.$valueObj);
            var atslen = ats.length;
            var xmlList;
            var xmlChild;
            for (var i = 0; i < atslen; i++) {
                xmlList = this.attribute(ats[i]);
                if (xmlChild == null)
                    xmlChild = new Array();
                xmlChild = xmlChild.concat(xmlList);
            }
            var ret = new flash.XMLList();
            var num = 0;
            for (var i = 0; i < xmlChild.length; i++) {
                for (var a in xmlChild[i]) {
                    if (xmlChild[i][a] && xmlChild[i][a].dotExpr) {
                        ret[num] = xmlChild[i][a];
                        num++;
                    }
                }
            }
            return ret;
        };
        /**
         * 提供该 XML 对象限定名称的本地名称部分。
         * @returns {any}
         */
        __egretProto__.localName = function () {
            return this.$valueObj["localName"];
        };
        /**
         * 返回给定 XML 对象的副本。
         * @returns {XML}
         */
        __egretProto__.copy = function () {
            return new XML(this.$value);
        };
        /**
         * 按 XML 对象的显示顺序列出其子项。
         * @returns {XMLList}
         */
        __egretProto__.children = function () {
            return this.child("*");
        };
        /**
         * 列出 XML 对象的子项。
         * @param propertyName 节点 item.abc
         * @returns {XMLList}
         */
        __egretProto__.child = function (propertyName) {
            //var temp:Object = egret.XML.parse(this._value);
            var rxmlList = new flash.XMLList(xmls);
            ;
            var childrens;
            var xml;
            var xmls = new Array();
            var prop;
            //var sparent:XML;
            if (propertyName == null || propertyName == "*") {
                if (this.$valueObj["children"] != undefined) {
                    childrens = this.$valueObj["children"];
                    for (prop in childrens) {
                        xml = new XML(this.loop(childrens[prop]), childrens[prop]);
                        xml.$parent = new XML(this.loop(this.$valueObj), this.$valueObj);
                        //xmls.push(xml);
                        rxmlList[prop] = xml;
                    }
                }
            }
            else {
                childrens = new Array();
                egret.XML.findChildren(this.$valueObj, propertyName, childrens);
                // 长度为0 ，没有子节点
                if (childrens.length == 0) {
                    rxmlList = new flash.XMLList("");
                }
                else {
                    for (prop in childrens) {
                        //console.log(childrens[prop]);
                        xml = new XML(this.loop(childrens[prop]), childrens[prop]);
                        if (childrens[prop].parent != undefined) {
                            xml.$parent = new XML(this.loop(childrens[prop].parent), childrens[prop].parent);
                        }
                        else {
                            xml.$parent = null;
                        }
                        //xmls.push(xml)
                        rxmlList[prop] = xml;
                    }
                }
            }
            return rxmlList;
        };
        /**
         * 列出某 XML 对象的元素。
         * @param name
         * @returns {null}
         */
        __egretProto__.elements = function (name) {
            return this.child(name);
        };
        //-----------------------------------------------------------------------------------------------------------------
        /**
         * 检查该 XML 对象是否包含复杂内容。
         * @returns {boolean}
         */
        __egretProto__.hasComplexContent = function () {
            return this.$valueObj["children"] != null ? true : false;
        };
        __egretProto__.name = function () {
            return this.$valueObj["name"];
        };
        /**
         * 检查该 XML 对象是否包含简单内容。
         * @returns {boolean}
         */
        __egretProto__.hasSimpleContent = function () {
            return !this.hasComplexContent();
        };
        /**
         * 在该 XML 对象的 child1 参数后插入给定的 child2 参数并返回生成的对象。
         * @param child1
         * @param child2
         */
        __egretProto__.insertChildAfter = function (child1, child2) {
        };
        /**
         * 对比该 XML 对象与给定 value 参数。
         */
        __egretProto__.contains = function (_value) {
            if (typeof (_value) == "string") {
                _value = new XML(_value, egret.XML.parse(_value));
            }
            _value.$value = this.loop(_value.$valueObj);
            if (_value.$value == this.$value) {
                return true;
            }
            if (!this.$valueObj.hasOwnProperty("children")) {
                return false;
            }
            //中转字符串
            var childs = this.$valueObj["children"];
            for (var prop in childs) {
                console.log(this.loop(childs[prop]));
                if (this.loop(childs[prop]) == _value.$value)
                    return true;
            }
            return false;
        };
        /**
         * 检查该对象是否具有 p 参数所指定的属性。
         */
        __egretProto__.hasOwnProperty = function (p) {
            if (this.$valueObj && this.$valueObj["$" + p]) {
                return true;
            }
            return false;
        };
        /**
         * 将该 XML 对象的名称设置为给定限定名称或属性名。
         * @param name
         */
        __egretProto__.setName = function (_name) {
            this.$valueObj["localName"] = _name;
            this.$valueObj["name"] = _name;
            this.$value = this.loop(this.$valueObj);
        };
        __egretProto__.valueOf = function () {
            return this;
        };
        __egretProto__.toString = function () {
            return this.$value;
        };
        /**
         * 返回 XML 对象的字符串表示形式。
         */
        __egretProto__.toXMLString = function () {
            return this.$value;
        };
        /**
         * 循环JSON 对象生成对应xml节点字符串
         * @param _obj
         * @returns {string}
         */
        __egretProto__.loop = function (_obj) {
            var xml = "";
            xml = "<" + _obj["name"] + " ";
            for (var temp in _obj) {
                //生成属性
                if (temp.charAt(0) == "$") {
                    xml = xml.concat(temp.substring(1, temp.length) + " = \"" + _obj[temp] + "\" ");
                }
            }
            xml = xml.concat(">");
            if (_obj["text"] != undefined) {
                xml = xml.concat(_obj["text"]);
            }
            if (_obj["children"] != undefined) {
                for (var prop in _obj["children"]) {
                    xml = xml.concat(this.loop(_obj["children"][prop]));
                }
            }
            xml = xml.concat("</" + _obj["name"] + ">");
            return xml;
        };
        __egretProto__.dot = function (m) {
            var xml;
            var xmls = new Array();
            var rxmlList = new flash.XMLList(xmls);
            var num = 0;
            if (this.$valueObj && this.$valueObj[m]) {
                rxmlList[0] = this;
            }
            else {
                if (this.$valueObj["children"] != undefined) {
                    for (var prop in this.$valueObj["children"]) {
                        if (m != undefined && this.$valueObj["children"][prop].localName == m) {
                            xml = new XML(this.loop(this.$valueObj["children"][prop]), this.$valueObj["children"][prop]);
                            if (this.$valueObj["children"][prop].parent != undefined) {
                                xml.$parent = new XML(this.loop(this.$valueObj["children"][prop].parent), this.$valueObj["children"][prop].parent);
                            }
                            else {
                                xml.$parent = null;
                            }
                            rxmlList[num] = xml;
                            num++;
                        }
                        else if (m == undefined || m == null) {
                            xml = new XML(this.loop(this.$valueObj["children"][prop]), this.$valueObj["children"][prop]);
                            if (this.$valueObj["children"][prop].parent != undefined) {
                                xml.$parent = new XML(this.loop(this.$valueObj["children"][prop].parent), this.$valueObj["children"][prop].parent);
                            }
                            else {
                                xml.$parent = null;
                            }
                            rxmlList[num] = xml;
                            num++;
                        }
                    }
                }
            }
            return rxmlList;
        };
        __egretProto__.dotStar = function (m) {
            return this.dot();
        };
        __egretProto__.dotExpr = function (m, v, exp) {
            if (v === void 0) { v = null; }
            if (exp === void 0) { exp = "=="; }
            var xmllist = new flash.XMLList();
            var xmls = new Array();
            var num = 0;
            if (this.$valueObj["children"] != undefined) {
                for (var prop in this.$valueObj["children"]) {
                    if (this.$valueObj["children"][prop].localName == m) {
                        if (exp == "==") {
                            if (this.$valueObj["children"][prop].text == v) {
                                xmllist[num] = this;
                                num++;
                            } //xmls.push(this);
                        }
                        else if (exp == "!=") {
                            if (this.$valueObj["children"][prop].text != v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                        else if (exp == ">=") {
                            if (this.$valueObj["children"][prop].text >= v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                        else if (exp == "<=") {
                            if (this.$valueObj["children"][prop].text <= v) {
                                num++;
                                xmllist[num] = this;
                            }
                        }
                        else if (exp == ">") {
                            if (this.$valueObj["children"][prop].text > v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                        else if (exp == "<") {
                            if (this.$valueObj["children"][prop].text < v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                        else if (exp == "&&") {
                            if (this.$valueObj["children"][prop].text && v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                        else if (exp == "||") {
                            if (this.$valueObj["children"][prop].text || v) {
                                xmllist[num] = this;
                                num++;
                            }
                        }
                    }
                }
            }
            return xmllist;
        };
        __egretProto__.dotAtExpr = function (m, v, exp) {
            if (exp === void 0) { exp = ""; }
            return this.dotAt(m, v, exp, true);
        };
        __egretProto__.dotDouble = function (m) {
            return this.descendants(m);
        };
        __egretProto__.dotDoubleStar = function (m) {
            return this.descendants();
        };
        __egretProto__.dotAlt = function (m, v, exp) {
            return this.dotAt(m, v, exp, false);
        };
        /**
         * [static] 确定当 XML 对象分析源 XML 数据时，是否忽略 XML 注释。 XML
         * @type {boolean}
         */
        XML.ignoreComments = true;
        /**[static] 确定当 XML 对象分析源 XML 数据时，是否忽略 XML 处理指令。 XML*/
        XML.ignoreProcessingInstructions = true;
        /**[static] 确定分析期间是否忽略文本节点开头和末尾处的空白字符。 XML*/
        XML.ignoreWhitespace = true;
        /**[static] 确定当 XML.prettyPrinting 属性设置为 true 时，toString() 和 toXMLString() 方法所应用的缩进量。 XML*/
        XML.prettyIndent = 2;
        /**[static] 确定 toString() 和 toXMLString() 方法是否对某些标签之间的空白字符进行规格化。*/
        XML.prettyPrinting = true;
        return XML;
    })();
    flash.XML = XML;
    XML.prototype.__class__ = "flash.XML";
})(flash || (flash = {}));
