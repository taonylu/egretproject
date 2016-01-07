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
class ObjectPool {
    /**存储对象池的Object*/
    private static pool: Object = {};
    /**存储对象的数组*/
    private list: Array<any>;
    /**对象类型*/
    private className: string;

    public constructor(className: string) {
        this.className = className;
        this.list = [];
    }

    /**获取对象*/
    public getObject(): any {
        if(this.list.length > 0) {
            return this.list.shift();
        }
        var clazz: any = egret.getDefinitionByName(this.className);
        return new clazz();

    }

    /**回收对象*/
    public returnObject(value: any): void {
        this.list.push(value);
    }
    /**          
     * 获取对象池，如果不存在则新建一个          
     * @param className 对象类名         
     * @param initNum 初始化对象池数量          
     */
    public static getPool(className: string,initNum: number = 0): ObjectPool {
        if(!ObjectPool.pool[className]) {
            ObjectPool.pool[className] = new ObjectPool(className);
            if(initNum != 0) {
                var clazz: any = egret.getDefinitionByName(className);
                var pool: ObjectPool = ObjectPool.pool[className];
                for(var i: number = 0;i < initNum;i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return ObjectPool.pool[className];
    }
}






