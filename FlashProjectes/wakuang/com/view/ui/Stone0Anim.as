package com.view.ui
{
	import flash.display.Sprite;
	import com.common.ObjectPool;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Stone0Anim extends Sprite
	{
		public var stoneNum:int = 4;
		public var stoneList:Array = [];
		
		public function Stone0Anim() 
		{
			for (var i:int = 0; i < stoneNum; i++ ) {
				var stone:Stone2 = new Stone2();
				stoneList.push(stone);
				this.addChild(stone);
			}
		}
		
		public function play():void {
			var stone:Stone2;
			for (var i:int = 0; i < stoneNum; i++ ) {
				stone = stoneList[i];
				stone.x = 0;
				stone.y = 0;
				stone.speedX = Math.random() * 20 - 10;
				stone.speedY = -(Math.random() * 10 + 15);
			}
			this.addEventListener(Event.ENTER_FRAME, onEnterFrameHandler);
			
		}
		
		private var count:int = 0;
		private function onEnterFrameHandler(e:Event):void {
			var stone:Stone2;
			for (var i:int = 0; i < stoneNum; i++ ) {
				stone = stoneList[i];
				stone.x += stone.speedX;
				stone.speedY += 1;
				stone.y += stone.speedY;
			}
			
			count++;
			if (count >= 60) {
				count = 0;
				this.removeEventListener(Event.ENTER_FRAME, onEnterFrameHandler);
				this.parent && this.parent.removeChild(this);
				ObjectPool.getPool(Stone0Anim).returnObject(this);
				
			}
		}
	}

}