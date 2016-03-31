package PhysicsEditor
{
	import Box2D.Dynamics.*;
	import Box2D.Collision.*;
	import Box2D.Collision.Shapes.*;
	import Box2D.Common.Math.*;
    import flash.utils.Dictionary;

    public class PhysicsData extends Object
	{
		// ptm ratio
        public var ptm_ratio:Number = 30;
		
		// the physcis data 
		var dict:Dictionary;

        public function createBody(name:String, world:b2World, bodyType:uint, userData:*):b2Body
        {
            var fixtures:Array = dict[name];

            var body:b2Body;
            var f:Number;

            // prepare body def
            var bodyDef:b2BodyDef = new b2BodyDef();
            bodyDef.type = bodyType;
            bodyDef.userData = userData;

            // create the body
            body = world.CreateBody(bodyDef);

            // prepare fixtures
            for(f=0; f<fixtures.length; f++)
            {
                var fixture:Array = fixtures[f];
                var fixtureDef:b2FixtureDef = new b2FixtureDef();

                fixtureDef.density=fixture[0];
                fixtureDef.friction=fixture[1];
                fixtureDef.restitution=fixture[2];

                fixtureDef.filter.categoryBits = fixture[3];
                fixtureDef.filter.maskBits = fixture[4];
                fixtureDef.filter.groupIndex = fixture[5];
                fixtureDef.isSensor = fixture[6];

                if(fixture[7] == "POLYGON")
                {                    
                    var p:Number;
                    var polygons:Array = fixture[8];
                    for(p=0; p<polygons.length; p++)
                    {
                        var polygonShape:b2PolygonShape = new b2PolygonShape();
                        polygonShape.SetAsArray(polygons[p], polygons[p].length);
                        fixtureDef.shape=polygonShape;

                        body.CreateFixture(fixtureDef);
                    }
                }
                else if(fixture[7] == "CIRCLE")
                {
                    var circleShape:b2CircleShape = new b2CircleShape(fixture[9]);                    
                    circleShape.SetLocalPosition(fixture[8]);
                    fixtureDef.shape=circleShape;
                    body.CreateFixture(fixtureDef);                    
                }                
            }
            return body;
        }

        public function PhysicsData(): void
		{
			dict = new Dictionary();
			dict["basket"] = [
				[
					// density, friction, restitution
	                2, 0.5, 0,
	                // categoryBits, maskBits, groupIndex, isSensor
					1, 65535, 0, false,
					'POLYGON',
	                // vertexes of decomposed polygons
	                [
	                    [   new b2Vec2(3/ptm_ratio, 12/ptm_ratio)  ,  
							new b2Vec2(7/ptm_ratio, 6/ptm_ratio)  ,  
							new b2Vec2(11/ptm_ratio, 4/ptm_ratio)  , 
							new b2Vec2(103/ptm_ratio, 4/ptm_ratio)  , 
							new b2Vec2(105/ptm_ratio, 17/ptm_ratio)  , 
							new b2Vec2(104/ptm_ratio, 31/ptm_ratio)  , 
							new b2Vec2(8/ptm_ratio, 18/ptm_ratio)  ,  
							new b2Vec2(3/ptm_ratio, 16/ptm_ratio)  ] ,
	                    [   new b2Vec2(105/ptm_ratio, 17/ptm_ratio)  , 
							new b2Vec2(103/ptm_ratio, 4/ptm_ratio)  ,  
							new b2Vec2(109/ptm_ratio, 9/ptm_ratio)  ,  
							new b2Vec2(109/ptm_ratio, 16/ptm_ratio)  ] ,
	                    [   new b2Vec2(89/ptm_ratio, 58/ptm_ratio)  ,  
							new b2Vec2(24/ptm_ratio, 58/ptm_ratio)  ,  
							new b2Vec2(16/ptm_ratio, 52/ptm_ratio)  ,  
							new b2Vec2(8/ptm_ratio, 18/ptm_ratio)  ,  
							new b2Vec2(104/ptm_ratio, 31/ptm_ratio)  , 
							new b2Vec2(98/ptm_ratio, 52/ptm_ratio)  ,  
							new b2Vec2(95/ptm_ratio, 56/ptm_ratio)  ] ,
	                    [   new b2Vec2(16/ptm_ratio, 52/ptm_ratio)  , 
							new b2Vec2(24/ptm_ratio, 58/ptm_ratio)  ,  
							new b2Vec2(19/ptm_ratio, 56/ptm_ratio)  ]
					]
				]
			];
			/** 
			 *其他部分代码，保存了相同结构的数据， 
			 * 
			 */
			dict["boxBig"] = [
				[
					// density, friction, restitution
                    2, 0.5, 0,
                    // categoryBits, maskBits, groupIndex, isSensor
					1, 65535, 0, false,
					'POLYGON',

                    // vertexes of decomposed polygons
                    [

                        [   new b2Vec2(8/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(87/ptm_ratio, 5/ptm_ratio)  ,  new b2Vec2(89.5/ptm_ratio, 9/ptm_ratio)  ,  new b2Vec2(86/ptm_ratio, 87/ptm_ratio)  ,  new b2Vec2(6/ptm_ratio, 87/ptm_ratio)  ,  new b2Vec2(3.5/ptm_ratio, 84/ptm_ratio)  ,  new b2Vec2(2.5/ptm_ratio, 5/ptm_ratio)  ] ,
                        [   new b2Vec2(86/ptm_ratio, 87/ptm_ratio)  ,  new b2Vec2(89.5/ptm_ratio, 9/ptm_ratio)  ,  new b2Vec2(89.5/ptm_ratio, 84/ptm_ratio)  ]
					]
				]
			];

			dict["boxSmall"] = [
				[
					// density, friction, restitution
                    2, 0.5, 0,
                    // categoryBits, maskBits, groupIndex, isSensor
					1, 65535, 0, false,
					'POLYGON',
                    // vertexes of decomposed polygons
                    [
                        [   new b2Vec2(57.5/ptm_ratio, 50/ptm_ratio)  ,  new b2Vec2(54.5/ptm_ratio, 55/ptm_ratio)  ,  new b2Vec2(6/ptm_ratio, 55.5/ptm_ratio)  ,  new b2Vec2(3/ptm_ratio, 52/ptm_ratio)  ,  new b2Vec2(2/ptm_ratio, 6/ptm_ratio)  ,  new b2Vec2(3/ptm_ratio, 2/ptm_ratio)  ,  new b2Vec2(52/ptm_ratio, 2/ptm_ratio)  ,  new b2Vec2(57.5/ptm_ratio, 5/ptm_ratio)  ]
					]
				]
			];
			dict["desk"] = [
				[
					// density, friction, restitution
                    2, 0.5, 0,
                    // categoryBits, maskBits, groupIndex, isSensor
					1, 65535, 0, false,
					'POLYGON',
                    // vertexes of decomposed polygons
                    [
                        [   new b2Vec2(4/ptm_ratio, 6/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(133/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(125/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(4/ptm_ratio, 15/ptm_ratio)  ] ,
                        [   new b2Vec2(14/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(25/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(25/ptm_ratio, 33/ptm_ratio)  ,  new b2Vec2(23/ptm_ratio, 35/ptm_ratio)  ,  new b2Vec2(14/ptm_ratio, 35/ptm_ratio)  ] ,
                        [   new b2Vec2(116/ptm_ratio, 35/ptm_ratio)  ,  new b2Vec2(114/ptm_ratio, 34/ptm_ratio)  ,  new b2Vec2(114/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(125/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(125/ptm_ratio, 35/ptm_ratio)  ] ,
                        [   new b2Vec2(136/ptm_ratio, 12/ptm_ratio)  ,  new b2Vec2(135/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(125/ptm_ratio, 15/ptm_ratio)  ,  new b2Vec2(133/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(136/ptm_ratio, 7/ptm_ratio)  ]
					]
				]
			];

			dict["football"] = [
				[
					// density, friction, restitution
                    2, 0.5, 0.8,
                    // categoryBits, maskBits, groupIndex, isSensor
					1, 65535, 0, false,
					'CIRCLE',
                    // center, radius
                    new b2Vec2(28.462/ptm_ratio,29.189/ptm_ratio),
                    25.000/ptm_ratio
				]
			];
		}
	}
}
