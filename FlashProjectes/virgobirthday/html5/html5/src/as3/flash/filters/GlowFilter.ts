/**
 * Created by mengj_000 on 2015/4/26.
 */

module flash {

    export class GlowFilter extends egret.GlowFilter {
        public constructor(color:number = 0xFF0000, alpha:number = 1.0, blurX:number = 6.0, blurY:number = 6.0, strength:number = 2, quality:number = 1, inner:boolean = false, knockout:boolean = false) {
            super(color, alpha, blurX / 10, blurY / 10, strength, quality, inner, knockout);
        }

        public clone():GlowFilter {
            return new GlowFilter(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
        }
    }


}