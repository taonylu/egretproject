package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoRaycast extends AbstractBox2DTest
	{
		public function DemoRaycast(gravity:Number=10)
		{
			super(gravity);
		}
		public const USER_DATA_PLAYER:String = "player";
		public const USER_DATA_GROUND:String = "ground";
		public const USER_DATA_PLATFORM:String = "platform";
		
		private var player:b2Body;
		private var point1:b2Vec2,point2:b2Vec2;
		private var rayLength:Number = 500/30;
		private var rayAngle:Number = Math.PI/2;
		private const ANGLE_MAX:Number = Math.PI*8/9;
		private const ANGLE_MIN:Number = Math.PI/9;
		private var angle_speed:Number = Math.PI/200;
		
		private var closestPoint:b2Vec2;
		private var closestBody:b2Body;
		
		private var red:b2Color = new b2Color(1,0,0);
		private var ballMover:BallMover;
		private var contactListener:DemoRayCastContactListener;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBody();
			
			point1 = new b2Vec2(250/30, 100/30);
			point2 = new b2Vec2();
			
			ballMover = new BallMover(player);
			contactListener = new DemoRayCastContactListener(this);
			world.SetContactListener(contactListener);
		}
		private function createBody():void
		{
			LDEasyBody.createBox(250,350,550,100,0).SetUserData(USER_DATA_GROUND);
			LDEasyBody.createBox(250,50,300,100,0);
			LDEasyBody.createBox(250,270,300,100,0).SetUserData(USER_DATA_GROUND);
			
			player = LDEasyBody.createCircle(50,250,15);
			player.GetFixtureList().SetFriction(10);
			player.SetAngularDamping(1);
			player.GetFixtureList().SetRestitution(0);
			player.SetUserData(USER_DATA_PLAYER);
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			moveRay();
			world.RayCast(rayCallback,point1, point2);
			debug.DrawSegment(point1,closestPoint,red);
			
			if (closestBody!=null && closestBody.GetUserData()== USER_DATA_PLAYER) 
			{
				debug.DrawCircle(closestBody.GetPosition(),15/30,red);
			}
			
			ballMover.isReadyToJump = contactListener.isPlayerOnGround;
			ballMover.update();
		}
		private function moveRay():void
		{
			if (rayAngle < ANGLE_MIN ) 
			{
				angle_speed *=-1;
				rayAngle = ANGLE_MIN
			}else if(rayAngle > ANGLE_MAX){
				angle_speed *=-1;
				rayAngle = ANGLE_MAX;
			}
			rayAngle+=angle_speed;
			
			point2.x = point1.x + rayLength*Math.cos(rayAngle);
			point2.y = point1.y + rayLength*Math.sin(rayAngle);
		}
		private function rayCallback(fixture:b2Fixture,point:b2Vec2,normal:b2Vec2,fraction:Number):Number
		{
			closestPoint = point.Copy();
			closestBody = fixture.GetBody();
			return fraction;
		}
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN){
				ballMover.onKeyDown(event);
			}
			if(event.type == KeyboardEvent.KEY_UP){
				ballMover.onKeyUp(event);
			}
		}
	}
}