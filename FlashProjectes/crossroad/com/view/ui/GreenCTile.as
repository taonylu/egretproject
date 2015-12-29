package com.view.ui 
{
	import com.common.ObjectPool;
	/**
	 * 类    名: 浅色草地上
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class GreenCTile extends BaseTile
	{
		
		public function GreenCTile() 
		{
			pool = ObjectPool.getPool(GreenCTile);
		}
		
	}

}