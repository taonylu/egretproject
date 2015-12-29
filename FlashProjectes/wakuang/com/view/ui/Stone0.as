package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	/**
	 * 石头0，灰色石头
	 * @author Rikimaru
	 */
	public class Stone0 extends BaseElement
	{
		
		
		public function Stone0() 
		{
			
		}
	
		override public function colloise(gameScene:GameScene):void{
			var stoneAnim:Stone0Anim = gameScene.stone0Anim.getObject();
			stoneAnim.x = this.x;
			stoneAnim.y = this.y;
			gameScene.gameSprite.addChild( stoneAnim);
			stoneAnim.play();
			hide();
			SoundManager.instance.play(SoundManager.SND_STONE);
			
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Stone0).returnObject(this);
		}
	}

}