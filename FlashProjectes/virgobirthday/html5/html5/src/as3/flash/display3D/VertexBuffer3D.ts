module flash {
    export class VertexBuffer3D extends egret.HashObject {
        private m_numVertices:number = 0;
        public m_data32PerVertex:number = 0;
        private bytesPerElement:number = 0;
        private m_bufferUsage:string;
        public m_vbo:WebGLBuffer = null;
        private webglContext:WebGLRenderingContext = WebGLUtils.webglContext;
        private bufferData:Float32Array = null;

        constructor(numVertices:number, data32PerVertex:number, bufferUsage:string = "staticDraw") {
            super();
            this.m_bufferUsage = bufferUsage;
            this.m_numVertices = numVertices;
            this.m_data32PerVertex = data32PerVertex;
            this.createInternalBufferObject();
        }

        private createInternalBufferObject():boolean {
            if (this.m_vbo) {
                this.dispose();
            }
            this.bufferData = new Float32Array(this.m_numVertices * this.m_data32PerVertex);
            this.bytesPerElement = Float32Array.BYTES_PER_ELEMENT;
            this.m_vbo = this.webglContext.createBuffer();
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, this.m_vbo);
            this.webglContext.bufferData(this.webglContext.ARRAY_BUFFER, this.m_numVertices * this.m_data32PerVertex * this.bytesPerElement, Context3DBufferUsage[this.m_bufferUsage]);
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, null);
            return this.webglContext.isBuffer(this.m_vbo);
        }

        public dispose():void {
            if (this.m_vbo) {
                this.webglContext.deleteBuffer(this.m_vbo);
                this.m_vbo = null;
            }
        }

        public uploadFromByteArray(data:egret.ByteArray, byteArrayOffset:number, startVertex:number, numVertices:number):void {

        }

        public uploadFromVector(data:Array<number>, startVertex:number, numVertices:number):void {
            if (numVertices > this.m_numVertices) {
            }
            this.bufferData.set(data, 0);
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, this.m_vbo);
            this.webglContext.bufferSubData(this.webglContext.ARRAY_BUFFER, startVertex * this.m_data32PerVertex * this.bytesPerElement, this.bufferData);
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, null);
        }
    }
}