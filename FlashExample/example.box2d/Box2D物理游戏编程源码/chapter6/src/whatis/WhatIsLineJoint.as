package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2LineJoint;
	import Box2D.Dynamics.Joints.b2LineJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsLineJoint extends AbstractBox2DTest
	{
		public function WhatIsLineJoint(gravity:Number=10)
		{
			super(10);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,20,3,1);
			var bodyB:b2Body = LDEasyBody.createBox(250,200,30,40);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,120/30);
			
			var jointDef:b2LineJointDef = new b2LineJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.localAnchorA = bodyA.GetLocalPoint(anchor);
			jointDef.localAnchorB = bodyB.GetLocalPoint(anchor);
			
			jointDef.enableLimit = true;
			jointDef.lowerTranslation = -100/30;
			jointDef.upperTranslation = 100/30;
			
//			jointDef.enableMotor = true;
			jointDef.maxMotorForce = 10;
			jointDef.motorSpeed = 10;
			j = world.CreateJoint(jointDef) as b2LineJoint;
		}
		private var j:b2LineJoint;
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}