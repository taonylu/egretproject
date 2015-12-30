/**
 * Created by chenpeng on 2015/6/2.
 */
module egret
{
    export class DefineButton extends DefineBase{

        public up:Array<egret.ButtonRecord>;//ButtonRecord
        public over:Array<egret.ButtonRecord>;
        public down:Array<egret.ButtonRecord>;
        public hit:Array<egret.ButtonRecord>;

        constructor(obj:any = null){
            super(obj);
            this.createFromObject(obj);
        }

        public createFromObject(obj:any):void {
            super.createFromObject(obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.up = this.fromSlim(obj[2]);//up
                //this.over = this.fromSlim(obj[3]);
                this.down = this.fromSlim(obj[4]);
                this.hit = this.fromSlim(obj[5]);
            }
        }

        private fromSlim(arr:any):Array<egret.ButtonRecord>{
            var slimArr:Array<egret.ButtonRecord> = [];
            if(arr instanceof Array){
                for(var i:number=0; i<arr.length; i++){
                    var br:egret.ButtonRecord = new egret.ButtonRecord();
                    br.fromSlimData(arr[i]);
                    slimArr.push(br);
                }
            }
            return slimArr;
        }
    }
}