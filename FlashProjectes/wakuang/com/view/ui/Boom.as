package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.constant.GameConst;
	import com.common.SoundManager;
	/**
	 * 炸弹
	 * @author Rikimaru
	 */
	public class Boom extends BaseElement
	{
		
		public function Boom() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			gameScene.powerBar.reduceValue(GameConst.boomPower);
			explosion(gameScene);
		}
		
		public function explosion(gameScene:GameScene):void {
			var explosion:Explosion = gameScene.explosionPool.getObject();
			explosion.x = this.x;
			explosion.y = this.y;
			gameScene.gameSprite.addChild(explosion);
			explosion.playAnim();
			SoundManager.instance.play(SoundManager.SND_BOOM);
			hide();	
		}

		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Boom).returnObject(this);
		}
		
	}

}