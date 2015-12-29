/**
*  文 件 名：LoadManager.ts
*  功    能： 加载类
*  内    容： 自定义加载类，方便添加回调函数，减少代码书写
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
/**资源加载类*/
var LoadManager = (function () {
    function LoadManager() {
        this.loadComplete = new Object();
        this.loadError = new Object();
        this.loadProgress = new Object();
        this.thisObject = new Object();
    }
    var d = __define,c=LoadManager;p=c.prototype;
    LoadManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LoadManager();
        }
        return this.instance;
    };
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */
    p.loadGroup = function (name, thisObject, loadComplete, loadProgress, loadError) {
        if (loadComplete === void 0) { loadComplete = null; }
        if (loadProgress === void 0) { loadProgress = null; }
        if (loadError === void 0) { loadError = null; }
        this.loadComplete[name] = loadComplete;
        this.loadError[name] = loadError;
        this.loadProgress[name] = loadProgress;
        this.thisObject[name] = thisObject;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(name);
    };
    /**资源组加载完成*/
    p.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        var fun = this.loadComplete[groupName];
        if (fun != null) {
            fun.call(this.thisObject[groupName], event);
        }
        this.clearCallBack(groupName);
    };
    /**资源组加载错误*/
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        var fun = this.loadError[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
        this.clearCallBack(event.groupName);
    };
    /**资源组加载进度*/
    p.onResourceProgress = function (event) {
        var fun = this.loadProgress[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
    };
    /**清除指定资源组的回调函数*/
    p.clearCallBack = function (name) {
        this.loadComplete[name] = null;
        this.loadError[name] = null;
        this.loadProgress[name] = null;
    };
    return LoadManager;
})();
egret.registerClass(LoadManager,"LoadManager");

/**
*  文 件 名：ObjectPool.ts
*  功    能： 对象池类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
/**对象池*/
var ObjectPool = (function () {
    function ObjectPool(className) {
        this.className = className;
        this.list = [];
    }
    var d = __define,c=ObjectPool;p=c.prototype;
    /**获取对象*/
    p.getObject = function () {
        if (this.list.length > 0) {
            return this.list.shift();
        }
        var clazz = egret.getDefinitionByName(this.className);
        return new clazz();
    };
    /**回收对象*/
    p.returnObject = function (value) {
        this.list.push(value);
    };
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    ObjectPool.getPool = function (className, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!ObjectPool.pool[className]) {
            ObjectPool.pool[className] = new ObjectPool(className);
            if (initNum != 0) {
                var clazz = egret.getDefinitionByName(className);
                var pool = ObjectPool.pool[className];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return ObjectPool.pool[className];
    };
    /**存储对象池的Object*/
    ObjectPool.pool = {};
    return ObjectPool;
})();
egret.registerClass(ObjectPool,"ObjectPool");

/**
*  文 件 名：ArrayTool.ts
*  功    能：数组工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var ArrayTool = (function () {
    function ArrayTool() {
    }
    var d = __define,c=ArrayTool;p=c.prototype;
    /**选择法随机排序数组*/
    ArrayTool.randomArr = function (arr) {
        var i = arr.length;
        var temp;
        var indexA;
        var indexB;
        while (i) {
            indexA = i - 1;
            indexB = Math.floor(Math.random() * i);
            i--;
            if (indexA == indexB)
                continue;
            temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        }
    };
    /**浅复制二维数组*/
    ArrayTool.copy2DArr = function (arr) {
        var outArr = new Array();
        var len = arr.length;
        var len2 = arr[0].length;
        for (var i = 0; i < len; i++) {
            var outArr2D = new Array();
            outArr.push(outArr2D);
            for (var j = 0; j < len2; j++) {
                outArr2D.push(arr[i][j]);
            }
        }
        return outArr;
    };
    /**获取Object的长度*/
    ArrayTool.getObjectLen = function (obj) {
        var count = 0;
        for (var i in obj) {
            count++;
        }
        return count;
    };
    return ArrayTool;
})();
egret.registerClass(ArrayTool,"ArrayTool");

/**
*  文 件 名：StringTool.ts
*  功    能： 字符串工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
var StringTool = (function () {
    function StringTool() {
    }
    var d = __define,c=StringTool;p=c.prototype;
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
    StringTool.mixToUnicode = function (str) {
        var i = 0;
        var l = str.length;
        var result = ""; //转换后的结果
        var unicodePrefix = "\\u"; //unicode前缀 (example:\1234||\u1234)
        var unicode16; //转换成16进制后的unicode
        var charCode;
        for (; i < l; i++) {
            //转为16进制的unicode
            charCode = str.charCodeAt(i);
            if (charCode > 255) {
                unicode16 = charCode.toString(16);
                result += unicodePrefix + unicode16;
            }
            else {
                result += str.charAt(i);
            }
        }
        return result;
    };
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */
    StringTool.mixUnicodeToCh = function (str) {
        return eval("'" + str + "'");
    };
    return StringTool;
})();
egret.registerClass(StringTool,"StringTool");

/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var NumberTool = (function () {
    function NumberTool() {
    }
    var d = __define,c=NumberTool;p=c.prototype;
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */
    NumberTool.getRandomInt = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    return NumberTool;
})();
egret.registerClass(NumberTool,"NumberTool");

