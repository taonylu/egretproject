package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	/**
	 * 随机元素
	 * @author Rikimaru
	 */
	public class RandomBox extends BaseElement
	{
		
		public function RandomBox() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(RandomBox).returnObject(this);
		}
	}

}