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
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	public class WhatisDelta extends Sprite
	{
		private var debugSprite:Sprite;
		
		private var world:b2World;
		private var debug:b2DebugDraw;
		
		private var delta:Number;
		private var positionDelta:Number;
		private var velocityDelta:Number;
		
		private var isSlow:Boolean=false;
		private var isLeft:Boolean=false;
		private var isRight:Boolean=false;
		
		private var circle:b2Body;
		
		private var tip:TextField;
		
		public function WhatisDelta()
		{
			addEventListener(Event.ADDED_TO_STAGE,oninit);
		}
		
		protected function oninit(event:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, oninit);
			stage.frameRate=30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			
			world=LDEasyWorld.createWorld(0,10);
			debug = LDEasyWorld.createDebug(debugSprite);
			
			delta=1/30;
			positionDelta=10;
			velocityDelta=10;
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
			tip.text="ladeng sdfsf this align effect";
			
			tip.height = tip.textHeight;
			tip.width = 400;
			tip.x = stage.stageWidth/2 - tip.width/2;
			tip.y = 300;
		}
		
		private function addBodies():void
		{
			var b1:b2Body = LDEasyBody.createBox(100,100,250,20,0);
			b1.SetAngle(20*Math.PI/180);
			var b2:b2Body = LDEasyBody.createBox(400,250,250,20,0);
			b2.SetAngle(-20*Math.PI/180);
			var b3:b2Body = LDEasyBody.createBox(200,230,20,100);
			LDEasyWorld.fixBodyAt(b3, 200, 180);
				
			circle = LDEasyBody.createCircle(100,20,30);
			circle.GetFixtureList().SetRestitution(.8);
		}
		
		protected function loop(event:Event):void
		{
			delta = 1/30;
			tip.text = "delta=1/30 等于 interal=1/30";
			if(isLeft){
				delta = 1/90;
				tip.text = "delta=1/90 小于 interal=1/30";
			}else if(isRight){
				delta = 1/10;
				tip.text = "delta=1/10 大于 interval=1/30";
			}
			world.Step(delta,10,10);
			world.DrawDebugData();
			if (circle.GetPosition().y > 400/30) 
			{
				circle.SetPosition(b2Vec2.Make(100/30, 0));
				circle.SetLinearVelocity(b2Vec2.Make(0,0));
			}
		}
		
		protected function KeyboardEventHandler(event:KeyboardEvent):void
		{
			if (event.type == KeyboardEvent.KEY_DOWN) 
			{
				switch(event.keyCode)
				{
					case Keyboard.LEFT:
					{
						isLeft = true;
						break;
					}
						
					case Keyboard.RIGHT:
					{
						isRight = true;
						break;
					}
				}
			}
			else if (event.type == KeyboardEvent.KEY_UP) 
			{
				isRight = false;
				isLeft = false;
			}
			
		}
	}
}