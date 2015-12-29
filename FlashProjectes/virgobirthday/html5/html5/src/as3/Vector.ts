module flash {
    export class Vector extends egret.HashObject {
        private _array:Array<any> = [];
        private _type:string;

        constructor(length:number = 0, public fixed:boolean = false, type:string = null, arr:Array<any> = null) {
            super();
            //兼容Flash
            this._type = type;
            if(arr) {
                this._array = arr;
            }
            else {
                this.length = length;
            }
        }

        private invalidate():void {
            var i:number = 0;
            while (this[i] != undefined) {
                delete this[i];
                i++;
            }
            var length = this._array.length;
            for (var j:number = 0; j < length; j++) {
                this[j] = this._array[j];
            }
        }

        private static makeVector(arr:Array<any>):Vector {
            var result = new Vector();
            result._array = arr;
            result.invalidate();
            return result;
        }

        public concat(...args):Vector {
            var arr = this._array;
            for (var i:number = 0 ; i < args.length ; i++){
                var item = args[i];
                if(item instanceof Vector) {
                   arr = arr.concat(item._array);
                }
                else {
                   arr =arr.concat(item);
                }
            }
            
            if(args.length == 0){
                arr = arr.concat();
            }
            
            return Vector.makeVector(arr);
        }

        public every(callback:(value:any, index:number, array:any[]) => boolean, thisObject:any = null):void {
            this._array.every(callback, thisObject);
        }

        public filter(callback:(value:any, index:number, array:any[]) => boolean, thisObject:any = null):Vector {
            var arr = this._array.filter(callback, thisObject);
            return Vector.makeVector(arr);
        }

        public forEach(callback:(value:any, index:number, array:any[]) => boolean, thisObject:any = null):void {
            this._array.forEach(callback, thisObject);
            this.invalidate();
        }

        public indexOf(searchElement:any, fromIndex:number = 0):number {
            return this._array.indexOf(searchElement, fromIndex);
        }

        public join(sep:string = ","):string {
            return this._array.join(sep);
        }

        public lastIndexOf(searchElement:any, fromIndex:number = 0x7fffffff):number {
            return this._array.lastIndexOf(searchElement, fromIndex);
        }

        public map(callback:(value:any, index:number, array:any[]) => any, thisObject:any = null):Vector {
            var arr = this._array.map(callback, thisObject);
            return Vector.makeVector(arr);
        }

        public pop():any {
            if (this.fixed) {
                throw "无法更改固定矢量的长度";
            }
            var result = this._array.pop();
            this.invalidate();
            return result;
        }

        public push(...args):any {
            if (this.fixed) {
                throw "无法更改固定矢量的长度";
            }
            var length = args.length;
            for (var i:number = 0; i < length; i++) {
                this._array.push(args[i]);
            }
            this.invalidate();
            return this.length;
        }

        public reverse():Vector {
            this._array.reverse();
            this.invalidate();
            return this;
        }

        public shift():any {
            if (this.fixed) {
                throw "无法更改固定矢量的长度";
            }
            var result = this._array.shift();
            this.invalidate();
            return result;
        }

        public slice(startIndex:number = 0, endIndex:number = 16777215):Vector {
            var arr = this._array.slice(startIndex, endIndex);
            return Vector.makeVector(arr);
        }

        public some(callback:(value:any, index:number, array:any[]) => boolean, thisObject:any = null):boolean {
            return this._array.some(callback, thisObject);
        }

        public sort(sortBehavior:any):Vector {
            this._array.sort(sortBehavior);
            this.invalidate();
            return this;
        }

        public splice(startIndex:number, deleteCount:number = 4294967295, ...items):Vector {
            //todo fixed
            //如果 splice() 调用更改 Vector 的 length。但Flash并不抛出异常
            var arr = this._array.splice(startIndex, deleteCount);
            var length = items.length;
            for (var i:number = length - 1; i >= 0; i--) {
                this._array.splice(startIndex, 0, items[i]);
            }
            this.invalidate();
            return Vector.makeVector(arr);
        }

        public toLocaleString():string {
            var result = "";
            var length = this._array.length;
            for (var i:number = 0; i < length; i++) {
                if (i != 0) {
                    result += ",";
                }
                if(this._array[i] === null){
                    result += "null";
                }
                else if(this._array[i] === undefined){
                    result += "undefined";
                }
                else {
                    result += this._array[i].toString();
                }
            }
            return result;
        }

        public toString():string {
            return this.toLocaleString();
        }

        public unshift(...args):number {
            if (this.fixed) {
                throw "无法更改固定矢量的长度";
            }
            var length = args.length;
            for (var i:number = length - 1; i >= 0; i--) {
                this._array.unshift(args[i]);
            }
            this.invalidate();
            return this._array.length;
        }

        public set length(value:number) {
            if (this.fixed) {
                throw "无法更改固定矢量的长度";
            }
            if (value > this._array.length) {
                for (var i:number = this._array.length; i < value; i++) {
                    if(this._type === "number"){
                        this._array.push(0);
                    }
                    else {
                        this._array.push(null);
                    }
                }
            }
            else {
                this._array.length = value;
            }
            this.invalidate();
        }

        public get length():number {
            return this._array.length;
        }
    }
}