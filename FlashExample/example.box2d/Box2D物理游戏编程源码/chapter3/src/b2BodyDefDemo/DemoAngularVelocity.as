package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoAngularVelocity extends AbstractDemo
	{
		public function DemoAngularVelocity(gravity:Number=10)
		{
			super(0);
			editText("AngularVelocity",
				"读：GetAngularVelocity():Number \n写：SetAngularVelocity(omega:Number):void",
				"按下空格键变化角速度值");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var angleSpeed:Number;
		private var flag:Boolean = false;
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,200,80,80);
			angleSpeed = 5/180*Math.PI*30;
			b1.SetAngularVelocity(angleSpeed);
			editValueText(Math.round(b1.GetAngularVelocity()).toString());
		}

		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.keyCode != Keyboard.SPACE) return;
			flag = !flag;
			
			if (flag) 
			{
				b1.SetAngularVelocity(-angleSpeed);
			}else{
				b1.SetAngularVelocity(angleSpeed);
			}
			editValueText(Math.round(b1.GetAngularVelocity()).toString());
		}
	}
}