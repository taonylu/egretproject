
module egret {

	export class SwfRes{
		public static resPools:any = {};
		public static PoolName_Common:string = "common";

		public constructor(){
		}
		
		private static $instance:SwfRes;
		public instance():SwfRes{
			if(null == SwfRes.$instance){
				SwfRes.$instance = new SwfRes();
			}
			return SwfRes.$instance; 
		}

		
		// pool
		public static hasPool(poolname:string):boolean{
			return SwfRes.resPools[poolname] != null;
		}
		
		public static getPool(poolname:string):SwfResPool{ 
			return <SwfResPool><any> (SwfRes.resPools[poolname]);
		}

		/**
		 *
		 * @param poolname
		 * @param _resconf
		 * @param target 显示对象，SwfXXXX
		 * @param objId
		 * @param extendInfo
		 * @returns {boolean}
		 * @constructor
		 */
		public static Pool_recycle(poolname:string, _resconf:Resconfig, target:any, objId = null, extendInfo:any = null):boolean{
			if(objId == 0){// 不回收容器对象
				return false;
			}
			var pool:SwfResPool = null;
			if(SwfRes.hasPool(poolname)){
				pool = SwfRes.getPool(poolname);
			}
			else{
				pool = new SwfResPool(poolname, _resconf);
			}
			SwfRes.resPools[poolname] = pool;
			pool.Pool_recycle(target, objId, extendInfo);
			return true;
		}
		
		public static Pool_getByID(poolname:string, _resconf:Resconfig = null, objId = null, extendInfo:any = null):any{
			var pool:SwfResPool = null;
			if(SwfRes.hasPool(poolname)){
				pool = SwfRes.getPool(poolname);
			}
			else{
				pool = new SwfResPool(poolname, _resconf);
			}
			SwfRes.resPools[poolname] = pool;
			return pool.Pool_getByID(objId, extendInfo);
		}
	}
}