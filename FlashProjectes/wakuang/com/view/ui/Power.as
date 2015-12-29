package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	import com.constant.GameConst;
	/**
	 * 能量
	 * @author Rikimaru
	 */
	public class Power extends BaseElement
	{
		
		public function Power() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			//加能量
			gameScene.powerBar.addValue(GameConst.addPower);
			SoundManager.instance.play(SoundManager.SND_POWER);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Power).returnObject(this);
		}
	}

}