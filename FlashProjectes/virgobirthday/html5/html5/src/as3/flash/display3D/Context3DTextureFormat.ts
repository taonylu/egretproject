module flash.Context3DTextureFormat {
    export var BGRA:string = "bgra";
    export var BGRA_PACKED:string = "bgraPacked4444";
    export var BGR_PACKED:string = "bgrPacked565";
    export var COMPRESSED:string = "compressed";
    export var COMPRESSED_ALPHA:string = "compressedAlpha";
    export var RGBA_HALF_FLOAT:string = "rgbaHalfFloat";

    export var bgra:number=0;
    export var bgraPacked4444:number=0;
    export var bgrPacked565:number=0;
    export var compressed:number=0;
    export var compressedAlpha:number=0;
    export var rgbaHalfFloat:number=0;

    export function init(webglContext:WebGLRenderingContext):void {
        Context3DTextureFormat.bgra = webglContext.RGBA;
        Context3DTextureFormat.bgraPacked4444 = webglContext.UNSIGNED_SHORT_4_4_4_4;
        Context3DTextureFormat.bgrPacked565 = webglContext.UNSIGNED_SHORT_5_6_5;
        Context3DTextureFormat.compressed = webglContext.ZERO;
        Context3DTextureFormat.compressedAlpha = webglContext.ZERO;
        Context3DTextureFormat.rgbaHalfFloat = webglContext.ZERO;
    }
}