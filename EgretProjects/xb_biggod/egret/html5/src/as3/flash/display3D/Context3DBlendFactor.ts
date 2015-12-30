module flash.Context3DBlendFactor {
    export var DESTINATION_ALPHA:string = "destinationAlpha";
    export var DESTINATION_COLOR:string = "destinationColor";
    export var ONE:string = "one";
    export var ONE_MINUS_DESTINATION_ALPHA:string = "oneMinusDestinationAlpha";
    export var ONE_MINUS_DESTINATION_COLOR:string = "oneMinusDestinationColor";
    export var ONE_MINUS_SOURCE_ALPHA:string = "oneMinusSourceAlpha";
    export var ONE_MINUS_SOURCE_COLOR:string = "oneMinusSourceColor";
    export var SOURCE_ALPHA:string = "sourceAlpha";
    export var SOURCE_COLOR:string = "sourceColor";
    export var ZERO:string = "zero";

    export var destinationAlpha:number=0;
    export var destinationColor:number=0;
    export var one:number=0;
    export var oneMinusDestinationAlpha:number=0;
    export var oneMinusDestinationColor:number=0;
    export var oneMinusSourceAlpha:number=0;
    export var oneMinusSourceColor:number=0;
    export var sourceAlpha:number=0;
    export var sourceColor:number=0;
    export var zero:number=0;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DBlendFactor.destinationAlpha = webglContext.DST_ALPHA;
        Context3DBlendFactor.destinationColor = webglContext.DST_COLOR;
        Context3DBlendFactor.one = webglContext.ONE;
        Context3DBlendFactor.oneMinusDestinationAlpha = webglContext.ONE_MINUS_DST_ALPHA;
        Context3DBlendFactor.oneMinusDestinationColor = webglContext.ONE_MINUS_DST_COLOR;
        Context3DBlendFactor.oneMinusSourceAlpha = webglContext.ONE_MINUS_SRC_ALPHA;
        Context3DBlendFactor.oneMinusSourceColor = webglContext.ONE_MINUS_SRC_COLOR;
        Context3DBlendFactor.sourceAlpha = webglContext.SRC_ALPHA;
        Context3DBlendFactor.sourceColor = webglContext.SRC_COLOR;
        Context3DBlendFactor.zero = webglContext.ZERO;
    }
}