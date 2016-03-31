package whatis
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2PulleyJoint;
	import Box2D.Dynamics.Joints.b2PulleyJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsPulleyJoint extends AbstractBox2DTest
	{
		public function WhatIsPulleyJoint(gravity:Number=10)
		{
			super(10);
		}
		override public function box2DAppReady():void
		{
//			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private var p:b2Vec2,b:b2Body;
		private var j:b2PulleyJoint;
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(150,250,20,3);
			var bodyB:b2Body = LDEasyBody.createBox(350,250,30,40);
			
			var anchorA:b2Vec2 = new b2Vec2(150/30,200/30);
			var anchorB:b2Vec2 = new b2Vec2(350/30,200/30);
			var groundA:b2Vec2 = new b2Vec2(150/30,100/30);
			var groundB:b2Vec2 = new b2Vec2(350/30,100/30);
			var length:Number = b2Math.Distance(groundA,anchorA);
			var ratio:Number = 2;
			var jointDef:b2PulleyJointDef = new b2PulleyJointDef();
			jointDef.Initialize(bodyA,bodyB,groundA,groundB,anchorA,anchorB,ratio);

			var joint:b2PulleyJoint = world.CreateJoint(jointDef) as b2PulleyJoint;
			b = bodyB;
			p = groundB.Copy();
			j = joint;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			LDEasyDebug.drawJoint(j);
		}
		
	}
}