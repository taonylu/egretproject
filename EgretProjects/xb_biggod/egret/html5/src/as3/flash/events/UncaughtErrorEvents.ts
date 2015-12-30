/**
 * Created by huitao on 2015/6/30.
 */
module flash
{
    export class UncaughtErrorEvents extends EventDispatcher
    {
        static UNCAUGHT_ERROR:string = "uncaughtError";

        constructor()
        {
            super();
        }
    }
}