package com.mylib.tool 
{
	import flash.utils.ByteArray;
	/**
	 * 数组工具类
	 * @author 
	 */
	public class ArrayTool
	{
		
		public function ArrayTool() 
		{
			
		}
		
		/**
		 * 数组深复制
		 * 使用范例 copyArr = ArrayTool.clone(sourceArr)
		 * @param	source  被复制的数组
		 * @return  数组的拷贝
		 */
		public static function clone(source:Array):Array {
			var r: ByteArray = new ByteArray();
			r.writeObject(source);
			r.position = 0;
			return (r.readObject());
		}
		
		/**
		 * 数组打乱顺序
		 * 使用范例  targetArr.sort(ArrayTool.randomSort); 将targetArr的元素顺序打乱
		 * @param	a
		 * @param	b
		 * @return
		 */
		public static function randomSort(a:Object,b:Object):Number
		{
			return Math.pow(-1,Math.floor(Math.random()*2));
		}
		
		/**
		 * 随机排序
		 * @param	arr 目标数组
		 * @return  排序后数组
		 */
		private function randomArr(arr:Array):Array
		{
			var outputArr:Array = arr.slice();
			var i:int = outputArr.length;
			var temp:*;
			var indexA:int;
			var indexB:int;
														
			while (i)
			{
				indexA = i-1;
				indexB = Math.floor(Math.random() * i);
				i--;
										
				if (indexA == indexB) continue;
				temp = outputArr[indexA];
				outputArr[indexA] = outputArr[indexB];
				outputArr[indexB] = temp;
			}
								
			return outputArr;
		}
		
		/**
		 * 深度排序，没有做成static，忘了就来看
		 */
		/*public function sortOn():void {
			rectArr.sortOn("depth",Array.NUMERIC|Array.DESCENDING)
			for (var i:int=0; i<rectArr.length; i++){
 			 	addChild(rectArr[i] as MovieClip);
			}
		}*/

		
	}

}