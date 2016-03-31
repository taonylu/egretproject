package b2CircleShapeDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoRadius extends AbstractCircleShapeDemo
	{
		public function DemoRadius(gravity:Number=10)
		{
			super(gravity);
			editText("Radius",
				"读：GetRadius():Number \n写：SetRadius(radius:Number):void",
				"调整圆形的半径大小");
		}
		
		private var b1:b2Body;
		private var s1:b2CircleShape;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createCircle( 250, 100, 30);
			s1 = b1.GetFixtureList().GetShape() as b2CircleShape;
			editValueText((Math.round(s1.GetRadius()*10)/10).toString());
		}
		private function resetBodies():void
		{
			b1.SetAwake(true);
			s1.SetRadius((Math.random()*30+30)/30);
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				
				editValueText((Math.round(s1.GetRadius()*10)/10).toString());
				
			}
		}
	}
}