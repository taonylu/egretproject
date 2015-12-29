package com.constant 
{
	import flash.display.Stage;
	/**
	 * 游戏常量类
	 * @author Rikimaru
	 */
	public class GameConst 
	{
		public static var stage:Stage;
		
		public static var rowMax:int = 10;   //地图一次生成多少行
		public static var colMax:int = 11;   //列最大值
		
		public static var stone:int = 0;     //石头
		public static var gold:int = 1;      //金矿
		public static var gem:int = 2;       //宝石
		public static var diamond:int = 3;   //钻石
		public static var power:int = 4;     //能量
		public static var boom:int = 5;      //炸弹
		public static var randmbox:int = 6;  //随机框
		public static var box:int = 7;       //宝箱
		public static var boxPos:int = 8;    //宝箱所在位置，四格中左上格
		public static var leiGuan:int = 9;   //雷管
		public static var hand:int = 10;     //手
		public static var heart:int = 11;    //爱心
		public static var npc:int = 12;      //npc
		
		public static var stageWidth:int = 550; //场景宽
		public static var cell:int = 50; //元素高宽
		
		public static var timerInterval:int = 500;    //每多久减少一次能量
		public static var reducePower:Number = 0.02;  //每个时间段减少的能量数
		
		public static var goldScore:int = 100;   //物品的奖励分数
		public static var gemScore:int = 250;
		public static var diamondScore:int = 400;
		public static var boxScore:int = 1000;
		public static var deepthScore:int = 100;
		
		public static var boomPower:Number = 0.2;  //炸弹威力，爆炸后减少多少能量
		public static var addPower:Number = 0.2;   //增加能量
		public static var addHeart:Number = 1;     //增加爱心
		
		public static var moveTime:Number = 0.3;  //鼹鼠移动时间间隔
		public static var reduceMoveTime:Number = -0.02;   //每过一段深度，时间间隔减少时间
		public static var deepCount:int = 50;              //每过多少层加速
		public static var speedMin:Number = 0.2;           //最小间隔
		
		public static var platform:int = 0;
		public static var platform3366:int = 0;
		public static var platform4399:int = 1;
		
	}

}