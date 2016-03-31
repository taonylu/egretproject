package 
{
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2FixtureDef;
	import Box2D.Dynamics.b2World;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	/**
	 * ...
	 * @author aaa
	 */
	public class Main extends MovieClip
	{
		private var world:b2World;              //物理世界
		private var delta:Number = 1 / 30;      //物理世界刷新频率
		private var posintionDelta:Number = 10; //物体碰撞时，单次step位置矫正次数
		private var velocityDelta:Number = 10;  //物体碰撞时，单次step速度矫正次数
		
		public function Main() 
		{
				
			createWorld();
			createCircle();
			createRect();
			createDebug();
			stage.addEventListener(Event.ENTER_FRAME, loop);
			
		}
		
		//每帧运行
		private function loop(e:Event) {
			world.Step(delta, velocityDelta, posintionDelta);
			world.DrawDebugData();
		}
		
		//创建世界
		private function createWorld() {
			//创建物理世界，初始化重力和静态物体睡眠
				var gravity:b2Vec2 = new b2Vec2(0, 9.8);
				var doSleep:Boolean = true;
				world = new b2World(gravity, doSleep);
		}
		
		//创建一个圆形
		private function createCircle() {
			var bd:b2BodyDef = new b2BodyDef();   //刚体属性
			bd.type = b2Body.b2_dynamicBody;
			bd.position = new b2Vec2(100 / 30, 100 / 30);
			
			var circle:b2CircleShape = new b2CircleShape(60 / 30);  //刚体形状
			var fd:b2FixtureDef = new b2FixtureDef();
			fd.shape = circle;
			
			var body:b2Body = world.CreateBody(bd); //创建刚体，绑定属性
			body.CreateFixture(fd);  //绑定形状
		}
		
		//创建一个矩形
		private function createRect() {
			var bd:b2BodyDef = new b2BodyDef();   //刚体属性
			bd.type = b2Body.b2_dynamicBody;
			bd.position = new b2Vec2(200 / 30, 100 / 30);
			
			var rect:b2PolygonShape = new b2PolygonShape();  //刚体形状
			rect.SetAsBox(50 / 30, 25 / 30);
			var fd:b2FixtureDef = new b2FixtureDef();
			fd.shape = rect;
			
			var body:b2Body = world.CreateBody(bd); //创建刚体，绑定属性
			body.CreateFixture(fd);  //绑定形状
		}
		
		//创建debug
		private function createDebug() {
			var debugSprite:Sprite = new Sprite();
			addChild(debugSprite);
			
			var debug:b2DebugDraw = new b2DebugDraw();
			debug.SetSprite(debugSprite);
			debug.SetDrawScale(30);
			debug.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			
			debug.SetFillAlpha(0.5);
			debug.SetLineThickness(1);
			
			world.SetDebugDraw(debug);
		}
	}

}











