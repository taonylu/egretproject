package b2BodyDefDemo
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyDebug;
	
	public class DemoUserData extends AbstractDemo
	{
		public function DemoUserData(gravity:Number=10)
		{
			super(0);
			editText("UserData",
				"读：GetUserData():* \n写：SetUserData(data:*):void",
				"UserData通常用来为刚体绑定皮肤");
		}
		
		private var bird:b2Body, pig:b2Body;
		private var tempVelocity:b2Vec2;
		private var tempBody:b2Body;
		private var tempUserData:Sprite;
		
		override public function onBox2DWorldReady():void
		{
			bird = LDEasyBody.createCircle(200,200,50);
			bird.SetUserData(Whatisb2BodyDef.bird);
			bird.SetLinearVelocity(new b2Vec2(1,2));
			pig = LDEasyBody.createCircle(100,100,40);
			pig.SetUserData(Whatisb2BodyDef.pig);
			pig.SetLinearVelocity(new b2Vec2(2,1));
			
			editValueText("");
			bird.SetAngle(0.4);
			bird.SetLinearVelocity(b2Vec2.Make(3,4));
		}
		override public function update():void
		{
			
			super.update();
			keepSpeed(bird,5);
			keepSpeed(pig,5);
			
			tempBody = box2DWorld.GetBodyList();
			while (tempBody) {
				tempUserData = tempBody.GetUserData();
				if(tempUserData!=null){
					tempUserData.x = tempBody.GetPosition().x * 30 ;
					tempUserData.y = tempBody.GetPosition().y * 30 ;
					tempUserData.rotation = bird.GetAngle() * 180 / Math.PI;
				}
				tempBody = tempBody.GetNext();
			}
		}
		private function keepSpeed(b:b2Body, speed:Number):void{
			tempVelocity = b.GetLinearVelocity();
			tempVelocity.Multiply(speed/tempVelocity.Length());
			b.SetLinearVelocity(tempVelocity);
		}
	}
}