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
//Version 1.01
//
//Changes
//---------
//*Fixed bug when anchor is not set to centre and gravity is set to 0

/**
 * 2014-09-09 Adding APIs below according to Box2D 2.3.0 of C++
 * @author by Dony.ladeng6666; @link www.ladeng6666.com
 * 	GetLocalAnchorA()
 * 	GetLocalAnchorB()
 * 	SetMaxLength()
 */

package Box2D.Dynamics.Joints{
	
import Box2D.Common.b2Settings;
import Box2D.Common.b2internal;
import Box2D.Common.Math.b2Mat22;
import Box2D.Common.Math.b2Math;
import Box2D.Common.Math.b2Vec2;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2TimeStep;
use namespace b2internal;

/// A rope joint enforces a maximum distance between two points
/// on two bodies. It has no other effect.
/// Warning: if you attempt to change the maximum length during
/// the simulation you will get some non-physical behavior.
/// A model that would allow you to dynamically modify the length
/// would have some sponginess, so I chose not to implement it
/// that way. See b2DistanceJoint if you want to dynamically
/// control length.

// Limit:
// C = norm(pB - pA) - L
// u = (pB - pA) / norm(pB - pA)
// Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
// J = [-u -cross(rA, u) u cross(rB, u)]
// K = J * invM * JT
//   = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2


public class b2RopeJoint extends b2Joint
{
	/** @inheritDoc */
	public override function GetAnchorA():b2Vec2{
		return m_bodyA.GetWorldPoint(m_localAnchor1);
	}
	/** @inheritDoc */
	public override function GetAnchorB():b2Vec2{
		return m_bodyB.GetWorldPoint(m_localAnchor2);
	}
	
	/** @inheritDoc */
	public override function GetReactionForce(inv_dt:Number):b2Vec2
	{
		//b2Vec2 F = (m_inv_dt * m_impulse) * m_u;
		//return F;
		return new b2Vec2(inv_dt * m_impulse * m_u.x, inv_dt * m_impulse * m_u.y);
	}

	/** @inheritDoc */
	public override function GetReactionTorque(inv_dt:Number):Number
	{
		//B2_NOT_USED(inv_dt);
		return 0.0;
	}
	
	/// Set the natural length
	public function GetMaxLength():Number
	{
		return m_maxLength;
	}
	
	public function GetLimitState():int
	{
		return m_state;
	}
	public function GetLocalAnchorA():b2Vec2
	{
		return m_localAnchor1;
	}
	public function GetLocalAnchorB():b2Vec2
	{
		return m_localAnchor2;
	}
	public function SetMaxLength(length:Number):void{
		m_maxLength = length;
	}
	//--------------- Internals Below -------------------

	/** @private */
	public function b2RopeJoint(def:b2RopeJointDef){
		super(def);
		
		var tMat:b2Mat22;
		var tX:Number;
		var tY:Number;
		m_localAnchor1.SetV(def.localAnchorA);
		m_localAnchor2.SetV(def.localAnchorB);
		
		m_length = 0;
		m_mass = 0;
		m_maxLength = def.maxLength;
		m_impulse = 0.0;
		m_state = e_inactiveLimit;
	}

	b2internal override function InitVelocityConstraints(step:b2TimeStep) : void{
		
		
		var tMat:b2Mat22;
		var tX:Number;
		
		var bA:b2Body = m_bodyA;
		var bB:b2Body = m_bodyB;
		
		// Compute the effective mass matrix.
		//b2Vec2 r1 = b2Mul(bA->m_xf.R, m_localAnchor1 - bA->GetLocalCenter());
		tMat = bA.m_xf.R;
		var r1X:Number = m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y:Number = m_localAnchor1.y - bA.m_sweep.localCenter.y;
		tX =  (tMat.col1.x * r1X + tMat.col2.x * r1Y);
		r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
		r1X = tX;
		//b2Vec2 r2 = b2Mul(bB->m_xf.R, m_localAnchor2 - bB->GetLocalCenter());
		tMat = bB.m_xf.R;
		var r2X:Number = m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y:Number = m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX =  (tMat.col1.x * r2X + tMat.col2.x * r2Y);
		r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
		r2X = tX;
		
		//m_u = bB->m_sweep.c + r2 - bA->m_sweep.c - r1;
		m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		
		m_length = Math.sqrt(m_u.x*m_u.x + m_u.y*m_u.y);
		
		var c:Number = m_length-m_maxLength;
		
		if(c>0)
		{
			 m_state = e_atUpperLimit;
		}
		else
		{
			m_state = e_inactiveLimit;
		}
		
		if(m_length > b2Settings.b2_linearSlop)
		{
			m_u.Multiply( 1.0 / m_length );
		}
		else
		{
			m_u.SetZero();
			m_mass = 0.0;
			m_impulse = 0.0;
			return;
		}
		
		//float32 cr1u = b2Cross(r1, m_u);
		var crA:Number = (r1X * m_u.y - r1Y * m_u.x);
		//float32 cr2u = b2Cross(r2, m_u);
		var crB:Number = (r2X * m_u.y - r2Y * m_u.x);
		//m_mass = bA->m_invMass + bA->m_invI * cr1u * cr1u + bB->m_invMass + bB->m_invI * cr2u * cr2u;
		var invMass:Number = bA.m_invMass + bA.m_invI * crA * crA + bB.m_invMass + bB.m_invI * crB * crB;
		m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
		
		if (step.warmStarting)
		{
			// Scale the impulse to support a variable time step
			m_impulse *= step.dtRatio;
			
			//b2Vec2 P = m_impulse * m_u;
			var PX:Number = m_impulse * m_u.x;
			var PY:Number = m_impulse * m_u.y;
			//bA->m_linearVelocity -= bA->m_invMass * P;
			bA.m_linearVelocity.x -= bA.m_invMass * PX;
			bA.m_linearVelocity.y -= bA.m_invMass * PY;
			//bA->m_angularVelocity -= bA->m_invI * b2Cross(r1, P);
			bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
			//bB->m_linearVelocity += bB->m_invMass * P;
			bB.m_linearVelocity.x += bB.m_invMass * PX;
			bB.m_linearVelocity.y += bB.m_invMass * PY;
			//bB->m_angularVelocity += bB->m_invI * b2Cross(r2, P);
			bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
		}
		else
		{
			//m_impulse = 0;
		}
	}
	
	
	
	b2internal override function SolveVelocityConstraints(step:b2TimeStep): void{
		
	var tMat:b2Mat22;
		
		var bA:b2Body = m_bodyA;
		var bB:b2Body = m_bodyB;
		
		//b2Vec2 r1 = b2Mul(bA->m_xf.R, m_localAnchor1 - bA->GetLocalCenter());
		tMat = bA.m_xf.R;
		var r1X:Number = m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y:Number = m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX:Number =  (tMat.col1.x * r1X + tMat.col2.x * r1Y);
		r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
		r1X = tX;
		//b2Vec2 r2 = b2Mul(bB->m_xf.R, m_localAnchor2 - bB->GetLocalCenter());
		tMat = bB.m_xf.R;
		var r2X:Number = m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y:Number = m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX =  (tMat.col1.x * r2X + tMat.col2.x * r2Y);
		r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
		r2X = tX;
		
		// Cdot = dot(u, v + cross(w, r))
		//b2Vec2 v1 = bA->m_linearVelocity + b2Cross(bA->m_angularVelocity, r1);
		var v1X:Number = bA.m_linearVelocity.x + (-bA.m_angularVelocity * r1Y);
		var v1Y:Number = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
		//b2Vec2 v2 = bB->m_linearVelocity + b2Cross(bB->m_angularVelocity, r2);
		var v2X:Number = bB.m_linearVelocity.x + (-bB.m_angularVelocity * r2Y);
		var v2Y:Number = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
		
		var C:Number = m_length-m_maxLength;
		//float32 Cdot = b2Dot(m_u, v2 - v1);
		var Cdot:Number = (m_u.x * (v2X - v1X) + m_u.y * (v2Y - v1Y));
		// Predictive contraint.
		if(C < 0)
		{
			Cdot+= step.inv_dt*C;
		}
		
		var impulse:Number = -m_mass*Cdot;
		var oldImpulse:Number = m_impulse;
		m_impulse = b2Math.Min(0,m_impulse+impulse);
		impulse = m_impulse - oldImpulse;
		
		
		
		//-------------
		//var impulse:Number = -m_mass * (Cdot + 0 + 0 * m_impulse);
		//m_impulse += impulse;
		//---------
		
		//b2Vec2 P = impulse * m_u;
		var PX:Number = impulse * m_u.x;
		var PY:Number = impulse * m_u.y;
		//bA->m_linearVelocity -= bA->m_invMass * P;
		bA.m_linearVelocity.x -= bA.m_invMass * PX;
		bA.m_linearVelocity.y -= bA.m_invMass * PY;
		//bA->m_angularVelocity -= bA->m_invI * b2Cross(r1, P);
		bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
		//bB->m_linearVelocity += bB->m_invMass * P;
		bB.m_linearVelocity.x += bB.m_invMass * PX;
		bB.m_linearVelocity.y += bB.m_invMass * PY;
		//bB->m_angularVelocity += bB->m_invI * b2Cross(r2, P);
		bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
	}
	
	b2internal override function SolvePositionConstraints(baumgarte:Number):Boolean
	{
		//B2_NOT_USED(baumgarte);
		
		var tMat:b2Mat22;

		
		var bA:b2Body = m_bodyA;
		var bB:b2Body = m_bodyB;
		
		//b2Vec2 r1 = b2Mul(bA->m_xf.R, m_localAnchor1 - bA->GetLocalCenter());
		tMat = bA.m_xf.R;
		var r1X:Number = m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y:Number = m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX:Number =  (tMat.col1.x * r1X + tMat.col2.x * r1Y);
		r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
		r1X = tX;
		//b2Vec2 r2 = b2Mul(bB->m_xf.R, m_localAnchor2 - bB->GetLocalCenter());
		tMat = bB.m_xf.R;
		var r2X:Number = m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y:Number = m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX =  (tMat.col1.x * r2X + tMat.col2.x * r2Y);
		r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
		r2X = tX;
		
		//b2Vec2 d = bB->m_sweep.c + r2 - bA->m_sweep.c - r1;
		var dX:Number = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
		var dY:Number = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
		
		//float32 length = d.Normalize();
		var length:Number = Math.sqrt(dX*dX + dY*dY);
		if(length==0)
		{
			length=1;
		}
		dX /= length;
		dY /= length;
		//float32 C = length - m_length;
		var C:Number = length - m_maxLength;
		C = b2Math.Clamp(C,0,b2Settings.b2_maxLinearCorrection);
		
		var impulse:Number = -m_mass * C;
		//m_u = d;
		m_u.Set(dX, dY);
		//b2Vec2 P = impulse * m_u;
		var PX:Number = impulse * m_u.x;
		var PY:Number = impulse * m_u.y;
		
		//bA->m_sweep.c -= bA->m_invMass * P;
		bA.m_sweep.c.x -= bA.m_invMass * PX;
		bA.m_sweep.c.y -= bA.m_invMass * PY;
		//bA->m_sweep.a -= bA->m_invI * b2Cross(r1, P);
		bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
		//bB->m_sweep.c += bB->m_invMass * P;
		bB.m_sweep.c.x += bB.m_invMass * PX;
		bB.m_sweep.c.y += bB.m_invMass * PY;
		//bB->m_sweep.a -= bB->m_invI * b2Cross(r2, P);
		bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
		
		bA.SynchronizeTransform();
		bB.SynchronizeTransform();
		
		return length-m_maxLength <b2Settings.b2_linearSlop;
		
	}

	b2internal var m_localAnchor1:b2Vec2 = new b2Vec2();
	b2internal var m_localAnchor2:b2Vec2 = new b2Vec2();
	private var m_u:b2Vec2 = new b2Vec2();
	private var m_impulse:Number;
	private var m_mass:Number;
	private var m_length:Number;
	private var m_maxLength:Number
	private var m_state:int;
};

}
