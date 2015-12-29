package com.view.scene 
{
	import com.common.BaseScene;
	import com.common.MapManager;
	import flash.display.Sprite;
	/**
	 * 类    名: 游戏场景
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class GameScene extends BaseScene
	{
		
		
		public function GameScene() 
		{
			
		}
		
		override public function onEnable():void {
			initMap();
		}
		
		override public function onRemove():void {
			
		}
		
		//初始化地图
		public function initMap():void {
			var map:MapManager = MapManager.getInstance();
			var sp:Sprite = new Sprite();
			addChild(sp);
			map.createGrassLand(sp, 0, 0, map.rows, map.cols);
			sp.y -= map.getSpriteOffsetY();
			
		}
		
		
		
	}

}















