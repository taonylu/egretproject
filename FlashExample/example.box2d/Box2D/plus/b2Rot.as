package Box2D.plus
{
	import Box2D.Common.Math.b2Vec2;

	public class b2Rot
	{
		/// Sine and cosine
		public var s:Number,c:Number;
		public function b2Rot(angle:Number)
		{
			s = Math.sin(angle);
			c = Math.cos(angle);
		}
		
		/// Set using an angle in radians.
		public function Set(angle:Number):void
		{
			s = Math.sin(angle);
			c = Math.cos(angle);
		}
		
		/// Set to the identity rotation
		public function SetIdentity():void
		{
			s = 0.0;
			c = 1.0;
		}
		
		/// Get the angle in radians
		public function GetAngle():Number
		{
			return Math.atan2(s, c);
		}
		
		/// Get the x-axis
		public function GetXAxis():b2Vec2
		{
			return new b2Vec2(c, s);
		}
		
		/// Get the u-axis
		public function GetYAxis():b2Vec2
		{
			return new b2Vec2(-s, c);
		}
	}
}