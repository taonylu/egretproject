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

package Box2D.Dynamics.Joints{
	
import Box2D.Common.b2Settings;
import Box2D.Common.b2internal;
import Box2D.Common.Math.b2Mat22;
import Box2D.Common.Math.b2Mat33;
import Box2D.Common.Math.b2Math;
import Box2D.Common.Math.b2Vec2;
import Box2D.Common.Math.b2Vec3;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2TimeStep;
import Box2D.plus.b2Rot;

use namespace b2internal;

// Point-to-point constraint
// Cdot = v2 - v1
//      = v2 + cross(w2, r2) - v1 - cross(w1, r1)
// J = [-I -r1_skew I r2_skew ]
// Identity used:
// w k % (rx i + ry j) = w * (-ry i + rx j)

// Angle constraint
// Cdot = w2 - w1
// J = [0 0 -1 0 0 1]
// K = invI1 + invI2

/**
 * A weld joint essentially glues two bodies together. A weld joint may
 * distort somewhat because the island constraint solver is approximate.
 */
public class b2WeldJoint extends b2Joint
{
	/** @inheritDoc */
	public override function GetAnchorA():b2Vec2{
		return m_bodyA.GetWorldPoint(m_localAnchorA);
	}
	/** @inheritDoc */
	public override function GetAnchorB():b2Vec2{
		return m_bodyB.GetWorldPoint(m_localAnchorB);
	}
	
	/** @inheritDoc */
	public override function GetReactionForce(inv_dt:Number):b2Vec2
	{
		return new b2Vec2(inv_dt * m_impulse.x, inv_dt * m_impulse.y);
	}

	/** @inheritDoc */
	public override function GetReactionTorque(inv_dt:Number):Number
	{
		return inv_dt * m_impulse.z;
	}
	public function GetLocalAnchorA():b2Vec2{
		return m_localAnchorA;
	}
	public function GetLocalAnchorB():b2Vec2{
		return m_localAnchorB;
	}
	public function GetReferenceAngle():Number{
		return m_referenceAngle;
	}
	public function GetFrequency():Number{
		return m_frequencyHz;
	}
	public function SetFrequency(hz:Number):void{
		m_frequencyHz = hz;
	}
	public function SetDampingRatio(ratio:Number):void{
		m_dampingRatio = ratio;
	}
	public function GetDampingRatio():Number{
		return m_dampingRatio;
	}
	//--------------- Internals Below -------------------

	/** @private */
	public function b2WeldJoint(def:b2WeldJointDef){
		super(def);
		
		m_localAnchorA.SetV(def.localAnchorA);
		m_localAnchorB.SetV(def.localAnchorB);
		m_referenceAngle = def.referenceAngle;

		m_impulse.SetZero();
		m_mass = new b2Mat33();
		m_frequencyHz = def.frequencyHz;
		m_dampingRatio = def.dampingRatio;
	}

	b2internal override function InitVelocityConstraints(step:b2TimeStep) : void {
		m_localCenterA = m_bodyA.m_sweep.localCenter;
		m_localCenterB = m_bodyB.m_sweep.localCenter;
		m_invMassA = m_bodyA.m_invMass;
		m_invMassB = m_bodyB.m_invMass;
		m_invIA = m_bodyA.m_invI;
		m_invIB = m_bodyB.m_invI;
		var bA:b2Body = m_bodyA; var bB:b2Body = m_bodyB;
		var mA:Number = m_invMassA; var mB:Number = m_invMassB;
		var iA:Number = m_invIA; var iB:Number = m_invIB;
		
		var cA:b2Vec2 = bA.GetWorldCenter(); var cB:b2Vec2 = bB.GetWorldCenter();
		var aA:Number = bA.GetAngle(); var aB:Number = bB.GetAngle();
		var vA:b2Vec2 = bA.GetLinearVelocity(); var vB:b2Vec2 = bB.GetLinearVelocity();
		var wA:Number = bA.GetAngularVelocity(); var wB:Number = bB.GetAngularVelocity();
		
		var qA:b2Rot = new b2Rot(aA);
		var qB:b2Rot = new b2Rot(aB);
		// Compute the effective masses.
		m_rA = b2Math.MulQV(qA, b2Math.SubtractVV(m_localAnchorA,m_localCenterA));
		m_rB = b2Math.MulQV(qB, b2Math.SubtractVV(m_localAnchorB,m_localCenterB));

		var K:b2Mat33 = new b2Mat33();
		K.col1.x = mA + mB + m_rA.y * m_rA.y * iA + m_rB.y * m_rB.y * iB;
		K.col2.x = -m_rA.y * m_rA.x * iA - m_rB.y * m_rB.x * iB;
		K.col3.x = -m_rA.y * iA - m_rB.y * iB;
		K.col1.y = K.col2.x;
		K.col2.y = mA + mB + m_rA.x * m_rA.x * iA + m_rB.x * m_rB.x * iB;
		K.col3.y = m_rA.x * iA + m_rB.x * iB;
		K.col1.z = K.col3.x;
		K.col2.z = K.col3.y;
		K.col3.z = iA + iB;
		
		if (m_frequencyHz > 0.0)
		{
			m_mass = K.GetInverse22(m_mass);
			
			var invM:Number = iA + iB;
			var m:Number = invM > 0.0 ? 1.0 / invM : 0.0;
			
			var C:Number = aB - aA - m_referenceAngle;
			
			// Frequency
			var omega:Number = 2.0 * Math.PI * m_frequencyHz;
			
			// Damping coefficient
			var d:Number = 2.0 * m * m_dampingRatio * omega;
			
			// Spring stiffness
			var k:Number = m * omega * omega;
			
			// magic formulas
			var h:Number = step.dt;
			m_gamma = h * (d + h * k);
			m_gamma = m_gamma != 0.0 ? 1.0 / m_gamma : 0.0;
			m_bias = C * h * k * m_gamma;
			
			invM += m_gamma;
			m_mass.col3.z = invM != 0.0 ? 1.0 / invM : 0.0;
		}
		else
		{
			m_mass = K.GetSymInverse33(m_mass);
			m_gamma = 0.0;
			m_bias = 0.0;
		}
		
		if (step.warmStarting)
		{
			// Scale impulses to support a variable time step.
			m_impulse.Multiply(step.dtRatio);
			
			var P:b2Vec2 = new b2Vec2(m_impulse.x, m_impulse.y);
			
			vA.Subtract(b2Math.MulFV(m_invMassA,P));
			wA -= (b2Math.CrossVV(m_rA,P) + m_impulse.z)* iA;
			
			vB.Add(b2Math.MulFV( m_invMassB,P));
			wB += (b2Math.CrossVV(m_rB,P) + m_impulse.z)* iB;
		}
		else
		{
			m_impulse.SetZero();
		}
		
		bA.m_angularVelocity = wA;
		bB.m_angularVelocity = wB;
		bA.m_linearVelocity.SetV(vA);
		bB.m_linearVelocity.SetV(vB);
	}
	
	
	
	b2internal override function SolveVelocityConstraints(step:b2TimeStep): void{
		var bA:b2Body = m_bodyA; var bB:b2Body = m_bodyB;
		var mA:Number = m_invMassA; var mB:Number = m_invMassB;
		var iA:Number = m_invIA; var iB:Number = m_invIB;
		
		var vA:b2Vec2 = bA.GetLinearVelocity(); var vB:b2Vec2 = bB.GetLinearVelocity();
		var wA:Number = bA.GetAngularVelocity(); var wB:Number = bB.GetAngularVelocity();
		
		if (m_frequencyHz > 0.0)
		{
			var Cdot2:Number = wB - wA;
			
			var impulse2:Number = -m_mass.col3.z * (Cdot2 + m_bias + m_gamma * m_impulse.z);
			m_impulse.z += impulse2;
			
			wA -= iA * impulse2;
			wB += iB * impulse2;
			
			var Cdot1:b2Vec2 = vB.Copy();
			Cdot1.Add(b2Math.CrossFV(wB, m_rB));
			Cdot1.Subtract(vA);
			Cdot1.Subtract(b2Math.CrossFV(wA, m_rA));
			
			var impulse1:b2Vec2 = b2Math.Mul22(m_mass, Cdot1);
			impulse1.NegativeSelf();
			m_impulse.x += impulse1.x;
			m_impulse.y += impulse1.y;
			
			var P:b2Vec2 = impulse1.Copy();

			vA.Subtract(b2Math.MulFV(m_invMassA,P));
			wA -= iA*b2Math.CrossVV(m_rA,P);
			
			vB.Add(b2Math.MulFV( m_invMassB,P));
			wB += iB*b2Math.CrossVV(m_rB,P);
		}
		else
		{
			var Cdot3:b2Vec2 = vB.Copy();
			Cdot3.Add(b2Math.CrossFV(wB, m_rB));
			Cdot3.Subtract(vA);
			Cdot3.Subtract(b2Math.CrossFV(wA, m_rA));
			var Cdot4:Number = wB - wA;
			var Cdot:b2Vec3 = new b2Vec3(Cdot3.x, Cdot3.y, Cdot4);
			
			var impulse:b2Vec3 = b2Math.Mul33(m_mass, Cdot);
			impulse.NegativeSelf();
			m_impulse.Add(impulse);
			
			var P2:b2Vec2 = new b2Vec2(impulse.x, impulse.y);
			
			vA.Subtract(b2Math.MulFV(m_invMassA,P2));
			wA -= iA*(b2Math.CrossVV(m_rA,P2) + m_impulse.z);
			
			vB.Add(b2Math.MulFV( m_invMassB,P2));
			wB += iB*(b2Math.CrossVV(m_rB,P2) + m_impulse.z);
		}
		bA.m_angularVelocity = wA;
		bB.m_angularVelocity = wB;
		bA.m_linearVelocity.SetV(vA);
		bB.m_linearVelocity.SetV(vB);
		
//		bA.SynchronizeTransform();
//		bB.SynchronizeTransform();
	}
	
	b2internal override function SolvePositionConstraints(baumgarte:Number):Boolean
	{
		var bA:b2Body = m_bodyA; var bB:b2Body = m_bodyB;
		var cA:b2Vec2 = bA.GetWorldCenter(); var cB:b2Vec2 = bB.GetWorldCenter();
		var aA:Number = bA.GetAngle(); var aB:Number = bB.GetAngle();
		
		var qA:b2Rot = new b2Rot(aA);
		var qB:b2Rot = new b2Rot(aB);
		
		var mA:Number = m_invMassA; var mB:Number = m_invMassB;
		var iA:Number = m_invIA; var iB:Number = m_invIB;
		
		var rA:b2Vec2 = b2Math.MulQV(qA, b2Math.SubtractVV(m_localAnchorA,m_localCenterA));
		var rB:b2Vec2 = b2Math.MulQV(qB, b2Math.SubtractVV(m_localAnchorB,m_localCenterB));
		var  positionError:Number, angularError:Number;
		
		var K:b2Mat33 = new b2Mat33();
		K.col1.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
		K.col2.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
		K.col3.x = -rA.y * iA - rB.y * iB;
		K.col1.y = K.col2.x;
		K.col2.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
		K.col3.y = rA.x * iA + rB.x * iB;
		K.col1.z = K.col3.x;
		K.col2.z = K.col3.y;
		K.col3.z = iA + iB;
		
		if (m_frequencyHz > 0.0)
		{
			var C1:b2Vec2 =  cB.Copy();
			C1.Add(rB); C1.Subtract(cA); C1.Subtract(rA);
			
			positionError = C1.Length();
			angularError = 0.0;
			
			var P:b2Vec2 = new b2Vec2()
			K.Solve22(P,C1.x,C1.y);
			P.NegativeSelf();
			
			cA.Subtract(b2Math.MulFV(mA,P));
			aA -= iA * b2Math.CrossVV(rA,P);
			cB.Add(b2Math.MulFV(mB,P));
			aB += iB * b2Math.CrossVV(rB,P);
		}
		else
		{
			var C3:b2Vec2 = cB.Copy(); C3.Add(rB); C3.Subtract(cA); C3.Subtract(rA);
			var C4:Number = aB - aA - m_referenceAngle;
			
			positionError = C3.Length();
			angularError = Math.abs(C4);
			
			var C:b2Vec3 = new b2Vec3(C3.x, C3.y, C4);
			
			var impulse:b2Vec3 = new b2Vec3();
			K.Solve33(impulse,C.x,C.y,C.z);
			impulse.NegativeSelf();
			var P2:b2Vec2 = new b2Vec2(impulse.x, impulse.y);
			
			cA.Subtract(b2Math.MulFV(mA,P2));
			aA -= iA * (b2Math.CrossVV(rA,P2) + impulse.z);
			cB.Add(b2Math.MulFV(mB,P2));
			aB += iB * (b2Math.CrossVV(rB,P2) + impulse.z);
		}
		
		bA.m_sweep.c = cA;
		bA.m_sweep.a = aA;
		bB.m_sweep.c = cB;
		bB.m_sweep.a = aB;
		bA.SynchronizeTransform();
		bB.SynchronizeTransform();
		return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
	}

	private var m_localAnchorA:b2Vec2 = new b2Vec2();
	private var m_localAnchorB:b2Vec2 = new b2Vec2();
	private var m_referenceAngle:Number;
	
	private var m_impulse:b2Vec3 = new b2Vec3();
	private var m_mass:b2Mat33 = new b2Mat33();
	
	private var m_rA:b2Vec2;
	private var m_rB:b2Vec2;
	private var m_bias:Number;
	private var m_gamma:Number;
	private var m_frequencyHz:Number;
	private var m_dampingRatio:Number;
};

}
