package whatis
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.b2Manifold;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsb2Manifold extends AbstractBox2DTest
	{
		public function WhatIsb2Manifold(gravity:Number=10)
		{
			super(0);
		}
		private var texts:TextSprite;
		private var isPause:Boolean =false;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			LDEasyBody.createBox(150,200,100,40,0).SetAngle(Math.PI/4); //static box
			LDEasyBody.createCircle(350,200,30,0); //static circle
			LDEasyBody.createCircle(350,300,25);
			LDEasyBody.createBox(150,300,30,30);//.SetFixedRotation(true);
			texts = new TextSprite();
			addChild(texts);
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			super.mouseEventHandler(event);
		}
		private var contact:b2Contact;
		private var m:b2Manifold;
		private var red:b2Color = new b2Color(1,0,0);
		override protected function update(event:Event):void
		{
			super.update(event);
			var zeroVec:b2Vec2 = new b2Vec2(-1,-1);
			texts.setAAt(zeroVec);
			texts.setBAt(zeroVec);
			contact = world.GetContactList();
			
			while(contact){
				if(contact.IsTouching()){
					var fA:b2Fixture = contact.GetFixtureA();
					var fB:b2Fixture = contact.GetFixtureB();
					var bA:b2Body = fA.GetBody();
					var bB:b2Body = fB.GetBody();
					texts.setAAt(bA.GetPosition());
					texts.setBAt(bB.GetPosition());
					var bMain:b2Body = bA, bSub:b2Body=bB;
					var p:b2Vec2;
					m = contact.GetManifold();
					switch (m.m_type)
					{
						case b2Manifold.e_circles:
						{
							texts.setTitleText("e_circles");
							p = bA.GetWorldPoint(m.m_localPoint);
							break;
						}
						case b2Manifold.e_faceA:
						{
							texts.setTitleText("e_faceA");
							p = bA.GetWorldPoint(m.m_localPoint);
							break;
						}
						case b2Manifold.e_faceB:
						{
							texts.setTitleText("e_faceB");
							p = bB.GetWorldPoint(m.m_localPoint);
							bMain = bB;
							bSub = bA;
							break;
						}
					}
					
					debug.DrawCircle(p,5/30,red);
					LDEasyDebug.drawVecAt(bMain.GetWorldVector(m.m_localPlaneNormal),p,red);
					for (var i:int=0;i<m.m_pointCount;i++) 
					{
						var pp:b2Vec2 = m.m_points[i].m_localPoint;
						debug.DrawCircle(bSub.GetWorldPoint(pp),8/30,LDEasyDebug.blue);
					}
				}
				contact = contact.GetNext();
				isPause = true;
			}
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			isPause=false;
		}
		
		
	}
}
import com.bit101.components.Label;

import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFormat;

import Box2D.Common.Math.b2Vec2;

class TextSprite extends Sprite{
	public function TextSprite():void{
		addText();
	}
	private var title:TextField;
	private var la:Label, lb:Label;
	public function addText():void
	{
		var textFormat:TextFormat = new TextFormat("Arial",20);
		textFormat.size=16;
		
		title = new TextField();
		title.defaultTextFormat=textFormat;
		title.text="m_type: ";
		title.width=200;
		
		title.selectable=false;
		addChild(title);
		title.x=20;
		title.y=20;
		
		la = new Label(this,0,0,"bodyA");
		lb = new Label(this,0,0,"bodyB");
	}
	public function setTitleText(value:String):void{
		title.text = "m_type: " + value;
	}
	public function setAAt(v:b2Vec2):void
	{
		la.x = v.x*30;
		la.y = v.y*30;
	}
	public function setBAt(v:b2Vec2):void
	{
		lb.x = v.x*30;
		lb.y = v.y*30;
	}
}