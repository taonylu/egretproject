package com.common 
{
	import com.view.ui.*;
	import flash.display.Sprite;
	/**
	 * 类    名: 地图管理类
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class MapManager 
	{
		//地形Tile高宽
		public var tileWidth:int;                  
		public var tileHeight:int;
		public var halfTileWidth:int;
		public var halfTileHeight:int
		public var offsetY:int = 20;  //tile y轴偏移值
		//行列最大值
		public var rows:int;  
		public var cols:int;
		public var addRow:int;  //需要多几行补充斜着摆放时，右上角的空白
		//对象池
		private var greenAPool:ObjectPool;  //深色草地
		private var greenBPool:ObjectPool;  
		private var greenCPool:ObjectPool;  //浅色草地
		private var greenDPool:ObjectPool;
		
		public function MapManager():void {
			tileWidth = 78;
			tileHeight = 78;
			halfTileWidth = tileWidth / 2;
			halfTileHeight = tileHeight / 2;
			rows = Math.ceil(LayerManager.getInstance().stage.stageHeight / (tileHeight - offsetY));
			addRow = Math.ceil(rows * offsetY / tileHeight);  
			rows += addRow;
			cols = Math.ceil(LayerManager.getInstance().stage.stageWidth / tileWidth);

			greenAPool = ObjectPool.getPool(GreenATile);
			greenBPool = ObjectPool.getPool(GreenBTile);
			greenCPool = ObjectPool.getPool(GreenCTile);
			greenDPool = ObjectPool.getPool(GreenDTile);
			
			
			trace("MapManager initialize...","rows:",rows,"cols:",cols);
		}

		
		/**创建指定行列范围的草地到指定容器内*/
		public function createGrassLand(doc:Sprite, startRow:int, startCol:int, endRow:int, endCol:int):void {
			var tile:BaseTile;
			//草地
			for (var i:int = startRow; i < endRow-1; i++ ) {
				for (var j:int = startCol; j < endCol; j++ ) {
					if (i % 2 == 0) {  //奇数行
						tile = greenAPool.getObject() as BaseTile;
						tile.x = getPosX(i, j);
						tile.y = getPosY(i, j);
						doc.addChild(tile);
					}else {  //偶数行
						tile = greenCPool.getObject() as BaseTile;
						tile.x = getPosX(i, j);
						tile.y = getPosY(i, j);
						doc.addChild(tile);
					}
				}
			}
			
			//草地下边沿
			for (j = 0; j < endCol; j++ ) {
				if (i % 2 == 0) {  //奇数行
					tile = greenBPool.getObject() as BaseTile;
					tile.x = getPosX(i, j);
					tile.y = getPosY(i, j);
					doc.addChild(tile);
				}else {  //偶数行
					tile = greenDPool.getObject() as BaseTile;
					tile.x = getPosX(i, j);
					tile.y = getPosY(i, j);
					doc.addChild(tile);
				}
			}
		}
		
		public function createRiver():void {
			
		}
		
		public function createRoad():void {
			
		}
		
		/**获取存放tile的容器正好填满stage时的偏移值*/
		public function getSpriteOffsetY():int {
			return (rows - addRow)*offsetY
		}
		
		/**根据行列值返回tile x坐标*/
		private function getPosX(row:int, col:int):int {
			return tileWidth * col;
		}
		/**根据行列之返回tile y坐标*/
		private function getPosY(row:int, col:int):int {
			return (tileHeight- offsetY)* row + offsetY * col;
		}
		
		
		
		
		public static var instance:MapManager;
		
		public static function getInstance():MapManager {
			if (instance == null) {
				instance = new MapManager();
			}
			return instance;
		}
		
	}

}