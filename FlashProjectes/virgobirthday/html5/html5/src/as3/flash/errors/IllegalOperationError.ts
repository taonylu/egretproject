/**
 * Created by mengj_000 on 2015/5/3.
 */

module flash {

    export class IllegalOperationError extends Error {

        public name:string;
        public message:string;

        public constructor(msg?:string, id?:number) {
            super(msg, id);
            this.name = "IllegalOperationError";
        }
    }

}