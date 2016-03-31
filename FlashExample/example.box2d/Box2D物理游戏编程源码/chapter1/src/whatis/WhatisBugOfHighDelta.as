package whatis
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	public class WhatisBugOfHighDelta extends Sprite
	{
//		[SWF(width="500",height="450",frameRate="2")]
		
		private var debugSprite:Sprite;
		
		private var world:b2World;
		private var debug:b2DebugDraw;
		
		private var isPositionDelta:Boolean=false;
		
		private var tip:TextField;
		private var interval:Number=0;
		private var keyDownList:Array=[];
		public function WhatisBugOfHighDelta()
		{
			addEventListener(Event.ADDED_TO_STAGE,oninit);
		}
		
		protected function oninit(event:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, oninit);
			stage.frameRate=30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			
			world = LDEasyWorld.createWorld(0,10);
			debug = LDEasyWorld.createDebug(debugSprite);
			
			stage.addEventListener(Event.ENTER_FRAME, loop);
			stage.addEventListener(KeyboardEvent.KEY_DOWN, KeyboardEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_UP, KeyboardEventHandler);
			addBodies();
			addTip();
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
			var ground:b2Body = LDEasyBody.createBox(250,300,400,20);
			LDEasyWorld.fixBodyAt(ground,50,300);
			LDEasyWorld.fixBodyAt(ground,450,300);
		}
		
		protected function loop(event:Event):void
		{
			if(interval>30){
				interval=0;
				LDEasyBody.createCircle(250,20,20).GetFixtureList().SetDensity(10);
			}else{
				interval++;
			}
			LDEasyWorld.stepDelta = 1/30;
			tip.text = "delta=1/30 = interval=1/30";
			if(keyDownList[Keyboard.LEFT]){
				LDEasyWorld.stepDelta=1/90;
				tip.text = "delta=1/90 < interval=1/30";
			}else if(keyDownList[Keyboard.RIGHT]){
				LDEasyWorld.stepDelta= 1/5;
				tip.text = "delta=1/5 > interval=1/30";
			}
			LDEasyWorld.updateWorld();
		}
		
		protected function KeyboardEventHandler(event:KeyboardEvent):void
		{
			if (event.type == KeyboardEvent.KEY_DOWN) keyDownList[event.keyCode]=true;
			if (event.type == KeyboardEvent.KEY_UP) keyDownList[event.keyCode]=false;
		}
	}
}