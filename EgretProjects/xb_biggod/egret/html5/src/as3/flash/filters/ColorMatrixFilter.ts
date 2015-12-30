/**
 * Created by mengj_000 on 2015/4/26.
 */


module flash {

    export class ColorMatrixFilter extends egret.ColorMatrixFilter {
        public constructor(matrix?:Array<number>) {
            super(matrix);
        }

        public clone():ColorMatrixFilter {
            return new ColorMatrixFilter(this.matrix);
        }
    }


}