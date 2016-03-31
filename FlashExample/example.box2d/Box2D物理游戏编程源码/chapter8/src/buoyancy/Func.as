package buoyancy
{
	import com.logicom.geom.ClipType;
	import com.logicom.geom.Clipper;
	
	import flash.geom.Point;
	
	import Box2D.Collision.Shapes.b2MassData;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Collision.Shapes.b2Shape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;

	public class Func
	{
		public function Func()
		{
		}
		public static function getIntersectionShape(fixtureA:b2Fixture,fixtureB:b2Fixture):Vector.<b2Vec2>{
			if(fixtureA.GetShape().GetType() != b2Shape.e_polygonShape) return null;
			if(fixtureB.GetShape().GetType() != b2Shape.e_polygonShape) return null;
			var polyA:b2PolygonShape = fixtureA.GetShape() as b2PolygonShape;
			var polyB:b2PolygonShape = fixtureB.GetShape() as b2PolygonShape;
			var verticesA:Vector.<b2Vec2> = polyA.GetVertices();
			var verticesB:Vector.<b2Vec2> = polyB.GetVertices();
			verticesA = localVerticesToWorld(verticesA,fixtureA.GetBody());
			verticesB = localVerticesToWorld(verticesB,fixtureB.GetBody());
			
			var pointsA:Array = VecVToPointA(verticesA);
			var pointsB:Array = VecVToPointA(verticesB);
			var pointsIntersection:Array = Clipper.clipPolygon(pointsA,pointsB, ClipType.INTERSECTION);
			if(pointsIntersection.length==0) return null;
			var verticesIntersection:Vector.<b2Vec2> = PointAToVecV(pointsIntersection[0]);
			return verticesIntersection;
		}
		public static function getMassOfVertices(vertices:Vector.<b2Vec2>,density):Number{
			var polyShape:b2PolygonShape = b2PolygonShape.AsVector(vertices,vertices.length);
			var md:b2MassData = new b2MassData();
			polyShape.ComputeMass(md,density);
			polyShape = null;
			return md.mass;
		}
		public static function getMiddlePoint(p1:b2Vec2,p2:b2Vec2):b2Vec2{
			var distance:b2Vec2 = b2Math.SubtractVV(p2,p1);
			distance.Multiply(0.5);
			var middlePoint:b2Vec2 = b2Math.AddVV(p1,distance);
			return middlePoint;
		}
//		static public function project(vector:b2Vec2, to:b2Vec2):b2Vec2 
//		{
//			var toNormal:b2Vec2 = to.Copy();
//			var dot:Number = b2Math.Dot(vector, toNormal);
//			
//			var vx:Number = dot * toNormal.x;
//			var vy:Number = dot * toNormal.y;
//			
//			return new b2Vec2(vx,vy);
//		}
		private static function localVerticesToWorld(localVertices:Vector.<b2Vec2>,body:b2Body):Vector.<b2Vec2>{
			var worldVertices:Vector.<b2Vec2> = new Vector.<b2Vec2>();
			for each (var lv:b2Vec2 in localVertices) 
			{
				worldVertices.push(body.GetWorldPoint(lv));
			}
			return worldVertices;
			
		}
		public static function VecVToPointA(vv:Vector.<b2Vec2>):Array{
			var pArr:Array =[];
			var p:Point;
			for each (var v:b2Vec2 in vv) 
			{
				p=new Point(v.x*30,v.y*30);
				pArr.push(p);
			}
			return pArr;
		}
		public static function PointAToVecV(pa:Array):Vector.<b2Vec2>{
			var vv:Vector.<b2Vec2> = new Vector.<b2Vec2>();
			var v:b2Vec2;
			for each (var p:Point in pa) 
			{
				v =new b2Vec2(p.x/30,p.y/30);
				vv.push(v);
			}
			return vv;
		}
	}
}