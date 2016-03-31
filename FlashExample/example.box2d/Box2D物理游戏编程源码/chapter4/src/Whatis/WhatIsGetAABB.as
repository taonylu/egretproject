package Whatis
{
	import flash.events.Event;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;

	public class WhatIsGetAABB extends AbstractBox2DTest
	{
		public function WhatIsGetAABB(gravity:Number=10)
		{
			super(0);
		}
		
		private var b1:b2Body;
		private var f1:b2Fixture;
		private var shapeList:Array=["rect","circle","triangle","regular"];
		private var shapeIndex:int=0;
		private var counter:Number = 0;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			debug.AppendFlags(b2DebugDraw.e_aabbBit);
			createBody();
		}
		private function createBody():void
		{
			if(++shapeIndex>shapeList.length-1) shapeIndex=0;
			switch(shapeList[shapeIndex])
			{
				case "rect":
				{
					LDEasyBody.createBox(250,200,40,30);
					break;
				}
				case "circle":
				{
					LDEasyBody.createCircle(250,200,20);
					break;
				}
				case "triangle":
				{
					LDEasyBody.createRegular(250,200,20,3);
					LDEasyBody.createFan(200,200,50,45);
					break;
				}
				case "regular":
				{
					LDEasyBody.createRegular(250,200,30,5);
					LDEasyBody.createSemiCircle(300,200,200,40);
					break;
				}
			}
		}
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			if(--counter<0){
				counter=80;	
				createBody();
			}
		}
		
	}
}