//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (_particle) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            _super.call(this, texture, 200);
            this.parseConfig(config);
            this.emissionRate = this.lifespan / this.maxParticles;
            this.particleClass = _particle.GravityParticle;
        }
        var __egretProto__ = GravityParticleSystem.prototype;
        __egretProto__.parseConfig = function (config) {
            this.emitterX = getValue(config.emitter.x);
            this.emitterY = getValue(config.emitter.y);
            this.emitterXVariance = getValue(config.emitterVariance.x);
            this.emitterYVariance = getValue(config.emitterVariance.y);
            this.gravityX = getValue(config.gravity.x);
            this.gravityY = getValue(config.gravity.y);
            this.maxParticles = getValue(config.maxParticles);
            this.speed = getValue(config.speed);
            this.speedVariance = getValue(config.speedVariance);
            this.lifespan = Math.max(0.01, getValue(config.lifespan));
            this.lifespanVariance = getValue(config.lifespanVariance);
            this.emitAngle = getValue(config.emitAngle);
            this.emitAngleVariance = getValue(config.emitAngleVariance);
            this.startSize = getValue(config.startSize);
            this.startSizeVariance = getValue(config.startSizeVariance);
            this.endSize = getValue(config.endSize);
            this.endSizeVariance = getValue(config.endSizeVariance);
            this.startRotation = getValue(config.startRotation);
            this.startRotationVariance = getValue(config.startRotationVariance);
            this.endRotation = getValue(config.endRotation);
            this.endRotationVariance = getValue(config.endRotationVariance);
            this.radialAcceleration = getValue(config.radialAcceleration);
            this.radialAccelerationVariance = getValue(config.radialAccelerationVariance);
            this.tangentialAcceleration = getValue(config.tangentialAcceleration);
            this.tangentialAccelerationVariance = getValue(config.tangentialAccelerationVariance);
            this.startAlpha = getValue(config.startAlpha);
            this.startAlphaVariance = getValue(config.startAlphaVariance);
            this.endAlpha = getValue(config.endAlpha);
            this.endAlphaVariance = getValue(config.endAlphaVariance);
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
        };
        __egretProto__.initParticle = function (particle) {
            var locParticle = particle;
            var lifespan = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);
            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;
            if (lifespan <= 0) {
                return;
            }
            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;
            var angle = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            angle = angle * Math.PI / 180;
            var speed = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * Math.cos(angle);
            locParticle.velocityY = speed * Math.sin(angle);
            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);
            var startSize = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
            var startRotation = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;
            var startAlpha = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            var endAlpha = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
        };
        GravityParticleSystem.getValue = function (base, variance) {
            return base + variance * (Math.random() * 2 - 1);
        };
        __egretProto__.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
            locParticle.currentTime += dt;
            var distanceX = locParticle.x - locParticle.startX;
            var distanceY = locParticle.y - locParticle.startY;
            var distanceScalar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }
            var radialX = distanceX / distanceScalar;
            var radialY = distanceY / distanceScalar;
            var tangentialX = radialX;
            var tangentialY = radialY;
            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;
            var temp = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;
            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;
            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        };
        return GravityParticleSystem;
    })(_particle.ParticleSystem);
    _particle.GravityParticleSystem = GravityParticleSystem;
    GravityParticleSystem.prototype.__class__ = "particle.GravityParticleSystem";
})(particle || (particle = {}));
