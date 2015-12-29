package com.view.ui
{

	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	/**
	 * 金矿
	 * @author Rikimaru
	 */
	public class Gold extends BaseElement
	{
	
		public function Gold() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			//加分
			hide();
			gameScene.setGoldText(++gameScene.gold);
			SoundManager.instance.play(SoundManager.SND_MONEY);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Gold).returnObject(this);
		}
	}

}