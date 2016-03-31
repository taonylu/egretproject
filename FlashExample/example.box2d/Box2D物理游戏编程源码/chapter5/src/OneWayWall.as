package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class OneWayWall extends AbstractBox2DTest
	{
		public function OneWayWall(gravity:Number=10)
		{
			super(gravity);
		}
		public const USER_DATA_GROUND:String = "ground";
		public const USER_DATA_PLATFORM:String = "platform";
		public const USER_DATA_PLAYER:String = "player";
		
		public var player:b2Body, ground:b2Body, platform:b2Body;
		private var ballMover:BallMover;
		
		private var contactListener:OneWayWallContactListener;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			ground = LDEasyBody.createBox(250,350,550,80,0);
			ground.SetUserData(USER_DATA_GROUND);
			
			player = LDEasyBody.createCircle(50,50,20);
			player.SetUserData(USER_DATA_PLAYER);
			player.SetSleepingAllowed(false);
			
			platform = LDEasyBody.createPlatform(150,245,100,10);
			platform.SetUserData(USER_DATA_PLATFORM);
			platform = LDEasyBody.createPlatform(250,165,100,10,0);
			platform.SetUserData(USER_DATA_PLATFORM);
			platform = LDEasyBody.createPlatform(350,165,100,10);
			platform.SetUserData(USER_DATA_PLATFORM);
			platform = LDEasyBody.createPlatform(240,210,100,10);
			platform.SetUserData(USER_DATA_PLATFORM);
			platform.SetAngle(-Math.PI/4);
			
			ballMover = new BallMover(player);
			
			contactListener = new OneWayWallContactListener(this);
			world.SetContactListener(contactListener);
		}
		override protected function update(event:Event):void
		{
			ballMover.isReadyToJump = contactListener.isPlayerOnGround
			ballMover.update();
			
			super.update(event);
			world.ClearForces();
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