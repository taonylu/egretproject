package b2PolygonShapeDemo
{
	import flash.events.KeyboardEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import Whatisb2PolygonShape;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSetAsVector extends AbstractPolygonShapeDemo
	{
		public function DemoSetAsVector(gravity:Number=10)
		{
			super(gravity);
			editText("SetAsVector",
				"SetAsVector(\n \t vertices:Vector, \n \t vertexCount:Number = 0 \n ):void",
				"根据vertices数组保存的顶点绘制多边形");
		}
		
		private var b1:b2Body;
		private var s1:b2PolygonShape;
		private var vertex:b2Vec2;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createRegular(250,200,50,6);
			s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			box2DWorld.DestroyBody(b1);
			b1 = LDEasyBody.createRegular(250,200,50,6);
			s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
			s1.Set(b2PolygonShape.AsVector(Whatisb2PolygonShape.verties.reverse(),6));
			b1.ResetMassData();
			b1.SetAwake(true);
		}
	}
}