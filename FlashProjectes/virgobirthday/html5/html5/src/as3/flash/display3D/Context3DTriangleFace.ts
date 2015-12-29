module flash.Context3DTriangleFace {
    export var BACK:string = "back";
    export var FRONT:string = "front";
    export var FRONT_AND_BACK:string = "frontAndBack";
    export var NONE:string = "none";

    export var back:number = 1029;
    export var front:number = 1028;
    export var frontAndBack:number = 1032;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DTriangleFace.back = webglContext.BACK;
        Context3DTriangleFace.front = webglContext.FRONT;
        Context3DTriangleFace.frontAndBack = webglContext.FRONT_AND_BACK;
    }
}