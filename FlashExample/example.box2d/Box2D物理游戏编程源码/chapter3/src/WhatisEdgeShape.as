package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import Box2D.Collision.Shapes.b2EdgeShape;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	
	public class WhatisEdgeShape extends Sprite
	{
		public function WhatisEdgeShape(gravity:Number=10)
		{
			createBox2DApp(gravity);
			box2DAppReady();
			
			addEventListener(Event.ENTER_FRAME,update);
			
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyBoardEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_UP,keyBoardEventHandler);
		}
		
		protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			
		}
		public var world:b2World;
		public var debug:b2DebugDraw;
		public var debugSprite:Sprite;
		private function createBox2DApp(gravity:Number):void
		{
			stage.frameRate=30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			
			world = LDEasyWorld.createWorld(0,gravity);
			debug = LDEasyWorld.createDebug(debugSprite);
			
		}
		
		public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
//			var vertices:Vector.<b2Vec2> = new Vector.<b2Vec2>();
//			vertices.push(new b2Vec2());
			
			var vertices:Vector.<Point> = new Vector.<Point>();
			vertices.push(new Point(64,140),
				new Point(109,130),
				new Point(161,170),
				new Point(204,160),
				new Point(256,225),
				new Point(302,215),
				new Point(343,260),
				new Point(450,250));
			
			var ground:b2Body = LDEasyBody.createChain(vertices,false,2);
			
			LDEasyBody.createBox(250,20,30,30);
			LDEasyBody.createCircle(150,20,20);
			LDEasyBody.createRegular(200,50,20,3);
			LDEasyBody.createEdge(new Point(200,20),new Point(230,200));
			LDEasyBody.createEdge(new Point(100,20),new Point(230,100));

		}
		protected function update(event:Event):void
		{
			LDEasyWorld.updateWorld();
		}
	}
}