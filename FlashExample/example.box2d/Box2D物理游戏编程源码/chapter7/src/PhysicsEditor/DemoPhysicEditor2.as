package PhysicsEditor
{
	import flash.display.DisplayObject;
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	[SWF(width="800",height="420")]
	public class DemoPhysicEditor2 extends AbstractBox2DTest
	{
		public function DemoPhysicEditor2(gravity:Number=10)
		{
			super(gravity);
		}
		private var b:b2Body;
		private var peFactory:PhysicsData;
		private var tempUserData:DisplayObject;
		private var tempBody:b2Body;

		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			peFactory = new PhysicsData();
			buildGame();
		}
		
		private function buildGame():void
		{
			// create desks
			var desk:b2Body = peFactory.createBody("desk",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.DESK));
			desk.SetPosition(new b2Vec2(80/30,123/30));
			desk.SetAngle(28/180*Math.PI);
			desk = peFactory.createBody("desk",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.DESK));
			desk.SetPosition(new b2Vec2(210/30,195/30));
			desk.SetAngle(18/180*Math.PI);
			desk = peFactory.createBody("desk",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.DESK));
			desk.SetPosition(new b2Vec2(348/30,240/30));
			desk.SetAngle(4/180*Math.PI);
			// create boxes
			var box:b2Body = peFactory.createBody("boxSmall",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BOX_SMALL));
			box.SetPosition(new b2Vec2(388/30,357/30));
			box = peFactory.createBody("boxSmall",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BOX_SMALL));
			box.SetPosition(new b2Vec2(443/30,303/30));
			box = peFactory.createBody("boxSmall",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BOX_SMALL));
			box.SetPosition(new b2Vec2(443/30,357/30));
			box = peFactory.createBody("boxBig",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BOX_BIG));
			box.SetPosition(new b2Vec2(493/30,247/30));
			box = peFactory.createBody("boxBig",world,0,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BOX_BIG));
			box .SetPosition(new b2Vec2(493/30,328/30));
			var basket:b2Body = peFactory.createBody("basket",world,2,PhysicsEditorAssets.getImage(PhysicsEditorAssets.BASKET));
			basket.SetPosition(new b2Vec2(510/30,190/30));
			
			var football:b2Body = peFactory.createBody(
				"football",world,2,
				PhysicsEditor.PhysicsEditorAssets.getImage(PhysicsEditor.PhysicsEditorAssets.FOOTBALL));
			football.SetPosition(new b2Vec2(100/30,30/30));
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			tempBody = world.GetBodyList();
			while(tempBody){
				tempUserData = tempBody.GetUserData();
				if(tempUserData!=null){
					if (!this.contains(tempUserData)) addChild(tempUserData);
					tempUserData.x = tempBody.GetPosition().x*30;
					tempUserData.y = tempBody.GetPosition().y*30;
					tempUserData.rotation = tempBody.GetAngle()*180/Math.PI;
				}
				tempBody = tempBody.GetNext();
			}
		}
	}
}