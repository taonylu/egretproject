/**
 * Created by huitao on 5/6/2015.
 */

module flash {

    export class ByteArray {
        //[static] 指示用于新 ByteArray 实例的 ByteArray 类的默认对象编码。  ByteArray
        static defaultObjectEncoding:number

        //用于确定在写入或读取 ByteArray 实例时应使用 ActionScript 3.0、ActionScript 2.0 还是 ActionScript 1.0 格式。  ByteArray
        public objectEncoding:number


        /**
         *  使用 zlib 压缩方法压缩字节数组。  ByteArray
         */
        public compress():void {

        }

        /**
         * 从字节数组中读取一个以 AMF 序列化格式进行编码的对象。 ByteArray
         */
        public readObject():any {
        }

        /**
         * @todo 没有实现
         * @param length
         * @param charSet
         * @returns {string}
         */
        public readMultiByte(length:number, charSet?:string):string {
            return "";
        }

        /**
         * 解压缩字节数组。
         */
        public uncompress():void {

        }

        /**
         * 使用指定的字符集将多字节字符串写入字节流。 ByteArray
         * @param value
         * @param charSet
         */
        public writeMultiByte(value:string, charSet:string):void {
        }

        /**
         * 将对象以 AMF 序列化格式写入字节数组。 ByteArray
         * @param object
         */
        public writeObject(object:any):void {
        }

        private static SIZE_OF_BOOLEAN:number = 1;
        private static SIZE_OF_INT8:number = 1;
        private static SIZE_OF_INT16:number = 2;
        private static SIZE_OF_INT32:number = 4;
        private static SIZE_OF_UINT8:number = 1;
        private static SIZE_OF_UINT16:number = 2;
        private static SIZE_OF_UINT32:number = 4;
        private static SIZE_OF_FLOAT32:number = 4;
        private static SIZE_OF_FLOAT64:number = 8;

        private BUFFER_EXT_SIZE:number = 0;//Buffer expansion size

        //public array:Uint8Array = null;
        private data:DataView;
        private _position:number;
        private write_position:number;

        /**
         * 更改或读取数据的字节顺序；egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN。
         * @default egret.Endian.BIG_ENDIAN
         * @member egret.ByteArray#endian
         */
        public endian:string;

        /**
         * 创建一个 egret.ByteArray 对象以引用指定的 ArrayBuffer 对象
         * @param buffer {ArrayBuffer} 数据源
         */
        constructor(buffer?:ArrayBuffer) {
            this._setArrayBuffer(buffer || new ArrayBuffer(this.BUFFER_EXT_SIZE));
            this.endian = Endian.BIG_ENDIAN;
        }

        private _setArrayBuffer(buffer:ArrayBuffer):void {
            this.write_position = buffer.byteLength;
            this.data = new DataView(buffer);
            this._position = 0;
        }

        public get buffer():ArrayBuffer {
            return this.data.buffer;
        }

        /**
         * @private
         */
        public set buffer(value:ArrayBuffer) {
            this.data = new DataView(value);
        }

        public get dataView():DataView {
            return this.data;
        }

        /**
         * @private
         */
        public set dataView(value:DataView) {
            this.data = value;
            this.write_position = value.byteLength;
        }

        /**
         * @private
         */
        public get bufferOffset():number {
            return this.data.byteOffset;
        }

        /**
         * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
         * @member {number} egret.ByteArray#position
         */
        public get position():number {
            return this._position;
        }

        public set position(value:number) {
            if (this._position < value) {
                if (!this.validate(value - this._position)) {
                    return;
                }
            }
            this._position = value;
            this.write_position = value > this.write_position ? value : this.write_position;
        }

        /**
         * ByteArray 对象的长度（以字节为单位）。
         * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
         * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
         * @member {number} egret.ByteArray#length
         */
        public get length():number {
            return this.write_position;
        }

        public set length(value:number) {
            this.write_position = value;
            var tmp:Uint8Array = new Uint8Array(new ArrayBuffer(value));
            var byteLength:number = this.data.buffer.byteLength;
            if(byteLength > value) {
                this._position = value;
            }
            var length:number = Math.min(byteLength, value);
            tmp.set(new Uint8Array(this.data.buffer, 0, length));
            this.buffer = tmp.buffer;

            this.$check();
        }

        /**
         * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
         * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
         * @member {number} egret.ByteArray#bytesAvailable
         */
        public get bytesAvailable():number {
            return this.data.byteLength - this._position;
        }

        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @method egret.ByteArray#clear
         */
        public clear():void {
            //this._position = 0;
            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE));
        }

        //public getArray():Uint8Array {
        //    if (this.array == null) {
        //        this.array = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength);
        //    }
        //    return this.array;
        //}

        /**
         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
         * @return 如果字节不为零，则返回 true，否则返回 false
         * @method egret.ByteArray#readBoolean
         */
        public readBoolean():boolean {
            if (!this.validate(ByteArray.SIZE_OF_BOOLEAN)) return null;

            return this.data.getUint8(this.position++) != 0;
        }

        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @method egret.ByteArray#readByte
         */
        public readByte():number {
            if (!this.validate(ByteArray.SIZE_OF_INT8)) return null;

            return this.data.getInt8(this.position++);
        }

        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @method egret.ByteArray#readBytes
         */
        public readBytes(bytes:ByteArray, offset:number = 0, length:number = 0):void {
            if (length == 0) {
                length = this.bytesAvailable;
            }
            else if (!this.validate(length)) {
                return null;
            }
            if (bytes) {
                bytes.validateBuffer(length);
            }
            else {
                bytes = new ByteArray(new ArrayBuffer(length));
            }
            //This method is expensive
            for (var i = 0; i < length; i++) {
                bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
            }
        }

        //public get leftBytes():ArrayBuffer {
        //    var begin = this.data.byteOffset + this.position;
        //    var end = this.data.byteLength;
        //    var result = new ArrayBuffer(end - begin);
        //    var resultBytes = new Uint8Array(result);
        //    var sourceBytes = new Uint8Array(this.data.buffer, begin, end - begin);
        //    resultBytes.set(sourceBytes);
        //    return resultBytes.buffer;
        //}

        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
         * @return 双精度（64 位）浮点数
         * @method egret.ByteArray#readDouble
         */
        public readDouble():number {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT64)) return null;

            var value:number = this.data.getFloat64(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
            return value;
        }

        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @method egret.ByteArray#readFloat
         */
        public readFloat():number {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT32)) return null;

            var value:number = this.data.getFloat32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;
            return value;
        }

        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @method egret.ByteArray#readFloat
         */
        public readInt():number {
            if (!this.validate(ByteArray.SIZE_OF_INT32)) return null;

            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;
            return value;
        }

//        public readInt64():Int64{
//            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
//
//            var low = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
//            this.position += ByteArray.SIZE_OF_INT32;
//            var high = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
//            this.position += ByteArray.SIZE_OF_INT32;
//            return new Int64(low,high);
//        }

        /**
         * 使用指定的字符集从字节流中读取指定长度的多字节字符串
         * @param length 要从字节流中读取的字节数
         * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @return UTF-8 编码的字符串
         * @method egret.ByteArray#readMultiByte
         */
        //public readMultiByte(length:number, charSet?:string):string {
        //    if (!this.validate(length)) return null;
        //
        //    return "";
        //}

        /**
         * 从字节流中读取一个带符号的 16 位整数
         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
         * @method egret.ByteArray#readShort
         */
        public readShort():number {
            if (!this.validate(ByteArray.SIZE_OF_INT16)) return null;

            var value = this.data.getInt16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;
            return value;
        }

        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的 32 位无符号整数
         * @method egret.ByteArray#readUnsignedByte
         */
        public readUnsignedByte():number {
            if (!this.validate(ByteArray.SIZE_OF_UINT8)) return null;

            return this.data.getUint8(this.position++);
        }

        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @method egret.ByteArray#readUnsignedInt
         */
        public readUnsignedInt():number {
            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;

            var value = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;
            return value;
        }

        //public readVariableSizedUnsignedInt():number {
        //    var i:number;
        //    var c:number = this.data.getUint8(this.position++);
        //    if (c != 0xFF) {
        //        i = c << 8;
        //        c = this.data.getUint8(this.position++);
        //        i |= c;
        //    }
        //    else {
        //        c = this.data.getUint8(this.position++);
        //        i = c << 16;
        //        c = this.data.getUint8(this.position++);
        //        i |= c << 8;
        //        c = this.data.getUint8(this.position++);
        //        i |= c;
        //    }
        //    return i;
        //}

//      public readUnsignedInt64():UInt64{
//            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
//
//            var low = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
//            this.position += ByteArray.SIZE_OF_UINT32;
//            var high = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
//            this.position += ByteArray.SIZE_OF_UINT32;
//          return new UInt64(low,high);
//        }

        /**
         * 从字节流中读取一个无符号的 16 位整数
         * @return 介于 0 和 65535 之间的 16 位无符号整数
         * @method egret.ByteArray#readUnsignedShort
         */
        public readUnsignedShort():number {
            if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;

            var value = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            return value;
        }

        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @method egret.ByteArray#readUTF
         */
        public readUTF():string {
            if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;

            var length:number = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;

            if (length > 0) {
                return this.readUTFBytes(length);
            } else {
                return "";
            }
        }


        private $check():void
        {
            var index:number = 0;
            while(this[i] != undefined)
            {
                if(this[index] != null)
                    delete this[index];
                index ++;
            }

            this.position = 0 ;
            for(var i:number = 0 ;i < this.length;i ++)
            {
                this[i] = this.readUnsignedByte();
            }

        }
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @method egret.ByteArray#readUTFBytes
         */
        public readUTFBytes(length:number):string {
            if (!this.validate(length)) return null;

            var bytes:Uint8Array = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
            this.position += length;
            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
             for (var i = 0; i < length; i++) {
             bytes[i] = this.data.getUint8(this.position++);
             }*/
            return this.decodeUTF8(bytes);
        }

        //public readStandardString(length:number):string {
        //    if (!this.validate(length)) return null;
        //
        //    var str:string = "";
        //
        //    for (var i = 0; i < length; i++) {
        //        str += String.fromCharCode(this.data.getUint8(this.position++));
        //    }
        //    return str;
        //}

        //public readStringTillNull(keepEvenByte:boolean = true):string {
        //
        //    var str:string = "";
        //    var num:number = 0;
        //    while (this.bytesAvailable > 0) {
        //        var b:number = this.data.getUint8(this.position++);
        //        num++;
        //        if (b != 0) {
        //            str += String.fromCharCode(b);
        //        } else {
        //            if (keepEvenByte && num % 2 != 0) {
        //                this.position++;
        //            }
        //            break;
        //        }
        //    }
        //    return str;
        //}

        /**
         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
         * @method egret.ByteArray#writeBoolean
         */
        public writeBoolean(value:boolean):void {
            this.validateBuffer(ByteArray.SIZE_OF_BOOLEAN);

            this.data.setUint8(this.position++, value ? 1 : 0);
            this.$check();
        }

        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @method egret.ByteArray#writeByte
         */
        public writeByte(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_INT8);

            this.data.setInt8(this.position++, value);
            this.$check();
        }

        //public writeUnsignedByte(value:number):void {
        //    this.validateBuffer(ByteArray.SIZE_OF_UINT8);
        //
        //    this.data.setUint8(this.position++, value);
        //}

        /**
         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
         * @param bytes ByteArray 对象
         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
         * @param length 一个无符号整数，表示在缓冲区中的写入范围
         * @method egret.ByteArray#writeBytes
         */
        public writeBytes(bytes:ByteArray, offset:number = 0, length:number = 0):void {
            var writeLength:number;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);

                var tmp_data = new DataView(bytes.buffer);
                for (var i = offset; i < writeLength + offset; i++) {
                    this.data.setUint8(this.position++, tmp_data.getUint8(i));
                }
            }

            this.$check();
        }

        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @method egret.ByteArray#writeDouble
         */
        public writeDouble(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT64);

            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
            this.$check();
        }

        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @method egret.ByteArray#writeFloat
         */
        public writeFloat(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT32);

            this.data.setFloat32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;

            this.$check();
        }

        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @method egret.ByteArray#writeInt
         */
        public writeInt(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_INT32);

            this.data.setInt32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;

            this.$check();
        }

        /**
         * 使用指定的字符集将多字节字符串写入字节流
         * @param value 要写入的字符串值
         * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @method egret.ByteArray#writeMultiByte
         */
        //public writeMultiByte(value:string, charSet:string):void {
        //
        //}

        /**
         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
         * @param value 32 位整数，该整数的低 16 位将被写入字节流
         * @method egret.ByteArray#writeShort
         */
        public writeShort(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_INT16);

            this.data.setInt16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;

            this.$check();
        }

        //public writeUnsignedShort(value:number):void {
        //    this.validateBuffer(ByteArray.SIZE_OF_UINT16);
        //
        //    this.data.setUint16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
        //    this.position += ByteArray.SIZE_OF_UINT16;
        //}

        /**
         * 在字节流中写入一个无符号的 32 位整数
         * @param value 要写入字节流的无符号整数
         * @method egret.ByteArray#writeUnsignedInt
         */
        public writeUnsignedInt(value:number):void {
            this.validateBuffer(ByteArray.SIZE_OF_UINT32);

            this.data.setUint32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;

            this.$check();
        }

        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @method egret.ByteArray#writeUTF
         */
        public writeUTF(value:string):void {
            var utf8bytes:Uint8Array = this.encodeUTF8(value);
            var length:number = utf8bytes.length;

            this.validateBuffer(ByteArray.SIZE_OF_UINT16 + length);

            this.data.setUint16(this.position, length, this.endian === Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            this._writeUint8Array(utf8bytes, false);

            this.$check();
        }

        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @method egret.ByteArray#writeUTFBytes
         */
        public writeUTFBytes(value:string):void {
            this._writeUint8Array(this.encodeUTF8(value));

            this.$check();
        }


        public toString():string {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        }

        /**
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        public _writeUint8Array(bytes:Uint8Array, validateBuffer:boolean = true):void {
            if (validateBuffer) {
                this.validateBuffer(this.position + bytes.length);
            }

            for (var i = 0; i < bytes.length; i++) {
                this.data.setUint8(this.position++, bytes[i]);
            }

            this.$check();
        }

        /**
         * @private
         */
        public validate(len:number):boolean {
            //len += this.data.byteOffset;
            if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
                return true;
            } else {
                egret.$error(1025);
            }
        }

        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        private validateBuffer(len:number, needReplace:boolean = false):void {
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            if (this.data.byteLength < len || needReplace) {
                var tmp:Uint8Array = new Uint8Array(new ArrayBuffer(len + this.BUFFER_EXT_SIZE));
                var length = Math.min(this.data.buffer.byteLength, len + this.BUFFER_EXT_SIZE);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
            }
        }

        /**
         * UTF-8 Encoding/Decoding
         */
        private encodeUTF8(str:string):Uint8Array {
            var pos:number = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];

            while (codePoints.length > pos) {
                var code_point:number = codePoints[pos++];

                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                } else {
                    var count, offset;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    } else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    } else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }

                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);

                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        }

        private decodeUTF8(data:Uint8Array):string {
            var fatal:boolean = false;
            var pos:number = 0;
            var result:string = "";
            var code_point:number;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;

            while (data.length > pos) {

                var _byte = data[pos++];

                if (_byte === this.EOF_byte) {
                    if (utf8_bytes_needed !== 0) {
                        code_point = this.decoderError(fatal);
                    } else {
                        code_point = this.EOF_code_point;
                    }
                } else {

                    if (utf8_bytes_needed === 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        } else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            } else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            } else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            } else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    } else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    } else {

                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);

                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        } else {

                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            } else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }

                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)result += String["fromCharCode"](code_point);
                    } else {
                        code_point -= 0x10000;
                        result += String["fromCharCode"](0xD800 + ((code_point >> 10) & 0x3ff));
                        result += String["fromCharCode"](0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        }

        private encoderError(code_point) {
            egret.$error(1026, code_point);
        }

        private decoderError(fatal, opt_code_point?):number {
            if (fatal) {
                egret.$error(1027);
            }
            return opt_code_point || 0xFFFD;
        }

        private EOF_byte:number = -1;
        private EOF_code_point:number = -1;

        private inRange(a, min, max) {
            return min <= a && a <= max;
        }

        private div(n, d) {
            return Math.floor(n / d);
        }

        private stringToCodePoints(string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                } else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                } else { // (inRange(c, 0xD800, 0xDBFF))
                    if (i === n - 1) {
                        cps.push(0xFFFD);
                    } else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        } else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        }


    }


}