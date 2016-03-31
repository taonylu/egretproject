package b2CircleShapeDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Collision.Shapes.b2MassData;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoLocalPosition extends AbstractCircleShapeDemo
	{
		public function DemoLocalPosition(gravity:Number=10)
		{
			super(0);
			editText("LocalPosition",
				"读：GetLocalPosition():b2Vec2 \n写：SetLocalPosition(position:b2Vec2):void",
				"调整圆形的本地坐标");
		}
		
		private var b1:b2Body,bullet:b2Body;
		private var s1:b2CircleShape;
		private var md:b2MassData;
		// color
		private var gray:b2Color=new b2Color(.8,0.8,0.8);	// origin circle shape
		private var blue:b2Color = new b2Color(0,0,1);		// position of circle shape
		
		private var spaceCount:int = 1;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createCircle( 250, 200, 50);
			b1.SetAngularVelocity(1);
			
			s1 = b1.GetFixtureList().GetShape() as b2CircleShape;
			
			editValueText("(" + s1.GetLocalPosition().x*30 +","+ s1.GetLocalPosition().y*30 +")");
			debug.SetFlags(debug.GetFlags() | b2DebugDraw.e_centerOfMassBit);
		}
		override public function update():void
		{
			super.update();
			// draw cross to show the position of circle shape
			debug.DrawCircle(b1.GetPosition(),5/30,blue);
			// draw original circle shape
			debug.DrawCircle(b1.GetPosition(),50/30,gray);
			b1.SetAwake(true);
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(250/30,200/30));
			b1.SetAngularVelocity(0);
			b1.SetAngle(0);
			switch(spaceCount)
			{
				case 1:
				{
					s1.SetLocalPosition(b2Vec2.Make(0,0));
					editValueText("(" + s1.GetLocalPosition().x*30 +","+ s1.GetLocalPosition().y*30 +")");
					b1.ResetMassData();
					break;
				}
				case 2:
				{
					s1.SetLocalPosition(b2Vec2.Make(50/30,50/30));
					editValueText("(" + s1.GetLocalPosition().x*30 +","+ s1.GetLocalPosition().y*30 +")");
					break;
				}
				case 3:
				{
					s1.SetLocalPosition(b2Vec2.Make(50/30,50/30));
					b1.ResetMassData();
					editValueText("调整质心后，(" + s1.GetLocalPosition().x*30 +","+ s1.GetLocalPosition().y*30 +")");
					break;
				}
			}
			b1.SetAngularVelocity(1);
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				if(++spaceCount>3){
					spaceCount = 1;
				}
				resetBodies();
				
			}
		}
	}
}