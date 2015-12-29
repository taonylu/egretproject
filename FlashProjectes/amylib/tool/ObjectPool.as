package com.mylib.tool 
{
	import flash.utils.Dictionary;
	import flash.utils.getDefinitionByName;
	import flash.system.ApplicationDomain;
	/**
	 * 对象池
	 * @author Rikimaru
	 */
	public class ObjectPool 
	{
		/**存储对象池*/
		private static var pool:Dictionary = new Dictionary();
		/**存储对象*/
		private var list:Array;
		/**对象类型*/
		private var clazz:Class;
		
		public function ObjectPool(clazz:Class) 
		{
			this.clazz = clazz;
			this.list = [];
		}
		
		/**获取对象*/
		public function getObject():*{
			if(list.length > 0){
				return this.list.shift();
			}
			return new clazz();
		}
		
		/**回收对象*/
		public function returnObject(obj:*):void{
			this.list.push(obj);
		}
		
		/**          
		 * 获取对象池，如果不存在则新建一个          
		 * @param className 对象类名         
		 * @param initNum 初始化对象池数量          
		 */
		public static function getPool(clazz: Class,initNum: int = 0): ObjectPool {
			if(!ObjectPool.pool[clazz]) {
				ObjectPool.pool[clazz] = new ObjectPool(clazz);
				if (initNum != 0) {
					var pool: ObjectPool = ObjectPool.pool[clazz];
					for(var i: int = 0;i < initNum;i++) {
						pool.returnObject(new clazz());
					}
				}
			}
			return ObjectPool.pool[clazz];
		}
    }
}