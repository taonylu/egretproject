package
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	[SWF(width="700")]
	public class DemoRevoluteJointCar extends AbstractBox2DTest
	{
		public function DemoRevoluteJointCar(gravity:Number=10)
		{
			super(10);
		}
		private var keyDownList:Array = [];
		private var motor:b2RevoluteJoint;
		private  const MOTOR_SPEED:Number = Math.PI/10*30;
		
		override public function box2DAppReady():void
		{
			createBodies();
			createCar();
		}
		
		private function createCar():void
		{
			var carBody:b2Body = LDEasyBody.createBox(100,200,30,30);
			var shape:b2PolygonShape = LDEasyShape.createBox(30,30,-30,0);
			carBody.CreateFixture2(shape);
			shape = LDEasyShape.createBox(30,30,30,0);
			carBody.CreateFixture2(shape);
			var circleA:b2Body = LDEasyBody.createCircle(70,230,15);
			circleA.GetFixtureList().SetFriction(10);
			var circleB:b2Body = LDEasyBody.createCircle(130,230,15);
			
			var anchor:b2Vec2 = circleA.GetPosition();
			var jointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			jointDef.Initialize(carBody,circleA,anchor);
			jointDef.enableMotor = false;
			jointDef.maxMotorTorque = 50;
			jointDef.motorSpeed = 0;
			var joint1:b2RevoluteJoint = world.CreateJoint(jointDef) as b2RevoluteJoint;
			
			anchor = circleB.GetPosition();
			jointDef.Initialize(carBody,circleB,anchor);
			jointDef.enableMotor = false;
			var joint2:b2RevoluteJoint = world.CreateJoint(jointDef) as b2RevoluteJoint;
			motor = joint1;
		}
		
		private function createBodies():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createBox(350,350,stage.stageWidth,100,0);
			LDEasyBody.createCircle(350,550,300,0);
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN){
				if(event.keyCode == Keyboard.LEFT){
					motor.EnableMotor(true);
					motor.SetMotorSpeed(-MOTOR_SPEED);
				}else if(event.keyCode == Keyboard.RIGHT){
					motor.EnableMotor(true);
					motor.SetMotorSpeed(MOTOR_SPEED);
				}else if(event.keyCode == Keyboard.DOWN){
					motor.EnableMotor(true);
					motor.SetMotorSpeed(0);
				}
			}
			if(event.type == KeyboardEvent.KEY_UP) {
				motor.EnableMotor(false);
			}
		}
	}
}