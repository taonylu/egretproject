package com.view.ui
{
	import com.view.scene.GameScene;
	import com.common.ObjectPool;
	import com.common.SoundManager;
	/**
	 * 石头绿色
	 * @author Rikimaru
	 */
	public class Stone1 extends BaseElement
	{
		
		public function Stone1() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			var stoneAnim:Stone1Anim = gameScene.stone1Anim.getObject();
			stoneAnim.x = this.x;
			stoneAnim.y = this.y;
			gameScene.gameSprite.addChild( stoneAnim);
			stoneAnim.play();
			hide();
			SoundManager.instance.play(SoundManager.SND_STONE);
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Stone1).returnObject(this);
		}
	}

}