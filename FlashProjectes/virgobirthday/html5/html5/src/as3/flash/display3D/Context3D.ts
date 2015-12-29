module flash {
    export class Context3D extends egret.EventDispatcher {
        private backBufferWidth:number = 0;
        private backBufferHeight:number = 0;
        private m_stencilRefVal:number = 0;
        private m_stencilWriteMask:number = 0xff;
        private m_originViewport:egret.Rectangle = new egret.Rectangle(0, 0, 0, 0);
        private m_currentViewport:egret.Rectangle = new egret.Rectangle(0, 0, 0, 0);
        private webglContext:WebGLRenderingContext = WebGLUtils.webglContext;
        private mAntiAlias:number = 0;
        private mEnableDepthAndStencil:boolean = true;
        private mWantsBestResolution:boolean = false;
        private mWantsBestResolutionOnBrowserZoom:boolean = false;
        private m_currentProgram:Program3D = null;
        private m_internal_rttFramebuffer:WebGLFramebuffer = null;
        private m_internal_defautFBO:WebGLFramebuffer = null;

        constructor() {
            super();
            this.initInternalObjects();
        }

        private initInternalObjects():void {
            this.webglContext.enable(this.webglContext.BLEND);
            this.webglContext.blendFunc(this.webglContext.SRC_ALPHA, this.webglContext.ONE_MINUS_SRC_ALPHA);
            this.webglContext.enable(this.webglContext.CULL_FACE);
            this.webglContext.cullFace(this.webglContext.BACK);
            this.m_internal_rttFramebuffer = this.webglContext.createFramebuffer();
            this.m_internal_defautFBO = this.webglContext.getParameter(this.webglContext.FRAMEBUFFER_BINDING);
            this.webglContext.bindFramebuffer(this.webglContext.FRAMEBUFFER, this.m_internal_defautFBO);
        }

        public clear(red:number = 0.0, green:number = 0.0, blue:number = 0.0, alpha:number = 1.0, depth:number = 1.0, stencil:number = 0, mask:number = 0xffffffff):void {
            this.webglContext.clearColor(1, 0, 0, 1);
            this.webglContext.clear(this.webglContext.COLOR_BUFFER_BIT | this.webglContext.DEPTH_BUFFER_BIT);
        }

        public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true, wantsBestResolution:boolean = false, wantsBestResolutionOnBrowserZoom:boolean = false):void {
            this.backBufferWidth = width;
            this.backBufferHeight = height;
            this.m_originViewport.x = 0;
            this.m_originViewport.y = 0;
            this.m_originViewport.width = this.backBufferWidth;
            this.m_originViewport.height = this.backBufferHeight;
            this.m_currentViewport.x = 0;
            this.m_currentViewport.y = 0;
            this.m_currentViewport.width = this.backBufferWidth;
            this.m_currentViewport.height = this.backBufferHeight;
            this.mAntiAlias = antiAlias;
            this.mEnableDepthAndStencil = enableDepthAndStencil;
            this.mWantsBestResolution = wantsBestResolution;
            this.mWantsBestResolutionOnBrowserZoom = wantsBestResolutionOnBrowserZoom;
            this.webglContext.viewport(0, 0, width, height);
            if (enableDepthAndStencil == true) {
                this.webglContext.enable(this.webglContext.DEPTH_TEST);
                this.webglContext.depthFunc(this.webglContext.LEQUAL);
                this.webglContext.depthMask(true);
                this.webglContext.enable(this.webglContext.STENCIL_TEST);
                this.webglContext.stencilFunc(this.webglContext.ALWAYS, 1, 1);
                this.webglContext.stencilOp(this.webglContext.KEEP, this.webglContext.KEEP, this.webglContext.REPLACE);
            }
            else {
                this.webglContext.depthMask(false);
                this.webglContext.disable(this.webglContext.DEPTH_TEST);
                this.webglContext.disable(this.webglContext.STENCIL_TEST);
            }
        }

        public createCubeTexture(size:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):void {
            //todo
        }

        public createIndexBuffer(numIndices:number, bufferUsage:string = Context3DBufferUsage.STATIC_DRAW):IndexBuffer3D {
            return new IndexBuffer3D(numIndices, bufferUsage);
        }

        public createProgram():Program3D {
            return new Program3D();
        }

        public createTexture(width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):Texture {
            return new Texture(width, height, format, optimizeForRenderToTexture, streamingLevels);
        }

        public createVertexBuffer(numVertices:number, data32PerVertex:number, bufferUsage:string = Context3DBufferUsage.STATIC_DRAW):VertexBuffer3D {
            return new VertexBuffer3D(numVertices, data32PerVertex, bufferUsage);
        }

        public dispose():void {

        }

        public drawToBitmapData(destination:BitmapData):void {

        }

        public drawTriangles(indexBuffer:IndexBuffer3D, firstIndex:number = 0, numTriangles:number = -1):void {
            var numIndices = 0;
            if (numTriangles == -1) {
                numIndices = indexBuffer.m_numIndexes - firstIndex;
            }
            else {
                numIndices = ((firstIndex + numTriangles * 3) <= indexBuffer.m_numIndexes) ? (numTriangles * 3) : (indexBuffer.m_numIndexes - firstIndex);
            }
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, indexBuffer.m_ibo);
            this.webglContext.drawElements(this.webglContext.TRIANGLES, numIndices, WebGLUtils.drawElementSize, 0);
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, null);
        }

        public present():void {
            this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, null);
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, null);
            this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, null);
            this.webglContext.bindFramebuffer(this.webglContext.FRAMEBUFFER, this.m_internal_defautFBO);
            this.m_currentProgram = null;
        }

        public setBlendFactors(sourceFactor:string, destinationFactor:string):void {
            this.webglContext.blendFunc(Context3DBlendFactor[sourceFactor], Context3DBlendFactor[destinationFactor]);
        }

        public setColorMask(red:boolean, green:boolean, blue:boolean, alpha:boolean):void {
            this.webglContext.colorMask(red, green, blue, alpha);
        }

        public setCulling(triangleFaceToCull:string):void {
            if (triangleFaceToCull == Context3DTriangleFace.NONE) {
                this.webglContext.disable(this.webglContext.CULL_FACE);
            }
            else {
                this.webglContext.enable(this.webglContext.CULL_FACE);
                this.webglContext.cullFace(Context3DTriangleFace[triangleFaceToCull]);
            }
        }

        public setDepthTest(depthMask:boolean, passCompareMode:string):void {
            this.webglContext.depthMask(depthMask);
            this.webglContext.depthFunc(Context3DCompareMode[passCompareMode]);
        }

        public setProgram(program:Program3D):void {
            if (program == null) {
                return;
            }
            this.webglContext.useProgram(program.m_programID);
            this.m_currentProgram = program;
        }

        public setProgramConstantsFromByteArray(programType:string, firstRegister:number, numRegisters:number, data:egret.ByteArray, byteArrayOffset:number):void {

        }

        public setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:Matrix3D, transposedMatrix:boolean = false):void {
            var f32Arr;
            if (!transposedMatrix) {
                var matrixClone;
                matrixClone = matrix.clone();
                matrixClone.transpose();
                f32Arr = new Float32Array(matrixClone.rawData);
            }
            else {
                f32Arr = new Float32Array(matrix.rawData);
            }
            var loc:WebGLUniformLocation = this.m_currentProgram.uniformLocations[firstRegister];
            if (loc) {
                this.webglContext.uniformMatrix4fv(loc, false, f32Arr);
            }
        }

        public setProgramConstantsFromVector(programType:string, firstRegister:number, data:Array<number>, numRegisters:number = -1):void {
            if (!data || data.length == 0 || this.m_currentProgram == null) {
                return;
            }
            var f32Arr = new Float32Array(data);
            var loc:WebGLUniformLocation = this.m_currentProgram.uniformLocations[firstRegister];
            var func = this.m_currentProgram.uniformLocationFunc[firstRegister];
            if (loc) {
                if(func.indexOf("Matrix") != -1) {
                    this.webglContext[func](loc, false, f32Arr);
                }
                else {
                    this.webglContext[func](loc, f32Arr);
                }
            }
        }

        public setRenderToBackBuffer():void {
            this.m_currentViewport.x = this.m_originViewport.x;
            this.m_currentViewport.y = this.m_originViewport.y;
            this.m_currentViewport.width = this.m_originViewport.width;
            this.m_currentViewport.height = this.m_originViewport.height;
            this.webglContext.viewport(0, 0, this.m_currentViewport.width, this.m_currentViewport.height);
            this.webglContext.bindFramebuffer(this.webglContext.FRAMEBUFFER, this.m_internal_defautFBO);
        }

        public setRenderToTexture(texture:TextureBase, enableDepthAndStencil:boolean = false, antiAlias:number = 0, surfaceSelector:number = 0, colorOutputIndex:number = 0):void {
            if (texture == null) {
                this.setRenderToBackBuffer();
            }
            else {
                this.m_currentViewport.x = 0;
                this.m_currentViewport.y = 0;
                this.m_currentViewport.width = texture.m_width;
                this.m_currentViewport.height = texture.m_height;
                this.webglContext.viewport(0, 0, this.m_currentViewport.width, this.m_currentViewport.height);
                this.webglContext.bindFramebuffer(this.webglContext.FRAMEBUFFER, this.m_internal_rttFramebuffer);
                this.webglContext.framebufferTexture2D(this.webglContext.FRAMEBUFFER, this.webglContext.COLOR_ATTACHMENT0, this.webglContext.TEXTURE_2D, texture.m_texID, 0);
                var status = this.webglContext.checkFramebufferStatus(this.webglContext.FRAMEBUFFER);
                if (status != this.webglContext.FRAMEBUFFER_COMPLETE) {
                    this.setRenderToBackBuffer();
                    return;
                }
                this.webglContext.clearColor(0, 0, 0, 0);
                if (enableDepthAndStencil) {
                    this.webglContext.clear(this.webglContext.COLOR_BUFFER_BIT | this.webglContext.DEPTH_BUFFER_BIT);
                }
                else {
                    this.webglContext.disable(this.webglContext.DEPTH_TEST);
                    this.webglContext.clear(this.webglContext.COLOR_BUFFER_BIT);
                }
            }
        }

        public setSamplerStateAt(sampler:number, wrap:string, filter:string, mipfilter:string):void {

        }

        public setScissorRectangle(rectangle:egret.Rectangle):void {
            if (rectangle == null) {
                this.webglContext.disable(this.webglContext.SCISSOR_TEST);
            }
            else {
                var t_yStart;
                if (this.m_currentViewport.x != this.m_originViewport.x
                    || this.m_currentViewport.y != this.m_originViewport.y
                    || this.m_currentViewport.width != this.m_originViewport.width
                    || this.m_currentViewport.height != this.m_originViewport.height) {
                    t_yStart = rectangle.y;
                }
                else {
                    t_yStart = this.m_currentViewport.height - (rectangle.y + rectangle.height);
                    if (t_yStart < 0) {
                        t_yStart = 0;
                    }
                }
                this.webglContext.scissor(rectangle.x, t_yStart, rectangle.width, rectangle.height);
                this.webglContext.enable(this.webglContext.SCISSOR_TEST);
            }
        }

        public setStencilActions(triangleFace:string = Context3DTriangleFace.FRONT_AND_BACK, compareMode:string = Context3DCompareMode.ALWAYS, actionOnBothPass:string = Context3DStencilAction.KEEP, actionOnDepthFail:string = Context3DStencilAction.KEEP, actionOnDepthPassStencilFail:string = Context3DStencilAction.KEEP):void {
            var t_iActionBothPass = Context3DStencilAction[actionOnBothPass];
            var t_iActionOnDepthFail = Context3DStencilAction[actionOnDepthFail];
            var t_iActionOnDepthPassStencilFail = Context3DStencilAction[actionOnDepthPassStencilFail];
            this.webglContext.stencilOp(t_iActionOnDepthPassStencilFail, t_iActionOnDepthFail, t_iActionBothPass);
            var t_vecStencilFunc = Context3DCompareMode[compareMode];
            this.webglContext.stencilFunc(t_vecStencilFunc, this.m_stencilRefVal, this.m_stencilWriteMask);
        }

        public setStencilReferenceValue(referenceValue:number, readMask:number = 255, writeMask:number = 255):void {
            this.m_stencilRefVal = referenceValue;
            this.m_stencilWriteMask = writeMask;
            this.webglContext.stencilMask(writeMask);
        }

        public setTextureAt(sampler:number, texture:TextureBase):void {
            if (texture == null || texture.m_texID == null) {
                this.webglContext.activeTexture(this.webglContext["TEXTURE" + sampler]);
                this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, null);
            }
            else {
                this.webglContext.activeTexture(this.webglContext["TEXTURE" + sampler]);
                this.webglContext.bindTexture(this.webglContext.TEXTURE_2D, texture.m_texID);
            }
        }

        public setVertexBufferAt(index:number, buffer:VertexBuffer3D, bufferOffset:number = 0, format:string = Context3DVertexBufferFormat.FLOAT_4):void {
            if (buffer && buffer.m_vbo) {
                var components = Context3DVertexBufferFormat[format];
                this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer.m_vbo);
                var m = Float32Array.BYTES_PER_ELEMENT;
                var key:number = this.m_currentProgram.attribLocations[index];
                if (key != null && key != -1) {
                    this.webglContext.enableVertexAttribArray(key);
                    this.webglContext.vertexAttribPointer(key, components, this.webglContext.FLOAT, false, buffer.m_data32PerVertex * m, bufferOffset * m);
                }
            }
            this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, null);
            if (buffer == null) {
                this.webglContext.disableVertexAttribArray(index);
            }
        }

        public get driverInfo():string {
            return null;
        }

        public enableErrorChecking:boolean = false;
    }
}