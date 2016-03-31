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

//Ported to AS3 by Allan Bishop http://allanbishop.com

package Box2D.Dynamics.Joints{

	
import Box2D.Common.Math.*;
import Box2D.Dynamics.Joints.*;
import Box2D.Dynamics.*;

import Box2D.Common.b2internal;
use namespace b2internal;


/// Rope joint definition. This requires two body anchor points and
/// a maximum lengths.
/// Note: by default the connected objects will not collide.
/// see collideConnected in b2JointDef.

public class b2RopeJointDef extends b2JointDef
{
	
	public function b2RopeJointDef()
	{
		type = b2Joint.e_ropeJoint;
		localAnchorA.Set(-1.0, 0.0);
		localAnchorB.Set(1.0, 0.0);
		maxLength = 0;
	}
	
	/**
	* Initialize the bodies, anchors, and length using the world
	* anchors.
	*/
	public function Initialize(bA:b2Body, bB:b2Body,anchorA:b2Vec2, anchorB:b2Vec2,maxLength:Number) : void
	{
		bodyA = bA;
		bodyB = bB;
		localAnchorA.SetV( bodyA.GetLocalPoint(anchorA));
		localAnchorB.SetV( bodyB.GetLocalPoint(anchorB));
		var dX:Number = anchorB.x - anchorA.x;
		var dY:Number = anchorB.y - anchorA.y;
		length = Math.sqrt(dX*dX + dY*dY);
		this.maxLength = maxLength;
	}

	/**
	* The local anchor point relative to body1's origin.
	*/
	public var localAnchorA:b2Vec2 = new b2Vec2();

	/**
	* The local anchor point relative to body2's origin.
	*/
	public var localAnchorB:b2Vec2 = new b2Vec2();

	/**
	* The max length between the anchor points.
	*/
	public var maxLength:Number;
	
	public var length:Number;


};

}