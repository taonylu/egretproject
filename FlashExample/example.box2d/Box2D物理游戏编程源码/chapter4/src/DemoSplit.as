package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	import ldEasyBox2D.LDEasyWorld;

	public class DemoSplit extends AbstractBox2DTest
	{
		public function DemoSplit(gravity:Number=10)
		{
			super(gravity);
		}
		private var b:b2Body;
		private var fixtureToBeRemoved:b2Fixture;
		
		override public function box2DAppReady():void
		{
			debug.AppendFlags(b2DebugDraw.e_centerOfMassBit);
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);

			b = LDEasyBody.createBox(250,200,30,30);
			LDEasyWorld.fixBodyAt(b,250,200);
			b.SetAngularVelocity(Math.PI/18*30);
			
			addFixture();
		}
		private function addFixture():void	
		{
			var radius:Number = 60;
			var angle:Number = Math.PI*2/8;
			var circle:b2CircleShape;
			var localPostion:b2Vec2 = new b2Vec2();
			var tempFixture:b2Fixture;
			
			for (var i:int = 0; i < 8; i++) 
			{
				circle = new b2CircleShape(20/30);
				localPostion.x = Math.cos(angle*i)*radius / 30;
				localPostion.y = Math.sin(angle*i)*radius /30;
				circle.SetLocalPosition(localPostion);
				tempFixture = b.CreateFixture2(circle,1);
			}
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type != MouseEvent.MOUSE_DOWN) {
				fixtureToBeRemoved = b.GetFixtureList();
				b.Split(callBack);
			}
		}
		private function callBack(f:b2Fixture):Boolean
		{
			var ok:Boolean;
			if(f == fixtureToBeRemoved){
				ok = true;
			}else{
				ok = false;
			}
			return ok;
		}
		
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			var b:b2Body = world.GetBodyList();
			while(b){
				debug.DrawPoint(b.GetPosition(),5/30,LDEasyDebug.blue);
				b=b.GetNext();
			}
		}
		
		
	}
}