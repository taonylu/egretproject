package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	import com.constant.GameConst;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Heart extends BaseElement
	{
		
		public function Heart() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			gameScene.powerBar.addValue(GameConst.addHeart);
			SoundManager.instance.play(SoundManager.SND_POWER);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Power).returnObject(this);
		}
	}

}