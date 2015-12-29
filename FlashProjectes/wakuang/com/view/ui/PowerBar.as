package com.view.ui
{
	import flash.display.Sprite;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class PowerBar extends Sprite
	{
		public var maskBar:Sprite;
		public var value:Number = 1;
		
		public function PowerBar() 
		{
			
		}
		
		public function setValue(value:Number):void{
			maskBar.scaleX = value;
			this.value = value;
		}
		
		public function reduceValue(value:Number):void{
			this.value -= value;
			if(this.value < 0){
				this.value = 0;
			}
			maskBar.scaleX = this.value;
		}
		
		public function addValue(value:Number):void{
			this.value += value;
			if(this.value >1){
				this.value = 1;
			}
			maskBar.scaleX = this.value;
		}
	}

}