package separator
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	import Box2D.Dynamics.b2World;

	public class BodyCreator
	{
		protected var canvas:Sprite;
		protected var world:b2World;
		protected var mousePoint:Point;
		protected var limitRectangle:Rectangle;
		
		public function BodyCreator(canvas:Sprite,limitRectangle:Rectangle, world:b2World)
		{
			this.canvas = canvas;
			this.world = world;
			this.limitRectangle = limitRectangle;
			canvas.graphics.clear();
			mousePoint = new Point();
		}
		public function handleMouseEvent(me:MouseEvent):void{
			mousePoint.x = me.stageX;
			mousePoint.y = me.stageY;
			if (me.type == MouseEvent.MOUSE_DOWN) {
				mouseDownHandler(me);
			}
			if (me.type == MouseEvent.MOUSE_UP){
				mouseUpHandler(me);
			}
			if (me.type == MouseEvent.MOUSE_MOVE){
				mouseMoveHandler(me);
			}
		}
		protected function mouseUpHandler(me:MouseEvent):void{}
		protected function mouseMoveHandler(me:MouseEvent):void{}
		protected function mouseDownHandler(me:MouseEvent):void{}
		protected function createBody():void{}
	}
}