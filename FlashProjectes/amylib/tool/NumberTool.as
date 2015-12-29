package com.mylib.tool 
{
	/**
	 * 数字工具
	 * @author Rikimaru
	 */
	public class NumberTool 
	{
		
		/**获取范围内随机数，[start,end]*/
		public static function randomRange(start:int, end:int):int{
			return int(Math.random() * end) + start;
		}
		
	}

}