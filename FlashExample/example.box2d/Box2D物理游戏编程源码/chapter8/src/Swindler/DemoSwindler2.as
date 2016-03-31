package Swindler
{
	import flash.events.Event;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class DemoSwindler2 extends AbstractBox2DTest
	{
		public function DemoSwindler2(gravity:Number=10)
		{
			super(gravity);
		}
		private var jdf:b2RevoluteJointDef;
		private var j:b2RevoluteJoint;
		private var player:b2Body;
		private var line:PivotLine2;
		
		private var rayStart:b2Vec2, rayEnd:b2Vec2;
		
		override public function box2DAppReady():void
		{
			buildGame();
			buildPlayer();
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
			line = new PivotLine2(lineStart,lineEnd);
			line.addEventListener(PivotLine2.PIVOT_CHANGE,onPivotChange);
			
			jdf = new b2RevoluteJointDef();
			jdf.Initialize(world.GetGroundBody(),player,lineStart);
			j = world.CreateJoint(jdf) as b2RevoluteJoint;
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			line.setEnd(player.GetPosition());
			rayStart = line.getLastPivot();
			rayEnd = line.getEnd();
			
			world.RayCast(callback,rayStart,rayEnd);
			world.RayCast(callback,rayEnd,rayStart);
			
			drawLine();
		}
		private function callback(f:b2Fixture,collisionPoint:b2Vec2,normal:b2Vec2,fraction):Boolean
		{
			if(f.GetBody().GetUserData()=="player") return -1;
			updateLinePivot(collisionPoint,f);
			return 0;
		}
		private function updateLinePivot(pivot:b2Vec2,obstacle:b2Fixture):void
		{
			var vertex:b2Vec2 = getClosestVertex(pivot,obstacle);
			if(!line.hasPivot(vertex)){
				line.addPivot(vertex,obstacle);
			}
		}
		protected function onPivotChange(event:Event):void
		{
			updateJoint();
		}
		private function updateJoint():void{
			jdf.Initialize(world.GetGroundBody(),player,line.getLastPivot());
			world.DestroyJoint(j);
			j=world.CreateJoint(jdf) as b2RevoluteJoint;
		}
		private function drawLine():void
		{
			var lineVertices:Array = line.getVertices();
			for (var i:int = 1; i < lineVertices.length; i++) 
			{
				var p1:b2Vec2 = lineVertices[i];
				var p2:b2Vec2 = lineVertices[i-1];
				debug.DrawSegment(p1,p2,LDEasyDebug.red);
			}
		}
		private function getClosestVertex(target:b2Vec2,fixture:b2Fixture):b2Vec2{
			var closestVertex:b2Vec2;
			var closestDistance:Number = Number.MAX_VALUE;
			
			var shape:b2PolygonShape = fixture.GetShape() as b2PolygonShape;
			var body:b2Body = fixture.GetBody();
			var vertices:Vector.<b2Vec2> = shape.GetVertices();
			for each (var v:b2Vec2 in vertices) 
			{
				var worldVertex:b2Vec2 = body.GetWorldPoint(v);
				var distance:Number = b2Math.Distance(worldVertex,target);
				if(distance<closestDistance){
					closestVertex = worldVertex;
					closestDistance = distance;
				}
			}
			return closestVertex;
		}
	}
}
