package Whatis
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.b2AABB;
	import Box2D.Collision.Shapes.b2Shape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Transform;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsQueryShape extends AbstractBox2DTest
	{
		public function WhatIsQueryShape(gravity:Number=10)
		{
			super(0);
		}
		private var red:b2Color = new b2Color(1,0,0);
		private var blue:b2Color = new b2Color(0,0,1);
		// for for loop
		private var mousePoint:b2Vec2;
		private var bodyWithinAB:b2Body;
		private var ab:b2AABB = new b2AABB();
		private const abSize:Number = 20/30;
		private const p2m:Number = 30;
		private var fixtureWithinAB:b2Fixture;
		
		private var sensorBody:b2Body;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			mousePoint = new b2Vec2();
			
			createBodies();
			sensorBody = LDEasyBody.createBox(250,200,100,100);
			sensorBody.GetFixtureList().SetSensor(true);
		}
		/*create lots of body randomly
		*/
		private function createBodies():void
		{
			var b:b2Body;
			var size:Number, px:Number,py:Number;
			for(var i:int = 0 ;i<10; i++){
				size = Math.random()*30+20;
				px = Math.random()*400+50;
				py = Math.random()*300+50;
				if(Math.random()<0.2){
					b = LDEasyBody.createBox(px,py,size,size);
				}else if(Math.random()<0.4){
					b = LDEasyBody.createFan(px,py,size,Math.random()*90);
				}else if(Math.random()<0.8){
					b = LDEasyBody.createRegular(px,py,size,3);
				}else{
					b = LDEasyBody.createCircle(px,py,size);
				}
				b.SetAngle(Math.random()*Math.PI);
				
			}
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			mousePoint.Set(mouseX/p2m, mouseY/p2m);
			sensorBody.SetPosition(mousePoint);
			myQueryShape(callBack,sensorBody.GetFixtureList().GetShape(),sensorBody.GetTransform());
			LDEasyDebug.drawFixture(sensorBody.GetFixtureList(),blue,true);
			
		}
		private function callBack(f:b2Fixture):Boolean
		{
			if(f.GetBody()!=sensorBody){
				var s:b2Shape = f.GetShape();
				var b:b2Body = f.GetBody();
				
				LDEasyDebug.drawFixture(f,red);
			}
			
			return true;
		}

		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if(event.type == MouseEvent.MOUSE_DOWN){
				
			}
		}
		public function myQueryShape(callback:Function, shape:b2Shape, transform:b2Transform = null):void
		{
			if (transform == null)
			{
				transform = new b2Transform();
				transform.SetIdentity();
			}
			function abCallback(f:b2Fixture):Boolean
			{
				if(b2Shape.TestOverlap(shape, transform, f.GetShape(), f.GetBody().GetTransform())){
					return callback(f);
				}
				return true;
			}
			var aabb:b2AABB = new b2AABB();
			shape.ComputeAABB(aabb, transform);
			world.QueryAABB(abCallback, aabb);
		}
	}
}