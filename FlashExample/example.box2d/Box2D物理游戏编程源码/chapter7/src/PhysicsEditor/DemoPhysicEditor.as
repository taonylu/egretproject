package PhysicsEditor
{
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import ldEasyBox2D.LDEasyBody;

	public class DemoPhysicEditor extends AbstractBox2DTest
	{
		
		public function DemoPhysicEditor(gravity:Number=10)
		{
			super(gravity);
		}
		private var peFactory:PhysicsData;
		private var assetsNameList:Array;
		private var assetsObject:Array;
		private var tempUserData:DisplayObject;
		private var tempBody:b2Body;
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			peFactory = new PhysicsData();
			assetsNameList = ["desk",
				"football",
				"boxSmall",
				"boxBig",
				"basket"];
			assetsObject = [PhysicsEditorAssets.DESK,
							PhysicsEditorAssets.FOOTBALL,
							PhysicsEditorAssets.BOX_SMALL,
							PhysicsEditorAssets.BOX_BIG,
							PhysicsEditorAssets.BASKET];
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			super.mouseEventHandler(event);
			if(event.type == MouseEvent.MOUSE_DOWN){
				var randomIndex:int = Math.floor(Math.random()*assetsNameList.length);
				var assetName:String = assetsNameList[randomIndex];
				var asset:Bitmap = PhysicsEditorAssets.getImage(assetsObject[randomIndex]);
				var b:b2Body = peFactory.createBody(assetName,world,2,asset);
				b.SetPosition(new b2Vec2(mouseX/30,mouseY/30));
				addChild(b.GetUserData());
				b.GetUserData().x = mouseX;
				b.GetUserData().y = mouseY;
			}
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			tempBody = world.GetBodyList();
			while(tempBody){
				tempUserData = tempBody.GetUserData();
				if(tempUserData!=null){
					tempUserData.x = tempBody.GetPosition().x*30;
					tempUserData.y = tempBody.GetPosition().y*30;
					tempUserData.rotation = tempBody.GetAngle()*180/Math.PI;
				}
				tempBody = tempBody.GetNext();
			}
		}
	}
}