﻿module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Vector3D
     * @classdesc
     * 用 Vector3D 类 表示三维空间中的位置 
     */
    export class Vector3D {
        /**
        * @language en_US
        * The x axis defined as a Vector3D object with coordinates (1,0,0).
        */
        public static X_AXIS: Vector3D = new Vector3D(1, 0, 0);

        /**
        * @language en_US
        * The y axis defined as a Vector3D object with coordinates (0,1,0).
        */
        public static Y_AXIS: Vector3D = new Vector3D(0, 1, 0);

        /**
        * @language en_US
        * The z axis defined as a Vector3D object with coordinates (0,0,1).
        */
        public static Z_AXIS: Vector3D = new Vector3D(0, 0, 1);

        /**
        * @language en_US
        * The first element of a Vector3D object, such as the x coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        public x: number;

        /**
        * @language en_US
        * The second element of a Vector3D object, such as the y coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        public y: number;

        /**
        * @language en_US
        * The third element of a Vector3D object, such as the y coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        public z: number;

        /**
        * @language en_US
        * TThe fourth element of a Vector3D object (in addition to the x, y,
        * and z properties) can hold data such as the angle of rotation. The
        * default value is 0.
        *
        * <p>Quaternion notation employs an angle as the fourth element in
        * its calculation of three-dimensional rotation. The w property can
        * be used to define the angle of rotation about the Vector3D object.
        * The combination of the rotation angle and the coordinates (x,y,z)
        * determines the display object's orientation.</p>
        *
        * <p>In addition, the w property can be used as a perspective warp
        * factor for a projected three-dimensional position or as a projection
        * transform value in representing a three-dimensional coordinate
        * projected into the two-dimensional space. For example, you can
        * create a projection matrix using the <code>Matrix3D.rawData</code>
        * property, that, when applied to a Vector3D object, produces a
        * transform value in the Vector3D object's fourth element (the w
        * property). Dividing the Vector3D object's other elements by the
        * transform value then produces a projected Vector3D object. You can
        * use the <code>Vector3D.project()</code> method to divide the first
        * three elements of a Vector3D object by its fourth element.</p>
        */
        public w: number;

        /**
        * @language en_US
        * @writeOnly
        */
        public set a(value: number) {
            this.w = value;
        }

        /**
        * @language en_US
        * @writeOnly
        */
        public set r(value: number) {
            this.x = value;
        }

        /**
        * @language en_US
        * @writeOnly
        */
        public set g(value: number) {
            this.y = value;
        }

        /**
        * @language en_US
        * @writeOnly
        */
        public set b(value: number) {
            this.z = value;
        }

        /**
        * @language en_US
        * @readOnly
        */
        public get a(): number {
            return this.w;
        }

        /**
        * @language en_US
        * @readOnly
        */
        public get r(): number {
            return this.x;
        }

        /**
        * @language en_US
        * @readOnly
        */
        public get g(): number {
            return this.y;
        }

        /**
        * @language en_US
        * @readOnly
        */
        public get b(): number {
            return this.z;
        }

        /**
        * @language en_US
        * The length, magnitude, of the current Vector3D object from the
        * origin (0,0,0) to the object's x, y, and z coordinates. The w
        * property is ignored. A unit vector has a length or magnitude of
        * one.
        */
        public get length(): number {
            return Math.sqrt(this.lengthSquared);
        }

        /**
        * @language en_US
        * The square of the length of the current Vector3D object, calculated。
        * using the x, y, and z properties. The w property is ignored. Use the
        * <code>lengthSquared()</code> method whenever possible instead of the
        * slower <code>Math.sqrt()</code> method call of the
        * <code>Vector3D.length()</code> method.
        */
        public get lengthSquared(): number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
        * @language en_US
        * Creates an instance of a Vector3D object. If you do not specify a。
        * parameter for the constructor, a Vector3D object is created with
        * the elements (0,0,0,0).
        *
        * @param x The first element, such as the x coordinate.
        * @param y The second element, such as the y coordinate.
        * @param z The third element, such as the z coordinate.
        * @param w An optional element for additional data such as the angle
        *          of rotation.
        */
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        /**
        * @language en_US
        * Adds the value of the x, y, and z elements of the current Vector3D
        * object to the values of the x, y, and z elements of another Vector3D
        * object. The <code>add()</code> method does not change the current
        * Vector3D object. Instead, it returns a new Vector3D object with
        * the new values.
        *
        * <p>The result of adding two vectors together is a resultant vector.
        * One way to visualize the result is by drawing a vector from the
        * origin or tail of the first vector to the end or head of the second
        * vector. The resultant vector is the distance between the origin
        * point of the first vector and the end point of the second vector.
        * </p>
        */
        public add(a: Vector3D): Vector3D {
            return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w)
        }

        /**
        * @language en_US
        * Returns the angle in radians between two vectors. The returned angle
        * is the smallest radian the first Vector3D object rotates until it
        * aligns with the second Vector3D object.
        *
        * <p>The <code>angleBetween()</code> method is a static method. You
        * can use it directly as a method of the Vector3D class.</p>
        *
        * <p>To convert a degree to a radian, you can use the following
        * formula:</p>
        *
        * <p><code>radian = Math.PI/180 * degree</code></p>
        *
        * @param a The first Vector3D object.
        * @param b The second Vector3D object.
        * @returns The angle between two Vector3D objects.
        */
        public static angleBetween(a: Vector3D, b: Vector3D): number {
            return Math.acos(a.dotProduct(b) / (a.length * b.length));
        }

        /**
        * @language en_US
        * Returns a new Vector3D object that is an exact copy of the current
        * Vector3D object.
        *
        * @returns A new Vector3D object that is a copy of the current
        * Vector3D object.
        */
        public clone(): Vector3D {
            return new Vector3D(this.x, this.y, this.z, this.w);
        }

        /**
        * @language en_US
        * Copies all of vector data from the source Vector3D object into the
        * calling Vector3D object.
        *
        * @param src The Vector3D object from which to copy the data.
        */
        public copyFrom(src: Vector3D): void {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            this.w = src.w;
        }

        /**
        * @language en_US
        * Returns a new Vector3D object that is perpendicular (at a right
        * angle) to the current Vector3D and another Vector3D object. If the
        * returned Vector3D object's coordinates are (0,0,0), then the two
        * Vector3D objects are parallel to each other.
        *
        * <p>You can use the normalized cross product of two vertices of a
        * polygon surface with the normalized vector of the camera or eye
        * viewpoint to get a dot product. The value of the dot product can
        * identify whether a surface of a three-dimensional object is hidden
        * from the viewpoint.</p>
        *
        * @param a A second Vector3D object.
        * @returns A new Vector3D object that is perpendicular to the current
        *          Vector3D object and the Vector3D object specified as the
        *          parameter.
        */
        public crossProduct(a: Vector3D): Vector3D {
            return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
        }

        /**
        * @language en_US
        * Decrements the value of the x, y, and z elements of the current
        * Vector3D object by the values of the x, y, and z elements of
        * specified Vector3D object. Unlike the
        * <code>Vector3D.subtract()</code> method, the
        * <code>decrementBy()</code> method changes the current Vector3D
        * object and does not return a new Vector3D object.
        *
        * @param a The Vector3D object containing the values to subtract from
        *          the current Vector3D object.
        */
        public decrementBy(a: Vector3D) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        }

        /**
        * @language en_US
        * Returns the distance between two Vector3D objects. The
        * <code>distance()</code> method is a static method. You can use it
        * directly as a method of the Vector3D class to get the Euclidean
        * distance between two three-dimensional points.
        *
        * @param pt1 A Vector3D object as the first three-dimensional point.
        * @param pt2 A Vector3D object as the second three-dimensional point.
        * @returns The distance between two Vector3D objects.
        */
        static distance(pt1: Vector3D, pt2: Vector3D): number {
            var x: number = (pt1.x - pt2.x);
            var y: number = (pt1.y - pt2.y);
            var z: number = (pt1.z - pt2.z);
            return Math.sqrt(x * x + y * y + z * z);
        }

        /**
        * @language en_US
        * If the current Vector3D object and the one specified as the。
        * parameter are unit vertices, this method returns the cosine of the
        * angle between the two vertices. Unit vertices are vertices that
        * point to the same direction but their length is one. They remove the
        * length of the vector as a factor in the result. You can use the
        * <code>normalize()</code> method to convert a vector to a unit
        * vector.
        *
        * <p>The <code>dotProduct()</code> method finds the angle between two
        * vertices. It is also used in backface culling or lighting
        * calculations. Backface culling is a procedure for determining which
        * surfaces are hidden from the viewpoint. You can use the normalized
        * vertices from the camera, or eye, viewpoint and the cross product of
        * the vertices of a polygon surface to get the dot product. If the dot
        * product is less than zero, then the surface is facing the camera or
        * the viewer. If the two unit vertices are perpendicular to each
        * other, they are orthogonal and the dot product is zero. If the two
        * vertices are parallel to each other, the dot product is one.</p>
        *
        * @param a The second Vector3D object.
        * @returns A scalar which is the dot product of the current Vector3D
        *          object and the specified Vector3D object.
        *
        * @see away.geom.Vector3D#crossProduct()
        * @see away.geom.Vector3D#normalize()
        */
        public dotProduct(a: Vector3D): number {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        }

        /**
        * @language en_US
        * Determines whether two Vector3D objects are equal by comparing the
        * x, y, and z elements of the current Vector3D object with a
        * specified Vector3D object. If the values of these elements are the
        * same, the two Vector3D objects are equal. If the second optional
        * parameter is set to true, all four elements of the Vector3D objects,
        * including the w property, are compared.
        */

        /**
        * @language en_US
        * @param toCompare The Vector3D object to be compared with the current
        *                  Vector3D object.
        * @param allFour   An optional parameter that specifies whether the w
        *                  property of the Vector3D objects is used in the
        *                  comparison.
        * @returns A value of true if the specified Vector3D object is equal
        *          to the current Vector3D object; false if it is not equal.
        */
        public equals(toCompare: Vector3D, allFour: boolean = false): boolean {
            return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
        }

        /**
        * @language en_US

        * Increments the value of the x, y, and z elements of the current
        * Vector3D object by the values of the x, y, and z elements of a
        * specified Vector3D object. Unlike the <code>Vector3D.add()</code>
        * method, the <code>incrementBy()</code> method changes the current
        * Vector3D object and does not return a new Vector3D object.
        *
        * @param a The Vector3D object to be added to the current Vector3D
        *          object.
        */
        public incrementBy(a: Vector3D) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        }

        /**
        * @language en_US
        * Compares the elements of the current Vector3D object with the
        * elements of a specified Vector3D object to determine whether they
        * are nearly equal. The two Vector3D objects are nearly equal if the
        * value of all the elements of the two vertices are equal, or the
        * result of the comparison is within the tolerance range. The
        * difference between two elements must be less than the number
        * specified as the tolerance parameter. If the third optional
        * parameter is set to <code>true</code>, all four elements of the
        * Vector3D objects, including the <code>w</code> property, are
        * compared. Otherwise, only the x, y, and z elements are included in
        * the comparison.
        */

        /**
        * @language en_US
        * @param toCompare The Vector3D object to be compared with the current
        *                  Vector3D object.
        * @param tolerance A number determining the tolerance factor. If the
        *                  difference between the values of the Vector3D
        *                  element specified in the toCompare parameter and
        *                  the current Vector3D element is less than the
        *                  tolerance number, the two values are considered
        *                  nearly equal.
        * @param allFour   An optional parameter that specifies whether the w
        *                  property of the Vector3D objects is used in the
        *                  comparison.
        * @returns A value of true if the specified Vector3D object is nearly
        *          equal to the current Vector3D object; false if it is not
        *          equal.
        *
        * @see egret3d.geom.Vector3D#equals()
        */
        public nearEquals(toCompare: Vector3D, tolerance: number, allFour: boolean = true): boolean {
            return ((Math.abs(this.x - toCompare.x) < tolerance) && (Math.abs(this.y - toCompare.y) < tolerance) && (Math.abs(this.z - toCompare.z) < tolerance) && (!allFour || Math.abs(this.w - toCompare.w) < tolerance));
        }

        /**
        * @language en_US
        * Sets the current Vector3D object to its inverse. The inverse object
        * is also considered the opposite of the original object. The value of
        * the x, y, and z properties of the current Vector3D object is changed
        * to -x, -y, and -z.
        */
        public negate(): void {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        }

        /**
        * @language en_US
        * Converts a Vector3D object to a unit vector by dividing the first
        * three elements (x, y, z) by the length of the vector. Unit vertices
        * are vertices that have a direction but their length is one. They
        * simplify vector calculations by removing length as a factor.
        */

        /**
        * @language en_US
        * Scales the line segment between(0,0) and the current point to a set
        * length.
        *
        * @param thickness The scaling value. For example, if the current
        * Vector3D object is (0,3,4), and you normalize it to
        * 1, the point returned is at(0,0.6,0.8).
        */
        public normalize(thickness: number = 1) {
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                this.z *= invLength;
                return;
            }
        }

        /**
        * @language en_US
        * Divides the value of the <code>x</code>, <code>y</code>, and
        * <code>z</code> properties of the current Vector3D object by the
        * value of its <code>w</code> property.
        *
        * <p>If the current Vector3D object is the result of multiplying a
        * Vector3D object by a projection Matrix3D object, the w property can
        * hold the transform value. The <code>project()</code> method then can
        * complete the projection by dividing the elements by the
        * <code>w</code> property. Use the <code>Matrix3D.rawData</code>
        * property to create a projection Matrix3D object.</p>
        */
        public project(): void {
            this.x /= this.w;
            this.y /= this.w;
            this.z /= this.w;
        }

        /**
        * @language en_US
        * Scales the current Vector3D object by a scalar, a magnitude. The
        * Vector3D object's x, y, and z elements are multiplied by the scalar
        * number specified in the parameter. For example, if the vector is
        * scaled by ten, the result is a vector that is ten times longer. The
        * scalar can also change the direction of the vector. Multiplying the
        * vector by a negative number reverses its direction.
        *
        * @param s A multiplier (scalar) used to scale a Vector3D object.
        */
        public scaleBy(s: number): void {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        }

        /**
        * @language en_US
        * Sets the members of Vector3D to the specified values
        *
        * @param xa The first element, such as the x coordinate.
        * @param ya The second element, such as the y coordinate.
        * @param za The third element, such as the z coordinate.
        */
        public setTo(xa: number, ya: number, za: number): void {
            this.x = xa;
            this.y = ya;
            this.z = za;
        }

        /**
        * @language en_US
        * Subtracts the value of the x, y, and z elements of the current
        * Vector3D object from the values of the x, y, and z elements of
        * another Vector3D object. The <code>subtract()</code> method does not
        * change the current Vector3D object. Instead, this method returns a
        * new Vector3D object with the new values.
        *
        * @param a The Vector3D object to be subtracted from the current
        *          Vector3D object.
        * @returns A new Vector3D object that is the difference between the
        *          current Vector3D and the specified Vector3D object.
        *
        * @see egret3d.geom.Vector3D#decrementBy()
        */
        public subtract(a: Vector3D): Vector3D {
            return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
        }

        public multiply(other: Vector3D): Vector3D {
            return new Vector3D(this.x * other.x, this.y * other.y, this.z * other.z);
        }

        public lerp(v0: Vector3D, v1: Vector3D, t: number): void {
            this.x = (v1.x - v0.x) * t + v0.x;
            this.y = (v1.y - v0.y) * t + v0.y;
            this.z = (v1.z - v0.z) * t + v0.z;
            this.w = (v1.w - v0.w) * t + v0.w;
        }

        public toString(): string {
            return "<" + this.x + ", " + this.y + ", " + this.z + ">";
        }

        public parsing(str: string): void {

            var strS: string[] = str.split(" ");

            if (strS.length < 3)
                return;

            this.x = parseFloat(strS[0]);
            this.y = parseFloat(strS[1]);
            this.z = parseFloat(strS[2]);
        }
    }

}

