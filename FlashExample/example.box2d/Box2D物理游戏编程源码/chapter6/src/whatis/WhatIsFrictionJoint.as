package whatis
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2FrictionJoint;
	import Box2D.Dynamics.Joints.b2FrictionJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	import ldEasyBox2D.LDEasyWorld;

	public class WhatIsFrictionJoint extends AbstractBox2DTest
	{
		public function WhatIsFrictionJoint(gravity:Number=10)
		{
			super(0);
		}
		private var keyDownList:Array=[];
		private var bodyB:b2Body;
		private var leftForce:b2Vec2 = new b2Vec2(-20,0);
		private var rightForce:b2Vec2 = new b2Vec2(20,0);
		private var upTorque:Number = 10;
		private var downTroque:Number = -10;
		private var j:b2FrictionJoint;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createRegular(250,100,20,3);
			bodyA.SetAngularDamping(1);
			bodyB = LDEasyBody.createBox(250,200,30,40);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,150/30);
			
			var jointDef:b2FrictionJointDef = new b2FrictionJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.localAnchorA=new b2Vec2(1,1);
			jointDef.localAnchorB=new b2Vec2(1,1);
			jointDef.Initialize(bodyA,bodyB,anchor);
			jointDef.maxForce = 100;
			jointDef.maxTorque = 10;
			
			j = world.CreateJoint(jointDef) as b2FrictionJoint;
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN) keyDownList[event.keyCode]=true;
			if(event.type == KeyboardEvent.KEY_UP) keyDownList[event.keyCode]=false;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			if (keyDownList[Keyboard.LEFT]) 
			{
				bodyB.ApplyForce(leftForce,bodyB.GetPosition());
			}
			else if (keyDownList[Keyboard.RIGHT]) 
			{
				bodyB.ApplyForce(rightForce,bodyB.GetPosition());
			}
			if (keyDownList[Keyboard.UP]) 
			{
				bodyB.ApplyTorque(upTorque);
			}
			else if (keyDownList[Keyboard.DOWN]) 
			{
				bodyB.ApplyTorque(downTroque);
			}
			LDEasyDebug.drawJoint(j);
		}
	}
}