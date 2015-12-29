/**
 * Created by mengj_000 on 2015/4/26.
 */

module flash {

    export class BlurFilter extends egret.BlurFilter {
        public constructor(blurX:number = 4.0, blurY:number = 4.0, quality:number = 1) {
            super(blurX / 10, blurY / 10);
        }

        public clone():BlurFilter {
            return new BlurFilter(this.blurX, this.blurY);
        }
    }


}