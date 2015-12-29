module egret3d.openGLES {
    export class IndexBuffer3D implements egret3d.IndexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}