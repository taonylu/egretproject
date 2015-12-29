module flash {
    export class Texture extends TextureBase {
        private m_optimizeForRenderToTexture:boolean = false;
        private m_streamingLevels:number = 0;
        private m_format:number=0;
        private webglContext:WebGLRenderingContext = WebGLUtils.webglContext;

        constructor(width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number) {
            super();

            this.m_width = WebGLUtils.getNextPowerOfTwo(width);
            this.m_height = WebGLUtils.getNextPowerOfTwo(height);
            this.m_format = Context3DTextureFormat[format];
            this.m_optimizeForRenderToTexture = optimizeForRenderToTexture;
            this.m_streamingLevels = streamingLevels;
            this.m_internalFormat = this.m_format;
            this.webglContext.pixelStorei(this.webglContext.UNPACK_ALIGNMENT, 1);
            this.m_texID = this.webglContext.createTexture();
            if (this.m_texID != null) {
                this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, this.m_texID);
                this.webglContext.texParameteri(this.webglContext.TEXTURE_2D, this.webglContext.TEXTURE_MIN_FILTER, this.webglContext.LINEAR);
                this.webglContext.texParameteri(this.webglContext.TEXTURE_2D, this.webglContext.TEXTURE_MAG_FILTER, this.webglContext.LINEAR);
                this.webglContext.texParameteri(this.webglContext.TEXTURE_2D, this.webglContext.TEXTURE_WRAP_S, this.webglContext.CLAMP_TO_EDGE);
                this.webglContext.texParameteri(this.webglContext.TEXTURE_2D, this.webglContext.TEXTURE_WRAP_T, this.webglContext.CLAMP_TO_EDGE);
                this.webglContext.texImage2D(this.webglContext.TEXTURE_2D, 0, this.m_internalFormat, this.m_width, this.m_height,
                    0, this.m_internalFormat, this.webglContext.UNSIGNED_BYTE, null);
                this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, null);
            }
        }

        public uploadCompressedTextureFromByteArray(data:egret.ByteArray, byteArrayOffset:number, async:boolean = false):void {

        }

        public uploadFromBitmapData(source:BitmapData, miplevel:number = 0):void {
            var gl = this.webglContext;

            this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, this.m_texID);
            this.webglContext.pixelStorei(this.webglContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, <any>true);
            this.webglContext.texSubImage2D(this.webglContext.TEXTURE_2D, 0, 0, 0, this.webglContext.RGBA, this.webglContext.UNSIGNED_BYTE, source._bitmapData);

            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        public uploadFromByteArray(data:egret.ByteArray, byteArrayOffset:number, miplevel:number = 0):void {

        }
    }
}