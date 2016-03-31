package Swindler
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.geom.Matrix;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Joints.b2RopeJoint;
	import Box2D.Dynamics.Joints.b2RopeJointDef;
	import Box2D.plus.b2Rot;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;

	[SWF(width="600",height="600")]
	public class DemoSwindler4 extends AbstractBox2DTest
	{
		public function DemoSwindler4(gravity:Number=10)
		{
			super(gravity);
		}
		private var jdf:b2RopeJointDef;
		private var joint:b2RopeJoint;
		private var player:b2Body;
		private var line:PivotLine2;
		
		private var rayStart:b2Vec2, rayEnd:b2Vec2;
		
		private var keyDownList:Array = [];
		private var angle:Number = 0;
		
		override public function box2DAppReady():void
		{
			buildGame();
			buildPlayer();
		}
		private function buildGame():void
		{
			LDEasyBody.createBox(300,-60,600,200,0);
			LDEasyBody.createBox(300,660,600,200,0);
			LDEasyBody.createBox(-30,300,200,600,0);
			LDEasyBody.createBox(630,300,200,600,0);
			LDEasyBody.createBox(190,150,100,20,0);
			LDEasyBody.createBox(285,140,90,200,0);
			LDEasyBody.createBox(285,360,90,100,0);
			LDEasyBody.createBox(335,430,190,40,0);
			LDEasyBody.createBox(405,290,50,240,0);
		}
		private function buildPlayer():void
		{
			player = LDEasyBody.createBox(110,100,20,20);
			player.SetUserData("player");
			player.SetSleepingAllowed(false);
			
			var lineStart:b2Vec2 = new b2Vec2(200/30,120/30);
			var lineEnd:b2Vec2 = player.GetPosition();
			line = new PivotLine2(lineStart,lineEnd);
			line.addEventListener(PivotLine2.PIVOT_CHANGE,onPivotRemove);
			
			jdf = new b2RopeJointDef();
			jdf.Initialize(world.GetGroundBody(),player,lineStart,lineEnd,b2Math.Distance(lineStart,lineEnd));
			joint = world.CreateJoint(jdf) as b2RopeJoint;
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			line.setEnd(player.GetPosition());
			rayStart = line.getLastPivot();
			rayEnd = line.getEnd();
			world.RayCast(callback,line.getLastPivot(),line.getEnd());
			world.RayCast(callback,line.getEnd(),line.getLastPivot());
			drawLine();
			
			keysAction();
			rotateWorld();
			joint.SetMaxLength(b2Math.Distance(line.getEnd(),line.getLastPivot()));
		}
		private function callback(f:b2Fixture,collisionPoint:b2Vec2,normal:b2Vec2,fraction):Boolean
		{
			if(f.GetBody().GetUserData()=="player") return -1;
			updatePivot(collisionPoint,f);
			return 0;
		}
		private function updatePivot(pivot:b2Vec2,obstacle:b2Fixture):void
		{
			var vertext:b2Vec2 = getClosestVertex(pivot,obstacle);
			if(!line.hasPivot(vertext)){
				line.addPivot(vertext,obstacle);
			}
		}
		private function onPivotRemove(event:Event):void
		{
			updateJoint();
		}
		private function updateJoint():void{
			world.DestroyJoint(joint);
			jdf.Initialize(world.GetGroundBody(),player,line.getLastPivot(),line.getEnd(),b2Math.Distance(line.getLastPivot(),line.getEnd()));
			joint=world.CreateJoint(jdf) as b2RopeJoint;
		}
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type== KeyboardEvent.KEY_DOWN){
				keyDownList[event.keyCode]=true;
			}else if(event.type== KeyboardEvent.KEY_UP){
				keyDownList[event.keyCode]=false;
				if(event.keyCode == Keyboard.UP || event.keyCode == Keyboard.DOWN){
					updateJoint();
				}
			}
		}
		private function drawLine():void
		{
			var lineVertices:Array = line.getVertices();
			for (var i:int = 1; i < lineVertices.length; i++) 
			{
				var p1:b2Vec2 = lineVertices[i];
				var p2:b2Vec2 = lineVertices[i-1];
				debug.DrawSegment(p1,p2,LDEasyDebug.red);
			}
		}
		private function getClosestVertex(target:b2Vec2,fixture:b2Fixture):b2Vec2{
			var closestVertex:b2Vec2;
			var closestDistance:Number = Number.MAX_VALUE;
			
			var shape:b2PolygonShape = fixture.GetShape() as b2PolygonShape;
			var body:b2Body = fixture.GetBody();
			var vertices:Vector.<b2Vec2> = shape.GetVertices();
			for each (var v:b2Vec2 in vertices) 
			{
				var worldVertex:b2Vec2 = body.GetWorldPoint(v);
				var distance:Number = b2Math.Distance(worldVertex,target);
				if(distance<closestDistance){
					closestVertex = worldVertex;
					closestDistance = distance;
				}
			}
			return closestVertex;
		}
		private function keysAction():void
		{
			if(keyDownList[Keyboard.RIGHT]){
				angle += 2/180*Math.PI;
			}else if(keyDownList[Keyboard.LEFT]){
				angle -= 2/180*Math.PI;
			}
			if(keyDownList[Keyboard.DOWN]){
				world.DestroyJoint(joint);
			}else if(keyDownList[Keyboard.UP]){
				world.DestroyJoint(joint);
				var force:b2Vec2 = line.getDirection().Copy();
				force.NegativeSelf();
				force.Normalize();
				force.Multiply(20*player.GetMass());
				player.ApplyForceToCenter(force);
			}
		}
		private function rotateWorld():void{
			var matrix:Matrix = new Matrix();
			matrix.translate(-stage.stageWidth/2,-stage.stageHeight/2);
			matrix.rotate(angle);
			matrix.translate(stage.stageWidth/2,stage.stageHeight/2);
			debugSprite.transform.matrix = matrix;
			
			var r:b2Rot = new b2Rot(-debugSprite.rotation*Math.PI/180);
			world.SetGravity(b2Math.MulQV(r,new b2Vec2(0,10)));
		}
	}
}
