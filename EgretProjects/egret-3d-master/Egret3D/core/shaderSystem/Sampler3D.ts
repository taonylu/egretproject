module egret3d.GLSL {
                                        
    /**
    * @class egret3d.Sampler3D
    * @classdesc
    * 采样3D类型
    */
    export class Sampler3D extends VarRegister {
                        
        /**
        * @language zh_CN
        * constructor
        * @param name
        */
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "samplerCube";
        }
    }
} 