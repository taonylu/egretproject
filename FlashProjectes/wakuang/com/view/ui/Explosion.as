package com.view.ui
{
	import flash.display.MovieClip;
	import com.common.ObjectPool;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Explosion extends MovieClip
	{
		
		public function Explosion() 
		{
			this.gotoAndStop(1);
		}
		
		public function playAnim():void {
			this.gotoAndPlay(1);
			this.addFrameScript(this.totalFrames - 1, hide);
		}
		
		public function hide():void {
			this.addFrameScript(this.totalFrames - 1, null);
			this.gotoAndStop(1);
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Explosion).returnObject(this);
		}
		
	}

}