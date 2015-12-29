package com 
{
	import org.puremvc.as3.interfaces.IFacade;
	import org.puremvc.as3.patterns.facade.Facade;
	import com.controller.StartupCommand;
	import com.common.BaseScene;
	/**
	 * 类    名: Facade主类
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class AppFacade extends Facade implements IFacade
	{
		public static var Startup:String = "Startup";
		
		public function AppFacade() 
		{
			
		}
		
		public static function getInstance():AppFacade
		{
			if (! instance) new AppFacade();
			return instance as AppFacade;
		}
		
		public function startup():void {
			registerCommand(Startup, StartupCommand);
			sendNotification(Startup);
			removeCommand(Startup);
			
		}
		
	}

}