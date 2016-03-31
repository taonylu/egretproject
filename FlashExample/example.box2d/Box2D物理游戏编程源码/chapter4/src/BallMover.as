package
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;

	public class BallMover
	{
		public var isReadyToJump:Boolean = false;
		public var isReadyToMove:Boolean = false;
		
		private const TORQUE_PLAYER:Number = 40;
		private const ASPEED_LIMIT_PLAYER:Number = 15/180*Math.PI*30;
		private const VSPEED_LIMIT_PLAYER:Number = 10;

		private var player:b2Body;
		private var playerTorque:Number;
		private var keyDown:Array 
		private var impulse:b2Vec2;
		
		public function BallMover(ball:b2Body)
		{
			player = ball;
			keyDown = new Array();
			impulse = new b2Vec2();
		}
		public function onKeyDown(event:KeyboardEvent):void
		{
			keyDown[event.keyCode] = true;
		}
		public function onKeyUp(event:KeyboardEvent):void
		{
			keyDown[event.keyCode] = false;
		}
		public function update():void
		{
			playerTorque = 0;
			if(keyDown[Keyboard.LEFT]) playerTorque = -TORQUE_PLAYER;
			if(keyDown[Keyboard.RIGHT]) playerTorque = TORQUE_PLAYER;
			if(keyDown[Keyboard.UP]) {
				if (isReadyToJump) {
					impulse.y = -player.GetMass()*8;
					player.ApplyImpulse(impulse,player.GetPosition());
					player.GetPosition().y+=player.GetLinearVelocity().y;
					isReadyToJump = false;
				}
			}
			player.ApplyTorque(playerTorque);
			limitAngularVelocity(player,ASPEED_LIMIT_PLAYER);
			
			if(keyDown[Keyboard.LEFT]||keyDown[Keyboard.RIGHT]){
				var linearVelocity:b2Vec2 = player.GetLinearVelocity();
				linearVelocity.x = player.GetAngularVelocity() * 20/30;
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
	}
}