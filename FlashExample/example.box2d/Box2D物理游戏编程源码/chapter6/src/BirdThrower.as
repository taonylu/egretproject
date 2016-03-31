package
{
	import flash.display.DisplayObjectContainer;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.tools.LDBodyTrail;
	
	public class BirdThrower extends Sprite
	{
		public var isBirdPressed:Boolean = false;
		public var isBirdMoving:Boolean = false;
		public var maxThrowImpulse:Number = 3;
		private var bird:b2Body;
		private var mousePoint:b2Vec2 = new b2Vec2();
		
		private var activeSize:Number = 70;
		private var distanceToCenter:b2Vec2;
		private var center:b2Vec2;
		
		private var trail:LDBodyTrail;
		private var dragLine:Shape;
		
		public function BirdThrower(parent:DisplayObjectContainer,bird:b2Body,posX:Number,posY:Number)
		{
			parent.addChild(this);
			this.bird = bird;
			this.x = posX;
			this.y = posY;
			bird.SetPosition(new b2Vec2(posX/30,posY/30));
			bird.SetActive(false);
			center = bird.GetPosition().Copy();
			drawActiveSize();
			
			trail = new LDBodyTrail(this,bird);
			trail.x = -posX;
			trail.y = -posY;
			
			dragLine = new Shape();
			addChild(dragLine);
		}
		private function drawActiveSize():void
		{
			graphics.lineStyle(2,0);
			graphics.lineTo(0, activeSize);
			graphics.lineStyle(1,0);
			graphics.drawCircle(0,0,5);
			graphics.lineStyle(1,0xff0000,0.1);
			graphics.drawCircle(0,0,activeSize);
			
			graphics.lineStyle(1,0);
			graphics.beginFill(0);
			graphics.drawEllipse(-10,activeSize,20,5);
			graphics.endFill();
			
		}
		public function onMouseDown(me:MouseEvent):void
		{
			if(isBirdMoving) return;
			bird.SetActive(false);
			mousePoint.x = me.stageX/30;
			mousePoint.y = me.stageY/30;
			isBirdPressed = bird.GetFixtureList().GetShape().TestPoint(bird.GetTransform(),mousePoint);
		}
		public function onMouseUp(me:MouseEvent):void
		{
			if(isBirdPressed){
				isBirdPressed = false;
				bird.SetActive(true);
				var impulse:b2Vec2 = distanceToCenter.Copy();
				impulse.Multiply(bird.GetMass()* maxThrowImpulse);
				bird.ApplyImpulse(impulse,bird.GetPosition());
				isBirdMoving = true;
				trail.startFromHere();
				dragLine.graphics.clear();
			}
		}
		public function onMouseMove(me:MouseEvent):void
		{
			mousePoint.x = me.stageX/30;
			mousePoint.y = me.stageY/30;
			if(isBirdPressed){
				distanceToCenter = b2Math.SubtractVV(center,mousePoint);
				
				if(distanceToCenter.Length()*30 >= activeSize){
					distanceToCenter.Multiply(activeSize/30/distanceToCenter.Length());
					mousePoint = b2Math.SubtractVV(center,distanceToCenter);
				}
				bird.SetPosition(mousePoint);
				
				dragLine.graphics.clear();
				dragLine.graphics.lineStyle(1,0);
				dragLine.graphics.lineTo(mousePoint.x*30-x,mousePoint.y*30-y);
			}
		}
		public function drawTrail():void
		{
			if(isBirdMoving){
				trail.update();
			}
		}
		public function setActiveSize(value:Number):void
		{
			activeSize = value;
			drawActiveSize();
		}
		public function reset():void
		{
			isBirdMoving = false;
			bird.SetLinearVelocity(new b2Vec2());
			bird.SetAngularVelocity(0);
			bird.SetAngle(0);
			bird.SetPosition(center);
			bird.SetActive(false);
			setTrailColor(0);
		}
		public function setTrailColor(color:uint):void
		{
			trail.setTrailColor(color);
		}
	}
}