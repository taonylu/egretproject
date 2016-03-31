package whatis
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	public class WhatisPositionDelta extends Sprite
	{
//		[SWF(width="500",height="450",frameRate="2")]
		
		private var debugSprite:Sprite;
		
		private var world:b2World;
		private var debug:b2DebugDraw;
		
		private var isPositionDelta:Boolean=false;
		
		private var tip:TextField;
		private var interval:Number=0;
		
		public function WhatisPositionDelta()
		{
			addEventListener(Event.ADDED_TO_STAGE,oninit);
		}
		
		protected function oninit(event:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, oninit);
			stage.frameRate=30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			
			world = LDEasyWorld.createWorld(0,20);
			debug = LDEasyWorld.createDebug(debugSprite);
			
			stage.addEventListener(Event.ENTER_FRAME, loop);
			stage.addEventListener(KeyboardEvent.KEY_DOWN, KeyboardEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_UP, KeyboardEventHandler);
			addBodies();
			addTip();
			
//			LDEasyWorld.stepVelocityDelta=1;
		}
		
		private function addTip():void
		{
			var format:TextFormat = new TextFormat();
			format.size = 30;
			format.align = TextFormatAlign.CENTER;
			
			tip = new TextField();
			addChild(tip);
			
			tip.backgroundColor = 0x44000000;
			tip.background=true;
			tip.alpha =0.3;
			tip.selectable=false;
			
			tip.defaultTextFormat=format;
			
			tip.textColor = 0xFFFFFF;
			tip.text="ladeng this align effect";
			
			tip.height = tip.textHeight;
			tip.width = 400;
			tip.x = stage.stageWidth/2 - tip.width/2;
			tip.y = 330;
		}
		
		private function addBodies():void
		{
			var ground:b2Body = LDEasyBody.createBox(250,300,400,30,0);
		}
		
		protected function loop(event:Event):void
		{
			if(interval>30){
				interval=0;
				LDEasyBody.createBox(250,20,40,20).GetFixtureList().SetDensity(100);
			}else{
				interval++;
			}
			if(isPositionDelta){
				LDEasyWorld.stepPositionDelta=1;
				tip.text = "positionDelta=1";
			}else{
				LDEasyWorld.stepPositionDelta=10;
				tip.text = "positionDelta=10";
			}
			LDEasyWorld.updateWorld();
		}
		
		protected function KeyboardEventHandler(event:KeyboardEvent):void
		{
			if (event.type == KeyboardEvent.KEY_DOWN) 
			{
				switch(event.keyCode)
				{
					case Keyboard.SPACE:
					{
						isPositionDelta = !isPositionDelta;
						var body:b2Body = world.GetBodyList();
						while(body){
							if (body.GetType()==b2Body.b2_dynamicBody) 
							{
								world.DestroyBody(body);
							}
							body = body.GetNext();
						}
						break;
					}
				}
			}
		}
	}
}