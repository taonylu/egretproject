package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Transform;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class DemoQueryShape extends AbstractBox2DTest
	{
		public function DemoQueryShape(gravity:Number=10)
		{
			super(gravity);
		}
		private var red:b2Color = new b2Color(1,0,0);
		private var blue:b2Color = new b2Color(0,0,1);
		// for drag body
		private var mousePoint:b2Vec2 = new b2Vec2();
		private var bodyAtMouse:b2Body;
		private var shapeAtMouse:b2PolygonShape;
		
		private var shapeDetect:b2PolygonShape;
		private var shapeTransform:b2Transform;
		private var offsetPosition:b2Vec2;
		
		private var isOverlap:Boolean = false;
		private const p2m:Number = 30;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBodies();
		}
		/*create lots of body randomly
		*/
		private function createBodies():void
		{
			LDEasyBody.createBox(131,272,100,10,0);
			LDEasyBody.createBox(408,185,100,10,0).SetAngle(-Math.PI/6);
			LDEasyBody.createBox(315,240,100,10,0).SetAngle(-Math.PI/6);
			LDEasyBody.createBox(224,314,70,100,0);
			LDEasyBody.createBox(41,324,60,80,0);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			mousePoint.Set(mouseX/p2m, mouseY/p2m);
			isOverlap=false;
			
			if (bodyAtMouse!=null) 
			{
				bodyAtMouse.SetAwake(true);
				shapeDetect = drawDetectShape();
				world.QueryShape(shapeCallBack,shapeDetect);
				if (!isOverlap) 
				{
					bodyAtMouse.SetPosition(b2Math.SubtractVV(mousePoint,offsetPosition));
				}
			}
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:
				{
					world.QueryPoint(pointCallBack,mousePoint);
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					bodyAtMouse=null;
					shapeAtMouse=null;
					break;
				}
			}
		}
		private function shapeCallBack(f:b2Fixture):Boolean
		{
			if (f.GetBody()!=bodyAtMouse) 
			{
				isOverlap=true;
				return false;
			}
			return true;
		}
		private function pointCallBack(f:b2Fixture):Boolean
		{
			bodyAtMouse = f.GetBody();
			shapeAtMouse = f.GetShape() as b2PolygonShape;
			shapeTransform = bodyAtMouse.GetTransform();
			offsetPosition = b2Math.SubtractVV(mousePoint,bodyAtMouse.GetPosition());
			return false;
		}
		public function drawDetectShape():b2PolygonShape
		{
			var verticesVector:Vector.<b2Vec2> = shapeAtMouse.GetVertices();
			var verticesArray:Array = [];
			var tempVertex:b2Vec2;
			for each (var e:b2Vec2 in verticesVector) 
			{
				tempVertex = b2Math.MulMV(shapeTransform.R,e);
				tempVertex.Add(mousePoint);
				tempVertex.Subtract(offsetPosition);
				
				verticesArray.push(tempVertex);
			}
			debug.DrawPolygon(verticesArray, verticesArray.length,red);
			
			return b2PolygonShape.AsArray(verticesArray,0);
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				var ball:b2Body = LDEasyBody.createCircle(420,50,20);
				ball.GetFixtureList().SetRestitution(0.5);
			}
		}
	}
}