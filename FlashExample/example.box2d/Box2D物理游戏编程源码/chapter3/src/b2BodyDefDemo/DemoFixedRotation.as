package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoFixedRotation extends AbstractDemo
	{
		public function DemoFixedRotation(gravity:Number=10)
		{
			super(gravity);
			editText("FixedRotation",
				"读：IsFixedRotation():Boolean \n写：SetFixedRotation(fixed:Boolean):void",
				"FixedRotation=true时，刚体的角度将保持不变");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var flag:Boolean = false;
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,100,80,80);
			b2 = LDEasyBody.createRegular(230,300,40,3,Math.PI/6);
			editValueText(b1.IsFixedRotation().toString());
		}
		private function resetBodies():void
		{
			box2DWorld.DestroyBody(b1);
			box2DWorld.DestroyBody(b2);
			b1 = LDEasyBody.createBox(250,100,80,80);
			b2 = LDEasyBody.createRegular(230,300,40,3,Math.PI/6);
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				flag=!flag;
				b1.SetFixedRotation(flag);
				editValueText(b1.IsFixedRotation().toString());
			}
		}
	}
}