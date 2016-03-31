package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	import Box2D.Dynamics.b2Body;
	import ldEasyBox2D.LDEasyBody;

	public class DemoApplyTorque extends AbstractBox2DTest
	{
		public function DemoApplyTorque(gravity:Number=10)
		{
			super(gravity);
		}
		public var boss:b2Body,  ground:b2Body;
		private const TORQUE_BOSS:Number = 80;
		private const ASPEED_LIMIT_BOSS:Number = 5 *Math.PI*30/180;
		private var bossTorque:Number = 0;
		
		private var keyDown:Array = new Array();
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			ground = LDEasyBody.createBox(250,350,550,100,0);
			ground.GetFixtureList().SetFriction(1);
			
			boss = LDEasyBody.createBox(450,150,50,50);
		}
		override protected function update(event:Event):void
		{
			bossTorque = 0;
			if(keyDown[Keyboard.LEFT]) bossTorque = -TORQUE_BOSS;
			if(keyDown[Keyboard.RIGHT]) bossTorque = TORQUE_BOSS;
			
			boss.ApplyTorque(bossTorque);
			limitAngularVelocity(boss,ASPEED_LIMIT_BOSS);

			super.update(event);
			world.ClearForces();
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