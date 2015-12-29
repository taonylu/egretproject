package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	
	/**
	 * 钻石
	 * @author Rikimaru
	 */
	public class Diamond extends BaseElement
	{
		
		public function Diamond() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			gameScene.setDiamondText(++gameScene.diamond);
			SoundManager.instance.play(SoundManager.SND_MONEY);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Diamond).returnObject(this);
		}
		
	}

}