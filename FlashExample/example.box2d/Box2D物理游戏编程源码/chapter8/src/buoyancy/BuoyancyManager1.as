package buoyancy
{
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.b2World;
	
	public class BuoyancyManager1
	{
		private var world:b2World
		
		private var waters:Array;
		private var fixturesInWater:Array;
		public function BuoyancyManager1(world:b2World)
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
		public function update():void
		{
			for(var i:int=0;i<waters.length; i++)
			{
				var water:b2Fixture = waters[i] as b2Fixture;
				var stuffsInThisWater:Array = fixturesInWater[i];
				var waterDensity:Number = water.GetDensity();
				if(stuffsInThisWater.length==0) continue;
				
				for each (var stuff:b2Fixture in stuffsInThisWater) 
				{
					var intersectionVertices:Vector.<b2Vec2> = Func.getIntersectionShape(water,	stuff);
					if( intersectionVertices!=null){
						var centerOfIntersection:b2Vec2 = b2PolygonShape.ComputeCentroid(
							intersectionVertices,
							intersectionVertices.length);
						var waterMass:Number = Func.getMassOfVertices(intersectionVertices,waterDensity);
						var buoyancyForce:b2Vec2 = world.GetGravity().Copy();
						buoyancyForce.NegativeSelf();
						buoyancyForce.Multiply(waterMass);
						
						var stuffBody:b2Body = stuff.GetBody();
						stuffBody.ApplyForce(buoyancyForce,centerOfIntersection);
					}
				}
			}
		}
	}
}