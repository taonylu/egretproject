/**
 * Created by mengj_000 on 2015/4/16.
 */
module flash
{
    var progressTime = 0;
    export var frame = 0;
    export var stage:egret.Stage;
    export function init(stage:egret.Stage)
    {
        flash.stage = stage;
        progressTime = (new Date()).getTime();
        stage.addEventListener(egret.Event.ENTER_FRAME,onNextFrame,null);

        new BindManager();
    }

    function onNextFrame(e:egret.Event):void
    {
        frame++;
    }

    export function InitArray()
    {
        return null;
    }

    export function tranint(val,radix?:number){
        if(typeof val == "boolean"){
            if(val){
                return 1;
            }
            return 0;
        }
        if(typeof val != "number")
            return parseInt(val);
       
            
        return Math.floor(val);
    }
    export function trannumber(val,radix?:number){
        if(typeof val != "number")
            return parseFloat(val);
        return val
    }
    export function Boolean(val){return val?true:false;}
    export function isNaN(val){return val==undefined?true:false;}
    export function String(val) {return val + "";}
    export function uint(val) {return val==undefined?0:val<0?0:Math.floor(val);}
    export function XML_(val)
    {
        return new XML(val);
    }
    export function XMLList_(val) {return new XMLList(val);}
    export function As3is(value,type,implement?):boolean
    {
        if(value == null) return false;
        var name;
        if(type)
        {
            if(type == "Class")
            {
                if(value.prototype && value.prototype.__class__) return true;
                return false;
            }
            if(typeof(type) == "string") name = type;
            else  name = flash.getClassName(type);
            if(typeof(value) != "object")
            {
                if(typeof(value) == name) return true;
                return false;
            }
            if(egret.getQualifiedClassName(value) == name) return true;
            var cls;
            if(value.__proto__ && value.__proto__.__proto__) cls = value.__proto__.__proto__;
            while (cls) {
                if (cls.__class__ == name)
                    return true;
                if(cls.__proto__) cls = cls.__proto__;
                else cls = null;
            }
        }
        else if(implement)
        {
            var className = null;
            try{
                className = egret.getQualifiedClassName(value);
            }catch(e){
                className = null;
            }

            if(className == null){
                return false;
            }

            var implements:Array<any> = classImplements.getItem(className);
            if(implements)
            {
                for(var i:number = 0; i < implements.length; i++)
                {
                    if(implements[i] == implement)
                    {
                        return true;
                    }
                }
            }
            var cls;
            if(value.__proto__ && value.__proto__.__proto__) cls = value.__proto__.__proto__;
            while (cls) {
                implements = classImplements.getItem(cls.__class__);
                if(implements)
                {
                    for(var i:number = 0; i < implements.length; i++)
                    {
                        if(implements[i] == implement)
                        {
                            return true;
                        }
                    }
                }
                if(cls.__proto__) cls = cls.__proto__;
                else cls = null;
            }
        }
        return false;
    }

    export function As3As(value,type,implement?):any
    {
        if(As3is(value,type,implement) == false) return null;
        return value;
    }

    export function AS3Object(_val):Object
    {
        return _val;
    }

    export var sortOn = function(arr:Array<any>,fieldName:any,options?:any)
    {
        var ch:any;
        for(var i = 0; i < arr.length - 1; i++)
        {
            if(arr[i][fieldName] > arr[i+1][fieldName])
            {
                ch = arr[i+1];
                arr[i+1] = arr[i];
                arr[i] = ch;
                i = -1;
            }
        }
        return arr;
    }

    export class AS3Array {
        public static CASEINSENSITIVE:number = 1;
        public static DESCENDING:number = 2;
        public static NUMERIC:number = 16;
        public static RETURNINDEXEDARRAY:number = 8;
        public static UNIQUESORT:number = 4;
    }



    export function error(msg,id?:number):Error
    {
        return new Error(msg,id);
    }

    export function getTimer():number
    {
        return (new Date()).getTime() - progressTime;
    }

    export function setTimeout(fun:Function,time:number,...arg):number
    {
        function fun2(...arg2):void{//与flash类兼容，返回结果一致
            if(arg2.length>0){
                var arg3 = arg2[0];
                if(arg3.length==0){
                    fun.call(null);
                }else if(arg3.length == 1){
                    fun.call(null, arg3[0]);
                }else if(arg3.length == 2){
                    fun.call(null, arg3[0], arg3[1]);
                }else if(arg3.length == 3){
                    fun.call(null, arg3[0], arg3[1], arg3[2]);
                }else if(arg3.length == 4){
                    fun.call(null, arg3[0], arg3[1], arg3[2],arg3[3]);
                }else{
                    fun.call(null, arg3);
                }
            }else{
                fun.call(null);
            }
        }
        return egret.setTimeout(fun2,null,time,arg);
    }

    export function setInterval(fun:Function,time:number,...arg):number
    {
        function fun2(...arg2):void{
            if(arg2.length>0){
                var arg3 = arg2[0];
                if(arg3.length==0){
                    fun.call(null);
                }else if(arg3.length == 1){
                    fun.call(null, arg3[0]);
                }else if(arg3.length == 2){
                    fun.call(null, arg3[0], arg3[1]);
                }else if(arg3.length == 3){
                    fun.call(null, arg3[0], arg3[1], arg3[2]);
                }else if(arg3.length == 4){
                    fun.call(null, arg3[0], arg3[1], arg3[2],arg3[3]);
                }else{
                    fun.call(null, arg3);
                }
            }else{
                fun.call(null);
            }
        }
        return egret.setInterval(fun2,null,time,arg);
    }

    export function clearInterval(time:number):void
    {
        egret.clearInterval(time);
    }

    export function clearTimeout(time:number):void
    {
        egret.clearTimeout(time);
    }
    
    export function describeType(s:any):XML
    {

        var keys:Array<any> = Object.keys(s);

        console.log(keys);
        return null;
        //没有实现    
    }
	
	export function changeStringAny(str:string):string
    {
        for(var i = 0; i < str.length; i++)
        {
            if(str.slice(i,i+2) == "\\r")
            {
                str = str.slice(0,i) + "\r" + str.slice(i+2,str.length);
            }
            if(str.slice(i,i+2) == "\\n")
            {
                str = str.slice(0,i) + "\n" + str.slice(i+2,str.length);
            }
            if(str.slice(i,i+2) == "\\\\")
            {
                str = str.slice(0,i) + "\\" + str.slice(i+2,str.length);
            }
        }
        return str;
    }

    var bindId = 0;

    export function bind(func:Function,owner:any):Function
    {
        if(func == null) return null;
        if(func["__EgretBid__"] == null)
        {
            func["__EgretBid__"] = bindId;
            bindId++;
        }
        var bid = func["__EgretBid__"];
        if(owner["__EgretBO__"] == null)
        {
            owner["__EgretBO__"] = {};
        }
        if(!owner["__EgretBO__"][bid])
        {
            var f:Function = function()
            {
                return f["function"].apply(f["owner"],arguments);
            }
            f["function"] = func;
            f["owner"] = owner;
            owner["__EgretBO__"][bid] = f;
        }
        return owner["__EgretBO__"][bid];
    }

    var classImplements:Dictionary;
    export function implementsClass(cls:any,implements):void
    {
        if(!classImplements) classImplements = new Dictionary();
        classImplements.setItem(cls,implements);
    }

    var classExtends:Dictionary;
    export function extendsClass(cls:any,implements):void
    {
        if(!classExtends) classExtends = new Dictionary();
        classExtends.setItem(cls,implements);
    }
    
    export class ArgumentError extends Error
    {
        public constructor(msg?:string,id?:number)
        {
            super(msg,id);
            this.name = "ArgumentError";
        }
    }
	export function navigateToURL(url:URLRequest, windowFlag:string = null):void{
	    window.open(url.url, windowFlag);
	}

    /**
     * 检查int数值越界
     * */
    export function checkInt(_num:number):number
    {
        if(!_num) return 0;

        if(_num > 2147483647)
        {
            return checkInt(-2147483648 +(_num - 2147483647) -1);
        }
        else if(_num < -2147483648)
        {
            return checkInt(2147483647 - (-2147483648 - _num ) +1);
        }

        return _num;
    }

    /**
     * 检查uint数值越界
     * */
    export function checkUint(_num:number):number
    {
        if(!_num) return 0;

        if(_num > 4294967295)
        {
            return checkUint((_num - 4294967295) -1);
        }
        else if(_num < 0)
        {
            return checkUint(4294967295 + _num  +1);
        }
        return _num;
    }
	
	export function changeOverride(_c,_d,fun,val?):any
	{
		if(val)
		{
			flash.superSetter(fun,_c,_d,val);
		}			
		else 
		{
			return flash.superGetter(fun,_c,_d);
		}
	}	
	
	/**
     * @language zh_CN
     * 调用父类的setter属性，代替其他语言的写法，如 super.alpha = 1;
     * @param thisObj 当前对象。永远都this
     * @param currentClass 当前 class 类名，非字符串
     * @param type 需要调用的setter属性名称
     * @param values 传给父类的值
     *
     * @exmaple egret.superSetter(this, "alpha", 1);
     */
    export function superSetter(currentClass:any, thisObj:any, type:string, ...values) {
        var cla = currentClass.prototype;
        var seters = cla["__sets__"];
        if (seters == null) {
            seters = cla["__sets__"] = {};
        }

        var setF = seters[type];
        if (setF) {
            return setF.apply(thisObj, values);
        }

        var d = Object.getPrototypeOf(cla);
        if (d == null) {
            return;
        }



        while (!d.hasOwnProperty(type)) {
            d = Object.getPrototypeOf(d);

            if (d == null) {
                return;
            }
        }
        setF = Object.getOwnPropertyDescriptor(d, type).set;
        seters[type] = setF;
        setF.apply(thisObj, values);
    }

    /**
     * @language en_US
     * Get getter property value of the parent class. Instead of writing in other languages, such as super.alpha;
     * @param thisObj 当前对象。永远都this
     * @param type 需要调用的setter属性名称
     * @returns {any} The value returned by the parent
     *
     * @exmaple egret.superGetter(this, "alpha");
     */
    /**
     * @language zh_CN
     * 获取父类的getter属性值。代替其他语言的写法，如 super.alpha;
     * @param thisObj 当前对象。永远都this
     * @param currentClass 当前 class 类名，非字符串
     * @param type 需要调用的setter属性名称
     * @returns {any} 父类返回的值
     *
     * @exmaple egret.superGetter(this, "alpha");
     */
    export function superGetter(currentClass:any, thisObj:any, type:string):any {
        var cla = currentClass.prototype;
        var geters = cla["__gets__"];
        if (geters == null) {
            geters = cla["__gets__"] = {};
        }

        var getF = geters[type];
        if (getF) {
            return getF.call(thisObj);
        }

        var d = Object.getPrototypeOf(cla);
        if (d == null) {
            return;
        }

        while (!d.hasOwnProperty(type)) {
            d = Object.getPrototypeOf(d);

            if (d == null) {
                return;
            }
        }
        getF = Object.getOwnPropertyDescriptor(d, type).get;
        geters[type] = getF;
        return getF.call(thisObj);
    }
}

