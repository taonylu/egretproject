package b2PolygonShapeDemo
{
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoGetSupportVertex extends AbstractPolygonShapeDemo
	{
		public function DemoGetSupportVertex(gravity:Number=10)
		{
			super(0);
			editText("GetSupportVertex",
				"结构：GetSupportVertex(d:b2Vec2):b2Vec2",
				"返回离点d最近的顶点坐标");
		}
		
		private var b1:b2Body;
		private var s1:b2PolygonShape;
		private var vertex:b2Vec2;
		private var mouseVec2:b2Vec2;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250, 200, 50,50);
			s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
			mouseVec2 = new b2Vec2();
		}
		override public function update():void
		{
			super.update();
			if(vertex!=null) debug.DrawCircle(b1.GetWorldPoint(vertex),5/30,new b2Color(1,0,0));
		}

		override public function mouseEventHandler(event:MouseEvent):void
		{
			super.mouseEventHandler(event);
			mouseVec2.Set(event.stageX/30,event.stageY/30);
			vertex = s1.GetSupportVertex(b1.GetLocalPoint(mouseVec2));

		}
	}
}