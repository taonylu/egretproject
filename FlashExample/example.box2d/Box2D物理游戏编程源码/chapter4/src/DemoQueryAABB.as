package 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.b2AABB;
	import Box2D.Collision.Shapes.b2Shape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoQueryAABB extends AbstractBox2DTest
	{
		public function DemoQueryAABB(gravity:Number=10)
		{
			super(gravity);
		}
		private var red:b2Color = new b2Color(1,0,0);

		private var mousePoint:b2Vec2;
		private var ab:b2AABB = new b2AABB();
		
		private const abSize:Number = 1/30;
		private const p2m:Number = 30;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			mousePoint = new b2Vec2();
			createBodies();
		}
		private function createBodies():void
		{
			
			LDEasyBody.createBox(205,335,30,30);
			LDEasyBody.createBox(295,335,30,30);
			LDEasyBody.createBox(250,305,120,30);
			LDEasyBody.createBox(235,245,90,30);
			
			var b:b2Body;
			b = LDEasyBody.createBox(250,275,60,30);
			b.SetUserData("unRemovable");
			b = LDEasyBody.createBox(250,200,120,60);
			b.SetUserData("unRemovable");
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);

			drawAABB(red);
		}
		private function callBack(f:b2Fixture):Boolean
		{
			var body:b2Body = f.GetBody();
			var shape:b2Shape = f.GetShape();
			
			if( shape.TestPoint(body.GetTransform(),mousePoint)) {
				if(body.GetUserData()!="unRemovable"){
					world.DestroyBody(body);
					return false;
				}
			}
			return true;
		}

		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if(event.type == MouseEvent.MOUSE_DOWN){
				
				mousePoint.Set(mouseX/p2m, mouseY/p2m);
				ab.lowerBound.Set(mousePoint.x - abSize, mousePoint.y - abSize);
				ab.upperBound.Set(mousePoint.x + abSize, mousePoint.y + abSize);
				world.QueryAABB(callBack,ab);
			}
		}
		private function drawAABB(color):void
		{
			var p1:b2Vec2,p2:b2Vec2;
			p1 = ab.lowerBound.Copy();
			p2 = p1.Copy();
			p2.Set(ab.upperBound.x,ab.lowerBound.y);
			debug.DrawSegment(p1,p2,color);//top
			p1 = ab.upperBound.Copy();
			debug.DrawSegment(p1,p2,color);//right
			p2.Set(ab.lowerBound.x,ab.upperBound.y);
			debug.DrawSegment(p1,p2,color);//bottom
			p1 = ab.lowerBound.Copy();
			debug.DrawSegment(p1,p2,color);//left
		}
	}
}