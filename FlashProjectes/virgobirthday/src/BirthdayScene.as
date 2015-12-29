package 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.system.ApplicationDomain;
	import flash.utils.getDefinitionByName;
	
	/**
	 * ...
	 * @author 
	 */
	public class BirthdayScene extends MovieClip
	{
		private var scene:MovieClip;
		public function BirthdayScene() 
		{
			
			this.addEventListener(Event.ADDED_TO_STAGE, onAddToStage);
			
			
			
		}
		
		private function onAddToStage(e:Event):void{
			this.removeEventListener(Event.ADDED_TO_STAGE, onAddToStage);
			
			var clz:Class = ApplicationDomain.currentDomain.getDefinition("Birthday") as Class;
			
			scene = new clz();
			scene.x = this.stage.stageWidth / 2;
			scene.y = this.stage.stageHeight / 2;
			scene.gotoAndPlay(1);
			this.addChild(scene);
			
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			this.stage.addEventListener(MouseEvent.CLICK, onMouseClick);
			
			SoundM.init();
			SoundM.play(SoundM.welcome);
		}
		
		
		
		
		private var yaoqingFlow:int = 21; //邀请函打开漂浮
		private var yaoqingOpen:int = 22; //邀请函打开动画
		private var yaoqingFlow2:int = 38;//邀请函打开后漂浮
		private var door:int = 39;        //准备进门
		private var door_wait:int = 52;   //进门前先脱鞋
		private var door_takeoff:int = 53;//脱鞋
		private var door_waitin:int = 104;//脱鞋后等待进门
		private var hair:int = 105;       //显示整理头发
		private var hair_wait:int = 118;  //等待清理头发
		private var hair_clear:int = 119; //清理头发
		private var hair_over:int = 183;  //清理头发完成
		private var room:int = 184;       //房间
		
		private function onEnterFrame(e:Event):void{
			switch(scene.currentFrame){
				case yaoqingFlow:    //停在邀请函漂浮
					scene.stop();
					break;
				case yaoqingFlow2:   //停在邀请函打开后漂浮
					scene.stop();
					break;
				case door_wait:      //停在进门前先脱鞋
					scene.stop();
					break;
				case door_waitin:    //停在等待进门
					scene.stop();
					break;
				case hair_wait:      //等待清理头发
					scene.stop();
					break;
				case hair_over:
					scene.stop();   //清理头发完成
					break;
			}
		}
		
		private function onMouseClick(e:MouseEvent):void{
			switch(scene.currentFrame){
				case yaoqingFlow:  //邀请函漂浮->打开
					scene.gotoAndPlay(yaoqingOpen);
					break;
				case yaoqingFlow2: //邀请函打开漂浮->准备进门
					scene.gotoAndPlay(door);  
					break;  
				case door_wait:    //进门前先脱鞋->脱鞋动画
					scene.gotoAndPlay(door_takeoff);
					break;
				case door_waitin:  //脱鞋后->整理头发
					scene.gotoAndPlay(hair);
					break;
				case hair_wait:    //等待清理头发->清理头发
					scene.gotoAndPlay(hair_clear);
					break;
				case hair_over:    //清理头发完成->进入房间
					scene.gotoAndPlay(room);
					break;
				
			}
		}
		
	}

}