package whatis
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.b2WorldManifold;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsb2WorldManifold extends AbstractBox2DTest
	{
		public function WhatIsb2WorldManifold(gravity:Number=10)
		{
			super(0);
		}
		private var contact:b2Contact;
		private var red:b2Color = new b2Color(1,0,0);
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			LDEasyBody.createBox(150,200,100,40,0).SetAngle(Math.PI/4); //static box
			LDEasyBody.createCircle(350,200,30,0); //static circle
			LDEasyBody.createCircle(350,300,25);
			LDEasyBody.createBox(150,300,30,30);//.SetFixedRotation(true);
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
				if(contact.IsTouching()){
					var fA:b2Fixture = contact.GetFixtureA();
					var fB:b2Fixture = contact.GetFixtureB();
					var bA:b2Body = fA.GetBody();
					var bB:b2Body = fB.GetBody();
					var b:b2Body;
					var m:b2WorldManifold = new b2WorldManifold();
					contact.GetWorldManifold(m);
					for (var i:int=0;i<m.m_points.length;i++) 
					{
						var p:b2Vec2 = m.m_points[i];
						debug.DrawCircle(p,5/30,red);
						LDEasyDebug.drawVecAt(m.m_normal,p,LDEasyDebug.blue,false);
					}
				}
				contact = contact.GetNext();
			}
		}
		
	}
}
