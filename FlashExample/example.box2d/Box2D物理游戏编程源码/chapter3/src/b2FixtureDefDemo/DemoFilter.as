package b2FixtureDefDemo
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2FilterData;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	
	public class DemoFilter extends AbstractFixtureDemo
	{
		public function DemoFilter(gravity:Number=10)
		{
			super(gravity);
			editText("Filter",
				"读：GetFilterData():b2FilterData \n写：SetFilterData(filter:b2FilterData):void",
				"filter是一个b2FilterData属性，我们可以通过它的categoryBits和maskBits属性，设置碰撞筛选条件");
		}
		
		private var b1:b2Body, b2:b2Body, b3:b2Body;
		private var f1:b2Fixture;
		private var circleFilter:b2FilterData, rectFilter:b2FilterData;
		private var vsCircleFilter:b2FilterData, vsRectFilter:b2FilterData, vsBothFilter:b2FilterData;
		private var emptyFilter:b2FilterData;
		
		private var filterList:Array;
		private var filterNames:Array;
		private var filterIndex:int;
		
		override public function onBox2DWorldReady():void
		{
			b1 = LDEasyBody.createBox(250,300,200,50,0);
			b2 = LDEasyBody.createBox(250,100,80,30);
			b3 = LDEasyBody.createCircle(250,40,20);
			
			f1 = b1.GetFixtureList();
			//矩形刚体飞filter属性值
			rectFilter=new b2FilterData();
			rectFilter.categoryBits=2;		//二进制：0001
			rectFilter.maskBits=4;			//二进制：0010
			//圆形刚体的filter属性值
			circleFilter = new b2FilterData();
			circleFilter.categoryBits=6;	//二进制：0011
			circleFilter.maskBits=8;		//二进制：0100

			//为实现碰撞，静态刚体对应圆形和矩形刚体filter所创建的filter属性
			vsCircleFilter = collideFilterFor(circleFilter);
			vsRectFilter = collideFilterFor(rectFilter);
			
			vsBothFilter = new b2FilterData();
			vsBothFilter.categoryBits = rectFilter.maskBits | circleFilter.maskBits;
			vsBothFilter.maskBits = rectFilter.categoryBits | circleFilter.categoryBits;
			
			emptyFilter = new b2FilterData();
			
			filterList = [emptyFilter,vsRectFilter,vsCircleFilter, vsBothFilter];
			filterNames = ["emptyFilter","vsRectFilter","vsCircleFilter","vsBothFilter"];
			filterIndex=0;
			
			b2.GetFixtureList().SetFilterData(rectFilter);
			b3.GetFixtureList().SetFilterData(circleFilter);
			
			editValueText("empty");
		}
		private function collideFilterFor(filter:b2FilterData):b2FilterData
		{
			var f:b2FilterData = new b2FilterData();
			f.categoryBits = filter.maskBits;
			f.maskBits = filter.categoryBits;
			
			return f;
		}
		
		private function resetBodies():void
		{
			b2.SetAwake(true);
			b3.SetAwake(true);
			
			b2.SetPosition(b2Vec2.Make(250/30,100/30));
			b3.SetPosition(b2Vec2.Make(250/30,40/30));
		}
		override public function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.SPACE) 
			{
				resetBodies();
				if(++filterIndex>filterList.length-1) filterIndex=0;
				f1.SetFilterData(filterList[filterIndex]);
				editValueText(filterNames[filterIndex]);
			}
		}
	}
}