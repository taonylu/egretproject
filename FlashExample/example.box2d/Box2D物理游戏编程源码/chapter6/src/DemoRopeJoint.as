package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2RopeJoint;
	import Box2D.Dynamics.Joints.b2RopeJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	import ldEasyBox2D.LDMath;

	[SWF(width="300")]
	public class DemoRopeJoint extends AbstractBox2DTest
	{
		public function DemoRopeJoint(gravity:Number=10)
		{
			super(10);
		}
		private var mouseStart:b2Vec2=new b2Vec2(), mouseEnd:b2Vec2=new b2Vec2();
		private var ropeJoint:b2RopeJoint;
		private var isDrawing:Boolean=false;
		private var crossPoint:b2Vec2;
		
		override public function box2DAppReady():void
		{
			createBodies();
			createJoint();
		}
		private function createBodies():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createBox(200,300,60,10,1).SetAngle(-Math.PI/6);
			LDEasyBody.createBox(80,320,30,10,1);
		}
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createCircle(200,50,10,1);
			var bodyB:b2Body = LDEasyBody.createCircle(150,70,20);
			
			var anchorA:b2Vec2 = bodyA.GetPosition();
			var anchorB:b2Vec2 = bodyB.GetPosition();
			var maxLength:Number = 100/30;
			
			var jointDef:b2RopeJointDef = new b2RopeJointDef();
			jointDef.Initialize(bodyA,bodyB,anchorA,anchorB,maxLength);
			ropeJoint = world.CreateJoint(jointDef) as b2RopeJoint;
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:{
					isDrawing = true;
					mouseStart.x = mouseX/30; mouseStart.y = mouseY/30;
					mouseEnd = mouseStart.Copy();
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_MOVE:{
					mouseEnd.x = mouseX/30; mouseEnd.y = mouseY/30;
					break;
				}
				case MouseEvent.MOUSE_UP:{
					if(crossPoint!=null){
						world.DestroyJoint(ropeJoint);
						ropeJoint = null;
						crossPoint = null;
					}
					isDrawing = false;
					stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
			}
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			if (isDrawing) 
			{
				debug.DrawSegment(mouseStart,mouseEnd,LDEasyDebug.red);
				if(ropeJoint!=null){
					crossPoint = getCrossPoint(mouseStart,mouseEnd,ropeJoint.GetAnchorA(),ropeJoint.GetAnchorB());
					if (crossPoint!=null) debug.DrawCircle(crossPoint,5/30,LDEasyDebug.red);
				}
			}
		}
		private function getCrossPoint(a1:b2Vec2,a2:b2Vec2,b1:b2Vec2,b2:b2Vec2):b2Vec2{
			var va:b2Vec2 = b2Math.SubtractVV(a2,a1);
			var vb:b2Vec2 = b2Math.SubtractVV(b2,b1);
			
			var a1b1:b2Vec2 = b2Math.SubtractVV(b1,a1);
			var a1b2:b2Vec2 = b2Math.SubtractVV(b2,a1);
			if (b2Math.CrossVV(va,a1b1)*b2Math.CrossVV(va,a1b2)>0) return null;
			
			var b1a1:b2Vec2 = b2Math.SubtractVV(a1,b1);
			var b1a2:b2Vec2 = b2Math.SubtractVV(a2,b1);
			if (b2Math.CrossVV(vb,b1a1)*b2Math.CrossVV(vb,b1a2)>0) return null;
			
			var lenA:Number = b2Math.CrossVV(b1a1,va);
			var lenB:Number = b2Math.CrossVV(vb,va);
			var ratio:Number = lenA/lenB;
			var crossPoint:b2Vec2 = b1.Copy();
			crossPoint.Add(b2Math.MulFV(ratio,vb));
			return crossPoint;
		}
	}
}