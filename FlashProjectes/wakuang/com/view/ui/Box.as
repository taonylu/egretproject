package com.view.ui
{
	import com.common.ObjectPool;
	import com.common.SoundManager;
	import com.view.scene.GameScene;
	import com.GameManager;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Box extends BaseElement
	{
		public var row:int;
		public var col:int;
		
		public function Box() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			hide();
			SoundManager.instance.play(SoundManager.SND_MONEY);
			gameScene.setBoxText(++gameScene.box);
	
			gameScene.itemList[row][col] = null;
			gameScene.itemList[row][col+1] = null;
			gameScene.itemList[row+1][col] = null;
			gameScene.itemList[row+1][col+1] = null;
			
		}

		override public function hide():void {
			var gameScene:GameScene = GameManager.getInstance().gameScene;
			gameScene.itemList[row][col] = null;
			gameScene.itemList[row][col+1] = null;
			gameScene.itemList[row+1][col] = null;
			gameScene.itemList[row+1][col+1] = null;
			
			
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(Box).returnObject(this);
		}
	}

}