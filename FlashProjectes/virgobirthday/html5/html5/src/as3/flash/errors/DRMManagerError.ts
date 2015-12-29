/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class DRMManagerError extends Error {
        private $_subErrorID:number;
        public get subErrorID():number {
            return this.$_subErrorID;
        }

        public constructor(msg?:string, id?:number) {
            super(msg, id);
            this.name = "DRMManagerError";
        }

        public toString():string {
            return "[name :" + this.name + ",message :" + this.message + ",subErrorID" + this.$_subErrorID+ "]";
        }
    }

}