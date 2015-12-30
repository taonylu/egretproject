/**
 * Created by huitao on 2015/9/2.
 */
module flash
{
    export class LocaleID
    {
        static DEFAULT : string = "i-default";

        constructor(name:String)
        {

        }

        static determinePreferredLocales(want:flash.Vector, have:flash.Vector, keyword:string = "userinterface"):flash.Vector
        {

            return null;
        }


        public getKeysAndValues():Object
        {
            return null;
        }


        public getLanguage():string
        {
            return "";
        }


        public getRegion():string
        {
            return "";
        }

        public getScript():string
        {
            return "";
        }


        public getVariant():string
        {
            return "";
        }


        public isRightToLeft():boolean
        {
            return false;
        }
    }
}