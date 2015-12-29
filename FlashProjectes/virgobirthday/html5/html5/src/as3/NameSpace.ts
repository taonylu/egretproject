/**
 * Created by huitao on 2015/5/13.
 */
module flash
{
    export class NameSpace
    {
        public prefix:string ;

        public uri:string;

        constructor(prefixValue?:any, uriValue?:any)
        {
            this.prefix = prefixValue ;
            this.uri = uriValue;
        }

        public toString():string
        {
            return this.uri;
        }

        public valueOf():string
        {
            return this.uri;
        }
    }
}
