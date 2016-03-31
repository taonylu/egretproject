package whatis
{
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2GearJoint;
	import Box2D.Dynamics.Joints.b2GearJointDef;
	import Box2D.Dynamics.Joints.b2Joint;
	import Box2D.Dynamics.Joints.b2PrismaticJoint;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class WhatIsGearJoint extends AbstractBox2DTest
	{
		public function WhatIsGearJoint(gravity:Number=10)
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
			var joint1:b2Joint = getRevoluteJoint(250,100);
			var joint2:b2Joint = getPrismaticJoint(250,200,false);
			
			var jointDef:b2GearJointDef = new b2GearJointDef();
			jointDef.joint1 = joint1;
			jointDef.joint2 = joint2;
			jointDef.bodyB = world.GetGroundBody();
			jointDef.ratio = 2;
			
			var gearJoint:b2GearJoint = world.CreateJoint(jointDef) as b2GearJoint;
		}
		private function getRevoluteJoint(posX:Number,posY:Number):b2RevoluteJoint
		{
			var ba:b2Body = world.GetGroundBody();
			var bb:b2Body = LDEasyBody.createBox(posX,posY,20,40);
			
			var revoJointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			revoJointDef.bodyA = ba;
			revoJointDef.bodyB = bb;
			revoJointDef.localAnchorA = bb.GetPosition();
			revoJointDef.localAnchorB = new b2Vec2();
			
			var joint:b2RevoluteJoint = world.CreateJoint(revoJointDef) as b2RevoluteJoint;
			return joint;
		}
		private function getPrismaticJoint(posX:Number,posY:Number,vertical:Boolean=true):b2PrismaticJoint
		{
			var ba:b2Body = world.GetGroundBody();
			var bb:b2Body = LDEasyBody.createBox(posX,posY,30,50);
			
			var jointDef:b2PrismaticJointDef = new b2PrismaticJointDef();
			jointDef.bodyA = ba;
			jointDef.bodyB = bb;
			jointDef.localAnchorB = new b2Vec2();
			jointDef.localAnchorA = bb.GetPosition();
			if(vertical) {
				jointDef.localAxisA = new b2Vec2(0,1);
			}else{
				jointDef.localAxisA = new b2Vec2(1,0);
			}
			jointDef.enableLimit = true;
			jointDef.lowerTranslation = -100/30;
			jointDef.upperTranslation = 100/30;
			
			var joint:b2PrismaticJoint = world.CreateJoint(jointDef) as b2PrismaticJoint;
			return joint;
		}
	}
}