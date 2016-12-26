
/**
 * @对象池
 * @author chenkai
 * @date 2016/12/23
*/
class ObjectPool extends SingleClass{
    /**存储对象池的Object*/
    private poolList: Object = {};
    
    /**          
     * 获取对象池，如果不存在则新建一个          
     * @param className 对象类名         
     * @param initNum 初始化对象池数量          
     */
    public getPool(className: string,initNum: number = 0): Pool {
        if(!this.poolList[className]) {
            this.poolList[className] = new Pool(className);
            if(initNum != 0) {
                var clazz: any = egret.getDefinitionByName(className);
                var pool: Pool = this.poolList[className];
                for(var i: number = 0;i < initNum;i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return this.poolList[className];
    }
}

/**对象池*/
class Pool{
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
            return this.list.pop();
        }
        var clazz: any = egret.getDefinitionByName(this.className);
        return new clazz();

    }

    /**回收对象*/
    public returnObject(obj: any): void {
        this.list.push(obj);
    }
    
    /**获取对象池长度*/
    public get length(){
        var count:number = 0;
        for(var key in this.list){
            count ++;
        }
        return count;
    }
}