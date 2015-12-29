package com.view.ui
{
	import flash.display.MovieClip;
	import com.constant.GameConst;
	/**
	 * 鼹鼠动画
	 * @author Rikimaru
	 */
	public class Mole extends MovieClip
	{
		public var curDirection:int = -1;                    //当前方向，0下，1左，2右
		public var nextDirection:int = -1;                   //下次移动方向
		public var isStop:Boolean = true;                 //移动中，不能改变方向
		private var cell:int = GameConst.cell;
		private var halfCell:int = GameConst.cell / 2;      //元素大小一半
		public var leftEdge:int = GameConst.cell/2;         //左边界
		public var rightEdge:int = GameConst.stageWidth - GameConst.cell / 2;    //右边界
		public var moveTime:Number = GameConst.moveTime;  //移动时间间隔
		public var row:int = 0;
		public var col:int = 0;
		
		public function Mole() 
		{
			this.gotoAndStop(1);
		}
		
		public function playAnim():void{
			this.gotoAndPlay(2);
		}
		
		public function resetAnim():void{
			this.gotoAndStop(1);
		}
		
		public function turnLeft():void{
			this.scaleX = 1;
		}
		
		public function turnRight():void{
			this.scaleX = -1;
		}
		
		public function reset():void{
			moveTime = GameConst.moveTime;
			isStop = true;
			row = 0;
			col = 0;
		}
	}

}