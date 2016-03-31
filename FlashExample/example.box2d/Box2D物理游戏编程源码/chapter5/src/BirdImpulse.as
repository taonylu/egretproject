package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	public class BirdImpulse extends AbstractBox2DTest
	{
		public function BirdImpulse()
		{
			super(10);
		}
		public var bird:b2Body, stone:b2Body;
		private var contactListener:BirdImpulseContactListener;
		private var birdManager:BirdThrower;
		private var textTip:ImpulseText;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			stone = LDEasyBody.createBox(400,370,20,40);
			var rect:b2PolygonShape = LDEasyShape.createBox(20,40,0,-40);
			stone.CreateFixture2(rect,3);
			rect = LDEasyShape.createBox(20,40,0,-80);
			stone.CreateFixture2(rect,3);
			rect = LDEasyShape.createBox(20,40,0,-120);
			stone.CreateFixture2(rect,3);
			stone.SetUserData({life:20});
			
			bird = LDEasyBody.createBox(250,100,20,20);
			bird.SetBullet(true);
			
			contactListener = new BirdImpulseContactListener(this);
			world.SetContactListener(contactListener);
			
			birdManager = new BirdThrower(this,bird,100,300);
			birdManager.maxThrowImpulse = 7;
			textTip = new ImpulseText(this);
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:
				{
					birdManager.onMouseDown(event);
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					birdManager.onMouseUp(event);
					stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_MOVE:
				{
					birdManager.onMouseMove(event);
					break;
				}
			}
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.DrawDebugData();
			
			handleContactResult();
			birdManager.drawTrail();
			if (!bird.IsAwake() && birdManager.isBirdMoving) 
			{
				birdManager.reset();
			}
		}
		
		private function handleContactResult():void
		{
			if (contactListener.isContacted) 
			{
				stone.GetUserData().life -= contactListener.imp;
				
				textTip.setImpulse(contactListener.imp);
				textTip.setStoneLife(stone.GetUserData().life);
				
				if (stone.GetUserData().life<=0) 
				{
					var fixture:b2Fixture = stone.GetFixtureList();
					while(fixture){
						stone.Split(function(f:b2Fixture):Boolean{
							return f == fixture;
						});
						fixture = stone.GetFixtureList();
					}
				}
				contactListener.isContacted=false;
			}
		}
	}
}
import flash.display.DisplayObjectContainer;
import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFormat;

class ImpulseText extends Sprite{
	private var itext:TextField, wtext:TextField;
	private var textFormat:TextFormat;
	
	public function ImpulseText(parent:DisplayObjectContainer):void{
		parent.addChild(this);
		
		textFormat = new TextFormat();
		textFormat.size = 20;
		itext = new TextField();
		itext.defaultTextFormat=textFormat;
		itext.text="impulse: 0";
		itext.width=200;
		
		itext.selectable=false;
		itext.x=20;
		itext.y=20;
		addChild(itext);
		
		wtext = new TextField();
		wtext.defaultTextFormat=textFormat;
		wtext.text="stone life: 20";
		wtext.width=200;
		
		wtext.selectable=false;
		wtext.x=200;
		wtext.y=20;
		addChild(itext);
		addChild(wtext);
	}
	public function setImpulse(value:Number):void
	{
		itext.text = "impulse: " + int(value*100)/100; 
	}
	public function setStoneLife(value:Number):void
	{
		if(value<0) value=0;
		wtext.text = "stone life: " + int(value*100)/100; 
	}
}