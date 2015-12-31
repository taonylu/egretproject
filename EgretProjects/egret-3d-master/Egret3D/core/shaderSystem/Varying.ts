﻿module egret3d.GLSL {
    
    /**
    * @class egret3d.VarRegister
    * @classdesc
    * shader Varying 变量 
    */
    export class Varying extends VarRegister {
                                                
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
            this.key = "varying";
            this.valueType = valueType;
        }
    }
} 