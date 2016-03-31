package b2FixtureDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoIsSensor extends AbstractFixtureDemo
	{
		public function DemoIsSensor(gravity:Number=10)
		{
			super(gravity);
			editText("IsSensor",
				"读：IsSensor():Boolean \n写：SetSensor(sensor:Boolean):void",
				"isSensor=true时，刚体只检测但不参与碰撞");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var f1:b2Fixture;
		private var contactListener:SensorContact;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createCircle(250,250,50,0);
			b2 = LDEasyBody.createBox(245,100,50,50);
			
			f1 = b1.GetFixtureList();
			
			editValueText("false");
			
			contactListener = new SensorContact();
			box2DWorld.SetContactListener(contactListener);
		}
		override public function update():void{

			super.update();
			
			if(contactListener.isSensorContacted){
				debug.DrawSolidCircle(b2Vec2.Make(250/30,250/30),50/30,b2Vec2.Make(0,0),new b2Color(0.8,0,0));
			}
		}
		private function resetBodies():void
		{
			b2.SetAwake(true);
			b2.SetAngle(0);
			b2.SetAngularVelocity(0);
			b2.SetLinearVelocity(b2Vec2.Make(0,0));
			b2.SetPosition(b2Vec2.Make(245/30,100/30));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				f1.SetSensor(!f1.IsSensor());
				editValueText(f1.IsSensor().toString());
			}
		}
	}
}
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2ContactListener;
import Box2D.Dynamics.Contacts.b2Contact;

class SensorContact extends b2ContactListener{
	public var isSensorContacted:Boolean=false;

	public function SensorContact():void
	{
		
	}
	override public function BeginContact(contact:b2Contact):void{
		if (contact.GetFixtureA().IsSensor() || contact.GetFixtureB().IsSensor()) 
		{
			isSensorContacted = true;
		}
	}

	override public function EndContact(contact:b2Contact):void{
		isSensorContacted = false;
	}
}