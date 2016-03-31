package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	public class DemoBullet extends AbstractDemo
	{
		public function DemoBullet(gravity:Number=10)
		{
			super(0);
			editText("Bullet",
				"读：IsBullet():Boolean \n写：SetBullet(flag:Boolean):void",
				"Bullet=true时，Box2D对该刚体进行连续碰撞检测，左边的刚体将无法穿透中间的障碍");
		}
		
		private var b1:b2Body, b2:b2Body;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(50,200,10,10);
			b1.SetLinearVelocity(b2Vec2.Make(150*30,0));
			b1.SetBullet(false);
			editValueText(b1.IsBullet().toString());
			b2 = LDEasyBody.createBox(250,200,4,300);
			LDEasyWorld.fixBodyAt(b2,250,0);
			LDEasyWorld.fixBodyAt(b2,250,400);
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(50/30,200/30));
			b1.SetAwake(true);
			b1.SetLinearVelocity(b2Vec2.Make(15*30,0));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				b1.SetBullet(!b1.IsBullet());
				editValueText(b1.IsBullet().toString());
			}
		}
	}
}