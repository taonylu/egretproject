module egret3d.GLSL {
                                                
    /**
    * @class egret3d.Uniform
    * @classdesc
    * uniform 变量
    */
    export class Uniform extends VarRegister {
                                        
        /**
        * @language zh_CN
        * constructor
        * @param name
        * @param valueType
        */
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "uniform";
            this.valueType = valueType;
        }
    }
} 