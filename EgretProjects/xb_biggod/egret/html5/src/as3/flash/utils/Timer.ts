/**
 * Created by huitao on 2015/5/8.
 */

module flash
{

        export class Timer extends egret.Timer
        {
            constructor(delay: number = 0, repeatCount: number=0)
            {
                super(delay,repeatCount);
            }
        }


}