package Whatis
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2Shape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsRayCast extends AbstractBox2DTest
	{
		public function WhatIsRayCast(gravity:Number=10)
		{
			super(0);
		}
		// for debug
		private var red:b2Color = new b2Color(1,0,0);
		private var black:b2Color = new b2Color(0,0,0);
		private var blue:b2Color = new b2Color(0,0,1);
		private var green:b2Color = new b2Color(0,1,0);
		// for for loop
		private var p1:b2Vec2;
		private var p2:b2Vec2 = new b2Vec2();
		
		private var pointArray:Array = [];
		private var fixtureArray:Array = [];
		private var normalArray:Array = [];
		private var tipArray:Array = [];
		public static var abArray:Array = [];
		
		private var callBack:Function;
		private var callIndex:Number = 0;
		private var callBackString:Array=["0","1","fraction","-1"];
		private var callBackTxt:TextField;
		
		private const p2m:Number = 30;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			p1 = new b2Vec2();
			
			createBodies();
			createTip();
			
			switchCallBack(0);
			
			p2 = new b2Vec2(600/30,200/30);
			p1 = new b2Vec2(100/30,200/30);
			world.RayCast(callBack, p1,p2);
		}
		/*create lots of body randomly
		*/
		private function createBodies():void
		{
			var i:Number =0;
			var b:b2Body;
			var px:Number,py:Number;
			var size:Number;
			var random:Number;
			while(++i<40){
				px = Math.random()*450 + 25;
				py = Math.random()*350 + 25;
				size = Math.random()*20 + 20;
				random = Math.random();
				if(random<0.3){
					b = LDEasyBody.createBox(px,py,size,size);
				}else if(random<0.6){
					b = LDEasyBody.createRegular(px,py,size,3);
				}else{
					b = LDEasyBody.createCircle(px,py,size/2);
				}
				b.SetAngle(Math.random()*Math.PI);
			}
		}
		private function createTip():void
		{
			var l:TextField;
			for(var i:int =1;i<20;i++){
				l = new TextField();
				addChild(l);
				l.selectable=false;
				l.text = i.toString();
				l.scaleX = l.scaleY=1.5;
				l.alpha =0;
				tipArray.push(l);
			}
			
			var tf:TextFormat = new TextFormat();
			tf.size = 20;
			callBackTxt = new TextField();
			callBackTxt.defaultTextFormat = tf;
			callBackTxt.textColor=0xFF0000;
			callBackTxt.selectable=false;
			callBackTxt.width = 200;
			addChild(callBackTxt);
			callBackTxt.x = 20;
			callBackTxt.y = 20;
		}
		// the call back function for raycast
		private function callBackNegative(f:b2Fixture,p:b2Vec2,n:b2Vec2,fraction:Number):Number
		{
			if(f.GetShape().GetType()==b2Shape.e_polygonShape) {
				return -1;
			}else{
				pointArray[0]=p.Copy();
				fixtureArray[0]=f;
				normalArray[0]=n;
			}
			return fraction;
		}
		private function callBackNormal(f:b2Fixture,p:b2Vec2,n:b2Vec2,fraction:Number):Number
		{
			pointArray.push(p.Copy());
			fixtureArray.push(f);
			normalArray.push(n.Copy());
			
			if(callIndex==0) return 0;
			if(callIndex==1) return 1;
			return fraction;
		}
		private var tmpPoint:b2Vec2;
		private var tmpFixture:b2Fixture;
		private var tmpNormal:b2Vec2;
		
		override protected function update(event:Event):void
		{
			super.update(event);
			// draw ray in debug
			debug.DrawSolidCircle(p1,5/30,new b2Vec2(),red);
			debug.DrawSegment(p1,p2,red);
			
			for(var i:int=0; i<pointArray.length;i++){
				tmpPoint = pointArray[i];
				tmpFixture = fixtureArray[i];
				tmpNormal = normalArray[i];
				
				debug.DrawCircle(tmpPoint,5/30,black);
				LDEasyDebug.drawFixture(tmpFixture,blue);
				debug.DrawSegment(tmpPoint,b2Math.AddVV(tmpPoint,tmpNormal),green);
				
				tipArray[i].x = tmpPoint.x*30;
				tipArray[i].y = tmpPoint.y*30;
				tipArray[i].alpha = 1;
			}
			
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			super.mouseEventHandler(event);
			if(event.type == MouseEvent.MOUSE_DOWN){
				p2.x = mouseX/p2m;
				p2.y = mouseY/p2m;
				
				pointArray=[];
				fixtureArray=[];
				normalArray=[];
				for each (var tip:TextField in tipArray) 
				{
					tip.alpha = 0;
				}
				world.RayCast(callBack, p1,p2);
			}
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type != KeyboardEvent.KEY_DOWN) return;
			if(event.keyCode != Keyboard.SPACE) return;
			if (++callIndex>3) callIndex=0;
				
			switchCallBack(callIndex);
		}
		
		private function switchCallBack(i:Number):void
		{
			callBack=callBackNormal;
			if(i==3) callBack=callBackNegative;
			callBackTxt.text = "callBack: " + callBackString[i];
		}
		
	}
}