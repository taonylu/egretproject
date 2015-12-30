/**
 * Created by huitao on 2015/6/24.
 */
module flash {

    export class Security {
        static exactSettings:boolean;
        static sandboxType:string;


        public static allowDomain(...domains):void {

        }

        public static allowInsecureDomain(...domains):void {

        }

        public static loadPolicyFile(url:string):void {

        }

        public static showSettings(panel:string = "default"):void {

        }

        static LOCAL_TRUSTED:string = "localTrusted";

        static LOCAL_WITH_FILE:string = "localWithFile";

        static LOCAL_WITH_NETWORK:string = "localWithNetwork";

        static REMOTE:string = "remote";

        constructor() {

        }
    }


}
