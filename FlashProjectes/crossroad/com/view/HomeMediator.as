package com.view 
{
	import com.view.scene.HomeScene;
	import org.puremvc.as3.interfaces.IMediator;
	import org.puremvc.as3.interfaces.INotification;
	import org.puremvc.as3.patterns.mediator.Mediator;
	import com.common.LayerManager;
	/**
	 * 类    名: 主页视图
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class HomeMediator extends Mediator implements IMediator
	{
		public static var NAME:String = "HomeMediator";
		public static var SHOW:String = "home_show";
		
		public var homeScene:HomeScene = new HomeScene();
		
		public function HomeMediator() 
		{
			super(NAME);
		}
		
		override public function listNotificationInterests () : Array {
			return [SHOW];
		}
		
		override public function handleNotification (notification:INotification) : void {
			switch(notification.getName()) {
				case SHOW:
					LayerManager.getInstance().runScene(homeScene);
					break;
			}
		}

		
	}

}



