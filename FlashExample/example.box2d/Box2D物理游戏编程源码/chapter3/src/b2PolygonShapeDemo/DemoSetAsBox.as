package b2PolygonShapeDemo
{
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSetAsBox extends AbstractPolygonShapeDemo
	{
		public function DemoSetAsBox(gravity:Number=10)
		{
			super(gravity);
			editText("SetAsBox",
				"SetAsBox(\n \t hx:Number, \n \t hy:Number \n):void",
				"返回离d最近的顶点坐标");
		}
		
		private var b1:b2Body;
		private var s1:b2PolygonShape;
		private var vertex:b2Vec2;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250, 200, 50,50);			
			LDEasyBody.createBox(250,20,30,30);
		}
	}
}