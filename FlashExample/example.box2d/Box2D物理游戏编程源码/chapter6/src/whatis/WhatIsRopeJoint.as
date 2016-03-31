package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2RopeJoint;
	import Box2D.Dynamics.Joints.b2RopeJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsRopeJoint extends AbstractBox2DTest
	{
		public function WhatIsRopeJoint(gravity:Number=10)
		{
			super(10);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private var j:b2RopeJoint;
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,200,20,3,1);
			var bodyB:b2Body = LDEasyBody.createBox(250,100,30,40);
			
			var anchorA:b2Vec2 = bodyA.GetPosition();
			var anchorB:b2Vec2 = bodyB.GetPosition();
			var maxLength:Number = 200/30;
			
			var jointDef:b2RopeJointDef = new b2RopeJointDef();
			jointDef.Initialize(bodyA,bodyB,anchorA,anchorB,maxLength);
			
			j = world.CreateJoint(jointDef) as b2RopeJoint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			if(j.GetLimitState()==2){
//				world.DestroyJoint(j);
			}
			LDEasyDebug.drawJoint(j);
		}
		
	}
}