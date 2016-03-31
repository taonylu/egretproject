package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsRevoluteJoint extends AbstractBox2DTest
	{
		public function WhatIsRevoluteJoint(gravity:Number=10)
		{
			super(0);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,20,3,0);
			var bodyB:b2Body = LDEasyBody.createBox(250,200,30,40);

			var anchor:b2Vec2 = new b2Vec2(250/30,150/30);
			
			var jointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			jointDef.Initialize(bodyA,bodyB,anchor);
			
//			jointDef.enableLimit = true;
//			jointDef.lowerAngle = -Math.PI/4;
//			jointDef.upperAngle = Math.PI/4;
//			jointDef.referenceAngle = Math.PI/4;
			
//			jointDef.enableMotor = true;
//			jointDef.motorSpeed = 2;
//			jointDef.maxMotorTorque = 20;
			
			joint = world.CreateJoint(jointDef) as b2RevoluteJoint;
		}
		private var joint:b2RevoluteJoint;
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			debug.DrawCircle(joint.GetAnchorA(),5/30,LDEasyDebug.blue);
			LDEasyDebug.drawJoint(joint);
		}
		
	}
}