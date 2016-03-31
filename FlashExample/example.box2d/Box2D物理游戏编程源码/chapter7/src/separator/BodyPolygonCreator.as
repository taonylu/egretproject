package separator
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2FixtureDef;
	import Box2D.Dynamics.b2World;
	import Box2D.plus.b2Separator;
	
	public class BodyPolygonCreator extends BodyCreator
	{
		private var points:Vector.<Point>
		private var isLoopEnd:Boolean = false;
		public function BodyPolygonCreator(canvas:Sprite, limitRectangle:Rectangle, world:b2World)
		{
			super(canvas, limitRectangle, world);
			points = new Vector.<Point>();
		}
		
		override protected function createBody():void
		{
			isLoopEnd = false;
			
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
			if(isLoopEnd){
				createBody();
				canvas.graphics.clear();
			}else if(limitRectangle.containsPoint(mousePoint)){
				points.push(mousePoint.clone());
			}
		}
		
		override protected function mouseMoveHandler(me:MouseEvent):void
		{
			if(points.length<1) return;
			canvas.graphics.clear();
			canvas.graphics.lineStyle(1,0);
			canvas.graphics.moveTo(points[0].x,points[0].y);
			for (var i:int = 1; i < points.length; i++) 
			{
				canvas.graphics.lineTo(points[i].x,points[i].y);
			}
			if(checkForEnd()){
				isLoopEnd = true;
				canvas.graphics.lineTo(points[0].x,points[0].y);
			}else{
				isLoopEnd = false;
				canvas.graphics.lineTo(mousePoint.x,mousePoint.y);
			}
			
		}
		private function checkForEnd():Boolean
		{
			if(points.length<3) return false;
			var distance:Number = Point.distance(points[0],mousePoint);
			return distance<10;
		}
	}
}