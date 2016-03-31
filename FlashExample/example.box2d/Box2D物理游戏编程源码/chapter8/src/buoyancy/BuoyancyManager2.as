package buoyancy
{
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.b2World;
	
	public class BuoyancyManager2
	{
		public var debug:b2DebugDraw;
		private var world:b2World
		
		private var waters:Array;
		private var fixturesInWater:Array;
		public function BuoyancyManager2(world:b2World)
		{
			this.world = world;
			waters = [];
			fixturesInWater = [];
		}
		public function addWater(water:b2Fixture):void{
			if(water.IsSensor()==false) return;
			fixturesInWater.push([]);
			waters.push(water);
		}
		public function addStuffIntoWater(f:b2Fixture,water:b2Fixture):void{
			var index:Number = waters.indexOf(water);
			if(index<0) return;
			var fixtureIndex:Number = fixturesInWater[index].indexOf(f);
			if(fixtureIndex==-1){
				fixturesInWater[index].push(f);
			}
		}
		public function removeStuffFromWater(f:b2Fixture,water:b2Fixture):void{
			var index:Number = waters.indexOf(water);
			if(index<0) return;
			var fixtureIndex:Number = fixturesInWater[index].indexOf(f);
			if(fixtureIndex>=0){
				fixturesInWater[index].splice(fixtureIndex,1);
			}
		}
		private var tempForce:b2Vec2;
		private var intersectionVertices:Vector.<b2Vec2>
		public function update():void{
			for(var i:int=0;i<waters.length; i++)
			{
				var water:b2Fixture = waters[i] as b2Fixture;
				var stuffsInThisWater:Array = fixturesInWater[i];
				var waterDensity:Number = water.GetDensity();
				var waterBody:b2Body = water.GetBody();
				if(stuffsInThisWater.length==0) continue;
				
				for each (var stuff:b2Fixture in stuffsInThisWater) 
				{
					var stuffBody:b2Body = stuff.GetBody();
					var intersectionVertices:Vector.<b2Vec2> = Func.getIntersectionShape(water,	stuff);
					if( intersectionVertices!=null){
						var centerOfIntersection:b2Vec2 = b2PolygonShape.ComputeCentroid(
							intersectionVertices,
							intersectionVertices.length);
						var waterMass:Number = Func.getMassOfVertices(intersectionVertices,waterDensity);
						tempForce = world.GetGravity().Copy();
						tempForce.NegativeSelf();
						tempForce.Multiply(waterMass);
						stuffBody.ApplyForce(tempForce,centerOfIntersection);
						
						var len:Number = intersectionVertices.length;
						for (var j:int = 0; j < len; j++) 
						{
							var p1:b2Vec2 = intersectionVertices[(len-1+j)%len];
							var p2:b2Vec2 = intersectionVertices[j];
							var edge:b2Vec2 = b2Math.SubtractVV(p2,p1);
							var middlePoint:b2Vec2 = Func.getMiddlePoint(p1,p2);
							
							var velWater:b2Vec2 = waterBody.GetLinearVelocityFromWorldPoint(middlePoint);
							var velStuff:b2Vec2 = stuffBody.GetLinearVelocityFromWorldPoint(middlePoint);
							var velDiff:b2Vec2 = b2Math.SubtractVV(velStuff,velWater);
							var v:Number = velDiff.Normalize();
							
							var edgePerp:b2Vec2 = b2Math.CrossFV(-1,edge);
							var dot:Number = b2Math.Dot(edgePerp,velDiff);
							if(dot>0){
								var A:Number = Math.abs(b2Math.CrossVV(edge,velDiff));
								
								var Fd:Number = 0.5*v*v*A*water.GetDensity();
								var force:b2Vec2 = velDiff.Copy();
								force.NegativeSelf();
								force.Multiply(Fd);
								stuffBody.ApplyForce(force,middlePoint);
							}
						}
					}
				}
			}
		}
	}
}