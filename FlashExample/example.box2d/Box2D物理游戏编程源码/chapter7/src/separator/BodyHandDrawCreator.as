package separator
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2FixtureDef;
	import Box2D.Dynamics.b2World;
	import Box2D.plus.b2Separator;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class BodyHandDrawCreator extends BodyCreator
	{
		private var points:Vector.<Point>
		private var isDrawing:Boolean;
		public function BodyHandDrawCreator(canvas:Sprite, limitRectangle:Rectangle, world:b2World)
		{
			super(canvas, limitRectangle, world);
			points = new Vector.<Point>();
		}
		
		override protected function createBody():void
		{
			if(points.length<3) return;
			
			var vertices:Vector.<b2Vec2>= new Vector.<b2Vec2>();
			for (var i:int = points.length-1; i>=0; i--) 
			{
				var p:Point = points.pop();
				var vertex:b2Vec2 = new b2Vec2(p.x/30,-p.y/30);
				vertices.push(vertex);
			}
			
			var fixtureDef:b2FixtureDef = new b2FixtureDef();
			fixtureDef.density = 1;
			fixtureDef.friction = 0.5;
			var bodyDef:b2BodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;
			var body:b2Body= world.CreateBody(bodyDef);
			
			var separateFactory:b2Separator = new b2Separator();
			var result:int = separateFactory.Validate(vertices);
			if (result == 2) {
				vertices.reverse();
			}else if (result != 0) {
				return;
			}
			separateFactory.Separate(body, fixtureDef, vertices);
		}
		
		override protected function mouseDownHandler(me:MouseEvent):void
		{
			isDrawing = true;
			points.push(mousePoint.clone());
			canvas.graphics.clear();
			canvas.graphics.lineStyle(1,0);
			canvas.graphics.moveTo(mousePoint.x,mousePoint.y);
		}
		
		override protected function mouseUpHandler(me:MouseEvent):void
		{
			isDrawing = false;
			createBody();
			canvas.graphics.clear();
		}
		
		override protected function mouseMoveHandler(me:MouseEvent):void
		{
			if(!isDrawing) return;
			mousePoint.x = b2Math.Clamp(mousePoint.x, 0, limitRectangle.width);
			mousePoint.y = b2Math.Clamp(mousePoint.y, 0, limitRectangle.height);
			canvas.graphics.lineTo(mousePoint.x,mousePoint.y);
			if(checkPoint(mousePoint)){
				points.push(mousePoint.clone());
			}
		}
		private function checkPoint(p:Point):Boolean
		{
			var distance:Number = Point.distance(points[points.length-1],p);
			return distance>20;
		}
	}
}