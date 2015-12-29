package com.view.ui
{
	import flash.display.MovieClip;
	import com.common.ObjectPool;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class NPC extends BaseElement
	{
		public var mc:MovieClip
		
		public function NPC() 
		{
			
		}
		
		override public function hide():void {
			if (Math.random() > 0.5){
				this.scaleX = -1;
			}
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(NPC).returnObject(this);
		}
	}

}