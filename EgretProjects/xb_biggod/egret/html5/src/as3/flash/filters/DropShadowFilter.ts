/**
 * Created by mengj_000 on 2015/4/26.
 */


module flash {

    export class DropShadowFilter extends egret.DropShadowFilter {

        public constructor(distance:number= 4.0, angle:number= 45, color:number = 0, alpha:number=1.0, blurX:number =4.0, blurY:number= 4.0,
                           strength:number= 1.0, quality:number=1, inner:boolean = false, knockout:boolean = false, hideObject:boolean = false) {
            super(distance, angle, color, alpha, blurX / 10, blurY / 10, strength, quality, inner, knockout, hideObject);
        }

        public clone():DropShadowFilter {
            return new DropShadowFilter(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
        }
    }


}