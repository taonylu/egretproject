package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.constant.GameConst;
	import com.common.SoundManager;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Hand extends BaseElement
	{
		
		public function Hand() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			if(gameScene.mole.moveTime > GameConst.speedMin){
				gameScene.mole.moveTime += GameConst.reduceMoveTime;
			}
			SoundManager.instance.play(SoundManager.SND_POWERUP);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Hand).returnObject(this);
		}
		
	}

}