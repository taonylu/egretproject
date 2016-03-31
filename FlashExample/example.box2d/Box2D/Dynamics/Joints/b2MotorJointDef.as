/*
* Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/

//Ported to AS3 by Dony.Ladeng6666 http://www.ladeng6666.com

package Box2D.Dynamics.Joints{

	
import Box2D.Common.b2internal;
import Box2D.Common.Math.b2Vec2;
import Box2D.Dynamics.b2Body;

use namespace b2internal;


public class b2MotorJointDef extends b2JointDef
{
	
	public function b2MotorJointDef()
	{
		type = b2Joint.e_motorJoint;
		linearOffset.SetZero();
		angularOffset = 0.0;
		maxForce = 1.0;
		maxTorque = 1.0;
		correctionFactor = 0.3;
	}
	
	/**
	* Initialize the bodies
	*/
	public function Initialize(bA:b2Body, bB:b2Body) : void
	{
		bodyA = bA;
		bodyB = bB;
		var xB:b2Vec2 = bodyB.GetPosition();
		linearOffset = bodyA.GetLocalPoint(xB);
		
		var angleA:Number = bodyA.GetAngle();
		var angleB:Number = bodyB.GetAngle();
		angularOffset = angleB - angleA;
	}
	/// Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.
	public var linearOffset:b2Vec2 = new b2Vec2(0,0);
	
	/// The bodyB angle minus bodyA angle in radians.
	public var angularOffset:Number;
	
	/// The maximum motor force in N.
	public var maxForce:Number;
	
	/// The maximum motor torque in N-m.
	public var maxTorque:Number;
	
	/// Position correction factor in the range [0,1].
	public var correctionFactor:Number;

};
}