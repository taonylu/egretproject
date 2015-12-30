module flash.Context3DStencilAction {
    export var DECREMENT_SATURATE:string = "decrementSaturate";
    export var DECREMENT_WRAP:string = "decrementWrap";
    export var INCREMENT_SATURATE:string = "incrementSaturate";
    export var INCREMENT_WRAP:string = "incrementWrap";
    export var INVERT:string = "invert";
    export var KEEP:string = "keep";
    export var SET:string = "set";
    export var ZERO:string = "zero";

    export var decrementSaturate:number=0;
    export var decrementWrap:number=0;
    export var incrementSaturate:number=0;
    export var incrementWrap:number=0;
    export var invert:number=0;
    export var keep:number=0;
    export var set:number=0;
    export var zero:number=0;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DStencilAction.decrementSaturate = webglContext.DECR;
        Context3DStencilAction.decrementWrap = webglContext.DECR_WRAP;
        Context3DStencilAction.incrementSaturate = webglContext.INCR;
        Context3DStencilAction.incrementWrap = webglContext.INCR_WRAP;
        Context3DStencilAction.invert = webglContext.INVERT;
        Context3DStencilAction.keep = webglContext.KEEP;
        Context3DStencilAction.set = webglContext.KEEP;
        Context3DStencilAction.zero = webglContext.ZERO;
    }
}