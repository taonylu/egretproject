/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class SQLError extends Error {

        public detailID:number = 0;
        public detailArguments:Array<any>;
        public details:string = "";
        public operation:string = "";


        constructor(message:string = "", id:number = 0) {
            super(message, id);
            this.name = "SQLErrorOperation";
        }

        public toString():string {
            return "[detailID" + this.detailID + ",details" + this.details + ",operation" + this.operation + ",detailID" + this.message + ",id" + this.errorId + ",name" + this.name + "]"
        }
    }

}