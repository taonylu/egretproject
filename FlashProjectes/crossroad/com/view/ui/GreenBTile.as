package com.view.ui 
{
	import com.common.ObjectPool;
	/**
	 * 类    名: 深色草地带下边沿
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class GreenBTile extends BaseTile
	{
		
		public function GreenBTile() 
		{
			pool = ObjectPool.getPool(GreenBTile);
		}
		
	}

}