package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	/**
	 * 红宝石
	 * @author Rikimaru
	 */
	public class Gem extends BaseElement
	{
		public function Gem() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			//加分
			hide();
			gameScene.setGemText(++gameScene.gem);
			SoundManager.instance.play(SoundManager.SND_MONEY);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Gem).returnObject(this);
		}
	}

}