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
	public class LeiGuan extends BaseElement
	{
		
		public function LeiGuan() 
		{
			
		}
		
		override public function colloise(gameScene:GameScene):void{
			
			//爆炸
			SoundManager.instance.play(SoundManager.SND_BOOM);
			var explosion:Explosion = gameScene.explosionPool.getObject();
			explosion.x = this.x;
			explosion.y = this.y;
			gameScene.gameSprite.addChild(explosion);
			explosion.playAnim();
			//炸开周围石块
			var itemList:Array = gameScene.itemList;
			var stoneList:Array = gameScene.stoneList;
			var item:BaseElement;
			var stone:BaseElement;
			var row:int = gameScene.mole.row;
			var col:int = gameScene.mole.col;
			var startCol:int = ((col - 1) >= 0)?(col-1):0;
			var endCol:int = ((col + 2) <= GameConst.colMax)?(col + 2):GameConst.colMax;
			var startRow:int = (row - 1) >=0?(row-1):0;
			var endRow:int = row + 2;
			for (var i:int = startRow; i < endRow;i++ ){
				for (var j:int = startCol; j < endCol;j++){
					item = itemList[i][j];
					stone = stoneList[i][j];
					if(stone != null){
						stone.colloise(gameScene);
						stoneList[i][j] = null;
					}
					if (item != null) {
						itemList[i][j] = null;	
						if(item is Boom){
							(item as Boom).explosion(gameScene);
						}else{
							item.colloise(gameScene);
						}
					}
				}
			}
			
			hide();
		}
		
		override public function hide():void{
			this.parent && this.parent.removeChild(this);
			ObjectPool.getPool(LeiGuan).returnObject(this);
		}
	}

}