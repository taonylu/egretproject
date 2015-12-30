module flash {
    export class TextureBase extends egret.EventDispatcher {
        public m_width:number=0;
        public m_height:number=0;
        protected m_internalFormat:number=0;
        public m_texID:any;

        constructor() {
            super();
            this.m_width = 0;
            this.m_height = 0;
            this.m_internalFormat = 0;
            this.m_texID = null;
        }

        public dispose():void {

        }
    }
}