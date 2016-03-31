package Whatis
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.b2AABB;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsQueryAABB extends AbstractBox2DTest
	{
		public function WhatIsQueryAABB(gravity:Number=10)
		{
			super(0);
			debug.AppendFlags(b2DebugDraw.e_aabbBit);
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
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			mousePoint = new b2Vec2();
			
			createBodies();
		}
		/*create lots of body randomly
		*/
		private function createBodies():void
		{
			var b:b2Body;
			var size:Number, px:Number,py:Number;
			for(var i:int = 0 ;i<30; i++){
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

			ab.lowerBound.Set(mousePoint.x - abSize, mousePoint.y - abSize);
			ab.upperBound.Set(mousePoint.x + abSize, mousePoint.y + abSize);
			world.QueryAABB(callBack,ab);
			
			debug.DrawAABB(ab,red);
//			LDEasyDebug.drawFixture(debug,fixtureWithinAB,red);
			
		}
		private function callBack(f:b2Fixture):Boolean
		{
			if( f.GetShape().TestPoint(f.GetBody().GetTransform(),mousePoint)) {
				fixtureWithinAB = f;
				bodyWithinAB = f.GetBody();
			}
//			LDEasyDebug.drawAABB(debug,f.GetAABB(),blue);
			LDEasyDebug.drawFixture(f,red);
			return true;
		}

		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if(event.type == MouseEvent.MOUSE_DOWN){
				mousePoint.Set(mouseX/p2m, mouseY/p2m);
			}
		}
	}
}