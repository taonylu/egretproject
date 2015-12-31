module egret3d.GLSL {
                                            
    /**
    * @class egret3d.TmpVar
    * @classdesc
    * 临时变量
    */
    export class TmpVar extends VarRegister {
                                
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
            this.key = "";
            this.valueType = valueType;
        }
    }
} 