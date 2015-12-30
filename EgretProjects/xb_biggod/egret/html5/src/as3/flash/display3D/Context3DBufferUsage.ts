module flash.Context3DBufferUsage {
    export var DYNAMIC_DRAW:string = "dynamicDraw";
    export var STATIC_DRAW:string = "staticDraw";

    export var dynamicDraw:number=0;
    export var staticDraw:number=0;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DBufferUsage.dynamicDraw = webglContext.DYNAMIC_DRAW;
        Context3DBufferUsage.staticDraw = webglContext.STATIC_DRAW;
    }
}