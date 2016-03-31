package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoAllowSleep extends AbstractDemo
	{
		public function DemoAllowSleep(gravity:Number=10)
		{
			super(gravity);
			editText("AllowSleep",
				"读：IsSleepingAllowed():Boolean \n写：SetSleepingAllowed(flag:Boolean):void",
				"左侧矩形为演示刚体，待刚体静止时查看效果");
		}
		
		private var b1:b2Body, b2:b2Body;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(100,100,80,80);
			b1.SetSleepingAllowed(false);
			editValueText(b1.IsSleepingAllowed().toString());
			b2 = LDEasyBody.createBox(400,100,80,80);
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(100/30,100/30));
			b2.SetPosition(b2Vec2.Make(400/30,100/30));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				b1.SetSleepingAllowed(!b1.IsSleepingAllowed());
				resetBodies();
				editValueText(b1.IsSleepingAllowed().toString());
			}
		}
	}
}