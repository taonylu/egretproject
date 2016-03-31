package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.ui.Keyboard;
	
	import b2FixtureDefDemo.AbstractFixtureDemo;
	import b2FixtureDefDemo.DemoDensity;
	import b2FixtureDefDemo.DemoFilter;
	import b2FixtureDefDemo.DemoFriction;
	import b2FixtureDefDemo.DemoIsSensor;
	import b2FixtureDefDemo.DemoRestitution;
	import b2FixtureDefDemo.DemoShape;

	public class Whatisb2FixtureDef extends Sprite
	{
		public static var debugSprite:Sprite;
		
		public var demo:AbstractFixtureDemo;
		public var demoList:Array;
		public var demoIndex:int=0;
		
		public static var title:TextField;
		public static var valueTxt:TextField;
		public static var tipTxt:TextField;
		public static var funTxt:TextField;
		public static var tipString:String="左右方向键切换演示属性，空格键查看不同属性值效果";
		private var demoCounter:TextField;
		
		public static var redRect:Sprite, blueRect:Sprite;
		
		public function Whatisb2FixtureDef()
		{
			stage.frameRate = 30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			addText();
			
			demoList = [DemoDensity,
				DemoFriction,
				DemoRestitution,
				DemoFilter,
				DemoIsSensor,
				DemoShape];
			demo = new demoList[0]();
			demoCounter.text = "1/"+demoList.length;
			
			redRect=drawRect(0xff0000);
			blueRect=drawRect(0x0000ff);
			stage.addEventListener(Event.ENTER_FRAME,loop);
//			stage.addEventListener(MouseEvent.MOUSE_DOWN,demo.mouseEventHandler);
//			stage.addEventListener(MouseEvent.MOUSE_UP,demo.mouseEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyBoardEventHandler);
		}
		
		protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			demo.keyBoardEventHandler(event);
			if (event.keyCode == Keyboard.LEFT) 
			{
				tipTxt.text=tipString;
				if(--demoIndex<0) demoIndex=demoList.length-1;
			}
			else if (event.keyCode== Keyboard.RIGHT) 
			{
				tipTxt.text=tipString;
				if(++demoIndex>=demoList.length) demoIndex=0;
				
			}
			if (event.keyCode!=Keyboard.LEFT && event.keyCode!=Keyboard.RIGHT) return;
			demo =  new demoList[demoIndex]();
			demoCounter.text = demoIndex+1 +"/"+ demoList.length;
		}
		
		protected function loop(event:Event):void
		{
			// TODO Auto-generated method stub
			demo.update();
		}
		private function drawRect(color:uint):Sprite
		{
			var s:Sprite;
			s = new Sprite();
			s.graphics.beginFill(color,0.6);
			s.graphics.drawRect(-25,-25,50,50);
			s.graphics.endFill();
			return s;
		}
		
		private function addText():void
		{
			// TODO Auto Generated method stub
			var textFormat:TextFormat = new TextFormat("Arial",20);
			textFormat.size=20;
			
			title = new TextField();
			title.defaultTextFormat=textFormat;
			title.text="ladeng";
			title.width=200;
			
			title.selectable=false;
			addChild(title);
			title.x=20;
			title.y=20;
			
			textFormat.align=TextFormatAlign.RIGHT;
			valueTxt = new TextField();
			valueTxt.defaultTextFormat=textFormat;
			valueTxt.text="ld";
			valueTxt.width=200;
			valueTxt.textColor=0xCC0000;
			valueTxt.selectable=false;
			addChild(valueTxt);
			valueTxt.x=290;
			valueTxt.y=20;
			
			graphics.beginFill(0,05);
			graphics.drawRect(20,45,220,1);
			graphics.endFill();
			
			textFormat.size=10;
			textFormat.align=TextFormatAlign.RIGHT;
			textFormat.font="微软雅黑";
			tipTxt = new TextField();
			tipTxt.defaultTextFormat=textFormat;
			tipTxt.text="左右方向键切换演示属性，空格键查看不同属性值效果";
			tipTxt.wordWrap=true;
			tipTxt.width=250;
			tipTxt.height=300;
			tipTxt.textColor=0x828282;
			tipTxt.selectable=false;
			addChild(tipTxt);
			tipTxt.x=240;
			tipTxt.y=50;
			
			textFormat.size=10;
			textFormat.align=TextFormatAlign.LEFT;
			textFormat.font="微软雅黑";
			funTxt = new TextField();
			funTxt.defaultTextFormat=textFormat;
			funTxt.text="读：\n写：";
			funTxt.wordWrap=true;
			funTxt.width=250;
			funTxt.height=300;
			funTxt.textColor=0x173492;
			funTxt.selectable=false;
			addChild(funTxt);
			funTxt.x=20;
			funTxt.y=50;
			
			demoCounter = new TextField();
			demoCounter.x=470;
			demoCounter.y=350;
			demoCounter.selectable=false;
			addChild(demoCounter);
		}
		
	}
}