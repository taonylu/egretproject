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
import Box2D.Common.Math.b2Math;
import Box2D.Common.Math.b2Vec2;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2TimeStep;
import Box2D.plus.b2Rot;

use namespace b2internal;

public class b2WheelJoint extends b2Joint
{
	public override function GetAnchorA():b2Vec2
	{
		return m_bodyA.GetWorldPoint(m_localAnchorA);
	}
	
	public override function GetAnchorB():b2Vec2
	{
		return m_bodyB.GetWorldPoint(m_localAnchorB);
	}
	
	public override function GetReactionForce(inv_dt:Number):b2Vec2
	{
		var reactionFroce:b2Vec2;
		reactionFroce = b2Math.MulFV(m_impulse,m_ay);
		reactionFroce.Add(b2Math.MulFV(m_springImpulse,m_ax));
		reactionFroce.Multiply(inv_dt);
		return reactionFroce;
	}
	
	public override function GetReactionTorque(inv_dt:Number):Number
	{
		return inv_dt * m_motorImpulse;
	}
	
	public function GetJointTranslation():Number
	{
		var bA:b2Body = m_bodyA;
		var bB:b2Body = m_bodyB;
		
		var pA:b2Vec2 = bA.GetWorldPoint(m_localAnchorA);
		var pB:b2Vec2 = bB.GetWorldPoint(m_localAnchorB);
		var d:b2Vec2 = b2Math.SubtractVV(pB,pA);
		var axis:b2Vec2 = bA.GetWorldVector(m_localXAxisA);
		
		var translation:Number = b2Math.Dot(d, axis);
		return translation;
	}
	
	public function GetJointSpeed():Number
	{
		var wA:Number = m_bodyA.m_angularVelocity;
		var wB:Number = m_bodyB.m_angularVelocity;
		return wB - wA;
	}
	
	public function IsMotorEnabled():Boolean
	{
		return m_enableMotor;
	}
	
	public function EnableMotor(flag:Boolean):void
	{
		m_bodyA.SetAwake(true);
		m_bodyB.SetAwake(true);
		m_enableMotor = flag;
	}
	
	public function SetMotorSpeed(speed:Number):void
	{
		m_bodyA.SetAwake(true);
		m_bodyB.SetAwake(true);
		m_motorSpeed = speed;
	}
	
	public function SetMaxMotorTorque(torque:Number):void
	{
		m_bodyA.SetAwake(true);
		m_bodyB.SetAwake(true);
		m_maxMotorTorque = torque;
	}
	
	public function GetMotorTorque(inv_dt:Number):Number
	{
		return inv_dt * m_motorImpulse;
	}
	
	public function SetSpringFrequencyHz(hz:Number):void
	{
		m_frequencyHz = hz;
	}
	public function GetSpringFrequencyHz():Number
	{
		return m_frequencyHz;
	}
	public function SetSpringDampingRatio(ratio:Number):void
	{
		m_dampingRatio = ratio;
	}
	public function GetSpringDampingRatio():Number
	{
		return m_dampingRatio;
	}
	//--------------- Internals Below -------------------

	/** @private */
	public function b2WheelJoint(def:b2WheelJointDef)
	{
		super(def);
		m_localAnchorA = def.localAnchorA;
		m_localAnchorB = def.localAnchorB;
		m_localXAxisA = def.localAxisA;
		m_localYAxisA = b2Math.CrossFV(1.0, m_localXAxisA);
		
		m_mass = 0.0;
		m_impulse = 0.0;
		m_motorMass = 0.0;
		m_motorImpulse = 0.0;
		m_springMass = 0.0;
		m_springImpulse = 0.0;
		
		m_maxMotorTorque = def.maxMotorTorque;
		m_motorSpeed = def.motorSpeed;
		m_enableMotor = def.enableMotor;
		
		m_frequencyHz = def.frequencyHz;
		m_dampingRatio = def.dampingRatio;
		
		m_bias = 0.0;
		m_gamma = 0.0;
		
		m_ax = new b2Vec2();
		m_ay = new b2Vec2();
	}
	
	b2internal override function InitVelocityConstraints(step:b2TimeStep) : void
	{
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
		var rA:b2Vec2 = b2Math.MulQV(qA, b2Math.SubtractVV(m_localAnchorA,m_localCenterA));
		var rB:b2Vec2 = b2Math.MulQV(qB, b2Math.SubtractVV(m_localAnchorB,m_localCenterB));
		var d:b2Vec2 = cB.Copy(); d.Add(rB); d.Subtract(cA); d.Subtract(rA);
		
		// Point to line constraint
		{
			m_ay = b2Math.MulQV(qA, m_localYAxisA);
			m_sAy = b2Math.CrossVV(b2Math.AddVV(d,rA), m_ay);
			m_sBy = b2Math.CrossVV(rB, m_ay);
			
			m_mass = mA + mB + iA * m_sAy * m_sAy + iB * m_sBy * m_sBy;
			
			if (m_mass > 0.0)
			{
				m_mass = 1.0 / m_mass;
			}
		}
		
		// Spring constraint
		m_springMass = 0.0;
		m_bias = 0.0;
		m_gamma = 0.0;
		if (m_frequencyHz > 0.0)
		{
			m_ax = b2Math.MulQV(qA, m_localXAxisA);
			m_sAx = b2Math.CrossVV(b2Math.AddVV(d,rA), m_ax);
			m_sBx = b2Math.CrossVV(rB, m_ax);
			
			var invMass:Number = mA + mB + iA * m_sAx * m_sAx + iB * m_sBx * m_sBx;
			
			if (invMass > 0.0)
			{
				m_springMass = 1.0 / invMass;
				
				var C:Number = b2Math.Dot(d, m_ax);
				
				// Frequency
				var omega:Number = 2.0 * Math.PI * m_frequencyHz;
				
				// Damping coefficient
				var damp:Number = 2.0 * m_springMass * m_dampingRatio * omega;
				
				// Spring stiffness
				var k:Number = m_springMass * omega * omega;
				
				// magic formulas
				var h:Number = step.dt;
				m_gamma = h * (damp + h * k);
				if (m_gamma > 0.0)
				{
					m_gamma = 1.0 / m_gamma;
				}
				
				m_bias = C * h * k * m_gamma;
				
				m_springMass = invMass + m_gamma;
				if (m_springMass > 0.0)
				{
					m_springMass = 1.0 / m_springMass;
				}
			}
		}
		else
		{
			m_springImpulse = 0.0;
		}
		
		// Rotational motor
		if (m_enableMotor)
		{
			m_motorMass = iA + iB;
			if (m_motorMass > 0.0)
			{
				m_motorMass = 1.0 / m_motorMass;
			}
		}
		else
		{
			m_motorMass = 0.0;
			m_motorImpulse = 0.0;
		}
		
		if (step.warmStarting)
		{
			// Account for variable time step.
			m_impulse *= step.dtRatio;
			m_springImpulse *= step.dtRatio;
			m_motorImpulse *= step.dtRatio;
			
			var P:b2Vec2 = b2Math.MulFV(m_impulse,m_ay);
			P.Add(b2Math.MulFV(m_springImpulse,m_ax));
			var LA:Number = m_impulse * m_sAy + m_springImpulse * m_sAx + m_motorImpulse;
			var LB:Number = m_impulse * m_sBy + m_springImpulse * m_sBx + m_motorImpulse;
			
			vA.Subtract(b2Math.MulFV(m_invMassA,P));
			wA -= m_invIA * LA;
			
			vB.Add(b2Math.MulFV( m_invMassB,P));
			wB += m_invIB * LB;
		}
		else
		{
			m_impulse = 0.0;
			m_springImpulse = 0.0;
			m_motorImpulse = 0.0;
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
		
		// Solve spring constraint
		{
			var Cdot:Number = b2Math.Dot(m_ax, b2Math.SubtractVV(vB,vA)) + m_sBx * wB - m_sAx * wA;
			var impulse:Number = -m_springMass * (Cdot + m_bias + m_gamma * m_springImpulse);
			m_springImpulse += impulse;
			
			var P:b2Vec2 = b2Math.MulFV(impulse,m_ax);
			var LA:Number = impulse * m_sAx;
			var LB:Number = impulse * m_sBx;
			
			vA.Subtract(b2Math.MulFV(mA,P));
			wA -= iA * LA;
			
			vB.Add(b2Math.MulFV(mB,P));
			wB += iB * LB;
		}
		
		// Solve rotational motor constraint
		{
			Cdot = wB - wA - m_motorSpeed;
			impulse = -m_motorMass * Cdot;
			
			var oldImpulse:Number = m_motorImpulse;
			var maxImpulse:Number = step.dt * m_maxMotorTorque;
			m_motorImpulse = b2Math.Clamp(m_motorImpulse + impulse, -maxImpulse, maxImpulse);
			impulse = m_motorImpulse - oldImpulse;
			
			wA -= iA * impulse;
			wB += iB * impulse;
		}
		
		// Solve point to line constraint
		{
			Cdot = b2Math.Dot(m_ay, b2Math.SubtractVV(vB,vA)) + m_sBy * wB - m_sAy * wA;
			impulse = -m_mass * Cdot;
			m_impulse += impulse;
			
			P = b2Math.MulFV(impulse,m_ay);
			LA = impulse * m_sAy;
			LB = impulse * m_sBy;
			
			vA.Subtract(b2Math.MulFV(mA,P));
			wA -= iA * LA;
			
			vB.Add(b2Math.MulFV(mB,P));
			wB += iB * LB;
		}
		
		bA.m_linearVelocity.SetV(vA);
		bA.m_angularVelocity = wA;
		bB.m_linearVelocity.SetV(vB);
		bB.m_angularVelocity = wB;
	}
	
	b2internal override function SolvePositionConstraints(baumgarte:Number):Boolean
	{
		var bA:b2Body = m_bodyA; var bB:b2Body = m_bodyB;
		var cA:b2Vec2 = bA.GetWorldCenter(); var cB:b2Vec2 = bB.GetWorldCenter();
		var aA:Number = bA.GetAngle(); var aB:Number = bB.GetAngle();
		var qA:b2Rot = new b2Rot(aA);
		var qB:b2Rot = new b2Rot(aB);
		
		var rA:b2Vec2 = b2Math.MulQV(qA, b2Math.SubtractVV(m_localAnchorA,m_localCenterA));
		var rB:b2Vec2 = b2Math.MulQV(qB, b2Math.SubtractVV(m_localAnchorB, m_localCenterB));
		var d:b2Vec2 = b2Math.SubtractVV(cB,cA);
		d.Add(rB); d.Subtract(rA);
		
		var ay:b2Vec2 = b2Math.MulQV(qA, m_localYAxisA);
		
		var sAy:Number = b2Math.CrossVV(b2Math.AddVV(d,rA), ay);
		var sBy:Number = b2Math.CrossVV(rB, ay);
		
		var C:Number = b2Math.Dot(d, ay);
		
		var k:Number = m_invMassA + m_invMassB + m_invIA * m_sAy * m_sAy + m_invIB * m_sBy * m_sBy;
		
		var impulse:Number;
		if (k != 0.0)
		{
			impulse = - C / k;
		}
		else
		{
			impulse = 0.0;
		}
		
		var P:b2Vec2 = b2Math.MulFV(impulse,ay);
		var LA:Number = impulse * sAy;
		var LB:Number = impulse * sBy;
		
		cA.Subtract(b2Math.MulFV(m_invMassA,P));
		aA -= m_invIA * LA;
		cB.Add(b2Math.MulFV(m_invMassB,P));
		aB += m_invIB * LB;
		
		bA.m_sweep.c = cA;
		bA.m_sweep.a = aA;
		bB.m_sweep.c = cB;
		bB.m_sweep.a = aB;
		
//		bA.SynchronizeTransform();
//		bB.SynchronizeTransform(); 
		
		return Math.abs(C) <= b2Settings.b2_linearSlop;
	}
	private var m_frequencyHz:Number;
	private var m_dampingRatio:Number;
	
	// Solver shared
	b2internal var m_localAnchorA:b2Vec2;
	b2internal var m_localAnchorB:b2Vec2;
	b2internal var m_localXAxisA:b2Vec2;
	private var m_localYAxisA:b2Vec2;
	
	private var m_impulse:Number;
	private var m_motorImpulse:Number;
	private var m_springImpulse:Number;
	
	private var m_maxMotorTorque:Number;
	private var m_motorSpeed:Number;
	private var m_enableMotor:Boolean;
	
	// Solver temp
	private var m_indexA:int;
	private var m_indexB:int;
	private var m_localCenterA:b2Vec2;
	private var m_localCenterB:b2Vec2;
	private var m_invMassA:Number;
	private var m_invMassB:Number;
	private var m_invIA:Number;
	private var m_invIB:Number;
	
	private var m_ax:b2Vec2, m_ay:b2Vec2;
	private var m_sAx:Number, m_sBx:Number;
	private var m_sAy:Number, m_sBy:Number;
	
	private var m_mass:Number;
	private var m_motorMass:Number;
	private var m_springMass:Number;
	
	private var m_bias:Number;
	private var m_gamma:Number;
};

}
