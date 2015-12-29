package com.mylib.ui 
{
	import flash.display.Sprite;
	import flash.events.Event;
	/**
	 * 场景基类
	 * @author Rikimaru
	 * 2015/10/25 13:20
	 */
	public class BaseScene extends Sprite
	{
		
		public function BaseScene() 
		{
			this.addEventListener(Event.ADDED_TO_STAGE, addToStage);
			this.addEventListener(Event.REMOVED_FROM_STAGE, removeFromStage);
		}
		
		private function addToStage(e:Event):void{
			onEnable();
		}
		
		private function removeFromStage(e:Event):void{
			onRemove();
		}
		
		protected function onEnable():void {	
			
		}
		
		protected function onRemove():void{
			
		}
	}

}