package com.view.ui 
{
	import flash.display.Sprite;
	import com.common.ObjectPool;
	/**
	 * 类    名: 方块基类
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class BaseTile extends Sprite 
	{
		protected var pool:ObjectPool;
		public var row:int = 0;
		public var col:int = 0;
		
		public function BaseTile() 
		{
			
		}
		
		public function returnPool():void {
			pool.returnObject(this);
		}
		
	}

}