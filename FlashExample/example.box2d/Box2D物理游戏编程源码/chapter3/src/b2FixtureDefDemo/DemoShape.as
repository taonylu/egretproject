package b2FixtureDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.b2FixtureDef;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoShape extends AbstractFixtureDemo
	{
		public function DemoShape(gravity:Number=10)
		{
			super(gravity);
			editText("Shape",
				"读：GetShape():b2Shape \n写：GetShape():b2Shape",
				"shape的修改需要获取b2Shape对象之后进行，但不能修改Shape的类型");
		}
		
		private var b1:b2Body;
		private var f1:b2Fixture;
		private var shapeList:Array=["rect","circle","triangle","regular"];
		private var shapeIndex:int=0;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,250,40,30);
			f1 = b1.GetFixtureList();
			
			editValueText("rect");
		}
		private function createFan(posX:Number, posY:Number, r:Number,angleSize:Number):b2Body
		{
			if(angleSize>180) return null;
			
			var body:b2Body;
			var bdf:b2BodyDef = new b2BodyDef();
			bdf.position.Set(posX/30,posY/30);
			bdf.type = b2Body.b2_dynamicBody;
			
			var fdf:b2FixtureDef = new b2FixtureDef();
			fdf.density = 3;
			
			var shape:b2PolygonShape = new b2PolygonShape();
			var verticesList:Array = new Array();
			var tempVertex:b2Vec2 = new b2Vec2();
			verticesList.push(tempVertex);
			var anglePerVertex:Number= 10;
			var verticesCount:int = int(360/anglePerVertex * angleSize/360);
			trace(verticesCount);
			r=r/30;
			for (var i:int = 0; i < verticesCount; i++) 
			{
				tempVertex= b2Vec2.Make(r*Math.cos(anglePerVertex*i/180*Math.PI),r*Math.sin(anglePerVertex*i/180*Math.PI));
				verticesList.push(tempVertex);
			}
			shape.SetAsArray(verticesList,verticesCount);
			fdf.shape = shape;
			
			body = box2DWorld.CreateBody(bdf);
			body.CreateFixture(fdf);
			
			return body;
		}
		private function createSemiCircle(posX:Number,posY:Number, w:Number,h:Number):b2Body
		{			
			var body:b2Body;
			var bdf:b2BodyDef = new b2BodyDef();
			bdf.position.Set(posX/30,posY/30);
			bdf.type = b2Body.b2_dynamicBody;
			
			var fdf:b2FixtureDef = new b2FixtureDef();
			fdf.density = 3;
			
			var shape:b2PolygonShape = new b2PolygonShape();
			
			var verticesList:Array = new Array();
			var tempVertex:b2Vec2 = new b2Vec2();
			var r:Number = (h*h+w*w/4)/h/2
			var angleSize:Number = Math.acos((r-h)/r)*360/Math.PI;
			var anglePerVertex:Number= 10;
			var verticesCount:int = int(360/anglePerVertex * angleSize/360);

			r=r/30;
			for (var i:int = 0; i < verticesCount; i++) 
			{
				tempVertex= b2Vec2.Make(r*Math.cos(anglePerVertex*i/180*Math.PI),r*Math.sin(anglePerVertex*i/180*Math.PI));
				verticesList.push(tempVertex);
			}
			
			shape.SetAsArray(verticesList,verticesCount);
			fdf.shape = shape;
			
			body = box2DWorld.CreateBody(bdf);
			body.CreateFixture(fdf);
			
			return body;
		}
		private function resetBodies():void
		{
			if(++shapeIndex>3) shapeIndex=0;
//			box2DWorld.DestroyBody(b1);
			switch(shapeList[shapeIndex])
			{
				case "rect":
				{
					b1 = LDEasyBody.createBox(250,200,40,30);
					break;
				}
				case "circle":
				{
					b1 = LDEasyBody.createCircle(250,200,20);
					break;
				}
				case "triangle":
				{
					b1 = LDEasyBody.createRegular(250,200,20,3);
					createFan(200,200,50,90);
					break;
				}
				case "regular":
				{
					b1 = LDEasyBody.createRegular(250,200,30,5);
					createSemiCircle(300,200,200,40);
					break;
				}
				default:
				{
					break;
				}
			}
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				editValueText(shapeList[shapeIndex]);
			}
		}
	}
}