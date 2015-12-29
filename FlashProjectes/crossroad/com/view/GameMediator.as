package com.view 
{
	import org.puremvc.as3.interfaces.IMediator;
	import org.puremvc.as3.interfaces.INotification;
	import org.puremvc.as3.patterns.mediator.Mediator;
	import com.view.scene.GameScene;
	import com.common.LayerManager;
	/**
	 * 类    名: 游戏视图
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class GameMediator extends Mediator implements IMediator
	{
		public static var NAME:String = "GameMediator";
		public static var SHOW:String = "game_show";
		
		public var gameScene:GameScene = new GameScene();
		
		public function GameMediator() 
		{
			super(NAME);
		}
		
		override public function listNotificationInterests () : Array {
			return [SHOW];
		}
		
		override public function handleNotification (notification:INotification) : void {
			switch(notification.getName()) {
				case SHOW:
					LayerManager.getInstance().runScene(gameScene);
					break;
			}
		}

		
		
	}

}





