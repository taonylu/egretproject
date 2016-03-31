package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2PrismaticJoint;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsPrimaticJoint extends AbstractBox2DTest
	{
		public function WhatIsPrimaticJoint(gravity:Number=10)
		{
			super(0);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private var p:b2Vec2 = new b2Vec2(250/30,200/30);
		private var j:b2PrismaticJoint;
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,20,3,0);
			var bodyB:b2Body = LDEasyBody.createBox(250,200,30,40);
			bodyB.SetAngle(Math.PI/4);
			bodyB.SetSleepingAllowed(false);
			var anchor:b2Vec2 = new b2Vec2(250/30,150/30);
			var axis:b2Vec2 = new b2Vec2(1,1);
			axis.Normalize();
			var lowerTranslation:Number = -100/30;
			var upperTranslation:Number = 100/30;
			
			var jointDef:b2PrismaticJointDef = new b2PrismaticJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.localAnchorA = bodyA.GetLocalPoint(anchor);
			jointDef.localAnchorB = bodyB.GetLocalPoint(anchor);
			jointDef.localAxisA = axis;
			
//			jointDef.enableLimit = true;
//			jointDef.lowerTranslation = lowerTranslation;
//			jointDef.upperTranslation = upperTranslation;
			
//			jointDef.enableMotor = true;
//			jointDef.motorSpeed = 10;
//			jointDef.maxMotorForce = 20;
			
//			jointDef.referenceAngle = Math.PI*1/4;
			
			j = world.CreateJoint(jointDef) as b2PrismaticJoint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}