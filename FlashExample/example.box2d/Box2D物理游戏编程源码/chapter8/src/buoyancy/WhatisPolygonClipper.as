package buoyancy
{
	import com.logicom.geom.ClipType;
	import com.logicom.geom.Clipper;
	
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	public class WhatisPolygonClipper extends AbstractBox2DTest
	{
		public function WhatisPolygonClipper(gravity:Number=10)
		{
			super(0);
		}
		private var subjectBody:b2Body, clipBody:b2Body;
		private var subjectPoly:Array, clipPoly:Array
		private var clipResult:Array;
		
		private var clipTypeList:Array;
		private var clipTypeNames:Array;
		private var typeOfClip:int;
		private var aryIndex:int = 0;
		private var clipText:TextField;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			subjectBody = LDEasyBody.createRegular(250,200,80,3,0);
			subjectBody.GetFixtureList().SetSensor(true);
			clipBody = LDEasyBody.createBox(100,100,200,50);
			
			clipTypeList = [ClipType.DIFFERENCE,
						ClipType.INTERSECTION,
						ClipType.UNION,
						ClipType.XOR];
			clipTypeNames=["ClipType.DIFFERENCE",
							"ClipType.INTERSECTION",
							"ClipType.UNION",
							"ClipType.XOR"];
			typeOfClip = ClipType.DIFFERENCE;
			
			clipText = new TextField();
			clipText.selectable = false;
			clipText.width = 400;
			clipText.x = clipText.y = 10;
			clipText.scaleX = clipText.scaleY = 2;
			clipText.text = clipTypeNames[aryIndex];
			addChild(clipText);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			subjectPoly = getWorldArray(subjectBody);
			clipPoly = getWorldArray(clipBody);
			clipResult = Clipper.clipPolygon(subjectPoly,clipPoly,typeOfClip);
			if(clipResult.length>0){
				for each (var vertices:Array in clipResult) 
				{
					for (var i:int = 0; i < vertices.length; i++) 
					{
						var point:Point = vertices[i];
						var vertex:b2Vec2 = new b2Vec2(point.x/30,point.y/30);
						vertices[i] = vertex;
					}
					if(typeOfClip == 3){
						debug.DrawSolidPolygon(LDEasyDebug.ArrayToVector(vertices),vertices.length,LDEasyDebug.red);
					}else{
						debug.DrawPolygon(vertices,vertices.length,LDEasyDebug.red);
					}
				}
			}
		}
		private function getWorldArray(body:b2Body):Array{
			var shape:b2PolygonShape = body.GetFixtureList().GetShape() as b2PolygonShape;
			var vertices:Vector.<b2Vec2> = shape.GetVertices();
			
			var points:Array = new Array();
			for each (var v:b2Vec2 in vertices) 
			{
				var worldVertex:b2Vec2 = body.GetWorldPoint(v);
				var point:Point = new Point(worldVertex.x*30,worldVertex.y*30);
				points.push(point);
			}
			return points;
		}
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN && event.keyCode == Keyboard.SPACE){
				if(++aryIndex>=clipTypeList.length){
					aryIndex=0;
				}
				typeOfClip = clipTypeList[aryIndex];
				clipText.text = clipTypeNames[aryIndex];
			}
		}
	}
}