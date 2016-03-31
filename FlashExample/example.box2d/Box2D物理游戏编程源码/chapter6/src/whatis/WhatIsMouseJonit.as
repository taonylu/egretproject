package whatis
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2MouseJoint;
	import Box2D.Dynamics.Joints.b2MouseJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	import ldEasyBox2D.LDEasyWorld;

	public class WhatIsMouseJonit extends AbstractBox2DTest
	{
		public function WhatIsMouseJonit(gravity:Number=10)
		{
			super(10);
		}
		private var mouseJoint:b2MouseJoint;
		private var dragBody:b2Body;
		private var isDraging:Boolean = false;
		private var mousePoint:b2Vec2 = new b2Vec2();
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createBox(200,100,30,40);
		}
		
		private function createMouseJoint(bodyB:b2Body,target:b2Vec2):void
		{
			var bodyA:b2Body = world.GetGroundBody();
			
			var jointDef:b2MouseJointDef = new b2MouseJointDef();
			jointDef.bodyA = bodyA;
			jointDef.bodyB = bodyB;
			jointDef.target = target;
			jointDef.dampingRatio=.1;
			jointDef.frequencyHz = 1;
			jointDef.maxForce = bodyB.GetMass()*20;
			
			mouseJoint = world.CreateJoint(jointDef) as b2MouseJoint;
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			mousePoint.x = mouseX/30;
			mousePoint.y = mouseY/30;
			
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:
				{
					dragBody = LDEasyWorld.getBodyAt(mouseX,mouseY);
					if(dragBody!=null) {
						createMouseJoint(dragBody,mousePoint);
					}
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					if(mouseJoint!=null){
						world.DestroyJoint(mouseJoint);
						mouseJoint=null;
					}
					stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_MOVE:
				{
					if(mouseJoint!=null){
						mouseJoint.SetTarget(mousePoint);
					}
					break;
				}
			}
		}
		
		override protected function update(event:Event):void
		{
			// TODO Auto Generated method stub
			super.update(event);
			if(mouseJoint!=null){
				debug.DrawCircle(mouseJoint.GetAnchorA(),5/30,LDEasyDebug.red);
				LDEasyDebug.drawJoint(mouseJoint);
			}
			
		}
		
	}
}