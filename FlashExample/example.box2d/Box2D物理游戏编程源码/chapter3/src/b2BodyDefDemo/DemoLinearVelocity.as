package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.tools.LDBodyTrail;
	
	public class DemoLinearVelocity extends AbstractDemo
	{
		public function DemoLinearVelocity(gravity:Number=10)
		{
			super(gravity);
			editText("LinearVelocity",
				"读：GetLinearVelocity():b2Vec2 \n写：SetLinearVelocity(v:b2Vec2):void",
				"按下空格键，为刚体设置一个随机的线速度");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var p:b2Vec2,v:b2Vec2;
		private var trail:LDBodyTrail;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(50,200,20,20);
			editValueText("b2Vec2("+Math.round(b1.GetLinearVelocity().x*10)/10
				+"," +
				Math.round(b1.GetLinearVelocity().y*10)/10 + ")");
			trail = new LDBodyTrail(debugSprite,b1);
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(50/30,b1.GetPosition().y));
			b1.SetAngularVelocity(0);
			b1.SetLinearVelocity(b2Vec2.Make(0,0));
			trail.startFromHere();
		}
		override public function update():void{
			super.update();
			if(p==null) return;
			trail.update();
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				b1.SetAwake(true);
				var velocity:b2Vec2 =b2Vec2.Make(Math.random()*10,-Math.random()*20-5);
				b1.SetLinearVelocity(velocity);
				p=b1.GetPosition().Copy();
				v=velocity.Copy();
				
				editValueText("b2Vec2("+Math.round(b1.GetLinearVelocity().x*10)/10
								+"," +
								Math.round(b1.GetLinearVelocity().y*10)/10 + ")");
			}
		}
	}
}