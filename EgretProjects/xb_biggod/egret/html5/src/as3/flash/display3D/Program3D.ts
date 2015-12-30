module flash {
    export class Program3D extends egret.HashObject {
        private webglContext:WebGLRenderingContext = WebGLUtils.webglContext;
        public m_programID:WebGLProgram;

        public uniformLocations:Array<WebGLUniformLocation> = [];
        public uniformLocationFunc:Array<string> = [];
        public attribLocations:Array<number> = [];

        constructor() {
            super();
        }

        public dispose():void {
            if (this.m_programID) {
                this.webglContext.deleteProgram(this.m_programID);
                this.m_programID = null;
            }
        }

        public upload(vertexProgram:string, fragmentProgram:string):void {
            this.m_programID = egret.WebGLUtils.compileProgram(this.webglContext, vertexProgram, fragmentProgram);
            var list:Array<string> = vertexProgram.split("\n");
            for (var i:number = 0 ; i < list.length ; i++) {
                var str:string = list[i];
                if(str.indexOf("main()") != -1) {
                    break;
                }
                var keys:Array<string> = str.split(" ");
                var key:string = keys[keys.length - 1];
                key = key.slice(0,key.length-1);
                if(str.indexOf("uniform") != -1) {
                    this.uniformLocations.push(this.webglContext.getUniformLocation(this.m_programID, key));
                    var func:string;
                    if (str.indexOf("mat2") != -1) {
                        func = "uniformMatrix2fv";
                    }
                    else if (str.indexOf("mat3") != -1) {
                        func = "uniformMatrix3fv";
                    }
                    else if (str.indexOf("mat4") != -1) {
                        func = "uniformMatrix4fv";
                    }
                    else if (str.indexOf("vec2") != -1) {
                        func = "uniform2fv";
                    }
                    else if (str.indexOf("vec3") != -1) {
                        func = "uniform3fv";
                    }
                    else if (str.indexOf("vec4") != -1) {
                        func = "uniform4fv";
                    }
                    this.uniformLocationFunc.push(func);
                }
                else if(str.indexOf("attribute") != -1){
                    this.attribLocations.push(this.webglContext.getAttribLocation(this.m_programID, key));
                }
            }
            this["vertexProgram"] = vertexProgram;
            this["fragmentProgram"] = fragmentProgram;
        }

        //public getAttributeLocation(attribName:string) {
        //    return this.webglContext.getAttribLocation(this.m_programID, attribName);
        //}
        //
        //public getUniformLocation(uniformName:string) {
        //    return this.webglContext.getUniformLocation(this.m_programID, uniformName);
        //}
    }
}