module flash {
    export class IndexBuffer3D extends egret.HashObject {
        public m_numIndexes:number = 0;
        private m_bufferUsage:string;
        private bytesPerElement:number = 0;
        public m_ibo:WebGLBuffer = null;
        private bufferData:any = null;
        private webglContext:WebGLRenderingContext = WebGLUtils.webglContext;

        constructor(numIndices:number, bufferUsage:string = "staticDraw") {
            super();
            this.m_bufferUsage = bufferUsage;
            this.m_numIndexes = numIndices;
            this.createInternalBufferObject();
        }

        private createInternalBufferObject():boolean {
            if (this.m_ibo) {
                this.dispose();
            }
            this.m_ibo = this.webglContext.createBuffer();
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, this.m_ibo);
            switch (WebGLUtils.indexType) {
                case "Uint8Array":
                    this.bufferData = new Uint8Array(this.m_numIndexes);
                    this.bytesPerElement = Uint8Array.BYTES_PER_ELEMENT;
                    break;
                case "Uint16Array":
                    this.bufferData = new Uint16Array(this.m_numIndexes);
                    this.bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;
                    break;
                case "Uint32Array":
                    this.bufferData = new Uint32Array(this.m_numIndexes);
                    this.bytesPerElement = Uint32Array.BYTES_PER_ELEMENT;
                    break;
            }
            this.webglContext.bufferData(this.webglContext.ELEMENT_ARRAY_BUFFER, this.m_numIndexes * this.bytesPerElement, Context3DBufferUsage[this.m_bufferUsage]);
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, null);
            return this.webglContext.isBuffer(this.m_ibo);
        }

        public dispose():void {
            if (this.m_ibo) {
                this.webglContext.deleteBuffer(this.m_ibo);
                this.bufferData = null;
                this.m_ibo = null;
            }
        }

        public uploadFromByteArray(data:egret.ByteArray, byteArrayOffset:number, startOffset:number, count:number):void {

        }

        public uploadFromVector(data:Array<number>, startOffset:number, count:number):void {
            this.bufferData.set(data, startOffset);
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, this.m_ibo);
            this.webglContext.bufferSubData(this.webglContext.ELEMENT_ARRAY_BUFFER, startOffset * this.bytesPerElement, this.bufferData);
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, null);
        }
    }
}