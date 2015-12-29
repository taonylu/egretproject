﻿module egret3d {

    export enum BlendMode {
        ALPHA , 
        LAYER , 
        NORMAL , 
        MULTIPLY , 
        ADD , 
        SUB , 
        DIV , 
        SCREEN 
    }
    /**
     * @class egret3d.ContextSamplerType
     * @classdesc
     * 贴图采样类型
     */
    export class ContextSamplerType {

        public static TEXTURE_0: any;
        public static TEXTURE_1: any;
        public static TEXTURE_2: any;
        public static TEXTURE_3: any;
        public static TEXTURE_4: any;
        public static TEXTURE_5: any;
        public static TEXTURE_6: any;
        public static TEXTURE_7: any;
        public static TEXTURE_8: any;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static REPEAT: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static NEAREST: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static LINEAR: number;
    }

} 