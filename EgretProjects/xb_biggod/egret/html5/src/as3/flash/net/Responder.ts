/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class Responder {
        private $result:Function;
        private $status:Function;

        constructor(result:Function, status:Function = null) {
            this.$result = result;
            this.$status = status;
        }
    }


}