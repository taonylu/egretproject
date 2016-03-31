package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.geom.Point;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2WheelJoint;
	import Box2D.Dynamics.Joints.b2WheelJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	[SWF(width="700")]
	public class DemoWheelJoint extends AbstractBox2DTest
	{
		public function DemoWheelJoint(gravity:Number=10)
		{
			super(10);
		}
		private  const MOTOR_SPEED:Number = 50;
		
		private var car:b2Body;
		private var startX:Number = 250, startY:Number = 230;
		private var frontMotor:b2WheelJoint, backMotor:b2WheelJoint;
		private var tiltTorque:Number = 0;
		override public function box2DAppReady():void
		{
			createGround();
			createCar(startX,startY);
		}
		
		private function createCar(posX:Number,posY:Number):void
		{
			var frontWheel:b2Body = LDEasyBody.createCircle(posX+30,250,15);
			var backWheel:b2Body = LDEasyBody.createCircle(posX-30,250,15);
			backWheel.GetFixtureList().SetFriction(1);
			var chassis:b2Body = createChassis(posX,posY);
			
			var axis:b2Vec2 = new b2Vec2(0,1);
			var anchor:b2Vec2 = frontWheel.GetPosition();
			
			var jointDef:b2WheelJointDef = new b2WheelJointDef();
			jointDef.Initialize(chassis,frontWheel,anchor,axis);
			jointDef.frequencyHz = 3;
			jointDef.dampingRatio =0.1;
			frontMotor = world.CreateJoint(jointDef) as b2WheelJoint;
			
			anchor = backWheel.GetPosition();
			jointDef.Initialize(chassis,backWheel,anchor,axis);
			jointDef.enableMotor = false;
			jointDef.maxMotorTorque =20;
			jointDef.motorSpeed = 0;
			backMotor = world.CreateJoint(jointDef) as b2WheelJoint;
		}
		private function createChassis(posX:Number,posY:Number):b2Body
		{
			var chassisShape:b2PolygonShape = new b2PolygonShape();
			var vertices:Vector.<b2Vec2> = new Vector.<b2Vec2>();
			vertices[0] = new b2Vec2(-1.5, -0.2);
			vertices[1] = new b2Vec2(-1.15, -0.9);
			vertices[2] = new b2Vec2(0.0, -0.9);
			vertices[3] = new b2Vec2(1.5, 0.0);
			vertices[4] = new b2Vec2(1.5, 0.5);
			vertices[5] = new b2Vec2(-1.5, 0.5);
			chassisShape.SetAsVector(vertices, 6);
			
			car = LDEasyBody.createBodyFromShape(posX,posY,chassisShape);
			return car;
		}
		
		private function createGround():void
		{
			var gapX:Number = 800, gapY:Number = 400;
			var posX:Number = 500, posY:Number = 300;
			var worldWidth:Number = 5000;
			
			var groundPoints:Vector.<Point> = new Vector.<Point>();
			groundPoints.push(new Point(50,100));
			groundPoints.push(new Point(50,300));
			groundPoints.push(new Point(500,300));
			
			while(posX<worldWidth){
				posX += Math.random()*gapX + 100;
				posY += Math.random()*gapY- gapY/2;
				groundPoints.push(new Point(posX,posY));
			}
			posX += 500;
			groundPoints.push(new Point(posX,posY));
			posY -=300;
			groundPoints.push(new Point(posX,posY));
			LDEasyBody.createChain(groundPoints);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			moveCamera();
			car.ApplyTorque(tiltTorque);
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(Math.abs(backMotor.GetJointSpeed())>MOTOR_SPEED){
				backMotor.EnableMotor(false);
				return;
			}
			if(event.type == KeyboardEvent.KEY_DOWN){
				switch(event.keyCode){
					case Keyboard.LEFT:{
						backMotor.EnableMotor(true);
						backMotor.SetMotorSpeed(-MOTOR_SPEED);
						break;
					}
					case Keyboard.RIGHT:{
						backMotor.EnableMotor(true);
						backMotor.SetMotorSpeed(MOTOR_SPEED);
						break;
					}
					case Keyboard.DOWN:{
						backMotor.EnableMotor(true);
						backMotor.SetMaxMotorTorque(50);
						backMotor.SetMotorSpeed(0);
						break;
					}
					case Keyboard.Z:{
						tiltTorque = -200;
						break;
					}
					case Keyboard.X:{
						tiltTorque = 200;
						break;
					}
				}
			}
			if(event.type == KeyboardEvent.KEY_UP) {
				backMotor.SetMaxMotorTorque(20);
				switch(event.keyCode) {
					case Keyboard.DOWN:
					case Keyboard.LEFT:
					case Keyboard.RIGHT:
						backMotor.EnableMotor(false);
						break;
					case Keyboard.X:
					case Keyboard.Z:
						tiltTorque = 0;
						break;
				}
			}
		}
		private function moveCamera():void
		{
			this.x = startX - car.GetPosition().x*30;
			this.y = startY - car.GetPosition().y*30;
		}
		
	}
}