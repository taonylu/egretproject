package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2WheelJoint;
	import Box2D.Dynamics.Joints.b2WheelJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsWheelJoint extends AbstractBox2DTest
	{
		public function WhatIsWheelJoint(gravity:Number=10)
		{
			super(10);
		}
		private var j:b2WheelJoint;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,200,20,3,0);
			var bodyB:b2Body = LDEasyBody.createBox(250,300,40,20);
			var anchor:b2Vec2 = new b2Vec2(210/30,250/30);
			var axis:b2Vec2 = new b2Vec2(0,1);
			
			var jointDef:b2WheelJointDef = new b2WheelJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.localAnchorA = bodyA.GetLocalPoint(anchor);
			jointDef.localAnchorB = bodyB.GetLocalPoint(anchor);
			jointDef.localAxisA = axis;
//			jointDef.enableMotor = true;
//			jointDef.maxMotorTorque =180;
//			jointDef.motorSpeed = Math.PI*1.5;
//			jointDef.frequencyHz = 0;
//			jointDef.dampingRatio =0.1;
			j = world.CreateJoint(jointDef) as b2WheelJoint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}