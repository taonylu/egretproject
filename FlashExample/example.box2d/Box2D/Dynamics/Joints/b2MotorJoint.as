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
	
import Box2D.Common.b2Settings;
import Box2D.Common.b2internal;
import Box2D.Common.Math.b2Mat22;
import Box2D.Common.Math.b2Math;
import Box2D.Common.Math.b2Vec2;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2TimeStep;
import Box2D.plus.b2Rot;

use namespace b2internal;

public class b2MotorJoint extends b2Joint
{
	public override function GetAnchorA():b2Vec2
	{
		return m_bodyA.GetPosition();
	}
	
	public override function GetAnchorB(): b2Vec2
	{
		return m_bodyB.GetPosition();
	}
	
	public override function GetReactionForce(inv_dt:Number): b2Vec2
	{
		return b2Math.MulFV(inv_dt, m_linearImpulse);
	}
	
	public override function GetReactionTorque(inv_dt:Number): Number
	{
		return inv_dt*m_angularImpulse;
	}
	
	public function SetMaxForce(force:Number):void
	{
		b2Settings.b2Assert(b2Math.IsValid(force) && force >= 0.0);
		m_maxForce = force;
	}
	
	public function GetMaxForce(): Number
	{
		return m_maxForce;
	}
	
	public function SetMaxTorque(torque:Number):void
	{
		b2Settings.b2Assert(b2Math.IsValid(torque) && torque >= 0.0);
		m_maxTorque = torque;
	}
	
	public function GetMaxTorque(): Number
	{
		return m_maxTorque;
	}
	
	public function SetCorrectionFactor(factor:Number):void
	{
		b2Settings.b2Assert(b2Math.IsValid(factor) && 0.0 <= factor && factor <= 1.0);
		m_correctionFactor = factor;
	}
	
	public function GetCorrectionFactor(): Number
	{
		return m_correctionFactor;
	}
	
	public function SetLinearOffset(linearOffset:b2Vec2):void
	{
		if (linearOffset.x != m_linearOffset.x || linearOffset.y != m_linearOffset.y)
		{
			m_bodyA.SetAwake(true);
			m_bodyB.SetAwake(true);
			m_linearOffset = linearOffset;
		}
	}
	
	public function GetLinearOffset(): b2Vec2
	{
		return m_linearOffset;
	}
	
	public function SetAngularOffset(angularOffset:Number):void
	{
		if (angularOffset != m_angularOffset)
		{
			m_bodyA.SetAwake(true);
			m_bodyB.SetAwake(true);
			m_angularOffset = angularOffset;
		}
	}
	
	public function GetAngularOffset(): Number
	{
		return m_angularOffset;
	}
	
	//--------------- Internals Below -------------------

	/** @private */
	public function b2MotorJoint(def:b2MotorJointDef)
	{
		super(def);
		m_linearOffset = def.linearOffset;
		m_angularOffset = def.angularOffset;
		
		m_linearImpulse.SetZero();
		m_angularImpulse = 0.0;
		
		m_maxForce = def.maxForce;
		m_maxTorque = def.maxTorque;
		m_correctionFactor = def.correctionFactor;
	}
	private var K:b2Mat22 = new b2Mat22();
	private var K1:b2Mat22 = new b2Mat22();
	private var K2:b2Mat22 = new b2Mat22();
	private var K3:b2Mat22 = new b2Mat22();
	b2internal override function InitVelocityConstraints(step:b2TimeStep) : void
	{
		var bA:b2Body = m_bodyA;
		var bB:b2Body = m_bodyB;
		var cA:b2Vec2 = bA.GetWorldCenter(); var cB:b2Vec2 = bB.GetWorldCenter();
		var aA:Number = bA.GetAngle(); var aB:Number = bB.GetAngle();
		var vA:b2Vec2 = bA.GetLinearVelocity(); var vB:b2Vec2 = bB.GetLinearVelocity();
		var wA:Number = bA.GetAngularVelocity(); var wB:Number = bB.GetAngularVelocity();
		
		m_invMassA=bA.m_invMass; m_invMassB=bB.m_invMass;
		m_invIA=bA.m_invI; m_invIB=bB.m_invI;
		m_localCenterA = bA.m_sweep.localCenter;
		m_localCenterB = bB.m_sweep.localCenter;
		
//		m_rA = b2Mul(qA, -m_localCenterA);
//		m_rB = b2Mul(qB, -m_localCenterB);
		
		var qA:b2Rot = new b2Rot(aA);
		var qB:b2Rot = new b2Rot(aB);
		
		m_rA = b2Math.MulQV(qA,b2Math.MulFV(-1,m_localCenterA));
		m_rB = b2Math.MulQV(qB,b2Math.MulFV(-1,m_localCenterB));
		
/*		b2Mat22 K;
		K.ex.x = mA + mB + iA * m_rA.y * m_rA.y + iB * m_rB.y * m_rB.y;
		K.ex.y = -iA * m_rA.x * m_rA.y - iB * m_rB.x * m_rB.y;
		K.ey.x = K.ex.y;
		K.ey.y = mA + mB + iA * m_rA.x * m_rA.x + iB * m_rB.x * m_rB.x;
*/
		var mA:Number=m_invMassA; var mB:Number=m_invMassB;
		var iA:Number=m_invIA; var iB:Number=m_invIB;
		K.col1.x = mA + mB + iA * m_rA.y * m_rA.y + iB * m_rB.y * m_rB.y;
		K.col1.y = -iA * m_rA.x * m_rA.y - iB * m_rB.x * m_rB.y;
		K.col2.x = K.col1.y;
		K.col2.y = mA + mB + iA * m_rA.x * m_rA.x + iB * m_rB.x * m_rB.x;

		m_linearMass = K.GetInverse(new b2Mat22());
		m_angularMass = iA + iB;
		if (m_angularMass > 0.0)
		{
			m_angularMass = 1.0 / m_angularMass;
		}
//		m_linearError = cB + m_rB - cA - m_rA - b2Mul(qA, m_linearOffset);
		m_linearError.SetZero();
		m_linearError.Add(cB);
		m_linearError.Add(m_rB);
		m_linearError.Subtract(cA);
		m_linearError.Subtract(m_rA);
		m_linearError.Subtract(b2Math.MulQV(qA,m_linearOffset));
		
		m_angularError = aB -aA - m_angularOffset;
		
		if (step.warmStarting)
		{
			//Scale impulses to support a variable time step
			m_linearImpulse.Multiply(step.dtRatio);
			m_angularImpulse *= step.dtRatio;
			
			var P:b2Vec2 = m_linearImpulse.Copy();
			
//			vA -= mA * P;
//			wA -= iA * (b2Cross(m_rA, P) + m_angularImpulse);
//			vB += mB * P;
//			wB += iB * (b2Cross(m_rB, P) + m_angularImpulse);
			vA.Subtract(b2Math.MulFV(mA,P));
			wA -= iA * (b2Math.CrossVV(m_rA,P) + m_angularImpulse);
			vB.Add(b2Math.MulFV(mB,P));
			wB += iB* (b2Math.CrossVV(m_rB,P) + m_angularImpulse);
		}
		else
		{
			m_linearImpulse.SetZero();
			m_angularImpulse = 0.0;
		}
		
		bA.m_angularVelocity = wA;
		bB.m_angularVelocity = wB;
		
		bA.m_linearVelocity.SetV(vA);
		bB.m_linearVelocity.SetV(vB);
	}
	
	b2internal override function SolveVelocityConstraints(step:b2TimeStep): void
	{
		var bA:b2Body = m_bodyA;
		var bB:b2Body= m_bodyB;
		
		var vA:b2Vec2 = bA.m_linearVelocity;
		var wA:Number = bA.m_angularVelocity;
		var vB:b2Vec2 = bB.m_linearVelocity;
		var wB:Number = bB.m_angularVelocity;
		
		var mA:Number = bA.m_invMass;
		var mB:Number = bB.m_invMass;
		var iA:Number = bA.m_invI
		var iB:Number = bB.m_invI;
		
		var h:Number = step.dt;
		var inv_h:Number = step.inv_dt;
		
		// Solve angular friction
		{
			var Cdot_a:Number = wB - wA + inv_h * m_correctionFactor * m_angularError;
			var impulse_a:Number = -m_angularMass * Cdot_a;
			
			var oldImpulse_a:Number = m_angularImpulse;
			var maxImpulse_a:Number = h * m_maxTorque;
			m_angularImpulse = b2Math.Clamp(m_angularImpulse + impulse_a, -maxImpulse_a, maxImpulse_a);
			impulse_a = m_angularImpulse - oldImpulse_a;
			
			wA -= iA * impulse_a;
			wB += iB * impulse_a;
		}
		// Solve linear friction
		{
//			b2Vec2 Cdot = vB + b2Cross(wB, m_rB) - vA - b2Cross(wA, m_rA) + inv_h * m_correctionFactor * m_linearError;
			var Cdot:b2Vec2 = new b2Vec2();
			Cdot.Add(vB);
			Cdot.Add(b2Math.CrossFV(wB,m_rB));
			Cdot.Subtract(vA);
			Cdot.Subtract(b2Math.CrossFV(wA,m_rA));
			Cdot.Add(b2Math.MulFV(inv_h*m_correctionFactor,m_linearError));
			
//			b2Vec2 impulse = -b2Mul(m_linearMass, Cdot);
			var impulse:b2Vec2 = b2Math.MulMV(m_linearMass,Cdot);
			impulse.Multiply(-1);
			
//			b2Vec2 oldImpulse = m_linearImpulse;
//			m_linearImpulse += impulse;
			var oldImpulse:b2Vec2 = m_linearImpulse.Copy();
			m_linearImpulse.Add(impulse);
//			float32 maxImpulse = h * m_maxForce;
			var maxImpulse:Number = h * m_maxForce;
			if(m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse)
			{
				m_linearImpulse.Normalize();
				m_linearImpulse.Multiply(maxImpulse);
			}

			impulse = b2Math.SubtractVV(m_linearImpulse,oldImpulse);
			
			vA.Subtract(b2Math.MulFV(mA,impulse));
			wA -= iA * b2Math.CrossVV(m_rA,impulse);
			vB.Add(b2Math.MulFV(mB,impulse));
			wB += iB * b2Math.CrossVV(m_rB,impulse);
			
		}

		bA.m_linearVelocity.SetV(vA);
		bA.m_angularVelocity = wA;
		bB.m_linearVelocity.SetV(vB);
		bB.m_angularVelocity = wB;
	}
	
	b2internal override function SolvePositionConstraints(baumgarte:Number):Boolean
	{
		return true;
	}
	
	// Solver shared
	b2internal var m_linearOffset:b2Vec2;
	private var m_angularOffset:Number;
	private var m_linearImpulse:b2Vec2 = new b2Vec2();
	private var m_angularImpulse:Number;
	private var m_maxForce:Number;
	private var m_maxTorque:Number;
	private var m_correctionFactor:Number;
	
	// Solver temp
	private var m_indexA:int;
	private var m_indexB:int;
	private var m_rA:b2Vec2;
	private var m_rB:b2Vec2;
	public var m_linearError:b2Vec2 = new b2Vec2();
	private var m_angularError:Number;
	private var m_invMassA:Number;
	private var m_invMassB:Number;
	private var m_invIA:Number;
	private var m_invIB:Number;
	private var m_linearMass:b2Mat22;
	private var m_angularMass:Number;
};

}
