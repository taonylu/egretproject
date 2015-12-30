module flash {
    export class Rectangle extends egret.Rectangle {
        public get topLeft():egret.Point {
            return new egret.Point(this.left, this.top);
        }

        public set topLeft(value:egret.Point) {
            this.top = value.y;
            this.left = value.x;
        }

        public get bottomRight():egret.Point {
            return new egret.Point(this.right, this.bottom);
        }

        public set bottomRight(value:egret.Point) {
            this.bottom = value.y;
            this.right = value.x;
        }

        constructor(_x:number = 0 ,_y:number = 0 ,_w:number= 0 ,_h:number = 0)
        {
            super(_x,_y,_w,_h);
        }
    }
}