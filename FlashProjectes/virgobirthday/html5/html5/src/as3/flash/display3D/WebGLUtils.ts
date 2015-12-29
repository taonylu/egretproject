module flash {
    export class WebGLUtils {
        private static chrome = {drawElementSize: 5123, indexType: "Uint16Array"};
        private static msie = {drawElementSize: 5125, indexType: "Uint32Array"};
        private static firefox = {drawElementSize: 5123, indexType: "Uint16Array"};
        private static opera = {drawElementSize: 5123, indexType: "Uint16Array"};
        private static netscape = {drawElementSize: 5123, indexType: "Uint16Array"};
        private static safari = {drawElementSize: 5123, indexType: "Uint16Array"};
        private static current:any = null;
        public static webglContext:WebGLRenderingContext = null;

        public static initContext(canvas:HTMLCanvasElement):void {
            var options = {
                alpha: false,
                stencil: true
            };
            var gl:WebGLRenderingContext;
            var names = ["experimental-webgl", "webgl"];
            for (var i = 0; i < names.length; i++) {
                try {
                    gl = canvas.getContext(names[i], options);
                } catch (e) {
                }
                if (gl) {
                    break;
                }
            }
            if (!gl) {
                throw new Error("Current browser does not support webgl");
            }
            flash.WebGLUtils.webglContext = gl;
            if (!WebGLUtils.current) {
                WebGLUtils.initConfig();
                Context3DBlendFactor.init(gl);
                Context3DBufferUsage.init(gl);
                Context3DCompareMode.init(gl);
                Context3DStencilAction.init(gl);
                Context3DTextureFormat.init(gl);
                Context3DTriangleFace.init(gl);
            }
        }

        private static initConfig():void {
            var brow = {
                msie: false,
                firefox: false,
                opera: false,
                safari: false,
                chrome: false,
                netscape: false,
                appname: 'unknown',
                version: 0,
                platform: ''
            };
            var userAgent:string = navigator.userAgent.toLowerCase();
            var reg:RegExp = new RegExp("(msie|firefox|opera|chrome|netscape)\\D+(\\d[\\d.]*)");
            var regVersion:RegExp = new RegExp("version\\D+(\\d[\\d.]*).*safari");
            var name;
            var version;
            if (reg.test(userAgent)) {
                name = userAgent.match(reg)[1];
                version = userAgent.match(reg)[2];
                brow[name] = true;
                brow.appname = name;
                brow.version = version;
            }
            else if (regVersion.test(userAgent)) {
                name = userAgent.match(regVersion)[1];
                version = userAgent.match(regVersion)[1];
                brow.safari = true;
                brow.appname = 'safari';
                brow.version = name;
            }
            brow.platform = navigator.platform;
            switch (brow.appname) {
                case "firefox":
                    WebGLUtils.current = WebGLUtils.firefox;
                    break;
                case "opera":
                    WebGLUtils.current = WebGLUtils.opera;
                    break;
                case "chrome":
                    WebGLUtils.current = WebGLUtils.chrome;
                    break;
                case "netscape":
                    WebGLUtils.current = WebGLUtils.netscape;
                    break;
                case "safari":
                    WebGLUtils.current = WebGLUtils.safari;
                    break;
                default :
                    WebGLUtils.current = WebGLUtils.msie;
            }
        }

        public static get drawElementSize():number {
            return WebGLUtils.current.drawElementSize;
        }

        public static get indexType():string {
            return WebGLUtils.current.indexType;
        }

        public static getNextPowerOfTwo(number:number):number {
            if ((typeof number == 'number') && number > 0 && (number & (number - 1)) == 0) {
                return number;
            }
            else {
                var result = 1;
                number -= 0.000000001;
                while (result < number) {
                    result <<= 1;
                }
                return result;
            }
        }
    }
}