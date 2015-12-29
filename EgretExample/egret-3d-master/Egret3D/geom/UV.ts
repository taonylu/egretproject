module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.UV
     * @classdesc
     * UV 类 
     */
    export class UV {
        
        /**
        * @language zh_CN
        * u
        */
        public u: number = 0;
        
        /**
        * @language zh_CN
        * v
        */
        public v: number = 0;
                
        /**
        * @language zh_CN
        * constructor
        */
        constructor(u: number = 0, v: number = 0) {
            this.u = u;
            this.v = v;
        }
    } 
} 