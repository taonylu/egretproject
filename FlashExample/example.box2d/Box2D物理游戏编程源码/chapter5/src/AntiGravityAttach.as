package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Mat22;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Transform;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDMath;
	import ldEasyBox2D.tools.LDBodyTrail;

	public class AntiGravityAttach extends AbstractBox2DTest
	{
		public function AntiGravityAttach(gravity:Number=10)
		{
			super(gravity);
		}
		public const USER_DATA_PLAYER:String = "player";
		public const USER_DATA_PLANET:String = "planet";
		private var contactListener:AntiGravityAttachContactListener;
		private var planet1:b2Body, planet2:b2Body, player:b2Body;
		private var contactedPlanet:b2Body;
		
		private var isPlayerJumping:Boolean = false;
		private var trail:LDBodyTrail;
		
		private var localVectorPlayerOnPlanet:b2Vec2;
		private var playerSize:Number, planetRadius:Number;
		
		override public function box2DAppReady():void
		{
			planetRadius = 60;
			planet1=LDEasyBody.createCircle(120,200,planetRadius,1);
			planet1.SetAngularVelocity(Math.PI/2);
			planet1.SetUserData(USER_DATA_PLANET);
			
			planet2=LDEasyBody.createCircle(350,250,planetRadius,1);
			planet2.SetAngularVelocity(-Math.PI/2);
			planet2.SetUserData(USER_DATA_PLANET);
			
			playerSize = 20;
			player = LDEasyBody.createBox(150,-50,playerSize,playerSize);
			player.SetUserData(USER_DATA_PLAYER);
			
			contactListener = new AntiGravityAttachContactListener(this);
			world.SetContactListener(contactListener);
			
			trail = new LDBodyTrail(this,player);
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			if(contactListener.isPlayerTouchPlanet){
				contactedPlanet = contactListener.contactedPlanet;
				attachPlayerToPlanet();
				contactListener.isPlayerTouchPlanet = false;
				isPlayerJumping = false;
			}
			player.SetAngle(LDMath.getAngle(player.GetLinearVelocity()));
			checkBoundary();
			
			if(isPlayerJumping) {
				trail.update();
			}
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type == MouseEvent.MOUSE_DOWN) 
			{
				if(contactedPlanet!=null){
					var toBeDestroy:b2Body = contactedPlanet.Split(function(f:b2Fixture):Boolean{
						return f.GetUserData() == USER_DATA_PLAYER;
					});
					world.DestroyBody(toBeDestroy);
					resumePlayerAndJump();
					contactedPlanet = null;
				}
			}
		}
		public function attachPlayerToPlanet():void			
		{
			var localDistanceToAttach:Number = playerSize/2 + planetRadius;
			
			var distancePlayerToPlanet:b2Vec2 = b2Math.SubtractVV(player.GetPosition(),contactedPlanet.GetPosition());
			localVectorPlayerOnPlanet = contactedPlanet.GetLocalVector(distancePlayerToPlanet);
			localVectorPlayerOnPlanet.Normalize();
			localVectorPlayerOnPlanet.Multiply(localDistanceToAttach/30);
			
			var transform:b2Transform = new b2Transform();
			transform.position = localVectorPlayerOnPlanet;
			transform.R = b2Mat22.FromAngle(LDMath.getAngle(localVectorPlayerOnPlanet));
			
			var playerShape:b2PolygonShape=player.GetFixtureList().GetShape() as b2PolygonShape;
			var vertices:Vector.<b2Vec2> = new Vector.<b2Vec2>();
			for each (var v:b2Vec2 in playerShape.GetVertices()) 
			{
				v = b2Math.MulX(transform,v);
				vertices.push(v);
			}
			
			var newShapeOfPlanet:b2PolygonShape = b2PolygonShape.AsVector(vertices,0);
			var newFixtureOfPlanet:b2Fixture = contactedPlanet.CreateFixture2(newShapeOfPlanet,3);
			newFixtureOfPlanet.SetUserData(USER_DATA_PLAYER);
			
			player.SetActive(false);
			player.SetPosition(new b2Vec2(-2,-2));
		}
		private function resumePlayerAndJump():void
		{
			var worldPositionOfPlayer:b2Vec2 = contactedPlanet.GetWorldPoint(localVectorPlayerOnPlanet);
			var worldVectorOfPosition:b2Vec2 = contactedPlanet.GetWorldVector(localVectorPlayerOnPlanet);
			var angle:Number = LDMath.getAngle(worldVectorOfPosition);
			
			player.SetPosition(worldPositionOfPlayer);
			player.SetAngle(angle);
			player.SetLinearVelocity(new b2Vec2());
			player.SetActive(true);
			
			var impulse:b2Vec2 = worldVectorOfPosition.Copy();
			impulse.Normalize();
			impulse.Multiply(player.GetMass()*10);
			player.ApplyImpulse(impulse,player.GetPosition());
			
			isPlayerJumping = true;
			trail.startFromHere();
		}
		
		private function checkBoundary():void
		{
			var p:b2Vec2 = player.GetPosition();
			if(p.y*30>400 || p.x*30<-20 || p.x*30>520){
				player.SetPosition(new b2Vec2(150/30, -20/30));
				player.SetLinearVelocity(new b2Vec2());
				player.SetAngle(0);
				player.SetAngularVelocity(0);
				isPlayerJumping = false;
			}
		}
	}
}
