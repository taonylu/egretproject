module flash
{
        export class Matrix3D extends egret.HashObject {
            private $vec:Array<number> = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            private $transposeTransform:Array<number> = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];

            constructor(v:Array<number> = null) {
                super();
                if (v != null) {
                    if (v.length != this.$vec.length) {
                        throw new Error("Not equal length!");
                    }
                    for (var i:number = 0; i < this.$vec.length; i++) {
                        this.$vec[i] = v[i];
                    }
                }
            }

            public append(lhs:Matrix3D):void {
                var ma:Array<number> = lhs.rawData, mb:Array<number> = this.$vec;
                var ma11:number = ma[0], ma12:number = ma[4], ma13:number = ma[8], ma14:number = ma[12];
                var ma21:number = ma[1], ma22:number = ma[5], ma23:number = ma[9], ma24:number = ma[13];
                var ma31:number = ma[2], ma32:number = ma[6], ma33:number = ma[10], ma34:number = ma[14];
                var ma41:number = ma[3], ma42:number = ma[7], ma43:number = ma[11], ma44:number = ma[15];
                var mb11:number = mb[0], mb12:number = mb[4], mb13:number = mb[8], mb14:number = mb[12];
                var mb21:number = mb[1], mb22:number = mb[5], mb23:number = mb[9], mb24:number = mb[13];
                var mb31:number = mb[2], mb32:number = mb[6], mb33:number = mb[10], mb34:number = mb[14];
                var mb41:number = mb[3], mb42:number = mb[7], mb43:number = mb[11], mb44:number = mb[15];
                this.$vec[0] = ma11 * mb11 + ma12 * mb21 + ma13 * mb31 + ma14 * mb41;
                this.$vec[1] = ma21 * mb11 + ma22 * mb21 + ma23 * mb31 + ma24 * mb41;
                this.$vec[2] = ma31 * mb11 + ma32 * mb21 + ma33 * mb31 + ma34 * mb41;
                this.$vec[3] = ma41 * mb11 + ma42 * mb21 + ma43 * mb31 + ma44 * mb41;
                this.$vec[4] = ma11 * mb12 + ma12 * mb22 + ma13 * mb32 + ma14 * mb42;
                this.$vec[5] = ma21 * mb12 + ma22 * mb22 + ma23 * mb32 + ma24 * mb42;
                this.$vec[6] = ma31 * mb12 + ma32 * mb22 + ma33 * mb32 + ma34 * mb42;
                this.$vec[7] = ma41 * mb12 + ma42 * mb22 + ma43 * mb32 + ma44 * mb42;
                this.$vec[8] = ma11 * mb13 + ma12 * mb23 + ma13 * mb33 + ma14 * mb43;
                this.$vec[9] = ma21 * mb13 + ma22 * mb23 + ma23 * mb33 + ma24 * mb43;
                this.$vec[10] = ma31 * mb13 + ma32 * mb23 + ma33 * mb33 + ma34 * mb43;
                this.$vec[11] = ma41 * mb13 + ma42 * mb23 + ma43 * mb33 + ma44 * mb43;
                this.$vec[12] = ma11 * mb14 + ma12 * mb24 + ma13 * mb34 + ma14 * mb44;
                this.$vec[13] = ma21 * mb14 + ma22 * mb24 + ma23 * mb34 + ma24 * mb44;
                this.$vec[14] = ma31 * mb14 + ma32 * mb24 + ma33 * mb34 + ma34 * mb44;
                this.$vec[15] = ma41 * mb14 + ma42 * mb24 + ma43 * mb34 + ma44 * mb44;
            }

            public appendRotation(degrees:number, axis:Vector3D, pivotPoint:Vector3D = null):void {
                this.append(this.getRotationMatrix(degrees / 180 * Math.PI, axis.x, axis.y, axis.z, pivotPoint ? pivotPoint.x : 0, pivotPoint ? pivotPoint.y : 0, pivotPoint ? pivotPoint.z : 0));
            }

            public appendScale(xScale:number, yScale:number, zScale:number):void {
                this.$vec[0] *= xScale;
                this.$vec[1] *= yScale;
                this.$vec[2] *= zScale;
                this.$vec[4] *= xScale;
                this.$vec[5] *= yScale;
                this.$vec[6] *= zScale;
                this.$vec[8] *= xScale;
                this.$vec[9] *= yScale;
                this.$vec[10] *= zScale;
                this.$vec[12] *= xScale;
                this.$vec[13] *= yScale;
                this.$vec[14] *= zScale;
            }

            public appendTranslation(x:number, y:number, z:number):void {
                var m:Array<number> = this.$vec;
                var m41:number = m[3];
                var m42:number = m[7];
                var m43:number = m[11];
                var m44:number = m[15];
                m[0] += x * m41;
                m[1] += y * m41;
                m[2] += z * m41;
                m[4] += x * m42;
                m[5] += y * m42;
                m[6] += z * m42;
                m[8] += x * m43;
                m[9] += y * m43;
                m[10] += z * m43;
                m[12] += x * m44;
                m[13] += y * m44;
                m[14] += z * m44;
            }

            public clone():Matrix3D {
                return new Matrix3D(this.$vec);
            }

            public copyColumnFrom(column:number, vector3D:Vector3D):void {
                if (column > 3) {
                    throw new Error("column number too bigger");
                }
                var offset:number = column << 2;
                this.$vec[offset] = vector3D.x;
                this.$vec[offset + 1] = vector3D.y;
                this.$vec[offset + 2] = vector3D.z;
                this.$vec[offset + 3] = vector3D.w;
            }

            public copyColumnTo(column:number, vector3D:Vector3D):void {
                if (column > 3) {
                    throw new Error("column number too bigger");
                }
                var offset:number = column << 2;
                vector3D.x = this.$vec[offset];
                vector3D.y = this.$vec[offset + 1];
                vector3D.z = this.$vec[offset + 2];
                vector3D.w = this.$vec[offset + 3];
            }

            public copyFrom(sourceMatrix3D:Matrix3D):void {
                var length:number = this.$vec.length;
                for (var i:number = 0; i < length; i++) {
                    this.$vec[i] = sourceMatrix3D.$vec[i];
                }
            }

            public copyRawDataFrom(vector:Array<number>, index:number = 0, transpose:boolean = false):void {
                var i:number = 0;
                var j:number = index | 0;
                if (transpose) {
                    for (; i < 16; i++, j++) {
                        this.$vec[this.$transposeTransform[i]] = vector[j] || 0;
                    }
                }
                else {
                    for (; i < 16; i++, j++) {
                        this.$vec[i] = vector[j] || 0;
                    }
                }
            }

            public copyRawDataTo(vector:Array<number>, index:number = 0, transpose:boolean = false):void {
                var i:number = 0;
                var j:number = index | 0;
                if (transpose) {
                    for (; i < 16; i++, j++) {
                        vector[j] = this.$vec[this.$transposeTransform[i]];
                    }
                }
                else {
                    for (; i < 16; i++, j++) {
                        vector[j] = this.$vec[i];
                    }
                }
            }

            public copyRowFrom(row:number, vector3D:Vector3D):void {
                if (row > 3) {
                    throw new Error("row number too bigger");
                }
                var offset:number = row | 0;
                this.$vec[offset] = vector3D.x;
                this.$vec[offset + 4] = vector3D.y;
                this.$vec[offset + 8] = vector3D.z;
                this.$vec[offset + 12] = vector3D.w;
            }

            public copyRowTo(row:number, vector3D:Vector3D):void {
                var offset:number = row | 0;
                vector3D.x = this.$vec[offset];
                vector3D.y = this.$vec[offset + 4];
                vector3D.z = this.$vec[offset + 8];
                vector3D.w = this.$vec[offset + 12];
            }

            public copyToMatrix3D(dest:Matrix3D):void {
                for (var i:number = 0; i < 16; i++) {
                    dest.rawData[i] = this.$vec[i];
                }
            }

            public decompose(orientationStyle:string = "eulerAngles"):void {

            }

            public deltaTransformVector(v:Vector3D):Vector3D {
                var x = v.x;
                var y = v.y;
                var z = v.z;
                return new Vector3D(this.$vec[0] * x + this.$vec[4] * y + this.$vec[8] * z, this.$vec[1] * x + this.$vec[5] * y + this.$vec[9] * z, this.$vec[2] * x + this.$vec[6] * y + this.$vec[10] * z);
            }

            public identity():void {
                this.$vec[0] = this.$vec[5] = this.$vec[10] = this.$vec[15] = 1;
                this.$vec[1] = this.$vec[2] = this.$vec[3] = this.$vec[4] = this.$vec[6] = this.$vec[7] = this.$vec[8] = this.$vec[9] = this.$vec[11] = this.$vec[12] = this.$vec[13] = this.$vec[14] = 0;
            }

            public interpolate(thisMat:Matrix3D, toMat:Matrix3D, percent:number):void {

            }

            public interpolateTo(toMat:Matrix3D, percent:number):void {

            }

            public invert():boolean {
                var m:Array<number> = this.$vec;
                var m00:number = m[0], m01:number = m[4], m02:number = m[8], m03:number = m[12];
                var m10:number = m[1], m11:number = m[5], m12:number = m[9], m13:number = m[13];
                var m20:number = m[2], m21:number = m[6], m22:number = m[10], m23:number = m[14];
                var m30:number = m[3], m31:number = m[7], m32:number = m[11], m33:number = m[15];
                var v0:number = m20 * m31 - m21 * m30;
                var v1:number = m20 * m32 - m22 * m30;
                var v2:number = m20 * m33 - m23 * m30;
                var v3:number = m21 * m32 - m22 * m31;
                var v4:number = m21 * m33 - m23 * m31;
                var v5:number = m22 * m33 - m23 * m32;
                var t00:number = +(v5 * m11 - v4 * m12 + v3 * m13);
                var t10:number = -(v5 * m10 - v2 * m12 + v1 * m13);
                var t20:number = +(v4 * m10 - v2 * m11 + v0 * m13);
                var t30:number = -(v3 * m10 - v1 * m11 + v0 * m12);
                var invDet:number = 1 / (t00 * m00 + t10 * m01 + t20 * m02 + t30 * m03);
                var d00:number = t00 * invDet;
                var d10:number = t10 * invDet;
                var d20:number = t20 * invDet;
                var d30:number = t30 * invDet;
                var d01:number = -(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
                var d11:number = +(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
                var d21:number = -(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
                var d31:number = +(v3 * m00 - v1 * m01 + v0 * m02) * invDet;
                v0 = m10 * m31 - m11 * m30;
                v1 = m10 * m32 - m12 * m30;
                v2 = m10 * m33 - m13 * m30;
                v3 = m11 * m32 - m12 * m31;
                v4 = m11 * m33 - m13 * m31;
                v5 = m12 * m33 - m13 * m32;
                var d02:number = +(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
                var d12:number = -(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
                var d22:number = +(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
                var d32:number = -(v3 * m00 - v1 * m01 + v0 * m02) * invDet;
                v0 = m21 * m10 - m20 * m11;
                v1 = m22 * m10 - m20 * m12;
                v2 = m23 * m10 - m20 * m13;
                v3 = m22 * m11 - m21 * m12;
                v4 = m23 * m11 - m21 * m13;
                v5 = m23 * m12 - m22 * m13;
                var d03:number = -(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
                var d13:number = +(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
                var d23:number = -(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
                var d33:number = +(v3 * m00 - v1 * m01 + v0 * m02) * invDet;
                var mat3D:Matrix3D = new Matrix3D([d00, d01, d02, d03, d10, d11, d12, d13, d20, d21, d22, d23, d30, d31, d32, d33]);
                if (Math.abs(mat3D.determinant) < 0.000001)
                    return false;
                else {
                    for (var i = 0; i < this.$vec.length; i++) {
                        this.$vec[i] = mat3D.rawData[i];
                    }
                    return true;
                }
            }

            public pointAt(pos:Vector3D, at:Vector3D = null, up:Vector3D = null):void {

            }

            public prepend(rhs:Matrix3D):void {
                var ma:Array<number> = this.$vec;
                var mb:Array<number> = rhs.rawData;
                var ma11:number = ma[0], ma12:number = ma[4], ma13:number = ma[8], ma14:number = ma[12];
                var ma21:number = ma[1], ma22:number = ma[5], ma23:number = ma[9], ma24:number = ma[13];
                var ma31:number = ma[2], ma32:number = ma[6], ma33:number = ma[10], ma34:number = ma[14];
                var ma41:number = ma[3], ma42:number = ma[7], ma43:number = ma[11], ma44:number = ma[15];
                var mb11:number = mb[0], mb12:number = mb[4], mb13:number = mb[8], mb14:number = mb[12];
                var mb21:number = mb[1], mb22:number = mb[5], mb23:number = mb[9], mb24:number = mb[13];
                var mb31:number = mb[2], mb32:number = mb[6], mb33:number = mb[10], mb34:number = mb[14];
                var mb41:number = mb[3], mb42:number = mb[7], mb43:number = mb[11], mb44:number = mb[15];
                this.$vec[0] = ma11 * mb11 + ma12 * mb21 + ma13 * mb31 + ma14 * mb41;
                this.$vec[1] = ma21 * mb11 + ma22 * mb21 + ma23 * mb31 + ma24 * mb41;
                this.$vec[2] = ma31 * mb11 + ma32 * mb21 + ma33 * mb31 + ma34 * mb41;
                this.$vec[3] = ma41 * mb11 + ma42 * mb21 + ma43 * mb31 + ma44 * mb41;
                this.$vec[4] = ma11 * mb12 + ma12 * mb22 + ma13 * mb32 + ma14 * mb42;
                this.$vec[5] = ma21 * mb12 + ma22 * mb22 + ma23 * mb32 + ma24 * mb42;
                this.$vec[6] = ma31 * mb12 + ma32 * mb22 + ma33 * mb32 + ma34 * mb42;
                this.$vec[7] = ma41 * mb12 + ma42 * mb22 + ma43 * mb32 + ma44 * mb42;
                this.$vec[8] = ma11 * mb13 + ma12 * mb23 + ma13 * mb33 + ma14 * mb43;
                this.$vec[9] = ma21 * mb13 + ma22 * mb23 + ma23 * mb33 + ma24 * mb43;
                this.$vec[10] = ma31 * mb13 + ma32 * mb23 + ma33 * mb33 + ma34 * mb43;
                this.$vec[11] = ma41 * mb13 + ma42 * mb23 + ma43 * mb33 + ma44 * mb43;
                this.$vec[12] = ma11 * mb14 + ma12 * mb24 + ma13 * mb34 + ma14 * mb44;
                this.$vec[13] = ma21 * mb14 + ma22 * mb24 + ma23 * mb34 + ma24 * mb44;
                this.$vec[14] = ma31 * mb14 + ma32 * mb24 + ma33 * mb34 + ma34 * mb44;
                this.$vec[15] = ma41 * mb14 + ma42 * mb24 + ma43 * mb34 + ma44 * mb44;
            }

            public prependRotation(degrees:number, axis:Vector3D, pivotPoint:Vector3D = null):void {
                this.prepend(this.getRotationMatrix(degrees / 180 * Math.PI, axis.x, axis.y, axis.z, pivotPoint ? pivotPoint.x : 0, pivotPoint ? pivotPoint.y : 0, pivotPoint ? pivotPoint.z : 0));
            }

            public prependScale(xScale:number, yScale:number, zScale:number):void {
                this.$vec[0] *= xScale;
                this.$vec[1] *= xScale;
                this.$vec[2] *= xScale;
                this.$vec[3] *= xScale;
                this.$vec[4] *= yScale;
                this.$vec[5] *= yScale;
                this.$vec[6] *= yScale;
                this.$vec[7] *= yScale;
                this.$vec[8] *= zScale;
                this.$vec[9] *= zScale;
                this.$vec[10] *= zScale;
                this.$vec[11] *= zScale;
            }

            public prependTranslation(x:number, y:number, z:number):void {
                var m:Array<number> = this.$vec;
                var m11:number = m[0], m12:number = m[4], m13:number = m[8];
                var m21:number = m[1], m22:number = m[5], m23:number = m[9];
                var m31:number = m[2], m32:number = m[6], m33:number = m[10];
                var m41:number = m[3], m42:number = m[7], m43:number = m[11];
                m[12] += m11 * x + m12 * y + m13 * z;
                m[13] += m21 * x + m22 * y + m23 * z;
                m[14] += m31 * x + m32 * y + m33 * z;
                m[15] += m41 * x + m42 * y + m43 * z;
            }

            public recompose(components:Array<Vector3D>, orientationStyle:string = "eulerAngles"):void {

            }

            public transformVector(v:Vector3D):Vector3D {
                var x = v.x;
                var y = v.y;
                var z = v.z;
                return new Vector3D(this.$vec[0] * x + this.$vec[4] * y + this.$vec[8] * z + this.$vec[12], this.$vec[1] * x + this.$vec[5] * y + this.$vec[9] * z + this.$vec[13], this.$vec[2] * x + this.$vec[6] * y + this.$vec[10] * z + this.$vec[14]);
            }

            public transformVectors(vin:Array<number>, vout:Array<number>):void {
                var m:Array<number> = this.$vec;
                var m11:number = m[0], m12:number = m[4], m13:number = m[8], m14:number = m[12];
                var m21:number = m[1], m22:number = m[5], m23:number = m[9], m24:number = m[13];
                var m31:number = m[2], m32:number = m[6], m33:number = m[10], m34:number = m[14];
                var m41:number = m[3], m42:number = m[7], m43:number = m[11], m44 = m[15];
                for (var i = 0; i < vin.length - 2; i += 3) {
                    var x = vin[i], y = vin[i + 1], z = vin[i + 2];
                    vout[i] = m11 * x + m12 * y + m13 * z + m14;
                    vout[i + 1] = m21 * x + m22 * y + m23 * z + m24;
                    vout[i + 2] = m31 * x + m32 * y + m33 * z + m34;
                }
            }

            public transpose():void {
                var tmp:number=0;
                tmp = this.$vec[1];
                this.$vec[1] = this.$vec[4];
                this.$vec[4] = tmp;
                tmp = this.$vec[2];
                this.$vec[2] = this.$vec[8];
                this.$vec[5] = tmp;
                tmp = this.$vec[3];
                this.$vec[3] = this.$vec[12];
                this.$vec[12] = tmp;
                tmp = this.$vec[6];
                this.$vec[6] = this.$vec[9];
                this.$vec[9] = tmp;
                tmp = this.$vec[7];
                this.$vec[7] = this.$vec[13];
                this.$vec[13] = tmp;
                tmp = this.$vec[11];
                this.$vec[11] = this.$vec[14];
                this.$vec[14] = tmp;
            }

            public get determinant():number {
                var m:Array<number> = this.$vec;
                var m11:number = m[0], m12:number = m[4], m13:number = m[8], m14:number = m[12];
                var m21:number = m[1], m22:number = m[5], m23:number = m[9], m24:number = m[13];
                var m31:number = m[2], m32:number = m[6], m33:number = m[10], m34:number = m[14];
                var m41:number = m[3], m42:number = m[7], m43:number = m[11], m44 = m[15];
                return m11 * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24)) - m21 * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14)) + m31 * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14)) - m41 * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
            }

            public get position():Vector3D {
                return new Vector3D(this.$vec[12], this.$vec[13], this.$vec[14]);
            }

            public set position(value:Vector3D) {
                this.$vec[12] = value.x;
                this.$vec[13] = value.y;
                this.$vec[14] = value.z;
            }

            public get rawData():Array<number> {
                return this.$vec;
            }

            public set rawData(value:Array<number>) {
                if (value.length != this.$vec.length) {
                    throw new Error("Data Error");
                }
                for (var i = 0; i < value.length; i++) {
                    this.$vec[i] = value[i];
                }
            }

            private getRotationMatrix(theta:number, u:number, v:number, w:number, a:number, b:number, c:number):Matrix3D {
                var u2:number = u * u, v2 = v * v, w2 = w * w;
                var L2:number = u2 + v2 + w2, L = Math.sqrt(L2);
                u /= L;
                v /= L;
                w /= L;
                u2 /= L2;
                v2 /= L2;
                w2 /= L2;
                var cos:number = Math.cos(theta), sin = Math.sin(theta);
                var vec:Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
                vec[0] = u2 + (v2 + w2) * cos;
                vec[1] = u * v * (1 - cos) + w * sin;
                vec[2] = u * w * (1 - cos) - v * sin;
                vec[3] = 0;
                vec[4] = u * v * (1 - cos) - w * sin;
                vec[5] = v2 + (u2 + w2) * cos;
                vec[6] = v * w * (1 - cos) + u * sin;
                vec[7] = 0;
                vec[8] = u * w * (1 - cos) + v * sin;
                vec[9] = v * w * (1 - cos) - u * sin;
                vec[10] = w2 + (u2 + v2) * cos;
                vec[11] = 0;
                vec[12] = (a * (v2 + w2) - u * (b * v + c * w)) * (1 - cos) + (b * w - c * v) * sin;
                vec[13] = (b * (u2 + w2) - v * (a * u + c * w)) * (1 - cos) + (c * u - a * w) * sin;
                vec[14] = (c * (u2 + v2) - w * (a * u + b * v)) * (1 - cos) + (a * v - b * u) * sin;
                return new Matrix3D(vec);
            }
        }

}