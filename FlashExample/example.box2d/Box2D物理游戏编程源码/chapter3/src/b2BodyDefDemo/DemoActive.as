package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;

	public class DemoActive extends AbstractDemo
	{
		public function DemoActive(gravity:Number=10)
		{
			super(gravity);
			editText("Active",
				"读：IsActive():Boolean \n写：SetActive(flag:Boolean):void",
				"下面的矩形是演示刚体，Active=false时，刚体将不参与任何的物理模拟");
		}
		
		private var b1:b2Body, b2:b2Body;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,300,80,80);
			b1.SetActive(false);
			b1.SetAngularVelocity(1);
			LDEasyWorld.fixBodyAt(b1,250,300);
			Whatisb2BodyDef.valueTxt.text= b1.IsActive().toString();
			b2 = LDEasyBody.createBox(250,100,40,40);
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(250/30,300/30));
			b2.SetPosition(b2Vec2.Make(250/30,100/30));
			b2.SetAwake(true)
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				b1.SetActive(!b1.IsActive());
				resetBodies();
				editValueText(b1.IsActive().toString());
			}
		}
	}
}