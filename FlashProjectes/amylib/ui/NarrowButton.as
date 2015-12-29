package com.component
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import com.greensock.TweenLite;
	/**
	 * 可以伸缩的按钮
	 * @author Rikimaru
	 */
	public class NarrowButton extends Sprite
	{
		
		public function NarrowButton() 
		{
			this.addEventListener(MouseEvent.MOUSE_OVER, this.onMouseOver);
			this.addEventListener(MouseEvent.MOUSE_OUT, this.onMouseOut);
		}
		
		private function onMouseOver(e:MouseEvent):void{
			TweenLite.to(this, 0.1, { scaleX:1.1, scaleY:1.1 } );
		}
		
		private function onMouseOut(e:MouseEvent):void{
			TweenLite.to(this, 0.1, { scaleX:1, scaleY:1 } );
		}
		
	}

}