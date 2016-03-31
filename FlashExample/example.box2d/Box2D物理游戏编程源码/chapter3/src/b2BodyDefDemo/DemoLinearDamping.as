package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoLinearDamping extends AbstractDemo
	{
		public function DemoLinearDamping(gravity:Number=10)
		{
			super(0);
			editText("LinearDamping",
				"读：GetLinearDamping():Number \n写：SetLinearDamping(value:Number):void",
				"上面的矩形为演示刚体");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var flag:Boolean=false;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(50,200,50,50);
			b1.SetLinearVelocity(b2Vec2.Make(5,0));
			b2 = LDEasyBody.createBox(50,300,50,50);
			b2.SetLinearVelocity(b2Vec2.Make(5,0));
			editValueText(b1.GetLinearDamping().toString());
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(50/30,200/30));
			b1.SetAwake(true);
			b1.SetLinearVelocity(b2Vec2.Make(5,0));
			
			b2.SetPosition(b2Vec2.Make(50/30,300/30));
			b2.SetAwake(true);
			b2.SetLinearVelocity(b2Vec2.Make(5,0));
			
			editValueText(b1.GetLinearDamping().toString());
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				flag=!flag;
				if (flag) 
				{
					b1.SetLinearDamping(.8);
				}else{
					b1.SetLinearDamping(0);
				}
				editValueText(b1.GetLinearDamping().toString());
				
			}
		}
	}
}