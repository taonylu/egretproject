package
{
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2DistanceJoint;
	import Box2D.Dynamics.Joints.b2DistanceJointDef;
	import Box2D.Dynamics.Joints.b2Joint;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	import Box2D.Dynamics.Joints.b2WheelJoint;
	import Box2D.Dynamics.Joints.b2WheelJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	[SWF(width="700")]
	public class DemoJointsComplex extends AbstractBox2DTest
	{
		public function DemoJointsComplex(gravity:Number=10)
		{
			super(gravity);
		}
		private var joints:Array = [];
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createJoint1();
			createRope();
		}
		
		private function createJoint1():void
		{
			//spring
			var platTop:b2Body = LDEasyBody.createBox(155,180,50,30);
			platTop.SetFixedRotation(true);
			var platBot:b2Body = LDEasyBody.createBox(155,300,50,10,0);
			var anchor:b2Vec2 = new b2Vec2(155/30,200/30);
			var wheelDef:b2WheelJointDef = new b2WheelJointDef();
			wheelDef.Initialize(platBot,platTop,anchor,new b2Vec2(0,1));
			wheelDef.localAnchorB = new b2Vec2();
			var wheel:b2WheelJoint = world.CreateJoint(wheelDef) as b2WheelJoint;
			joints.push(wheel);
			
			//-------------------------
			//arm 1
			var body1:b2Body = LDEasyBody.createBox(208,246,161,10);
			body1.SetAngle(48/180*Math.PI);
			var body2:b2Body = LDEasyBody.createBox(208,246,161,10);
			body2.SetAngle(-48/180*Math.PI);
			//revolutes first middle
			var revoluteDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			revoluteDef.Initialize(body1,body2,body1.GetPosition());
			var revolute:b2RevoluteJoint = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			//revolutes first 2
			revoluteDef.bodyA = platTop;
			revoluteDef.bodyB = body1;
			revoluteDef.localAnchorA = new b2Vec2();
			revoluteDef.localAnchorB = new b2Vec2(-80/30,0);
			revolute = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			
			revoluteDef.bodyA = platBot;
			revoluteDef.bodyB = body2;
			revolute = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			
			//-------------------------
			//arm 2
			var body3:b2Body = LDEasyBody.createBox(314,246,161,10);
			body1.SetAngle(48/180*Math.PI);
			var body4:b2Body = LDEasyBody.createBox(314,246,161,10);
			body2.SetAngle(-48/180*Math.PI);
			var body5:b2Body = LDEasyBody.createBox(419,246,10,50);
			body5.SetFixedRotation(true);
			body5.SetBullet(true);
			
			//revolutes second middle
			revoluteDef.Initialize(body3,body4,body3.GetPosition());
			revolute = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			//revolutes second 2
			revoluteDef.bodyA = body2;
			revoluteDef.bodyB = body3;
			revoluteDef.localAnchorA = new b2Vec2(80/30,0);
			revoluteDef.localAnchorB = new b2Vec2(-80/30,0);
			revolute = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			
			revoluteDef.bodyA = body1;
			revoluteDef.bodyB = body4;
			revoluteDef.localAnchorA = new b2Vec2(80/30,0);
			revoluteDef.localAnchorB = new b2Vec2(-80/30,0);
			revolute = world.CreateJoint(revoluteDef) as b2RevoluteJoint;
			joints.push(revolute);
			
			//-------------------------
			//hand
			var distanceDef:b2DistanceJointDef = new b2DistanceJointDef();
			var anchorA:b2Vec2 = body3.GetWorldPoint(new b2Vec2(80/30,0));
			var anchorB:b2Vec2 = body5.GetPosition();
			var length:Number = 85/30;
			distanceDef.Initialize(body3,body5,anchorA,anchorB);
			distanceDef.length = length;
			var distance:b2DistanceJoint = world.CreateJoint(distanceDef) as b2DistanceJoint;
			joints.push(distance);
			
			anchorA = body4.GetWorldPoint(new b2Vec2(80/30,0));
			distanceDef.Initialize(body4,body5,anchorA,anchorB);
			distanceDef.length = length;
			distance = world.CreateJoint(distanceDef) as b2DistanceJoint;
			joints.push(distance);
		}
		
		private function createRope():void
		{
			var posX:Number = 450, posY:Number = 30;
			
			var segmentSize:Number = 20;
			var segmentThickness:Number = 5;
			var gapBetweenSegment:Number = 2;
			var bodyA:b2Body = world.GetGroundBody();
			var bodyB:b2Body = LDEasyBody.createBox(posX+segmentSize,posY,segmentSize,segmentThickness);
			var localAnchorA:b2Vec2 = new b2Vec2(segmentSize/30/2,0);
			var localAnchorB:b2Vec2 = new b2Vec2(-(segmentSize)/30/2-gapBetweenSegment/30,0);
			var revoluteDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			revoluteDef.bodyA = bodyA;
			revoluteDef.bodyB = bodyB;
			revoluteDef.localAnchorA = new b2Vec2(posX/30,posY/30);
			revoluteDef.localAnchorB = localAnchorB;
			world.CreateJoint(revoluteDef);
			posX+=segmentSize*1.5+gapBetweenSegment;
			revoluteDef.localAnchorA = localAnchorA;
			bodyA = bodyB;
			for (var i:int = 0; i < 9; i++) 
			{
				bodyB = LDEasyBody.createBox(posX,posY,segmentSize,segmentThickness);
				revoluteDef.bodyA = bodyA;
				revoluteDef.bodyB = bodyB;
				world.CreateJoint(revoluteDef);
				bodyA = bodyB;
				posX+=segmentSize+gapBetweenSegment;
			}
			bodyB = LDEasyBody.createBox(posX,posY,30,30);
			revoluteDef.bodyA = bodyA;
			revoluteDef.bodyB = bodyB;
			revoluteDef.localAnchorB = new b2Vec2();
			world.CreateJoint(revoluteDef);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			for each (var j:b2Joint in joints) 
			{
				LDEasyDebug.drawJoint(j);
			}
		}
		
	}
}