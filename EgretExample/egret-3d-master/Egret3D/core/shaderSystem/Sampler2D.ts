module egret3d.GLSL {
                                    
    /**
    * @class egret3d.Sampler2D
    * @classdesc
    * 采样2D类型
    */
    export class Sampler2D extends VarRegister {
                
        /**
        * @language zh_CN
        * constructor
        * @param name
        */
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "sampler2D";
            ///this.valueType = valueType;
        }
    }
} 