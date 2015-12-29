package com.common
{
	import com.common.NumberTool;
	import com.constant.GameConst;;
	/**
	 * 地图管理类
	 * @author Rikimaru
	 */
	public class MapManager 
	{
		private var itemMax:int = 3;         //矿物物品种类，金矿、宝石、钻石
		private var itemRate:int = 10;       //生成物品概率
		private var boomRate:int = 20;       //生成炸弹概率
		private var powerRate:int = 3;       //生成能量概率
		private var leiGuanRate:int = 2;     //生成雷管概率
		private var handRate:Number = 0.5;   //生成手概率
		private var heartRate:Number = 0.1;  //生成爱心几率
		private var boxRate:Number = 0.1;    //生成宝箱概率
		private var npcRate:Number = 0.3;    //生成npc概率
		
		private var rowMax:int = GameConst.rowMax;         //行最大值，用于一次生成多少行
		private var colMax:int = GameConst.colMax;         //列最大值
		
		//1金矿 2宝石 3钻石 4能量 5炸弹 6问号 7宝箱
		//舞台大小550x650,元素大小50x50,一行可以放11个元素
		//每行随机生成0-2个物品
		//每次生成rowMax行地图
		public function generateMapData():Array {
			var _itemRate:int = itemRate;
			var _boomRate:int = _itemRate + boomRate;
			var _powerRate:int = _boomRate + powerRate;
			var _leiGuanRate:int = _powerRate + leiGuanRate;
			var _handRate:Number = _leiGuanRate + handRate;
			var _heartRate:Number = _handRate + heartRate;
			var _npcRate:Number = _heartRate + npcRate;
			var _boxRate:Number = _npcRate + boxRate;
			var grenerateRand:Number;
			
			var arr:Array = [];
			for (var i:int = 0; i < rowMax;i++ ){
				arr.push([]);
			}

			for (i = 0; i < rowMax; i++ ) {
				var arr2D:Array = arr[i];
				if (i == 0) continue;   //第一行不产生东西
				for (var j:int = 0; j < colMax; j++ ) {
					if(arr2D[j] != null){  //宝箱可能已经占了这一列
						continue;
					}
					grenerateRand = Math.random() * 100;
					if(grenerateRand < _itemRate){
						var rand:int = Math.round(Math.random()*itemMax);
						arr2D.push(rand);
					}else if(grenerateRand < _boomRate){
						arr2D.push(GameConst.boom);
					}else if(grenerateRand < _powerRate){
						arr2D.push(GameConst.power);
					}else if(grenerateRand < _leiGuanRate){
						arr2D.push(GameConst.leiGuan);
					}else if(grenerateRand < _handRate){
						arr2D.push(GameConst.hand);
					}else if(grenerateRand < _heartRate){
						arr2D.push(GameConst.heart);
					}else if(grenerateRand < _npcRate){
						arr2D.push(GameConst.npc);
					}
					else if(grenerateRand <= _boxRate && (colMax-j)>1 && (rowMax-i)>1){  //宝箱占2格
						arr[i][j] = GameConst.boxPos;
						arr[i][j + 1] = GameConst.box;
						arr[i + 1][j] = GameConst.box;
						arr[i + 1][j + 1] = GameConst.box;
					}else{
						arr2D.push(GameConst.stone);
					}
				}
			}
			
			return arr;
		}
		
		
		private static var instance:MapManager;
		public static function getInstance():MapManager{
			if(instance == null){
				instance = new MapManager();
			}
			return instance;
		}
		
	}

}