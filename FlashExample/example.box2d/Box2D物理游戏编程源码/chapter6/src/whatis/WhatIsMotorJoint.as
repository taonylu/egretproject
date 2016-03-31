package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2MotorJoint;
	import Box2D.Dynamics.Joints.b2MotorJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsMotorJoint extends AbstractBox2DTest
	{
		public function WhatIsMotorJoint(gravity:Number=10)
		{
			super(0);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private var j:b2MotorJoint;
		private var a:b2Body, b:b2Body;
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,30,3);
			var bodyB:b2Body = LDEasyBody.createBox(250,300,30,40,2);
//			bodyA.SetAngle(Math.PI/4);
//			bodyB.SetFixedRotation(true);
			
			var anchor:b2Vec2 = new b2Vec2(200/30,200/30);
			
			var jointDef:b2MotorJointDef = new b2MotorJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.angularOffset = Math.PI/4;
			jointDef.linearOffset = bodyA.GetLocalPoint(anchor);
			jointDef.maxTorque = 3*30;
			jointDef.maxForce = bodyB.GetMass()*50;
			jointDef.correctionFactor=.3;
			
			j = world.CreateJoint(jointDef) as b2MotorJoint;
			a=bodyA;
			b=bodyB;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}