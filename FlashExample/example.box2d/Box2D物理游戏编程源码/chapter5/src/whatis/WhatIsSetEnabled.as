package whatis
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.b2WorldManifold;
	import Box2D.Common.b2Color;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	import ldEasyBox2D.LDEasyBody;

	public class WhatIsSetEnabled extends AbstractBox2DTest
	{
		public function WhatIsSetEnabled(gravity:Number=10)
		{
			super(0);
		}
		private var texts:TextSprite;
		private var contact:b2Contact;
		private var m:b2WorldManifold;
		private var red:b2Color = new b2Color(1,0,0);
		private var isEnable:Boolean = true;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			LDEasyBody.createBox(150,200,100,40,0).SetAngle(Math.PI/4); //static box
			LDEasyBody.createCircle(350,200,30,0); //static circle
			LDEasyBody.createCircle(350,300,25);
			LDEasyBody.createBox(150,300,30,30);//.SetFixedRotation(true);
			m = new b2WorldManifold();
			texts = new TextSprite();
			addChild(texts);
			texts.setTitleText(isEnable.toString());
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			super.mouseEventHandler(event);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			
			contact = world.GetContactList();

			while(contact){
				contact.SetEnabled(isEnable);
				contact = contact.GetNext();
			}
		}
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type== KeyboardEvent.KEY_DOWN){
				if(event.keyCode == Keyboard.SPACE){
					isEnable =!isEnable;
					texts.setTitleText(isEnable.toString());
				}
			}
		}
		
	}
}
import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFormat;

class TextSprite extends Sprite{
	public function TextSprite():void{
		addText();
	}
	private var title:TextField;
	public function addText():void
	{
		var textFormat:TextFormat = new TextFormat("Arial",20);
		textFormat.size=16;
		
		title = new TextField();
		title.defaultTextFormat=textFormat;
		title.text="isEnabled: ";
		title.width=200;
		
		title.selectable=false;
		addChild(title);
		title.x=20;
		title.y=20;
	}
	public function setTitleText(value:String):void{
		title.text = "isEnabled: " + value;
	}
}