package Swindler
{
	import flash.events.EventDispatcher;
	
	import Box2D.Common.Math.b2Vec2;

	public class PivotLine1 extends EventDispatcher
	{
		private var m_start:b2Vec2, m_end:b2Vec2;
		private var pivots:Array;
		
		public function PivotLine1(start:b2Vec2,end:b2Vec2)
		{
			m_start = start;
			m_end = end;
			pivots = new Array();
		}
		public function addPivot(v:b2Vec2):void{
			pivots.push(v);
		}
		public function setEnd(v:b2Vec2):void{
			m_end = v;
		}
		public function getStart():b2Vec2{
			return m_start;
		}
		public function getEnd():b2Vec2{
			return m_end;
		}
		public function getVertices():Array{
			var vertices:Array = [m_start];
			for each (var p:b2Vec2 in pivots) 
			{
				vertices.push(p);
			}
			vertices.push(m_end);
			return vertices;
		}
	}
}