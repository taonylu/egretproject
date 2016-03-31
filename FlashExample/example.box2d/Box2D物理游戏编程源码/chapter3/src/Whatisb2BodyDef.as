package 
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.ui.Keyboard;
	
	import b2BodyDefDemo.AbstractDemo;
	import b2BodyDefDemo.DemoActive;
	import b2BodyDefDemo.DemoAllowSleep;
	import b2BodyDefDemo.DemoAngle;
	import b2BodyDefDemo.DemoAngularDamping;
	import b2BodyDefDemo.DemoAngularVelocity;
	import b2BodyDefDemo.DemoAwake;
	import b2BodyDefDemo.DemoBullet;
	import b2BodyDefDemo.DemoFixedRotation;
	import b2BodyDefDemo.DemoInertiaScale;
	import b2BodyDefDemo.DemoLinearDamping;
	import b2BodyDefDemo.DemoLinearVelocity;
	import b2BodyDefDemo.DemoPosition;
	import b2BodyDefDemo.DemoType;
	import b2BodyDefDemo.DemoUserData;
	
//	[SWF(width="550",height="400")]
	public class Whatisb2BodyDef extends Sprite
	{
		public static var debugSprite:Sprite;
		
		public var demo:AbstractDemo;
		public var demoList:Array;
		public var demoIndex:int=0;
		
		public static var title:TextField;
		public static var valueTxt:TextField;
		public static var tipTxt:TextField;
		public static var funTxt:TextField;
		public static var tipString:String="左右方向键切换演示属性，空格键查看不同属性值效果";
		private var demoCounter:TextField;
		
		[Embed(source="assets/bird.png")]
		private var Bird:Class;
		[Embed(source="assets/pig.png")]
		private var Pig:Class;
		public static var bird:Sprite, pig:Sprite;
		private var birdBmp:Bitmap, pigBmp:Bitmap;
		
		public function Whatisb2BodyDef()
		{
			stage.frameRate = 30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			addText();
			
			demoList = [DemoActive,
				DemoAllowSleep, 
				DemoAwake,
				DemoAngle, 
				DemoAngularVelocity, 
				DemoAngularDamping,
				DemoFixedRotation,
				DemoInertiaScale,
				DemoLinearVelocity,
				DemoBullet,
				DemoLinearDamping,
				DemoPosition,
				DemoType,
				DemoUserData];
			demo = new demoList[0]();
			demoCounter.text = "1/"+demoList.length;
			
			bird=new Sprite();
			birdBmp = new Bird();
			birdBmp.x = -birdBmp.width/2;
			birdBmp.y = -birdBmp.height/2;
			bird.addChild(birdBmp);
			
			pig=new Sprite();
			pigBmp = new Pig();
			pigBmp.x = -pigBmp.width/2;
			pigBmp.y = -pigBmp.height/2;
			pig.addChild(pigBmp);
			
			stage.addEventListener(Event.ENTER_FRAME,loop);
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyBoardEventHandler);
		}
		
		protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			demo.keyBoardEventHandler(event);
			if (event.keyCode == Keyboard.LEFT) 
			{
				tipTxt.text=tipString;
				if(--demoIndex<0) demoIndex=demoList.length-1;
				demo =  new demoList[demoIndex]();
				demoCounter.text = demoIndex+1 +"/"+ demoList.length;
			}
			else if (event.keyCode== Keyboard.RIGHT) 
			{
				tipTxt.text=tipString;
				if(++demoIndex>=demoList.length) demoIndex=0;
				demo =  new demoList[demoIndex]();
				demoCounter.text = demoIndex+1 +"/"+ demoList.length;
			}
			
			if ( demoList[demoIndex] == DemoUserData) 
			{
				if(event.keyCode==Keyboard.SPACE) return;
				addChild(bird);
				addChild(pig);
				bird.x=pig.x=100;
				bird.y=100;
				pig.y=200;
			}else{
				if(this.contains(bird)) removeChild(bird);
				if(this.contains(pig)) removeChild(pig);
			}
		}
		
		protected function loop(event:Event):void
		{
			demo.update();
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
			demoCounter.x=460;
			demoCounter.y=350;
			demoCounter.selectable=false;
			addChild(demoCounter);
		}
		
	}
}