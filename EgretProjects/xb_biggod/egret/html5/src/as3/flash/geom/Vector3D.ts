module flash {

    export class Vector3D extends egret.HashObject {
        public static X_AXIS = new Vector3D(1, 0, 0);
        public static Y_AXIS = new Vector3D(0, 1, 0);
        public static Z_AXIS = new Vector3D(0, 0, 1);

        private $x:number=0;
        private $y:number=0;
        private $z:number=0;
        private $w:number=0;

        constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 0) {
            super();
            this.$x = x;
            this.$y = y;
            this.$z = z;
            this.$w = w;
        }

        public add(a:Vector3D):Vector3D {
            return new Vector3D(this.$x + a.x, this.$y + a.y, this.$z + a.z);
        }

        public static angleBetween(a:Vector3D, b:Vector3D):number {
            return Math.acos(a.dotProduct(b) / (a.length * b.length));
        }

        public clone():Vector3D {
            return new Vector3D(this.$x, this.$y, this.$z, this.$w);
        }

        public copyFrom(sourceVector3D:Vector3D):void {
            this.$x = sourceVector3D.x;
            this.$y = sourceVector3D.y;
            this.$z = sourceVector3D.z;
        }

        public crossProduct(a:Vector3D):Vector3D {
            return new Vector3D(this.$y * a.z - this.$z * a.y, this.$z * a.x - this.$x * a.z, this.$x * a.y - this.$y * a.x, 1.0);
        }

        public decrementBy(a:Vector3D):void {
            this.$x -= a.x;
            this.$y -= a.y;
            this.$z -= a.z;
        }

        public static distance(pt1:Vector3D, pt2:Vector3D):number {
            return pt1.subtract(pt2).length;
        }

        public dotProduct(a:Vector3D):number {
            return (this.$x * a.x + this.$y * a.y + this.$z * a.z);
        }

        public equals(toCompare:Vector3D, allFour:Boolean = false):boolean {
            return (this.$x == toCompare.x) && (this.$y == toCompare.y) && (this.$z == toCompare.z) && (!allFour || (this.$w == toCompare.w));
        }

        public incrementBy(a:Vector3D):void {
            this.$x += a.x;
            this.$y += a.y;
            this.$z += a.z;
        }

        public nearEquals(toCompare:Vector3D, tolerance:number, allFour:boolean = false):boolean {
            return (Math.abs(this.$x - toCompare.x) < tolerance) && (Math.abs(this.$y - toCompare.y) < tolerance) && (Math.abs(this.$z - toCompare.z) < tolerance) && (!allFour || (Math.abs(this.$w - toCompare.w) < tolerance));
        }

        public negate():void {
            this.$x = -this.$x;
            this.$y = -this.$y;
            this.$z = -this.$z;
        }

        public normalize():number {
            var length = this.length;
            if (length !== 0) {
                this.$x /= length;
                this.$y /= length;
                this.$z /= length;
            }
            else {
                this.$x = this.$y = this.$z = 0;
            }
            return length;
        }

        public project():void {
            this.$x /= this.$w;
            this.$y /= this.$w;
            this.$z /= this.$w;
        }

        public scaleBy(s:number):void {
            this.$x *= s;
            this.$y *= s;
            this.$z *= s;
        }

        public setTo(xa:number, ya:number, za:number):void {
            this.$x = xa;
            this.$y = ya;
            this.$z = za;
        }

        public subtract(a:Vector3D):Vector3D {
            return new Vector3D(this.$x - a.x, this.$y - a.y, this.$z - a.z);
        }

        public toString():string {
            return "Vector3D(" + this.$x + ", " + this.$y + ", " + this.$z + ")";
        }

        public get x():number {
            return this.$x;
        }

        public set x(value:number) {
            this.$x = value;
        }

        public get y():number {
            return this.$y;
        }

        public set y(value:number) {
            this.$y = value;
        }

        public get z():number {
            return this.$z;
        }

        public set z(value:number) {
            this.$z = value;
        }

        public get w():number {
            return this.$w;
        }

        public set w(value:number) {
            this.$w = value;
        }

        public get length():number {
            return Math.sqrt(this.lengthSquared);
        }

        public get lengthSquared():number {
            return (this.$x * this.$x + this.$y * this.$y + this.$z * this.$z);
        }
    }
}