package b2PolygonShapeDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.b2Color;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSetAsOrientedBox extends AbstractPolygonShapeDemo
	{
		public function DemoSetAsOrientedBox(gravity:Number=10)
		{
			super(0);
			editText("SetAsOrientedBox",
				"SetAsOrientedBox( \n \t hx:Number,  \n \t hy:Number,  \n \t center:b2Vec2 = null,  \n \t angle:Number = 0.0 \n):void",
				"返回离d最近的顶点坐标");
		}
		
		private var b1:b2Body;
		private var s1:b2PolygonShape;
		private var semiW:Number = 50, semiH:Number=25;
		private var center:b2Vec2;
		
		private var red:b2Color = new b2Color(0,0,1);
		private var gray:b2Color = new b2Color(0.8,0.8,0.8);
		private var spaceCount:int = 1;
		private var vertiesArray:Array;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250, 200, 100,50);
			b1.SetAngularVelocity(1);
			
			center = b2Vec2.Make(semiW/ 30,semiH/30);
			s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
			
			debug.SetFlags(debug.GetFlags() | b2DebugDraw.e_centerOfMassBit);
			vertiesArray = new Array();
			s1.GetVertices().forEach(
				function(t,i,o):void{
					vertiesArray.push(b1.GetWorldPoint(t));
				});
			
			editValueText("未设置center");
		}
		private function resetBodies():void
		{
			b1.SetPosition(b2Vec2.Make(250/30,200/30));
			b1.SetAngularVelocity(0);
			switch(spaceCount)
			{
				case 1:
				{
					box2DWorld.DestroyBody(b1);
					b1 = LDEasyBody.createBox(250, 200, 100,50);
					s1 = b1.GetFixtureList().GetShape() as b2PolygonShape;
					s1.SetAsBox(semiW/30,semiH/30);
					editValueText("未设置center");
					break;
				}
				case 2:
				{
					s1.SetAsOrientedBox(semiW/30,semiH/30,center);
					editValueText("center为b2Vec2(50/30, 25/30)");
					break;
				}
				case 3:
				{
					s1.SetAsOrientedBox(semiW/30,semiH/30,center);
					b1.ResetMassData();
					editValueText("设置center后调整质心");
					break;
				}
			}
			b1.SetAngularVelocity(1);
		}
		override public function update():void
		{
			super.update();
			debug.DrawCircle(b1.GetPosition(),5/30,red);
			debug.DrawPolygon(vertiesArray,4,gray);
			b1.SetAwake(true);
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