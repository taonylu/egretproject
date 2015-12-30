/**
 * Created by huitao on 2015/6/24.
 */

module flash {

    export class EOFError extends Error {
        public constructor(msg?:string, id?:number) {
            super(msg, id);
            this.name = "EOFError";
        }
    }

}