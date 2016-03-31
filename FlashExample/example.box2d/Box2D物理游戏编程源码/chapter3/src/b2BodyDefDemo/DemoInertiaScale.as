package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2MassData;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;

	public class DemoInertiaScale extends AbstractDemo
	{
		public function DemoInertiaScale(gravity:Number=10)
		{
			super(gravity);
			editText("InertiaScale",
				"读：GetInertia():Number \n写：SetMassData(massData:b2MassData):void",
				"InertiaScale的设置要通过b2MassData.I来设置，InertiaScale越大，刚体旋转的惯性越大");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var flag:Boolean = false;
		private var interval:Number=0;
		private var md:b2MassData;
		private var particle:b2Body;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,200,80,80);
			b1.SetAngularVelocity(5/180*Math.PI*30);
			LDEasyWorld.fixBodyAt(b1,250,200);
			
			md = new b2MassData();
			md.I=10;
			b1.SetMassData(md);
			Whatisb2BodyDef.valueTxt.text="10";
		}

		override public function update():void
		{
			if (interval>20) 
			{
				particle=LDEasyBody.createBox(210,30,20,20);
				particle.SetUserData("particle");
				interval=0;
			}else{
				interval++;
			}
			super.update();
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.keyCode != Keyboard.SPACE) return;
			flag = !flag;
			
			if (flag) 
			{
				md.I=100;
				Whatisb2BodyDef.valueTxt.text="100";
			}else{
				md.I=10;
				Whatisb2BodyDef.valueTxt.text="10";
			}
			
			var indexBody:b2Body = box2DWorld.GetBodyList();
			while (indexBody) 
			{
				if (indexBody.GetUserData()=="particle") 
				{
					box2DWorld.DestroyBody( indexBody);
				}
				indexBody=indexBody.GetNext()
			}
			
			b1.SetAngularVelocity(5/180*Math.PI*30);
			b1.SetMassData(md);
		}
	}
}