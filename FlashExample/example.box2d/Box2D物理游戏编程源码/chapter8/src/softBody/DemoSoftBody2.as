package softBody
{
	import flash.geom.Point;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2WeldJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoSoftBody2 extends AbstractBox2DTest
	{
		public function DemoSoftBody2(gravity:Number=10)
		{
			super(10);
		}
		private var center:Point;
		private var radius:Number;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			LDEasyBody.createBox(250,250,300,20,0);
			LDEasyBody.createCircle(150,100,30);
			createSoftCircle(250,100,50);
		}
		private function createSoftCircle(posX:Number,posY:Number,radius:Number):void{
			var segmentCount:Number = 20;
			var segmentWidth:Number = Math.PI*radius*2 /segmentCount;
			var segmentList:Array = [];
			var angle:Number = 0;
			for (var i:int = 0; i < segmentCount; i++) 
			{
				angle = Math.PI*2*i/segmentCount;
				var segmentPosX:Number = posX + radius*Math.sin(angle);
				var segmentPosY:Number = posY + radius*Math.cos(angle);
				var body:b2Body = LDEasyBody.createBox(segmentPosX,segmentPosY,segmentWidth,10);
				body.SetAngle(-angle);
				segmentList.push(body);
			}
			
			var len:Number = segmentList.length;
			for (var j:int = 0; j < len; j++) 
			{
				var bodyA:b2Body = segmentList[(len-1+j)%len];
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
			jointDef.frequencyHz = 10;
			jointDef.dampingRatio = 0.5;
			world.CreateJoint(jointDef);
		}
	}
}