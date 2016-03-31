package
{
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2MotorJoint;
	import Box2D.Dynamics.Joints.b2MotorJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;

	public class DemoMotorJoint extends AbstractBox2DTest
	{
		public function DemoMotorJoint(gravity:Number=10)
		{
			super(20);
		}
		private var motorJoint:b2MotorJoint;
		private var bodyAtMouse:b2Body;
		override public function box2DAppReady():void
		{
			createBodies();
			createJoint();
		}
		private function createJoint():void
		{
			var bodyA:b2Body = world.GetGroundBody();
			var bodyB:b2Body = LDEasyBody.createBox(250,200,100,20);
			bodyB.GetFixtureList().SetSensor(true);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,200/30);
			var jointDef:b2MotorJointDef = new b2MotorJointDef();
			jointDef.Initialize(bodyA,bodyB);
			
			jointDef.angularOffset=0;
			jointDef.linearOffset = bodyA.GetLocalPoint(anchor);
			jointDef.maxForce = 500;
			jointDef.maxTorque = 200;
			jointDef.correctionFactor = .5;
			
			motorJoint = world.CreateJoint(jointDef) as b2MotorJoint;
		}
		private function createBodies():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			for (var i:int = 0; i < 5; i++) 
			{
				var posX:Number = 50+Math.random()*400;
				var posY:Number = 50+Math.random()*300;
				var angle:Number = Math.random()*Math.PI*2;
				var body:b2Body = LDEasyBody.createBox(posX,posY,40,20,1);
				body.SetAngle(angle);
			}
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type == MouseEvent.MOUSE_DOWN) 
			{
				bodyAtMouse = LDEasyWorld.getBodyAt(mouseX,mouseY);
				if(bodyAtMouse!=null){
					var bodyA:b2Body = motorJoint.GetBodyA();
					var linearOffset:b2Vec2 = bodyA.GetLocalPoint(bodyAtMouse.GetPosition());
					var angularOffset:Number = bodyAtMouse.GetAngle() - bodyA.GetAngle();
					motorJoint.SetLinearOffset(linearOffset);
					motorJoint.SetAngularOffset(angularOffset);
				}
			}
		}
	}
}