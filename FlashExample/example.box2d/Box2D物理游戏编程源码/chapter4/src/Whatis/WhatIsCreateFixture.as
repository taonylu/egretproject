package Whatis
{
	import flash.events.Event;
	
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	public class WhatIsCreateFixture extends AbstractBox2DTest
	{
		public function WhatIsCreateFixture(gravity:Number=10)
		{
			super(gravity);
		}
		
		private var b:b2Body;
		private var s:Number = 15;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createBox(250,200,550,20,0);
			
			var px:Number = 250, py:Number =100;
//			b = LDEasyBody.createBox(px,py,s*3,s);
//			b.CreateFixture2(LDEasyShape.createBox(s,s*3),1);
			
			var vertices:Vector.<Array> = new Vector.<Array>();
			vertices.push([0,0]);
			vertices.push([0,-s]);
			vertices.push([s,-s]);
			vertices.push([s,0]);
			vertices.push([2*s,0]);
			vertices.push([2*s,s]);
			vertices.push([s,s]);
			vertices.push([s,2*s]);
			vertices.push([0,2*s]);
			vertices.push([0,s]);
			vertices.push([-s,s]);
			vertices.push([-s,0]);
			
			b = LDEasyBody.createBodyFromShape(px,py,LDEasyShape.createPolygon(vertices));
			
			for each (var v:Array in vertices) 
			{
				v[0]= v[0]+45;
			}
			b.CreateFixture2(LDEasyShape.createPolygon(vertices));
		}
		
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			b.SetAwake(true);
		}
		
		
	}
}