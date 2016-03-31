package
{
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;

	public class DemoDestroyFixture extends AbstractBox2DTest
	{
		public function DemoDestroyFixture(gravity:Number=10)
		{
			super(gravity);
		}
		private var b:b2Body;
		override public function box2DAppReady():void
		{
			debug.AppendFlags(b2DebugDraw.e_centerOfMassBit);
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);

			b = LDEasyBody.createBox(250,200,30,30);
			LDEasyWorld.fixBodyAt(b,250,200);
			b.SetAngularVelocity(Math.PI/3);
			
			addFixture();
		}
		private function addFixture():void
		{
			var radius:Number = 80;
			var angle:Number = Math.PI*2/8;
			var circle:b2CircleShape;
			var localPostion:b2Vec2 = new b2Vec2();
			
			for (var i:int = 0; i < 8; i++) 
			{
				circle = new b2CircleShape(30/30);
				localPostion.x = Math.cos(angle*i)*radius / 30;
				localPostion.y = Math.sin(angle*i)*radius /30;
				circle.SetLocalPosition(localPostion);
				b.CreateFixture2(circle,1);
			}
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type != MouseEvent.MOUSE_DOWN) return;
			
			if(b.GetFixtureList()) {
				b.DestroyFixture(b.GetFixtureList());
			}
		}
	}
}