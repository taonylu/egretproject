package Swindler
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class DemoSwindler1 extends AbstractBox2DTest
	{
		public function DemoSwindler1(gravity:Number=10)
		{
			super(gravity);
		}
		private var jdf:b2RevoluteJointDef;
		private var joint:b2RevoluteJoint;
		private var player:b2Body;
		private var rayStart:b2Vec2,rayEnd:b2Vec2;
		private var line:PivotLine1;
		
		override public function box2DAppReady():void
		{
			buildGame();
			buildPlayer();
			rayStart = line.getStart();
			rayEnd = line.getEnd();
		}
		private function buildGame():void
		{
			LDEasyBody.createBox(190,150,30,50,0);
			LDEasyBody.createBox(230,200,30,30,0);
		}
		private function buildPlayer():void
		{
			player = LDEasyBody.createBox(30,200,20,20);
			player.SetUserData("player");
			player.SetSleepingAllowed(false);
			
			var lineStart:b2Vec2 = new b2Vec2(200/30,50/30);
			var lineEnd:b2Vec2 = player.GetPosition();
			line = new PivotLine1(lineStart,lineEnd);

			jdf = new b2RevoluteJointDef();
			jdf.Initialize(world.GetGroundBody(),player,lineStart);
			joint = world.CreateJoint(jdf) as b2RevoluteJoint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			line.setEnd(player.GetPosition());
			rayEnd = line.getEnd();
			
			world.RayCast(callback,rayStart,rayEnd);
			world.RayCast(callback,rayEnd,rayStart);

			drawLine();
		}
		private function callback(f:b2Fixture,collisionPoint:b2Vec2,normal:b2Vec2,fraction):Boolean
		{
			if(f.GetBody().GetUserData()=="player") return -1;
			
			updateJoint(collisionPoint)
			rayStart = collisionPoint;
			line.addPivot(collisionPoint);
			
			return 0;
		}
		private function updateJoint(anchor:b2Vec2):void{
			jdf.Initialize(world.GetGroundBody(),player,anchor);
			world.DestroyJoint(joint);
			joint=world.CreateJoint(jdf) as b2RevoluteJoint;
		}
		private function drawLine():void
		{
			var vertices:Array = line.getVertices();
			for (var i:int = 1; i < vertices.length; i++) 
			{
				var p1:b2Vec2 = vertices[i];
				var p2:b2Vec2 = vertices[i-1];
				debug.DrawSegment(p1,p2,LDEasyDebug.red);
			}
		}
	}
}
