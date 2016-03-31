package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoAngularDamping extends AbstractDemo
	{
		public function DemoAngularDamping(gravity:Number=10)
		{
			super(0);
			editText("AngularDamping",
				"读：GetAngularDamping():Number \n写：SetAngularDamping(value:Number):void",
				"角速度阻尼值，AngularDamping的取值范围在0~1之间");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var angleSpeed:Number;
		private var angularDamping:Number = 0.1;
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,200,80,80);
			b1.SetAngularDamping(angularDamping);
			b1.SetAngularVelocity(Math.PI/6*30);
			editValueText(b1.GetAngularDamping().toString());
		}

		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				b1.SetAngularDamping(1-b1.GetAngularDamping());
				b1.SetAwake(true);
				b1.SetAngularVelocity(Math.PI/6*30);
				editValueText(String(Math.round(b1.GetAngularDamping()*10)/10));
			}
			
		}
	}
}