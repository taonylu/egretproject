module flash.Context3DCompareMode {
    export var ALWAYS:string = "always";
    export var EQUAL:string = "equal";
    export var GREATER:string = "greater";
    export var GREATER_EQUAL:string = "greaterEqual";
    export var LESS:string = "less";
    export var LESS_EQUAL:string = "lessEqual";
    export var NEVER:string = "never";
    export var NOT_EQUAL:string = "notEqual";

    export var always:number=0;
    export var equal:number=0;
    export var greater:number=0;
    export var greaterEqual:number=0;
    export var less:number=0;
    export var lessEqual:number=0;
    export var never:number=0;
    export var notEqual:number=0;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DCompareMode.always = webglContext.ALWAYS;
        Context3DCompareMode.equal = webglContext.EQUAL;
        Context3DCompareMode.greater = webglContext.GREATER;
        Context3DCompareMode.less = webglContext.LESS;
        Context3DCompareMode.lessEqual = webglContext.LEQUAL;
        Context3DCompareMode.never = webglContext.NEVER;
        Context3DCompareMode.notEqual = webglContext.NOTEQUAL;
    }
}