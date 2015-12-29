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
declare class LoadManager {
    /**实例*/
    private static instance;
    /**加载完成回调*/
    private loadComplete;
    /**加载错误回调*/
    private loadError;
    /**加载进度回调*/
    private loadProgress;
    /**回调函数绑定的对象*/
    private thisObject;
    constructor();
    static getInstance(): LoadManager;
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */
    loadGroup(name: string, thisObject: any, loadComplete?: Function, loadProgress?: Function, loadError?: Function): void;
    /**资源组加载完成*/
    private onResourceLoadComplete(event);
    /**资源组加载错误*/
    private onResourceLoadError(event);
    /**资源组加载进度*/
    private onResourceProgress(event);
    /**清除指定资源组的回调函数*/
    private clearCallBack(name);
}
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
declare class ObjectPool {
    /**存储对象池的Object*/
    private static pool;
    /**存储对象的数组*/
    private list;
    /**对象类型*/
    private className;
    constructor(className: string);
    /**获取对象*/
    getObject(): any;
    /**回收对象*/
    returnObject(value: any): void;
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    static getPool(className: string, initNum?: number): ObjectPool;
}
/**
*  文 件 名：ArrayTool.ts
*  功    能：数组工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
declare class ArrayTool {
    /**选择法随机排序数组*/
    static randomArr(arr: Array<any>): void;
    /**浅复制二维数组*/
    static copy2DArr(arr: Array<any>): Array<any>;
    /**获取Object的长度*/
    static getObjectLen(obj: Object): number;
}
/**
*  文 件 名：StringTool.ts
*  功    能： 字符串工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
declare class StringTool {
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
    static mixToUnicode(str: string): string;
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */
    static mixUnicodeToCh(str: string): string;
}
/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
declare class NumberTool {
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */
    static getRandomInt(start: number, end: number): number;
}
