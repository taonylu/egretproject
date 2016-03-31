package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2WeldJoint;
	import Box2D.Dynamics.Joints.b2WeldJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	import ldEasyBox2D.LDEasyWorld;

	public class WhatIsWeldJoint extends AbstractBox2DTest
	{
		public function WhatIsWeldJoint(gravity:Number=10)
		{
			super(10);
		}
		private var j:b2WeldJoint;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,20,3);
			var bodyB:b2Body = LDEasyBody.createBox(250,200,30,40);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,120/30);
			
			var jointDef:b2WeldJointDef = new b2WeldJointDef();
			jointDef.Initialize(bodyA,bodyB,anchor);
//			jointDef.referenceAngle = Math.PI/4;
//			jointDef.frequencyHz = 5;
//			jointDef.dampingRatio = 0.3;
			j = world.CreateJoint(jointDef) as b2WeldJoint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
	}
}