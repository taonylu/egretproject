package Whatis
{
	import flash.events.Event;
	
	import Box2D.Collision.b2AABB;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.b2FixtureDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	
	[SWF(width="300", height="400", frameRate="30")]
	
	public class WhatIsGetAABB2 extends AbstractBox2DTest
	{
		public function WhatIsGetAABB2()
		{
			super(0);
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight,true);
		}
		private var shapeMapList:Array;
		private var boxSize:Number=15;
		private var counter:int =0;
		private var b:b2Body;
		private var green:b2Color = new b2Color(0.5,0.9,0.5);
		override public function box2DAppReady():void
		{
			
			createShapeMap();
			b = createBody(150,200,shapeMapList[0]);
			b.SetAngle(Math.PI/4);
			
//			debug.AppendFlags(b2DebugDraw.e_aabbBit);
		}
		
		private function createShapeMap():void
		{
			var Z:Array=[	1,1,0,
							0,1,1,
							0,0,0];
			var S:Array=[	0,1,1,
							1,1,0,
							0,0,0];
			var L:Array=[	1,0,0,
							1,0,0,
							1,1,0];
			var L2:Array=[	0,1,0,
							0,1,0,
							1,1,0];
			var T:Array=[	1,1,1,
							0,1,0,
							0,0,0];
			var M:Array=[	1,1,1,
							1,0,1,
							0,0,0];
			var X:Array=[	0,1,0,
							1,1,1,
							0,1,0];
			var O:Array=[	1,1,0,
							1,1,0,
							0,0,0];
			shapeMapList = new Array();
			shapeMapList.push(Z,T,L,M,X,O,S,L2);
		}

		private function createBody(px:Number,py:Number, map:Array):b2Body
		{
			var bodyDef:b2BodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;
			bodyDef.position = new b2Vec2(px/30,py/30);
			
			var fixtureDef:b2FixtureDef = new b2FixtureDef();
			fixtureDef.density = 1;
			fixtureDef.restitution = 0;
			
			var body:b2Body = world.CreateBody(bodyDef);
			
			var bx:Number, by:Number;
			var center:b2Vec2;
			var shape:b2PolygonShape;
			
			for (var r:int = 0; r < 3; r++) 
			{
				for (var c:int = 0; c < 3; c++) 
				{
					if (map[r*3+c]==1) 
					{
						bx = c*boxSize;
						by = r*boxSize;
						center = new b2Vec2(bx/30,by/30);
						shape = b2PolygonShape.AsOrientedBox(boxSize/30/2,boxSize/30/2,center);
						fixtureDef.shape=shape;
						body.CreateFixture(fixtureDef);
					}
				}
			}
			return body;
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			b.SetAwake(true);
			debug.DrawAABB(getAABBOfBody(b),LDEasyDebug.red);
		}
		private function getAABBOfBody(body:b2Body):b2AABB
		{
			var f:b2Fixture = body.GetFixtureList();
			var combineAB:b2AABB = f.GetAABB();
			while(f){
				combineAB = b2AABB.Combine(combineAB,f.GetAABB());
				f= f.GetNext();
			}
			return combineAB;
		}
		
	}
}