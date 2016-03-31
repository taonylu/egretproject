package b2BodyDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoType extends AbstractDemo
	{
		public function DemoType(gravity:Number=10)
		{
			super(gravity);
			editText("Type",
				"读：GetType():uint \n写：SetType(type:uint):void",
				"b2_kinematicBody是一种可以动的静态刚体，可以通过SetLinearVelocity设置它的速度");
		}
		
		private var b1:b2Body, b2:b2Body;
		private var interval:Number=0;
		private var particle:b2Body;
		private var typeList:Array;
		private var typeIndex:int;
		private var speedx:Number=5;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,200,200,40);
			typeList=["b2_dynamicBody","b2_kinematicBody","b2_staticBody"];
			typeIndex=0;
			editValueText("b2_dynamicBody");
		}

		override public function update():void
		{
			if (interval>20) 
			{
				particle=LDEasyBody.createBox(Math.random()*100+150,30,20,20);
				particle.SetUserData("particle");
				interval=0;
			}else{
				interval++;
			}
			if (typeIndex==1) 
			{
				if(b1.GetPosition().x>350/30 || b1.GetPosition().x<150/30){
					speedx*=-1;
					b1.SetLinearVelocity(b2Vec2.Make(speedx,0));
				}
			}
			super.update();
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.keyCode != Keyboard.SPACE) return;
			b1.SetPosition(b2Vec2.Make(250/30,200/30));
			b1.SetAngularVelocity(0);
			b1.SetLinearVelocity(b2Vec2.Make(0,0));
			if(++typeIndex>2) typeIndex=0;
			b1.SetType(b2Body[typeList[typeIndex]]);
			if (typeIndex==1) 
			{
				b1.SetLinearVelocity(b2Vec2.Make(speedx,0));
			}
			editValueText(typeList[typeIndex]);
			
			
			var indexBody:b2Body = box2DWorld.GetBodyList();
			while (indexBody) 
			{
				if (indexBody.GetUserData()=="particle") 
				{
					box2DWorld.DestroyBody( indexBody);
				}
				indexBody=indexBody.GetNext()
			}

		}
	}
}