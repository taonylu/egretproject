package b2PolygonShapeDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSetAsEdge extends AbstractPolygonShapeDemo
	{
		public function DemoSetAsEdge(gravity:Number=10)
		{
			super(gravity);
			editText("SetAsEdge",
				"SetAsEdge( \n \t v1:b2Vec2, \n \t v2:b2Vec2 \n):void",
				"按下空格键随机创建刚体");
		}
		
		private var b1:b2Body;
		private var s1:b2PolygonShape;
		private var vertex:b2Vec2;
		
		override public function onBox2DWorldReady():void
		{
//			b1 = LDEasyBody.createEdge(50,100,450,300);
			s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
			b1.ResetMassData();
			b1.SetBullet(true);
			
			LDEasyBody.createBox(250,20,30,30);
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				var posx:Number;
				if(b1.GetAngle()>0){
					posx = Math.random()*200+50;
				}else{
					posx = Math.random()*200+250;
				}
				var posy:Number = 120;
				var w:Number = Math.random()*20+10;
				var h:Number = Math.random()*20+10;
				var b:b2Body = LDEasyBody.createBox(posx,posy,w,h);
			}
		}
	}
}