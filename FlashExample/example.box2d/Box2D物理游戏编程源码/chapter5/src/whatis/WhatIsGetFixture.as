package whatis
{
	import flash.events.Event;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatIsGetFixture extends AbstractBox2DTest
	{
		public function WhatIsGetFixture(gravity:Number=10)
		{
			super(0);
		}
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBodies();
			var trianlge:b2Body = LDEasyBody.createRegular(250,200,40,3);
			trianlge.SetUserData("triangle");
			var circle:b2Body = LDEasyBody.createCircle(250,300,20);
			circle.SetUserData("circle");
		}
		private function createBodies():void
		{
			for (var i:int = 0; i < 30; i++) 
			{
				var px:Number = Math.random()*400+50;
				var py:Number = Math.random()*300+50;
				var size:Number = Math.random()*30+20;
				
				LDEasyBody.createBox(px,py,size,size).SetAngle(Math.random()*Math.PI);
			}
			
		}
		private var contact:b2Contact;
		override protected function update(event:Event):void
		{
			super.update(event);
			contact = world.GetContactList();
			while(contact){
				var fixtureA:b2Fixture = contact.GetFixtureA();
				var fixtureB:b2Fixture = contact.GetFixtureB();
				
				var bodyA:b2Body = fixtureA.GetBody();
				var bodyB:b2Body = fixtureB.GetBody();
				
				if (bodyA.GetUserData()=="triangle" && bodyB.GetUserData()=="circle") 
				{
					LDEasyDebug.drawFixture(fixtureA,LDEasyDebug.red);
					LDEasyDebug.drawFixture(fixtureB,LDEasyDebug.red);
					trace("bodyA is triangle, bodyB is circle，圆形和三角形发生碰撞了");
				}else if(bodyB.GetUserData()=="triangle" && bodyA.GetUserData()=="circle"){
					LDEasyDebug.drawFixture(fixtureA,LDEasyDebug.red);
					LDEasyDebug.drawFixture(fixtureB,LDEasyDebug.red);
					trace("bodyA is circle, bodyB is triangle，圆形和三角形发生碰撞了");
				}
				contact = contact.GetNext();
			}
			
		}
	}
}