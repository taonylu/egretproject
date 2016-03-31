package b2FixtureDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoDensity extends AbstractFixtureDemo
	{
		public function DemoDensity(gravity:Number=10)
		{
			super(0);
			editText("Density",
				"读：GetDensity():Number \n写：SetDensity(density:Number):void",
				"上面的矩形为演示刚体，density越大，物体的惯性也就越大");
		}
		
		private var b1:b2Body, b2:b2Body, b3:b2Body, b4:b2Body;
		private var flag:Boolean=false;
		private var f1:b2Fixture;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(300,200,50,50);
			b2 = LDEasyBody.createBox(300,300,50,50);
			b3 = LDEasyBody.createCircle(50,200,10);
			b4 = LDEasyBody.createCircle(50,300,10);
			
			f1 = b1.GetFixtureList();
			
			b3.SetLinearVelocity(b2Vec2.Make(10,0));
			b4.SetLinearVelocity(b2Vec2.Make(10,0));
			editValueText(f1.GetDensity().toString());
		}
		private function resetBodies():void
		{
			b1.SetAwake(true);
			b2.SetAwake(true);
			b3.SetAwake(true);
			b4.SetAwake(true);
			
			b1.SetPosition(b2Vec2.Make(300/30,200/30));
			b2.SetPosition(b2Vec2.Make(300/30,300/30));
			b3.SetPosition(b2Vec2.Make(50/30,200/30));
			b4.SetPosition(b2Vec2.Make(50/30,300/30));
			
			b1.SetLinearVelocity(b2Vec2.Make(0,0));
			b2.SetLinearVelocity(b2Vec2.Make(0,0));
			b3.SetLinearVelocity(b2Vec2.Make(10,0));
			b4.SetLinearVelocity(b2Vec2.Make(10,0));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				flag=!flag;
				if (flag) 
				{
					f1.SetDensity(100);
					b1.ResetMassData();
				}else{
					f1.SetDensity(0);
					b1.ResetMassData();
				}
				
				editValueText(f1.GetDensity().toString());
				
			}
		}
	}
}