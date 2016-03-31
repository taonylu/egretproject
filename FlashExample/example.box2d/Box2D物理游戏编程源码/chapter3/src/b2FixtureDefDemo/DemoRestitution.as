package b2FixtureDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	public class DemoRestitution extends AbstractFixtureDemo
	{
		public function DemoRestitution(gravity:Number=10)
		{
			super(gravity);
			editText("Restitution",
				"读：GetRestitution():Number \n写：SetRestitution(restitution:Number):void",
				"斜坡为演示刚体，Restitution取值范围在0~1之间,值越大弹性越好");
		}
		
		private var b1:b2Body;
		private var flag:Boolean=false;
		private var f1:b2Fixture;
		private var bodyIndex:b2Body;
		private var interval:Number=0;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(180,300,300,10);
			LDEasyWorld.fixBodyAt(b1,30,300);
			f1 = b1.GetFixtureList();
			f1.SetRestitution(0.1);
			editValueText(f1.GetRestitution().toString());
		}
		override public function update():void
		{
			super.update();
			if (interval>30) 
			{
				bodyIndex = LDEasyBody.createBox(80,50,30,20);
				bodyIndex.SetBullet(true);
				bodyIndex.SetUserData("particle");
				interval=0;
			}
			else 
			{
				interval++;
			}
		}
		private function resetBodies():void
		{
			bodyIndex = box2DWorld.GetBodyList();
			while(bodyIndex){
				if(bodyIndex.GetUserData()=="particle"){
					box2DWorld.DestroyBody(bodyIndex);
				}
				bodyIndex=bodyIndex.GetNext();
			}
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				flag=!flag;
				if (flag) 
				{
					f1.SetRestitution(0.9);
				}else{
					f1.SetRestitution(0.1);
				}
				
				editValueText(f1.GetRestitution().toString());
				
			}
		}
	}
}