package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	
	import b2PolygonShapeDemo.*;
	
	public class Whatisb2PolygonShape extends Sprite
	{
		public static var debugSprite:Sprite;
		
		public var demo:AbstractPolygonShapeDemo;
		public var demoList:Array;
		public var demoIndex:int=0;
		
		public static var title:TextField;
		public static var valueTxt:TextField;
		public static var tipTxt:TextField;
		public static var funTxt:TextField;
		public static var tipString:String="左右方向键切换演示属性\n";
		private var demoCounter:TextField;
		
		// for demo SetAsVector
		public static var verties:Vector.<b2Vec2>;
		private var dotList:Array;
		private var spritePressed:Sprite;
		private var centerX:Number =250, centerY:Number =200;
		public function Whatisb2PolygonShape()
		{
			stage.frameRate = 30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			addText();
			
			dotList = new Array();
			
			demoList = [
				DemoSetAsBox,
				DemoSetAsOrientedBox,
				DemoSetAsVector
				];
			demo = new demoList[0]();
			demoCounter.text = "1/"+demoList.length;
			
			stage.addEventListener(Event.ENTER_FRAME,loop);
			stage.addEventListener(MouseEvent.MOUSE_DOWN,mouseEventHandler);
			stage.addEventListener(MouseEvent.MOUSE_UP,mouseEventHandler);
			stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyBoardEventHandler);
		}
		
		protected function mouseEventHandler(event:MouseEvent):void
		{
			demo.mouseEventHandler(event);
			if (event.type == MouseEvent.MOUSE_DOWN) 
			{
				spritePressed = event.target as Sprite;
				
			}else if(event.type == MouseEvent.MOUSE_MOVE){
				if(spritePressed!=null && spritePressed.name =="dot"){
					spritePressed.x = mouseX;
					spritePressed.y = mouseY;
				}
			}else if(event.type == MouseEvent.MOUSE_UP){
				spritePressed = null;
				verties = new Vector.<b2Vec2>();
				for each (var d:Sprite in dotList) 
				{
					var bvec:b2Vec2 = new b2Vec2((d.x-centerX)/30,(d.y-centerY)/30);
					verties.push(bvec);
				}
			}
		}
		
		protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.LEFT || event.keyCode== Keyboard.RIGHT) 
			{
				if (event.keyCode == Keyboard.LEFT) 
				{
					if(--demoIndex<0) demoIndex=demoList.length-1;
				}
				else if (event.keyCode== Keyboard.RIGHT) 
				{
					if(++demoIndex>=demoList.length) demoIndex=0;
				}
				
				tipTxt.text=tipString;
				valueTxt.text ="";
				demo =  new demoList[demoIndex]();
				demoCounter.text = demoIndex+1 +"/"+ demoList.length;
				if (demo is DemoSetAsVector) 
				{
					createDots();
				}
				else
				{
					trace("remove");
					removeDots();
				}
			}
			
			if (event.keyCode == Keyboard.SPACE) 
			{
				demo.keyBoardEventHandler(event);
			}
		}
		
		protected function loop(event:Event):void
		{
			demo.update();
			if (dotList.length>0) 
			{
				debugSprite.graphics.lineStyle(1,0,0.5);
				debugSprite.graphics.moveTo(dotList[0].x,dotList[0].y);
				for each (var d:Sprite in dotList) 
				{
					debugSprite.graphics.lineTo(d.x,d.y);
				}
				debugSprite.graphics.lineTo(dotList[0].x,dotList[0].y);
				debugSprite.graphics.endFill();
			}
		}
		// for demo SetAsVector
		private function createDots():void
		{
			var angle:Number=0;
			
			var posX:Number, posY:Number;
			var radius:Number =50;
			verties = new Vector.<b2Vec2>();

			for (var i:int = 0; i < 6; i++) 
			{
				var d:Sprite = new Sprite();
				d.graphics.lineStyle(1,0);
				d.graphics.beginFill(0x0000FF,.5);
				d.graphics.drawCircle(0,0,5*i/6+3);
				d.graphics.endFill();
				d.name="dot";
				
				angle= i/6*Math.PI*2;
				posX = centerX + radius*Math.sin(angle);
				posY = centerY + radius*Math.cos(angle);
				d.x = posX;
				d.y = posY;
				addChild(d);
				dotList.push(d);
				
				var bvec:b2Vec2 = new b2Vec2((posX-centerX)/30,(posY-centerY)/30);
				verties.push(bvec);
			}
		}
		// for demo SetAsVector
		private function removeDots():void
		{
			while(dotList.length>0) 
			{
				removeChild(dotList.pop());
			}
			
		}
		private function addText():void
		{
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
			valueTxt.text="";
			valueTxt.width=300;
			valueTxt.textColor=0xCC0000;
			valueTxt.selectable=false;
			addChild(valueTxt);
			valueTxt.x=190;
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