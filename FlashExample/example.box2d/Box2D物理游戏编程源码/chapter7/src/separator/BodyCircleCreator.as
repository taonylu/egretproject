package separator
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	import Box2D.Dynamics.b2World;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class BodyCircleCreator extends BodyCreator
	{
		private var bodyPosition:Point;
		private var radius:Number, radiusOK:Number
		private var circleAB:Rectangle;
		private var isCreatable:Boolean=false;
		private var isDrawing:Boolean = false;
		
		public function BodyCircleCreator(canvas:Sprite, limitRectangle:Rectangle,world:b2World)
		{
			super(canvas, limitRectangle, world);
			circleAB = new Rectangle();
		}
		
		override protected function createBody():void
		{
			bodyPosition.y = -bodyPosition.y;
			LDEasyBody.createCircle(bodyPosition.x,bodyPosition.y,radiusOK);
		}
		
		override protected function mouseDownHandler(me:MouseEvent):void
		{
			isDrawing = true;
			bodyPosition = mousePoint.clone();
		}
		override protected function mouseUpHandler(me:MouseEvent):void
		{
			canvas.graphics.clear();
			if(isCreatable) createBody();
			isCreatable = false;
			isDrawing = false;
		}
		override protected function mouseMoveHandler(me:MouseEvent):void
		{
			if(!isDrawing) return;
			radius = Point.distance(bodyPosition,mousePoint);
			circleAB.setTo(bodyPosition.x- radius,bodyPosition.y-radius,radius*2,radius*2);
			if(!checkShape()) return;
			isCreatable = true;
			radiusOK = radius;
			canvas.graphics.clear();
			canvas.graphics.lineStyle(1,0);
			canvas.graphics.drawCircle(bodyPosition.x,bodyPosition.y,radiusOK);
		}
		
		private function checkShape():Boolean
		{
			if(!limitRectangle.containsPoint(bodyPosition)) return false;
			if(!limitRectangle.containsRect(circleAB)) return false;
			return true;
		}
		
	}
}