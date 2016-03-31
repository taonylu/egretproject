package
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

	public class DemoMouseJoint extends AbstractBox2DTest
	{
		public function DemoMouseJoint(gravity:Number=10)
		{
			super(gravity);
		}
		private var mouseJoint:b2MouseJoint;
		private var mousePoint:b2Vec2=new b2Vec2();
		private var player:b2Body;
		
		override public function box2DAppReady():void
		{
			createBodies();
			player = LDEasyBody.createCircle(100,300,20);
		}
		private function createBodies():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createCircle(250,400,150,0);
			LDEasyBody.createCircle(100,400,50,0);
			LDEasyBody.createCircle(400,400,50,0);
		}
		private function createMouseJoint(anchorB:b2Vec2):void
		{
			var bodyA:b2Body = world.GetGroundBody();
			var bodyB:b2Body = player;
			
			var JointDef:b2MouseJointDef = new b2MouseJointDef();
			JointDef.bodyA = bodyA;
			JointDef.bodyB = bodyB;
			JointDef.target = anchorB;
			JointDef.frequencyHz=1;
			JointDef.dampingRatio = 0;
			JointDef.maxForce= bodyB.GetMass()*20;
			
			mouseJoint = world.CreateJoint(JointDef) as b2MouseJoint;
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			mousePoint.x = mouseX/30;
			mousePoint.y = mouseY/30;
			
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:
				{
					var bodyAtMouse:b2Body = LDEasyWorld.getBodyAt(mouseX,mouseY);
					if (bodyAtMouse!=null && bodyAtMouse != player) 
					{
						createMouseJoint(player.GetPosition());
						mouseJoint.SetTarget(mousePoint);
					}else{
						debug.DrawSegment(player.GetPosition(),mousePoint,LDEasyDebug.red);
					}
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					if (mouseJoint!=null) 
					{
						world.DestroyJoint(mouseJoint);
						mouseJoint=null;
					}
					break;
				}
			}
		}
	}
}