/**
 * Created by huitao on 4/28/2015.
 */
module flash {
    export class XML {
        /**
         * [static] 确定当 XML 对象分析源 XML 数据时，是否忽略 XML 注释。 XML
         * @type {boolean}
         */
        static ignoreComments:boolean = true;

        /**[static] 确定当 XML 对象分析源 XML 数据时，是否忽略 XML 处理指令。 XML*/
        static ignoreProcessingInstructions:boolean = true;

        /**[static] 确定分析期间是否忽略文本节点开头和末尾处的空白字符。 XML*/
        static ignoreWhitespace:boolean = true;

        /**[static] 确定当 XML.prettyPrinting 属性设置为 true 时，toString() 和 toXMLString() 方法所应用的缩进量。 XML*/
        static prettyIndent:number = 2;

        /**[static] 确定 toString() 和 toXMLString() 方法是否对某些标签之间的空白字符进行规格化。*/
        static prettyPrinting:boolean = true;

        private $value:any;

        // json 对象
        public $valueObj:Object;

        private $parent:any;

        constructor(_value?:any, _vobj?:any, _parent?:any) {
            this.$value = _value;
            this.$valueObj = _vobj == undefined ? egret.XML.parse(this.$value) : _vobj;
        }


        /**
         * 将给定子项追加到该 XML 对象属性的末尾。
         * @param child
         * @returns {XML}
         */
        public appendChild(child:any):XML {
            var temp:Object = egret.XML.parse(child);

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
        }

        /**
         * 将提供的 child 对象的副本插入 XML 元素中，并放在该元素的任何现有 XML 属性前面。
         * @param child
         * @returns {XML}
         */
        public prependChild(child:any):XML {
            var temp:Object = egret.XML.parse(child);

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
        }

        /**
         * 刷新父节点的数据
         * @param xml
         */
        private freshen(xml:any):void {
            if (xml == null || !(xml instanceof XML))return;

            if (xml["_parent"] != undefined && xml["_parent"] != null) {
                this.freshen(xml["_parent"]);
            }
            else {
                xml._value = this.loop(xml._valueObj);
            }
        }

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
        public descendants(_name?:any):XMLList {
            //如果是星号（*）则匹配所有节点
            if (_name == undefined) _name = "*";
            var arr:Array<any> = new Array<any>();
            if (this.$valueObj["children"] != undefined) {
                for (var prop in this.$valueObj["children"]) {
                    this.loopKey(_name, this.$valueObj["children"][prop], arr);
                }
            }

            var xmlList:XMLList = new XMLList();
            for (var i:number = 0; i < arr.length; i++) {
                xmlList[i] = arr[i];
            }
            xmlList[i] = this;

            return xmlList;
        }

        /**
         *
         * @param _name 属性民币
         * @param _value 属性值
         * @param _exp 符号
         * @returns {as3.XMLList}
         */
        public dotAt(_name:string, _value:any = "", _exp:string = "==", isexp:boolean = true):XMLList {
            var arr:Array<any> = new Array<any>();

            var list:XMLList = this.descendants("*");

            var xml:XML = null;
            var num:number = 0;
            for (var p in list) {
                xml = list[p];
                if (xml && xml.$valueObj && xml.$valueObj.hasOwnProperty("$" + _name) == true) {
                    if (_value == undefined || _value == "") {
                        if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                        arr.push(xml)
                    }
                    else if (_exp == "==") {
                        if (xml.$valueObj["$" + _name] == _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "!=") {
                        if (xml.$valueObj["$" + _name] != _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == ">=") {
                        if (xml.$valueObj["$" + _name] >= _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "<=") {
                        if (xml.$valueObj["$" + _name] <= _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }

                    }
                    else if (_exp == ">") {
                        if (xml.$valueObj["$" + _name] > _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "<") {
                        if (xml.$valueObj["$" + _name] < _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "&&") {
                        if (xml.$valueObj["$" + _name] && _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                    else if (_exp == "||") {
                        if (xml.$valueObj["$" + _name] || _value) {
                            if (!isexp)xml = new XML(xml.$valueObj["$" + _name], xml.$valueObj);
                            arr[num] = xml;
                            num++;
                        }
                    }
                }
            }
            var ret:XMLList = new XMLList();
            for (var i:number = 0; i < arr.length; i++) {
                ret[i] = arr[i];
            }
            return ret;
        }


        /**
         *
         * @param _name 要匹配的key 标签
         * @param _vobj json格式的数据
         * @param _con 传入的数组保存 xml
         * @returns {XML}
         */
        private loopKey(_name:any, _vobj:Object, _con:Array<any>):XML {
            var myxml:XML;
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
        }

        /**
         * 返回其名称与 attributeName 参数相符的属性的 XML 值。
         * @param attributeName
         * @returns {XMLList}
         */
        public attribute(attributeName:any):XMLList {
            var xmlList:XMLList;

            var ret:any = "";
            var b:boolean = (this.$valueObj["$" + attributeName] != undefined);
            var xml:XML;
            if (b) {
                ret = this.$valueObj["$" + attributeName];
                xml = new XML(ret, this.$valueObj);
                xmlList = new XMLList();
                xmlList[0] = xml;
            }
            else {
                xmlList = new XMLList();
            }

            return xmlList;
        }


        public namespace(val?:any):any {
            if (val == undefined || val == "*") {
                var namespace:NameSpace = new NameSpace();
                if (this.$valueObj != null) {
                    if (this.$valueObj["prefix"] != undefined) {
                        namespace.prefix = this.$valueObj["prefix"];
                    }
                    if (this.$valueObj["namespace"] != undefined) {
                        namespace.uri = this.$valueObj["namespace"]
                    }
                }
            }
        }

        public parent():any {
            return this.$parent;
        }

        /**
         * 返回给定 XML 对象的属性值列表。
         * @returns {XMLList}
         */
        public attributes():XMLList {
            //var temp:Object = egret.XML.parse(this._value);
            var ats:Array<any> = egret.XML.getAttributes(this.$valueObj);
            var atslen:number = ats.length;

            var xmlList:XMLList;
            var xmlChild:Array<any>;
            for (var i:number = 0; i < atslen; i++) {
                xmlList = this.attribute(ats[i]);
                if (xmlChild == null) xmlChild = new Array();
                xmlChild = xmlChild.concat(xmlList);
            }

            var ret:XMLList = new XMLList();
            var num:number = 0;
            for (var i:number = 0; i < xmlChild.length; i++) {
                for (var a in xmlChild[i]) {
                    if (xmlChild[i][a] && xmlChild[i][a].dotExpr) {
                        ret[num] = xmlChild[i][a];
                        num++;
                    }

                }
            }
            return ret;
        }

        /**
         * 提供该 XML 对象限定名称的本地名称部分。
         * @returns {any}
         */
        public localName():any {
            return this.$valueObj["localName"];
        }


        /**
         * 返回给定 XML 对象的副本。
         * @returns {XML}
         */
        public copy():XML {
            return new XML(this.$value);
        }

        /**
         * 按 XML 对象的显示顺序列出其子项。
         * @returns {XMLList}
         */
        public children():XMLList {
            return this.child("*");
        }

        /**
         * 列出 XML 对象的子项。
         * @param propertyName 节点 item.abc
         * @returns {XMLList}
         */
        public child(propertyName:string):XMLList {
            //var temp:Object = egret.XML.parse(this._value);
            var rxmlList:XMLList = new XMLList(xmls);
            ;
            var childrens:Array<any>;
            var xml:XML;
            var xmls:Array<any> = new Array<any>();
            var prop:any;
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
                    rxmlList = new XMLList("");
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
                    //rxmlList = new XMLList(xmls);
                }
            }
            return rxmlList;
        }

        /**
         * 列出某 XML 对象的元素。
         * @param name
         * @returns {null}
         */
        public elements(name?:any):XMLList {
            return this.child(name);
        }

        //-----------------------------------------------------------------------------------------------------------------

        /**
         * 检查该 XML 对象是否包含复杂内容。
         * @returns {boolean}
         */
        public hasComplexContent():boolean {
            return this.$valueObj["children"] != null ? true : false;
        }

        public name():string {
            return this.$valueObj["name"];
        }

        /**
         * 检查该 XML 对象是否包含简单内容。
         * @returns {boolean}
         */
        public hasSimpleContent():boolean {
            return !this.hasComplexContent();
        }

        /**
         * 在该 XML 对象的 child1 参数后插入给定的 child2 参数并返回生成的对象。
         * @param child1
         * @param child2
         */
        public insertChildAfter(child1:Object, child2:Object):any {


        }

        /**
         * 对比该 XML 对象与给定 value 参数。
         */
        public contains(_value:any):boolean {

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


            var childs:Array<any> = this.$valueObj["children"];
            for (var prop in childs) {
                console.log(this.loop(childs[prop]))
                if (this.loop(childs[prop]) == _value.$value)
                    return true;
            }
            return false;
        }

        /**
         * 检查该对象是否具有 p 参数所指定的属性。
         */
        public hasOwnProperty(p:string):boolean {
            if (this.$valueObj && this.$valueObj["$" + p]) {
                return true;
            }
            return false;
        }

        /**
         * 将该 XML 对象的名称设置为给定限定名称或属性名。
         * @param name
         */
        public setName(_name:string):void {
            this.$valueObj["localName"] = _name;
            this.$valueObj["name"] = _name;
            this.$value = this.loop(this.$valueObj);
        }

        public valueOf():XML {
            return this;
        }

        public toString():string {
            return this.$value;
        }

        /**
         * 返回 XML 对象的字符串表示形式。
         */
        public toXMLString():string {
            return this.$value;
        }


        /**
         * 循环JSON 对象生成对应xml节点字符串
         * @param _obj
         * @returns {string}
         */
        private loop(_obj:Object):string {
            var xml:string = "";

            xml = "<" + _obj["name"] + " ";
            for (var temp in _obj) {
                //生成属性
                if (temp.charAt(0) == "$") {
                    xml = xml.concat(temp.substring(1, temp.length) + " = \"" + _obj[temp] + "\" ");
                }
            }

            xml = xml.concat(">")
            if (_obj["text"] != undefined) {
                xml = xml.concat(_obj["text"]);
            }
            if (_obj["children"] != undefined) {
                for (var prop in _obj["children"]) {
                    xml = xml.concat(this.loop(_obj["children"][prop]));
                    //console.log(this.loop(_obj["children"][prop]));
                }
            }
            xml = xml.concat("</" + _obj["name"] + ">");
            return xml;
        }

        public dot(m?:any):any {
            var xml:XML;
            var xmls:Array<any> = new Array<any>();
            var rxmlList:XMLList = new XMLList(xmls);
            var num:number = 0;
            if(this.$valueObj && this.$valueObj[m])
            {
                rxmlList[0] = this;
            }
            else
            {
                
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
        }

        public dotStar(m?:any):any {
            return this.dot();
        }

        public dotExpr(m?:any, v:any = null, exp:string = "=="):any {
            var xmllist:XMLList = new XMLList();
            var xmls:Array<any> = new Array<any>();
            var num:number = 0;
            if (this.$valueObj["children"] != undefined) {
                for (var prop in this.$valueObj["children"]) {
                    if (this.$valueObj["children"][prop].localName == m) {

                        if (exp == "==") {

                            if (this.$valueObj["children"][prop].text == v) {

                                xmllist[num] = this;
                                num++;
                            }//xmls.push(this);
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
        }

        public dotAtExpr(m?:any, v?:any, exp:string = ""):any {
            return this.dotAt(m, v, exp, true);
        }

        public dotDouble(m?:any):any {
            return this.descendants(m);
        }

        public dotDoubleStar(m?:any):any {
            return this.descendants();
        }

        public dotAlt(m?:any, v?:any, exp?:any):any {
            return this.dotAt(m, v, exp, false);
        }
    }
}
