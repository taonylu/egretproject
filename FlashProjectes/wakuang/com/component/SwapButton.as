package com.component 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	/**
	 * 交换按钮
	 * @author Rikimaru
	 * 2015/10/20 22:49
	 * 开关按钮，有两种显示状态，例如声音开关
	 * 用法:
	 * 1. FlashIDE中新建MovieClip，有两帧，第一帧放声音开，第二帧放声音关
	 * 2. 该影片剪辑继承SwapButton，并起类名为SoundBtn
	 * 3. 在代码中获取该按钮，并使用
	 */
	public class SwapButton extends MovieClip
	{
		
		public function SwapButton() 
		{
			this.gotoAndStop(1);
			this.addEventListener(MouseEvent.CLICK, onMouseClick);
		}

		private function onMouseClick(e:MouseEvent):void {
			if (this.currentFrame == 1) {
				this.gotoAndStop(2);
			}else {
				this.gotoAndStop(1);
			}
		}
		
		public function setON():void {
			this.gotoAndStop(1);
		}
		
		public function setOFF():void {
			this.gotoAndStop(2);
		}
		
		public function isON():Boolean {
			return (this.currentFrame == 1);
		}
		
		public function isOFF():Boolean {
			return (this.currentFrame == 2);
		}
		
		
	}

}