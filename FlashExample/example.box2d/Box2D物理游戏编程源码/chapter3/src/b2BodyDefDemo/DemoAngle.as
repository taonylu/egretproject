package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoAngle extends AbstractDemo
	{
		public function DemoAngle(gravity:Number=10)
		{
			super(0);
			editText("Angle",
				"读：GetAngle():Number \n写：SetAngle(angle:Number):void",
				"按下空格键设置随机的角度值");
		}
		
		private var b1:b2Body, b2:b2Body;
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createPlatform(250,200,40,80,2);
			editValueText(String(b1.GetAngle()));
		}

		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			b1.SetAwake(true);
			if (event.keyCode == Keyboard.SPACE) 
			{
				b1.SetAngle(Math.random()*Math.PI*2);
				editValueText(String(Math.round(b1.GetAngle()*100)/100));
			}
		}
	}
}