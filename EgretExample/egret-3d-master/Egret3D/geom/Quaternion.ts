﻿module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Quaternion
     * @classdesc
     * Quaternion 类用于表示旋转
     */
    export class Quaternion {
        /**
        * @language en_US
        * The x value of the quaternion.
        */
        public x: number = 0;

        /**
        * @language en_US
        * The y value of the quaternion.
        */
        public y: number = 0;

        /**
        * @language en_US
        * The z value of the quaternion.
        */
        public z: number = 0;

        /**
        * @language en_US
        * The w value of the quaternion.
        */
        public w: number = 1;

        /**
        * @language en_US
        * Creates a new Quaternion object.
        * @param x The x value of the quaternion.
        * @param y The y value of the quaternion.
        * @param z The z value of the quaternion.
        * @param w The w value of the quaternion.
        */
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        /**
        * @language en_US
        * @@readOnly
        * Returns the magnitude of the quaternion object.
        */
        public get magnitude(): number {
            return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
        * @language en_US
        * Fills the quaternion object with the result from a multiplication of two quaternion objects.
        *
        * @param    qa    The first quaternion in the multiplication.
        * @param    qb    The second quaternion in the multiplication.
        */
        public multiply(qa: Quaternion, qb: Quaternion) {
            var w1: number = qa.w, x1: number = qa.x, y1: number = qa.y, z1: number = qa.z;
            var w2: number = qb.w, x2: number = qb.x, y2: number = qb.y, z2: number = qb.z;

            this.w = w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2;
            this.x = w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2;
            this.y = w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2;
            this.z = w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2;
        }

        /**
        * @language en_US
        *
        *
        * @param
        * @param
        */
        public multiplyVector(vector: Vector3D, target: Quaternion = null): Quaternion {
            if (target === null) {
                target = new Quaternion();
            }

            var x2: number = vector.x;
            var y2: number = vector.y;
            var z2: number = vector.z;

            target.w = -this.x * x2 - this.y * y2 - this.z * z2;
            target.x = this.w * x2 + this.y * z2 - this.z * y2;
            target.y = this.w * y2 - this.x * z2 + this.z * x2;
            target.z = this.w * z2 + this.x * y2 - this.y * x2;

            return target;
        }

        /**
        * @language en_US
        * Fills the quaternion object with values representing the given rotation around a vector.
        *
        * @param    axis    The axis around which to rotate
        * @param    angle    The angle in radians of the rotation.
        */
        public fromAxisAngle(axis: Vector3D, angle: number) {
            var sin_a: number = Math.sin(angle / 2);
            var cos_a: number = Math.cos(angle / 2);

            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.w = cos_a;

            this.normalize();
        }

        /**
        * @language en_US
        * Spherically interpolates between two quaternions, providing an interpolation between rotations with constant angle change rate.
        * @param qa The first quaternion to interpolate.
        * @param qb The second quaternion to interpolate.
        * @param t The interpolation weight, a value between 0 and 1.
        */
        public slerp(qa: Quaternion, qb: Quaternion, t: number) {
            var w1: number = qa.w, x1: number = qa.x, y1: number = qa.y, z1: number = qa.z;
            var w2: number = qb.w, x2: number = qb.x, y2: number = qb.y, z2: number = qb.z;
            var dot: number = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;

            // shortest direction
            if (dot < 0) {
                dot = -dot;
                w2 = -w2;
                x2 = -x2;
                y2 = -y2;
                z2 = -z2;
            }

            if (dot < 0.95) {
                // interpolate angle linearly
                var angle: number = Math.acos(dot);
                var s: number = 1 / Math.sin(angle);
                var s1: number = Math.sin(angle * (1 - t)) * s;
                var s2: number = Math.sin(angle * t) * s;
                this.w = w1 * s1 + w2 * s2;
                this.x = x1 * s1 + x2 * s2;
                this.y = y1 * s1 + y2 * s2;
                this.z = z1 * s1 + z2 * s2;
            } else {
                // nearly identical angle, interpolate linearly
                this.w = w1 + t * (w2 - w1);
                this.x = x1 + t * (x2 - x1);
                this.y = y1 + t * (y2 - y1);
                this.z = z1 + t * (z2 - z1);
                var len: number = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
                this.w *= len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        }

        /**
        * @language en_US
        * Linearly interpolates between two quaternions.
        * @param qa The first quaternion to interpolate.
        * @param qb The second quaternion to interpolate.
        * @param t The interpolation weight, a value between 0 and 1.
        */
        public lerp(qa: Quaternion, qb: Quaternion, t: number) {
            var w1: number = qa.w, x1: number = qa.x, y1: number = qa.y, z1: number = qa.z;
            var w2: number = qb.w, x2: number = qb.x, y2: number = qb.y, z2: number = qb.z;
            var len: number;

            // shortest direction
            if (w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2 < 0) {
                w2 = -w2;
                x2 = -x2;
                y2 = -y2;
                z2 = -z2;
            }

            this.w = w1 + t * (w2 - w1);
            this.x = x1 + t * (x2 - x1);
            this.y = y1 + t * (y2 - y1);
            this.z = z1 + t * (z2 - z1);

            len = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            this.w *= len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
        }

        /**
        * @language en_US
        * Fills the quaternion object with values representing the given euler rotation.
        *
        * @param    ax        The angle in radians of the rotation around the ax axis.
        * @param    ay        The angle in radians of the rotation around the ay axis.
        * @param    az        The angle in radians of the rotation around the az axis.
        */
        public fromEulerAngles(ax: number, ay: number, az: number):Quaternion {
            ax *= Math.PI / 180.0;
            ay *= Math.PI / 180.0;
            az *= Math.PI / 180.0;

            var halfX: number = ax * .5, halfY: number = ay * .5, halfZ: number = az * .5;
            var cosX: number = Math.cos(halfX), sinX: number = Math.sin(halfX);
            var cosY: number = Math.cos(halfY), sinY: number = Math.sin(halfY);
            var cosZ: number = Math.cos(halfZ), sinZ: number = Math.sin(halfZ);

            this.w = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.x = sinX * cosY * cosZ - cosX * sinY * sinZ;
            this.y = cosX * sinY * cosZ + sinX * cosY * sinZ;
            this.z = cosX * cosY * sinZ - sinX * sinY * cosZ;

            return this;
        }

        /**
        * @language en_US
        * Fills a target Vector3D object with the Euler angles that form the rotation represented by this quaternion.
        * @param target An optional Vector3D object to contain the Euler angles. If not provided, a new object is created.
        * @returns The Vector3D containing the Euler angles.
        */
        public toEulerAngles(target: Vector3D = null): Vector3D {

            //target ||= new Vector3D();
            if (target === null) {

                target = new Vector3D();

            }

            target.x = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y));
            target.y = Math.asin(2 * (this.w * this.y - this.z * this.x));
            target.z = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));

            target.x /= Math.PI / 180.0;
            target.y /= Math.PI / 180.0;
            target.z /= Math.PI / 180.0;
            return target;
        }

        /**
        * @language en_US
        * Normalises the quaternion object.
        */
        public normalize(val: number = 1) {
            var mag: number = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

            this.x *= mag;
            this.y *= mag;
            this.z *= mag;
            this.w *= mag;
        }

        /**
        * @language en_US
        * Used to trace the values of a quaternion.
        *
        * @returns A string representation of the quaternion object.
        */
        /**
        * @language zh_CN
        * 
        * @returns 
        */
        public toString(): string {
            return "{x:" + this.x + " y:" + this.y + " z:" + this.z + " w:" + this.w + "}";
        }

        /**
        * @language en_US
        * Converts the quaternion to a Matrix3D object representing an equivalent rotation.
        * @param target An optional Matrix3D container to store the transformation in. If not provided, a new object is created.
        * @returns A Matrix3D object representing an equivalent rotation.
        */
        public toMatrix3D(target: Matrix4_4 = null): Matrix4_4 {
            var rawData: Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
            var xy2: number = 2.0 * this.x * this.y, xz2: number = 2.0 * this.x * this.z, xw2: number = 2.0 * this.x * this.w;
            var yz2: number = 2.0 * this.y * this.z, yw2: number = 2.0 * this.y * this.w, zw2: number = 2.0 * this.z * this.w;
            var xx: number = this.x * this.x, yy: number = this.y * this.y, zz: number = this.z * this.z, ww: number = this.w * this.w;

            rawData[0] = xx - yy - zz + ww;
            rawData[4] = xy2 - zw2;
            rawData[8] = xz2 + yw2;
            rawData[12] = 0;
            rawData[1] = xy2 + zw2;
            rawData[5] = -xx + yy - zz + ww;
            rawData[9] = yz2 - xw2;
            rawData[13] = 0;
            rawData[2] = xz2 - yw2;
            rawData[6] = yz2 + xw2;
            rawData[10] = -xx - yy + zz + ww;
            rawData[14] = 0;
            rawData[3] = 0.0;
            rawData[7] = 0.0;
            rawData[11] = 0;
            rawData[15] = 1;

            if (!target)
                return new Matrix4_4(new Float32Array(rawData));

            target.copyRawDataFrom(rawData);

            return target;
        }

        /**
        * @language en_US
        * Extracts a quaternion rotation matrix out of a given Matrix3D object.
        * @param matrix The Matrix3D out of which the rotation will be extracted.
        */
        public fromMatrix(matrix: Matrix4_4) {
            var v: Vector3D = matrix.decompose(Orientation3D.QUATERNION)[1];
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = v.w;
        }

        /**
        * @language en_US
        * Converts the quaternion to a Vector.&lt;Number&gt; matrix representation of a rotation equivalent to this quaternion.
        * @param target The Vector.&lt;Number&gt; to contain the raw matrix data.
        * @param exclude4thRow If true, the last row will be omitted, and a 4x3 matrix will be generated instead of a 4x4.
        */
        public toRawData(target: number[], exclude4thRow: boolean = false) {
            var xy2: number = 2.0 * this.x * this.y, xz2: number = 2.0 * this.x * this.z, xw2: number = 2.0 * this.x * this.w;
            var yz2: number = 2.0 * this.y * this.z, yw2: number = 2.0 * this.y * this.w, zw2: number = 2.0 * this.z * this.w;
            var xx: number = this.x * this.x, yy: number = this.y * this.y, zz: number = this.z * this.z, ww: number = this.w * this.w;

            target[0] = xx - yy - zz + ww;
            target[1] = xy2 - zw2;
            target[2] = xz2 + yw2;
            target[4] = xy2 + zw2;
            target[5] = -xx + yy - zz + ww;
            target[6] = yz2 - xw2;
            target[8] = xz2 - yw2;
            target[9] = yz2 + xw2;
            target[10] = -xx - yy + zz + ww;
            target[3] = target[7] = target[11] = 0;

            if (!exclude4thRow) {
                target[12] = target[13] = target[14] = 0;
                target[15] = 1;
            }
        }

        /**
        * @language en_US
        * Clones the quaternion.
        * @returns An exact duplicate of the current Quaternion.
        */
        public clone(): Quaternion {
            return new Quaternion(this.x, this.y, this.z, this.w);
        }

        /**
        * @language en_US
        * Rotates a point.
        * @param vector The Vector3D object to be rotated.
        * @param target An optional Vector3D object that will contain the rotated coordinates. If not provided, a new object will be created.
        * @returns A Vector3D object containing the rotated point.
        */
        public rotatePoint(vector: Vector3D, target: Vector3D = null): Vector3D {
            var x1: number, y1: number, z1: number, w1: number;
            var x2: number = vector.x, y2: number = vector.y, z2: number = vector.z;

            //target ||= new Vector3D();
            if (target === null) {

                target = new Vector3D();

            }

            // p*q'
            w1 = -this.x * x2 - this.y * y2 - this.z * z2;
            x1 = this.w * x2 + this.y * z2 - this.z * y2;
            y1 = this.w * y2 - this.x * z2 + this.z * x2;
            z1 = this.w * z2 + this.x * y2 - this.y * x2;

            target.x = -w1 * this.x + x1 * this.w - y1 * this.z + z1 * this.y;
            target.y = -w1 * this.y + x1 * this.z + y1 * this.w - z1 * this.x;
            target.z = -w1 * this.z - x1 * this.y + y1 * this.x + z1 * this.w;

            return target;
        }

        /**
        * @language en_US
        * Copies the data from a quaternion into this instance.
        * @param q The quaternion to copy from.
        */
        public copyFrom(q: Quaternion) {
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        }
    }

} 