package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoAwake extends AbstractDemo
	{
		public function DemoAwake(gravity:Number=10)
		{
			super(gravity);
			editText("Awake",
				"读：IsAwake():Boolean \n写：SetAwake(flag:Boolean):void",
				"下面的矩形为演示刚体");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var flag:Boolean = false;
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,200,80,80);
			b1.SetAwake(flag);
			editValueText(b1.IsAwake().toString());
			b2 = LDEasyBody.createBox(250,100,80,80);
		}
		private function resetBodies():void
		{
			box2DWorld.DestroyBody(b1);
			box2DWorld.DestroyBody(b2);
			b1=null;
			b2=null;
			b1 = LDEasyBody.createBox(250,200,80,80);
			b1.SetAwake(flag);
			editValueText(b1.IsAwake().toString());
			b2 = LDEasyBody.createBox(250,100,80,80);
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				flag=!flag;
				resetBodies();
			}
		}
	}
}