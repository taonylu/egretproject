package com.view.scene 
{
	import com.greensock.TweenLite;
	import com.component.SwapButton;
	import com.view.scene.BaseScene;
	import flash.display.Sprite;
	import com.constant.GameConst;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import com.view.ui.Mole;
	import com.common.ObjectPool;
	import com.view.ui.*;
	import com.common.MapManager;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.utils.Dictionary;
	import flash.ui.Keyboard;
	import flash.utils.Timer;
	import flash.utils.setInterval;
	import flash.utils.clearInterval;
	import com.common.SoundManager;


	/**
	 * 游戏场景
	 * @author Rikimaru
	 * 2015/10/20 22:23
	 */
	public class GameScene extends BaseScene
	{
		public var soundBtn:SwapButton;    //声音按钮
		public var mole:Mole = new Mole();//鼹鼠
		public var gameSprite:Sprite;     //地图元素容器
		public var powerBar:PowerBar;     //能量条
		public var gameBg:Sprite;         //地图背景
		public var deepText:TextField;    //深度文本
		public var moreBtn:Sprite;        //更多游戏按钮
		public var resultUI:ResultUI = new ResultUI(); //结算面板
		
		private var stone0Pool:ObjectPool = ObjectPool.getPool(Stone0,100);       //灰色石头
		private var stone1Pool:ObjectPool = ObjectPool.getPool(Stone1,100);       //青色石头
		private var goldPool:ObjectPool = ObjectPool.getPool(Gold,10);            //金矿
		private var boomPool:ObjectPool = ObjectPool.getPool(Boom,10);            //炸弹
		private var diamondPool:ObjectPool = ObjectPool.getPool(Diamond,10);      //钻石
		private var gemPool:ObjectPool = ObjectPool.getPool(Gem,10);              //红宝石
		private var randomBoxPool:ObjectPool = ObjectPool.getPool(RandomBox,10);  //随机箱子
		private var powerPool:ObjectPool = ObjectPool.getPool(Power, 10);         //能量
		public var stone0Anim:ObjectPool = ObjectPool.getPool(Stone0Anim, 5);     //灰色石头动画
		public var stone1Anim:ObjectPool = ObjectPool.getPool(Stone1Anim, 5);     //灰色石头动画
		public var explosionPool:ObjectPool = ObjectPool.getPool(Explosion, 1);   //爆炸效果
		public var boxPool:ObjectPool = ObjectPool.getPool(Box, 1);               //宝箱
		public var leiGuanPool:ObjectPool = ObjectPool.getPool(LeiGuan, 5);       //雷管
		public var handPool:ObjectPool = ObjectPool.getPool(Hand, 3);             //手臂
		public var heartPool:ObjectPool = ObjectPool.getPool(Heart, 3);           //爱心
		public var npcPool:ObjectPool = ObjectPool.getPool(NPC, 1);               //NPC
		
		private var colMax:int = GameConst.colMax;      //列最大值
		private var rowMax:int = GameConst.rowMax;      //一次生成地图的行最大值
		private var mapData:Array = [];   //地图列表
		public var stoneList:Array = []; //地图石头数组
		public var itemList:Array = [];  //地图物品数组
		private var halfCell:int = GameConst.cell/2; //元素高宽1半
		private var cell:int = GameConst.cell;       //元素高宽50x50
		private var gameTimer:Timer = new Timer(GameConst.timerInterval); //游戏计时器
		
		public var gold:int = 0;     //获得金矿数
		public var gem:int = 0;      //获得宝石数
		public var diamond:int = 0;  //获得钻石数
		public var box:int = 0;      //宝箱数
		public var deep:int = 0;     //当前深度
		
		public var goldText:TextField;     //金矿文本
		public var gemText:TextField;      //宝石文本
		public var diamondText:TextField;  //钻石文本
		public var boxText:TextField;      //箱子文本
		
		public function GameScene() 
		{
			
			
		}
		
		override protected function onEnable():void {
			startGame();
		}
		
		override protected function onRemove():void {
			deConfigListeners();
		}
		
		private function startGame():void {
			resetGame();
			initView();
			createMap();
			configListeners();
			startTimer();
			SoundManager.instance.playBGM();
		}
		
		private var intervalID:int;
		private function gameOver():void {
			SoundManager.instance.stopBGM();
			SoundManager.instance.play(SoundManager.SND_OVER);
			stopTimer();	
			this.stage.removeEventListener(KeyboardEvent.KEY_DOWN, onKeyDownHanlder);
			moleTween && moleTween.kill();
			mapTween && mapTween.kill();	
			intervalID = setInterval(showResult, 500);
		}
		
		private function showResult():void {
			clearInterval(intervalID);
			resultUI.setSocre(this);
			moreBtn.visible = true;
		}
		
		public function resetGame():void {
			//重置变量
			gold = 0;
			gem = 0;
			diamond = 0;
			box = 0;
			deep = 0;
			
			//重置组件
			resultUI.hide();
			setDeepText(0);
			setGoldText(0);
			setGemText(0);
			setDiamondText(0);
			setBoxText(0);
			powerBar.setValue(1);
			moreBtn.visible = false;
			mole.reset();
			//清理地图
			var len:int = itemList.length;
			var item:BaseElement;
			var stone:BaseElement;
			for (var i:int = 0; i < len; i++) {
				for (var j:int = 0; j < colMax;j++ ){
					item = itemList[i][j];
					stone = stoneList[i][j];
					if(item != null){
						item.hide();
					}
					if(stone != null){
						stone.hide();
					}
				}
			}
			itemList.length = 0;
			stoneList.length = 0;
			mapData.length = 0;
		}

		
		private function initView():void{
			//初始化游戏容器
			gameSprite.x = 0;
			gameSprite.y = 250;
			
			//初始化角色，角色x在中间格子，y在地图上方
			mole.x = cell * Math.ceil(colMax / 2) - halfCell;
			mole.y = - halfCell;
			mole.row = -1;
			mole.col = 5;
			gameSprite.addChild(mole);
			
			//初始化游戏背景
			gameBg.x = 0;
			gameBg.y = -this.gameBg.height;
			this.gameSprite.addChild(gameBg);
			
			//初始化能量条
			powerBar.setValue(1);
			
			//初始化文本
			setDeepText(0);
		}
		
		private function configListeners():void {
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDownHanlder);
			soundBtn.addEventListener(MouseEvent.CLICK, onSoundBtnClick);
			moreBtn.addEventListener(MouseEvent.CLICK, onMoreBtnClick);
		}
		
		private function deConfigListeners():void {
					
		}
		

		private function onSoundBtnClick(e:MouseEvent):void {
			if(SoundManager.instance.bOpen){
				SoundManager.instance.soundClose();
			}else{
				SoundManager.instance.soundOpen();
			}
			
		}
		
		private function onMoreBtnClick(e:MouseEvent):void{
			//if(GameConst.platform == GameConst.platform3366){
				//if(Main.open3366Service != null)  
				//{  
					//Main.open3366Service.recomGame();  
				//} 
			//}else if(GameConst.platform == GameConst.platform4399){
				if(Main.serviceHold){
					Main.serviceHold.showGameList();
				}
			//}
		}

		
		private function onKeyDownHanlder(e:KeyboardEvent):void{
			switch(e.keyCode) {
				case Keyboard.S:
				case Keyboard.DOWN:
					mole.nextDirection = 0;
					mole.isStop && movePlayer();
					break;
				case Keyboard.A:
				case Keyboard.LEFT:
					mole.nextDirection = 1;
					mole.isStop && movePlayer();
					break;
				case Keyboard.D:
				case Keyboard.RIGHT:
					mole.nextDirection = 2;
					mole.isStop && movePlayer();
					break;
			}
		}
		
		
		
		
		
		//生成地图
		private function createMap():void {	
			//每次生成指定行数地图，加入到当前地图中
			mapData = mapData.concat(MapManager.getInstance().generateMapData());	
			var rowLen:int = mapData.length; //地图总长
			var col:int = colMax;
			var mapIndex:int = 0;
			var stone:BaseElement;
			var item:BaseElement;
			for (var i:int = 0; i < rowMax;i++){
				stoneList.push([]);
				itemList.push([]);
			}
			
			//生成石头
			for (i = rowLen - rowMax; i < rowLen; i++ ) {
				for (var j:int = 0; j < colMax;j++ ){
					mapIndex = mapData[i][j];
					
					stone = (Math.random() > 0.1)?stone0Pool.getObject():stone1Pool.getObject();
					stone.x = halfCell + j * cell;
					stone.y = halfCell + cell*i;
					stoneList[i][j] = stone;
					gameSprite.addChild(stone);
				}
			}
			
			//生成其他元素
			for (i = rowLen - rowMax; i < rowLen; i++ ) {
				for (j = 0; j < colMax;j++ ){
					mapIndex = mapData[i][j];
					item = null;
					switch(mapIndex) {
						case GameConst.stone:
							break;
						case  GameConst.boom:
							item = boomPool.getObject();
							break;
						case GameConst.diamond:
							item = diamondPool.getObject();
							break;
						case GameConst.gem:
							item = gemPool.getObject();
							break;
						case GameConst.gold:
							item = goldPool.getObject();
							break;
						case GameConst.power:
							item = powerPool.getObject();
							break;
						case GameConst.leiGuan:
							item = leiGuanPool.getObject();
							break;
						case GameConst.hand:
							item = handPool.getObject();
							break;
						case GameConst.heart:
							item = heartPool.getObject(); 
							break;
						case GameConst.npc:
							item = npcPool.getObject();
							break;
						case GameConst.boxPos:  //如果是宝箱，占四格
							item = boxPool.getObject();
							(item as Box).row = i;
							(item as Box).col = j;
							itemList[i][j] = item;
							itemList[i][j + 1] = item;
							itemList[i + 1][j] = item;
							itemList[i + 1][j + 1] = item;
							break;
					}
					if (item) {
						item.x = halfCell + j * cell;
						item.y = halfCell + cell*i;
						gameSprite.addChild(item);
						itemList[i][j] = item;
					}
					
				}
			}
			
			
			gameSprite.addChild(mole);
		}
		
		//移除多余的地图元素
		private function removeMap():void {
			trace("移除地图");
			var startIndex:int = mole.row - rowMax * 2;
			var endIndex:int = mole.row - rowMax;
			if(startIndex < 0){
				return;
			}
			
			gameBg.parent && gameBg.parent.removeChild(gameBg);
			
			var item:BaseElement;
			var stone:BaseElement;
			for (var i:int = startIndex; i < endIndex; i++ ) {
				for (var j:int = 0; j < colMax;j++ ){
					item = itemList[i][j];
					stone = stoneList[i][j];
					if(item != null){
						item.hide();
						itemList[i][j] = null;
					}
					if(stone != null){
						stone.hide();
						stoneList[i][j] = null;
					}
				}
				
			}
		}
		
		private var moleTween:TweenLite;
		private var mapTween:TweenLite;
		private function movePlayer():void {
			//设置主角开始移动
			mole.isStop = false;
			//播放一次挖矿动画
			mole.playAnim();
			//更换方向
			var item:BaseElement;
			var stone:BaseElement;
			if (mole.nextDirection == 0) { //下
				mole.row += 1;
				moleTween = TweenLite.to(mole, mole.moveTime, { y:(mole.y + cell)} );
				mapTween = TweenLite.to(gameSprite, mole.moveTime, { y:(gameSprite.y - cell), onComplete:movePlayer } );
				setDeepText(++deep);
				checkMoveTime();
			}else if(mole.nextDirection == 1){ //左
				if (mole.col - 1 >= 0 && mole.row >= 0) {
					mole.col -= 1;
					mole.turnLeft();
					moleTween = TweenLite.to(mole, mole.moveTime, { x:(mole.x - cell), onComplete:movePlayer } );
				}else{
					mole.isStop = true;
					return;
				}
			}else if (mole.nextDirection == 2) { //右
				if (mole.col + 1 < colMax && mole.row >= 0) {
					mole.col += 1;
					mole.turnRight();
					moleTween = TweenLite.to(mole, mole.moveTime, { x:(mole.x + cell), onComplete:movePlayer } );
				}else{
					mole.isStop = true;
					return;
				}
			}
			mole.curDirection = mole.nextDirection;
			//检查是否需要生成新地图
			if(mole.row%rowMax == 0){
				createMap();
				removeMap();
			}
			//碰撞检测处理
			item = itemList[mole.row][mole.col];
			stone = stoneList[mole.row][mole.col];
			if(stone != null){
				stone.colloise(this);
				stoneList[mole.row][mole.col] = null;
			}
			if (item != null) {
				itemList[mole.row][mole.col] = null;	
				item.colloise(this);
			}
		}
		
		
		public function checkMoveTime():void {
			if(this.deep%GameConst.deepCount == 0 && this.mole.moveTime > GameConst.speedMin){
				this.mole.moveTime += GameConst.reduceMoveTime;
			}
		}
		
		private function setDeepText(deep:int):void {
			this.deep = deep;
			deepText.text = deep + "M";
		}
		
		public function setGoldText(gold:int):void{
			this.gold = gold;
			this.goldText.text = gold.toString();
		}
		
		public function setGemText(gem:int):void{
			this.gem = gem;
			this.gemText.text = gem.toString();
		}
		
		public function setDiamondText(diamond:int):void{
			this.diamond = diamond;
			this.diamondText.text = diamond.toString();
		}
		
		public function setBoxText(box:int):void{
			this.box = box;
			this.boxText.text = box.toString();
		}
		
		private function startTimer():void{
			gameTimer.addEventListener(TimerEvent.TIMER, onTimerHandler);
			gameTimer.reset();
			gameTimer.start();
		}
		
		private function onTimerHandler(e:TimerEvent):void{
			powerBar.reduceValue(GameConst.reducePower);
			if (powerBar.value == 0) {
				gameOver();
			}
		}
		
		private function stopTimer():void {
			if(gameTimer != null){
				gameTimer.stop();	
				gameTimer.removeEventListener(TimerEvent.TIMER, onTimerHandler);
			}
		}
		
	}

}