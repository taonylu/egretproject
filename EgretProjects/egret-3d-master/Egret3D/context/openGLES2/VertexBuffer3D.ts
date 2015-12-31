module egret3d.openGLES {
    export class VertexBuffer3D implements egret3d.VertexBuffer3D {
        public buffer: WebGLBuffer;
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}