package com.view.ui 
{
	import com.common.ObjectPool;
	/**
	 * 类    名: 浅色草地带下边沿
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/20
	 * 修改日期: 2015/9/20
	 * 修改日志:
	 */
	public class GreenDTile extends BaseTile
	{
		
		public function GreenDTile() 
		{
			pool = ObjectPool.getPool(GreenDTile);
		}
		
	}

}