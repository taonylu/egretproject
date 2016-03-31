package IceBreaker
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.b2FixtureDef;
	
	import ldEasyBox2D.LDEasyBody;

	[SWF(width="600",height="400")]
	public class DemoIceBreaker extends AbstractBox2DTest
	{
		public static const P2M:Number=30;
		public const SIDE_LEFT:Number = -1;
		public const SIDE_RIGHT:Number = 1;
		public function DemoIceBreaker(gravity:Number=10)
		{
			super(gravity);
		}
		private var canvas:Sprite;
		private var mouseVec:b2Vec2;
		private var bodyPosition:b2Vec2;
		private var bodyToSlice:b2Body;
		private var cutInPoint:b2Vec2,cutOutPoint:b2Vec2;
		private var rayStart:b2Vec2, rayEnd:b2Vec2;
		
		private var leftVertices:Vector.<b2Vec2>, rightVertices:Vector.<b2Vec2>;
		
		override public function box2DAppReady():void
		{
			canvas = new Sprite();
			addChild(canvas);
			
			bodyToSlice = LDEasyBody.createBox(300,200,400,300,0);
			bodyPosition = bodyToSlice.GetPosition();
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			mouseVec=new b2Vec2(mouseX/P2M,mouseY/P2M);
			if(event.type != MouseEvent.MOUSE_DOWN) return;
				
			if(rayStart==null){
				rayStart = mouseVec.Copy();
			}else{
				rayEnd = mouseVec.Copy();
			}
			
			if(rayStart!= null && rayEnd!=null){
				rayCast();
				if(cutInPoint!=null && cutOutPoint!=null){
					sliceVertices();
					slicePolygon();
				}
				rayStart =null; rayEnd=null;
			}
		}
		private function rayCast():void
		{
			cutInPoint = null; cutOutPoint = null;
			world.RayCast(rayStartToEnd,rayStart,rayEnd);
			world.RayCast(rayEndtoStart,rayEnd,rayStart);
		}
		private function rayStartToEnd(fixture:b2Fixture,p:b2Vec2,n:b2Vec2,fraction:Number):Number{
			if(fixture.GetBody()== bodyToSlice) {
				cutInPoint = p.Copy();
				return 0;
			}
			return -1;
		}
		private function rayEndtoStart(fixture:b2Fixture,p:b2Vec2,n:b2Vec2,fraction:Number):Number{
			if(fixture.GetBody()== bodyToSlice){
				cutOutPoint = p.Copy();
				return 0;
			}
			return -1;
		}
		private function sliceVertices():void
		{
			var shape:b2PolygonShape = bodyToSlice.GetFixtureList().GetShape() as b2PolygonShape;
			var vertices:Vector.<b2Vec2> = shape.GetVertices();
			leftVertices = new Vector.<b2Vec2>();
			rightVertices = new Vector.<b2Vec2>();
			
			var side:Number =0, preSide:Number = 0;
			var isInPointAppend:Boolean = false, isOutPointAppend:Boolean = false;
			for each (var v:b2Vec2 in vertices) 
			{
				v = bodyToSlice.GetWorldPoint(v);
				side = checkSide(v);
				if (side == SIDE_LEFT) 
				{
					if(preSide == SIDE_RIGHT) {
						leftVertices.push(cutInPoint);
						rightVertices.push(cutInPoint);
						isInPointAppend = true;
					}
					leftVertices.push(v);
				}else if(side == SIDE_RIGHT){
					if(preSide == SIDE_LEFT) {
						leftVertices.push(cutOutPoint);
						rightVertices.push(cutOutPoint);
						isOutPointAppend = true;
					}
					rightVertices.push(v);
				}
				preSide = side;
			}
			if(!isInPointAppend){
				leftVertices.push(cutInPoint);
				rightVertices.push(cutInPoint);
			}
			if(!isOutPointAppend){
				leftVertices.push(cutOutPoint);
				rightVertices.push(cutOutPoint);
			}
		}
		private function slicePolygon():void
		{
			world.DestroyBody(bodyToSlice);
			createSlicedBody(leftVertices);
			createSlicedBody(rightVertices);
		}
		
		private function createSlicedBody(vertices:Vector.<b2Vec2>):void
		{
			var bodyDef:b2BodyDef = new b2BodyDef();
			var body:b2Body = world.CreateBody(bodyDef);
			var shape:b2PolygonShape = b2PolygonShape.AsVector(vertices,vertices.length);
			var fixtureDef:b2FixtureDef = new b2FixtureDef();
			fixtureDef.density = 1;
			fixtureDef.shape = shape;
			body.CreateFixture(fixtureDef);

			if(!body.GetFixtureList().TestPoint(bodyPosition)) {
				body.SetType(b2Body.b2_dynamicBody);
			}else{
				bodyToSlice = body;
			}
		}
		private function checkSide(point:b2Vec2):Number{
			var ray:b2Vec2 = b2Math.SubtractVV(cutOutPoint,cutInPoint);
			var line:b2Vec2 = b2Math.SubtractVV(point,cutInPoint);
			var side:Number = b2Math.CrossVV(ray,line);
			if(side>0){
				return SIDE_RIGHT;
			}else{
				return SIDE_LEFT;
			}
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			drawCanvas();
		}
		private function drawCanvas():void
		{
			canvas.graphics.clear();
			if(rayStart==null) return;
			canvas.graphics.lineStyle(1,0);
			canvas.graphics.moveTo(rayStart.x*P2M,rayStart.y*P2M);
			canvas.graphics.lineTo(mouseX,mouseY);
		}
	}
}