package com.controller 
{
	import com.view.GameMediator;
	import com.view.HomeMediator;
	import org.puremvc.as3.interfaces.ICommand;
	import org.puremvc.as3.interfaces.INotification;
	import org.puremvc.as3.patterns.command.SimpleCommand;
	/**
	 * 类    名: 启动命令
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class StartupCommand extends SimpleCommand implements ICommand
	{
		
		override public function execute(notification:INotification):void 
		{
			trace("startup command...");
			
			//register mediator
			facade.registerMediator(new HomeMediator());
			facade.registerMediator(new GameMediator());
			
			//register proxy
			
			
			//show homescene
			sendNotification(HomeMediator.SHOW);
		}
		
	}

}