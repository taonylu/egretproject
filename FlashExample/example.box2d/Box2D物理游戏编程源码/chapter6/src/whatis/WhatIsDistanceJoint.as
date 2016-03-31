package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2DistanceJoint;
	import Box2D.Dynamics.Joints.b2DistanceJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsDistanceJoint extends AbstractBox2DTest
	{
		public function WhatIsDistanceJoint(gravity:Number=10)
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
//			bodyA.SetAngularVelocity(Math.PI/30*30);
			
			var anchorA:b2Vec2 = new b2Vec2(250/30,150/30);
			var anchorB:b2Vec2 = new b2Vec2(250/30,250/30);
			
			var jointDef:b2DistanceJointDef = new b2DistanceJointDef();
			jointDef.Initialize(bodyA,bodyB,anchorA,anchorB);
			jointDef.length = b2Math.Distance(anchorA,anchorB);
			jointDef.frequencyHz = 3;
			jointDef.dampingRatio = 0.3;
			j = world.CreateJoint(jointDef) as b2DistanceJoint;
			
		}
		private var j:b2DistanceJoint;
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
//			j.SetLength(j.GetLength()+1/30);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}