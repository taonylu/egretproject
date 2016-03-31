package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoPosition extends AbstractDemo
	{
		public function DemoPosition(gravity:Number=10)
		{
			super(gravity);
			editText("Position",
				"读：GetPosition():b2Vec2 \n写：SetPosition(position:b2Vec2):void",
				"按下空格键，为刚体设置一个随机的坐标");
		}
		
		private var b1:b2Body, b2:b2Body;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(50,200,50,50);
			editValueText("b2Vec2("+Math.round(b1.GetPosition().x)
				+"," +
				Math.round(b1.GetPosition().y) + ")");
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(50/30,200/30));
			b1.SetAngularVelocity(0);
			b1.SetLinearVelocity(b2Vec2.Make(0,0));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				b1.SetAwake(true);
				b1.SetPosition(b2Vec2.Make((Math.random()*400+50)/30,(Math.random()*250+50)/30));
				editValueText("b2Vec2("+Math.round(b1.GetPosition().x)
					+"," +
					Math.round(b1.GetPosition().y) + ")");
			}
		}
	}
}