package
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2FrictionJointDef;
	import Box2D.Dynamics.Joints.b2JointEdge;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class DemoFrictionJoint extends AbstractBox2DTest
	{
		public function DemoFrictionJoint(gravity:Number=10)
		{
			super(0);
		}
		public const USER_DATA_PLAYER:String = "player";
		public const USER_DATA_BALL:String = "ball";
		private var player:b2Body;
		private var contactListener:DemoFrictionJointContactListener;
		private var tempJointEdge:b2JointEdge;
		
		override public function box2DAppReady():void
		{
			player = LDEasyBody.createBox(100,300,40,40);
			player.SetUserData(USER_DATA_PLAYER);
			
			createBodies();
			
			contactListener = new DemoFrictionJointContactListener(this);
			world.SetContactListener(contactListener);
		}
		public function createFrictionJointTo(bodyB:b2Body):void
		{
			var bodyA:b2Body = player;
			var anchor:b2Vec2 = bodyB.GetPosition();
			
			var JointDef:b2FrictionJointDef = new b2FrictionJointDef();
			JointDef.bodyA = bodyA;
			JointDef.bodyB = bodyB;
			JointDef.localAnchorA = new b2Vec2();
			JointDef.localAnchorB = new b2Vec2();
			JointDef.maxForce= bodyB.GetMass()*50;
			JointDef.maxTorque = 10;
			
			world.CreateJoint(JointDef);
		}
		public function destroyFrictionJointWith(bodyB:b2Body):void
		{
			tempJointEdge = bodyB.GetJointList();
			if(tempJointEdge!=null){
				world.DestroyJoint(tempJointEdge.joint);
			}
		}
		private function createBodies():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			var bodySize:Number = 10;
			var posX:Number,posY:Number;
			for (var i:int = 0; i < 100; i++) 
			{
				posX = Math.random()*500+50;
				posY = Math.random()*300+50;
				var ball:b2Body = LDEasyBody.createCircle(posX,posY,bodySize);
				ball.SetUserData(USER_DATA_BALL);
			}
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawFixture(player.GetFixtureList(),LDEasyDebug.red);
		}
		
	}
}