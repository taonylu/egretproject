package softBody
{
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2WeldJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSoftBody1 extends AbstractBox2DTest
	{
		public function DemoSoftBody1(gravity:Number=10)
		{
			super(gravity);
		}
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createSoftBody(100,200);
		}
		private function createSoftBody(posX:Number,posY:Number):void{
			var segmentWidth:Number = 50;
			var startBody:b2Body = LDEasyBody.createBox(posX,posY,segmentWidth,20,0);
			var segmentList:Array = new Array();
			segmentList.push(startBody);
			for (var i:int = 0; i < 5; i++) 
			{
				var segPosX:Number = posX+(i+1)*segmentWidth;
				var segPosY:Number = posY;
				var body:b2Body = LDEasyBody.createBox(segPosX,segPosY,segmentWidth,20);
				segmentList.push(body);
			}
			for (var j:int = 1; j < segmentList.length; j++) 
			{
				var bodyA:b2Body = segmentList[j-1];
				var bodyB:b2Body = segmentList[j];
				weldTogether(bodyA,bodyB);
			}
			
		}
		private function weldTogether(ba:b2Body,bb:b2Body):void{
			var offset:b2Vec2 = b2Math.SubtractVV(bb.GetPosition(),ba.GetPosition());
			offset.Multiply(0.5);
			var anchor:b2Vec2 = b2Math.AddVV(ba.GetPosition(),offset);
			var jointDef:b2WeldJointDef = new b2WeldJointDef();
			jointDef.Initialize(ba,bb,anchor);
			jointDef.frequencyHz = 20;
			jointDef.dampingRatio = 0.2;
			world.CreateJoint(jointDef);
		}
	}
}