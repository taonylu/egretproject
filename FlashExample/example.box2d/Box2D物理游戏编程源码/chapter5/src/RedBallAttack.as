package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class RedBallAttack extends AbstractBox2DTest
	{
		public function RedBallAttack(gravity:Number=10)
		{
			super(gravity);
		}
		public var boss:b2Body, player:b2Body, ground:b2Body;
		private const TORQUE_PLAYER:Number = 40;
		private const TORQUE_BOSS:Number = 80;
		private const ASPEED_LIMIT_PLAYER:Number = 15/180*Math.PI*30;
		private const ASPEED_LIMIT_BOSS:Number = 5/180*Math.PI*30;
		private const VSPEED_LIMIT_PLAYER:Number = 10;

		
		private var bossTorque:Number = 0;
		private var playerTorque:Number = 0;
		
		private var keyDown:Array = new Array();
		private var contactListener:RedBallAttackContactListener;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			ground = LDEasyBody.createBox(250,350,550,100,0);
			ground.GetFixtureList().SetFriction(Number.MAX_VALUE);
			ground.GetFixtureList().SetRestitution(0);
			
			boss = LDEasyBody.createBox(450,150,50,50);
			
			player = LDEasyBody.createCircle(50,50,20);
			player.SetSleepingAllowed(false);
			
			contactListener = new RedBallAttackContactListener(this);
			world.SetContactListener(contactListener);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			handleContactResult();
			
			boss.ApplyTorque(bossTorque);
			limitAngularVelocity(boss,ASPEED_LIMIT_BOSS);

			player.ApplyTorque(playerTorque);
			player.SetAngularDamping(0.3);
			limitAngularVelocity(player,ASPEED_LIMIT_PLAYER);
			
			var linearVelocity:b2Vec2 = player.GetLinearVelocity();
			var angularVelocity:Number = player.GetAngularVelocity();
			linearVelocity.x = angularVelocity * 20/30;
			
			updateForces();
		}
		
		private function updateForces():void
		{
			var bossPositionX:Number = boss.GetPosition().x*30;
			if(bossPositionX<100){
				bossTorque = TORQUE_BOSS;
			}else if(bossPositionX>400){
				bossTorque = -TORQUE_BOSS;
			}
			
			playerTorque = 0;
			if(keyDown[Keyboard.LEFT]) playerTorque = -TORQUE_PLAYER;
			if(keyDown[Keyboard.RIGHT]) playerTorque = TORQUE_PLAYER;
			if(keyDown[Keyboard.UP]){
				if(contactListener.isPlayerOnGround){
					var impulse:b2Vec2 = new b2Vec2();
					impulse.y = -player.GetMass()*8;
					player.ApplyImpulse(impulse,player.GetPosition());
					contactListener.isPlayerOnGround = false;
				}
			}
		}
		
		private function handleContactResult():void
		{
			if (contactListener.isPlayerTouchBoss) 
			{
				debug.DrawCircle(contactListener.contactPoint,5/30,LDEasyDebug.red);
				
				if (contactListener.isPlayerAttackBoss) 
				{
					var bounceImpulse:b2Vec2 = new b2Vec2();
					bounceImpulse.y = -player.GetMass()*6;
					player.ApplyImpulse(bounceImpulse,player.GetPosition());
					
					world.DestroyBody(boss);
					boss = LDEasyBody.createBox(450,150,50,50);
					contactListener.isPlayerAttackBoss = false;
				}else{
					world.DestroyBody(player);
					player = LDEasyBody.createCircle(50,50,20);
					player.GetFixtureList().SetRestitution(0);
					player.SetSleepingAllowed(false);
				}
				contactListener.isPlayerTouchBoss=false;
			}
		}
		private function limitAngularVelocity(body:b2Body, speedMax:Number):void
		{
			var av:Number = body.GetAngularVelocity();
			if(Math.abs(av) > speedMax){
				av = Math.abs(av)/av * speedMax;
				body.SetAngularVelocity(av);
			}
		}
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN){
				keyDown[event.keyCode]=true;
			}
			if(event.type == KeyboardEvent.KEY_UP){
				keyDown[event.keyCode]=false;
			}
		}
	}
}
class ScorBoard{
	public function ScoreBoard():void{}
}