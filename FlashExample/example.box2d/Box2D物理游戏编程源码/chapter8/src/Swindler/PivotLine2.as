package Swindler
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDMath;

	public class PivotLine2 extends EventDispatcher
	{
		public static const PIVOT_CHANGE:String="pivoteChange";
		private var SIDE_LEFT:Number = 1;
		private var SIDE_RIGHT:Number = -1;
		private var m_start:b2Vec2, m_end:b2Vec2;
		private var m_direction:b2Vec2;
		private var pivotObjects:Array;
		
		private var m_lastPivotObject:PivotObject;
		
		public function PivotLine2(start:b2Vec2,end:b2Vec2)
		{
			m_start = start;
			m_end = end;
			m_lastPivotObject = new PivotObject();
			m_lastPivotObject.point = start;
			pivotObjects = new Array();
		}
		public function addPivot(vertex:b2Vec2,obstacle:b2Fixture):void{
			var pivotDirection:b2Vec2 = b2Math.SubtractVV(vertex,m_lastPivotObject.point)
			var sideOfBlock:Number = getSideOfObstacle(obstacle,pivotDirection);
			
			var pivot:PivotObject = new PivotObject();
			pivot.sideOfObstacle = sideOfBlock;
			pivot.point = vertex;
			pivot.pivotDirection = pivotDirection;
			pivotObjects.push(pivot);
			m_lastPivotObject = pivot;
			
			dispatchEvent(new Event(PIVOT_CHANGE));
		}
		
		public function hasPivot(pivot:b2Vec2):Boolean{
			for (var i:int=0; i< pivotObjects.length;i++) 
			{
				var p:b2Vec2 = pivotObjects[i].point;
				if(b2Math.Distance(p,pivot)*30<1){
					if(i==pivotObjects.length-1){
						return true;
					}
				}
			}
			return false;
		}
		
		public function setEnd(v:b2Vec2):void{
			m_end = v;
			m_direction = b2Math.SubtractVV(m_end,m_lastPivotObject.point);
			if(pivotObjects.length>0) {
				checkBackSwing();
			}
		}
		public function getLastPivot():b2Vec2{
			return m_lastPivotObject.point;
		}
		public function getStart():b2Vec2{
			return m_start;
		}
		public function getEnd():b2Vec2{
			return m_end;
		}
		public function getDirection():b2Vec2{
			return m_direction;
		}
		public function getVertices():Array{
			var vertices:Array = [m_start];
			for each (var p:PivotObject in pivotObjects) 
			{
				vertices.push(p.point);
			}
			vertices.push(m_end);
			return vertices;
		}
		private function removeLastPivot():void{
			pivotObjects.pop();
			
			var len:Number = pivotObjects.length;
			if(len>0){
				m_lastPivotObject = pivotObjects[len-1];
			}else{
				m_lastPivotObject.point = m_start;
			}
		}
		private function checkBackSwing():void{
			var sideOfPlayer:Number = b2Math.CrossVV(m_direction,m_lastPivotObject.pivotDirection);
			if(sideOfPlayer*m_lastPivotObject.sideOfObstacle<0){
				removeLastPivot();
				dispatchEvent(new Event(PIVOT_CHANGE));
			}
		}
		private function getSideOfObstacle(obstacle:b2Fixture,direction:b2Vec2):Number{
			var body:b2Body = obstacle.GetBody();
			var shape:b2PolygonShape = obstacle.GetShape() as b2PolygonShape;
			var centerOfObstacle:b2Vec2 = b2PolygonShape.ComputeCentroid(shape.GetVertices(),shape.GetVertexCount());
			centerOfObstacle = body.GetWorldPoint(centerOfObstacle);
			
			var obstacleDirection:b2Vec2 = b2Math.SubtractVV(centerOfObstacle,m_lastPivotObject.point);
			var sideOfObstacle:Number = b2Math.CrossVV(obstacleDirection,direction);
			if(sideOfObstacle>0) {
				return SIDE_LEFT;
			}else{
				return SIDE_RIGHT;
			}
		}
	}
}
import Box2D.Common.Math.b2Vec2;

class PivotObject{
	public var sideOfObstacle:Number;
	public var pivotDirection:b2Vec2;
	public var point:b2Vec2;
	public function PivotObject(){}
}