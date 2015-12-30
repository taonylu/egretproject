/**
 * Created by huitao on 2015/5/9.
 */
module flash {

    export class Matrix extends egret.Matrix {

        constructor(a:number = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0) {
            super(a, b, c, d, tx, ty);
        }

        public copyColumnFrom(column:number, vector3D:Vector3D):void {
            var self = this;
            column = column >>> 0;
            if (column === 0) {
                self.a = vector3D.x;
                self.c = vector3D.y;
                self.tx = vector3D.z;
            } else if (column === 1) {
                self.b = vector3D.x;
                self.d = vector3D.y;
                self.ty = vector3D.z;
            }
        }

        public copyColumnTo(column:number, vector3D:Vector3D):void {
            var self = this;
            column = column >>> 0;
            if (column === 0) {
                vector3D.x = self.a;
                vector3D.y = self.b;
                vector3D.z = 0;
            } else if (column === 1) {
                vector3D.x = self.c;
                vector3D.y = self.d;
                vector3D.z = 0;
            } else if (column === 2) {
                vector3D.x = self.tx;
                vector3D.y = self.ty;
                vector3D.z = 1;
            }
        }

        public copyRowFrom(row:number, vector3D:Vector3D):void {
            var self = this;
            row = row >>> 0;
            if (row === 0) {
                self.a = vector3D.x;
                self.c = vector3D.y;
                self.tx = vector3D.z;
            } else if (row === 1) {
                self.b = vector3D.x;
                self.d = vector3D.y;
                self.ty = vector3D.z;
            }
        }

        public copyRowTo(row:number, vector3D:Vector3D):void {
            var self = this;
            row = row >>> 0;
            if (row === 0) {
                vector3D.x = self.a;
                vector3D.y = self.c;
                vector3D.z = self.tx;
            } else if (row === 1) {
                vector3D.x = self.b;
                vector3D.y = self.d;
                vector3D.z = self.ty;
            } else if (row === 2) {
                vector3D.x = 0;
                vector3D.y = 0;
                vector3D.z = 1;
            }
        }

        //
        //    public createBox(scaleX:number, scaleY:number, rotation:number = 0, tx:number = 0, ty:number = 0):void {
        //        var self = this;
        //        if (rotation !== 0) {
        //            rotation = rotation / egret.Matrix.DEG_TO_RAD;
        //            var u = egret.NumberUtils.cos(rotation);
        //            var v = egret.NumberUtils.sin(rotation);
        //            self.a =  u * scaleX;
        //            self.b =  v * scaleY;
        //            self.c = -v * scaleX;
        //            self.d =  u * scaleY;
        //        } else {
        //            self.a = scaleX;
        //            self.b = 0;
        //            self.c = 0;
        //            self.d = scaleY;
        //        }
        //        self.tx = tx;
        //        self.ty = ty;
        //    }
        //
        //    public createGradientBox(width:number, height:number, rotation:number = 0, tx:number = 0, ty:number = 0):void {
        //        this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
        //    }
    }

}
