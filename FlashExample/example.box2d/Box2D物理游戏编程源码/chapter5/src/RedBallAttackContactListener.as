package
{
	import Box2D.Collision.b2WorldManifold;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class RedBallAttackContactListener extends b2ContactListener
	{
		public var isPlayerOnGround:Boolean = false;
		public var isPlayerTouchBoss:Boolean = false;
		public var isPlayerAttackBoss:Boolean = false;
		public var contactPoint:b2Vec2;
		
		private var app:RedBallAttack;
		public function RedBallAttackContactListener(main:RedBallAttack)
		{
			app = main;
		}
		override public function BeginContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array;
			checkResult = checkWithTarget(bodyA, bodyB, app.player,app.boss);
			if (checkResult != null) 
			{
				isPlayerTouchBoss = true;
				
				var worldMainfold:b2WorldManifold = new b2WorldManifold();
				contact.GetWorldManifold(worldMainfold);
				contactPoint = worldMainfold.m_points[0];
				
				var isOnBoss:Boolean = app.player.GetPosition().y < app.boss.GetPosition().y;
				var isMovingDown:Boolean = app.player.GetLinearVelocity().y > 0;
				var isTouchCorner:Boolean = false;
				var bossShape:b2PolygonShape = app.boss.GetFixtureList().GetShape() as b2PolygonShape;
				for each (var v:b2Vec2 in bossShape.GetVertices()) 
				{
					v = app.boss.GetWorldPoint(v);
					if (b2Math.Distance(v,contactPoint)*30<2) {
						isTouchCorner = true;
						break;
					}
				}
				
				if( isOnBoss && isMovingDown && !isTouchCorner){
					isPlayerAttackBoss = true;
				}
			}
			checkResult = checkWithTarget(bodyA, bodyB, app.player, app.ground);
			if(checkResult != null){
				isPlayerOnGround = true;
			}
		}
		private function checkWithTarget(checkA:b2Body,checkB:b2Body,targetA:b2Body,targetB:b2Body):Array{
			var checkResult:Array;
			if(checkA == targetA && checkB == targetB){
				checkResult=[checkA,checkB];
			}else if(checkA == targetB && checkB == targetA){
				checkResult=[checkB,checkA];
			}
			return checkResult;
		}
	}
}