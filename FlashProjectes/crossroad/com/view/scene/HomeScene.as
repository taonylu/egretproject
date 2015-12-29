package com.view.scene 
{
	import com.common.BaseScene;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import com.AppFacade;
	import com.view.GameMediator;
	
	/**
	 * 类    名: 主页场景
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class HomeScene extends BaseScene
	{
		public var startBtn:Sprite;
		
		public function HomeScene() 
		{
			
		}
		
		override public function onEnable():void {
			this.startBtn.addEventListener(MouseEvent.CLICK, onStartBtnClick);
		}
		
		private function onStartBtnClick(e:MouseEvent):void {
			AppFacade.getInstance().sendNotification(GameMediator.SHOW);
		}
		
	}

}