/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var ByteArray = (function () {
        /**
         * 创建一个 egret.ByteArray 对象以引用指定的 ArrayBuffer 对象
         * @param buffer {ArrayBuffer} 数据源
         */
        function ByteArray(buffer) {
            this.BUFFER_EXT_SIZE = 0; //Buffer expansion size
            this.EOF_byte = -1;
            this.EOF_code_point = -1;
            this._setArrayBuffer(buffer || new ArrayBuffer(this.BUFFER_EXT_SIZE));
            this.endian = flash.Endian.BIG_ENDIAN;
        }
        var __egretProto__ = ByteArray.prototype;
        /**
         *  使用 zlib 压缩方法压缩字节数组。  ByteArray
         */
        __egretProto__.compress = function () {
        };
        /**
         * 从字节数组中读取一个以 AMF 序列化格式进行编码的对象。 ByteArray
         */
        __egretProto__.readObject = function () {
        };
        /**
         * @todo 没有实现
         * @param length
         * @param charSet
         * @returns {string}
         */
        __egretProto__.readMultiByte = function (length, charSet) {
            return "";
        };
        /**
         * 解压缩字节数组。
         */
        __egretProto__.uncompress = function () {
        };
        /**
         * 使用指定的字符集将多字节字符串写入字节流。 ByteArray
         * @param value
         * @param charSet
         */
        __egretProto__.writeMultiByte = function (value, charSet) {
        };
        /**
         * 将对象以 AMF 序列化格式写入字节数组。 ByteArray
         * @param object
         */
        __egretProto__.writeObject = function (object) {
        };
        __egretProto__._setArrayBuffer = function (buffer) {
            this.write_position = buffer.byteLength;
            this.data = new DataView(buffer);
            this._position = 0;
        };
        Object.defineProperty(__egretProto__, "buffer", {
            get: function () {
                return this.data.buffer;
            },
            /**
             * @private
             */
            set: function (value) {
                this.data = new DataView(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "dataView", {
            get: function () {
                return this.data;
            },
            /**
             * @private
             */
            set: function (value) {
                this.data = value;
                this.write_position = value.byteLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bufferOffset", {
            /**
             * @private
             */
            get: function () {
                return this.data.byteOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            /**
             * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
             * @member {number} egret.ByteArray#position
             */
            get: function () {
                return this._position;
            },
            set: function (value) {
                if (this._position < value) {
                    if (!this.validate(value - this._position)) {
                        return;
                    }
                }
                this._position = value;
                this.write_position = value > this.write_position ? value : this.write_position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "length", {
            /**
             * ByteArray 对象的长度（以字节为单位）。
             * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
             * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
             * @member {number} egret.ByteArray#length
             */
            get: function () {
                return this.write_position;
            },
            set: function (value) {
                this.write_position = value;
                var tmp = new Uint8Array(new ArrayBuffer(value));
                var byteLength = this.data.buffer.byteLength;
                if (byteLength > value) {
                    this._position = value;
                }
                var length = Math.min(byteLength, value);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
                this.$check();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bytesAvailable", {
            /**
             * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
             * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
             * @member {number} egret.ByteArray#bytesAvailable
             */
            get: function () {
                return this.data.byteLength - this._position;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @method egret.ByteArray#clear
         */
        __egretProto__.clear = function () {
            //this._position = 0;
            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE));
        };
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
        __egretProto__.readBoolean = function () {
            if (!this.validate(ByteArray.SIZE_OF_BOOLEAN))
                return null;
            return this.data.getUint8(this.position++) != 0;
        };
        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @method egret.ByteArray#readByte
         */
        __egretProto__.readByte = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT8))
                return null;
            return this.data.getInt8(this.position++);
        };
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @method egret.ByteArray#readBytes
         */
        __egretProto__.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
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
            for (var i = 0; i < length; i++) {
                bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
            }
        };
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
        __egretProto__.readDouble = function () {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT64))
                return null;
            var value = this.data.getFloat64(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
            return value;
        };
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @method egret.ByteArray#readFloat
         */
        __egretProto__.readFloat = function () {
            if (!this.validate(ByteArray.SIZE_OF_FLOAT32))
                return null;
            var value = this.data.getFloat32(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;
            return value;
        };
        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @method egret.ByteArray#readFloat
         */
        __egretProto__.readInt = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT32))
                return null;
            var value = this.data.getInt32(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;
            return value;
        };
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
        __egretProto__.readShort = function () {
            if (!this.validate(ByteArray.SIZE_OF_INT16))
                return null;
            var value = this.data.getInt16(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;
            return value;
        };
        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的 32 位无符号整数
         * @method egret.ByteArray#readUnsignedByte
         */
        __egretProto__.readUnsignedByte = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT8))
                return null;
            return this.data.getUint8(this.position++);
        };
        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @method egret.ByteArray#readUnsignedInt
         */
        __egretProto__.readUnsignedInt = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT32))
                return null;
            var value = this.data.getUint32(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;
            return value;
        };
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
        __egretProto__.readUnsignedShort = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT16))
                return null;
            var value = this.data.getUint16(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            return value;
        };
        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @method egret.ByteArray#readUTF
         */
        __egretProto__.readUTF = function () {
            if (!this.validate(ByteArray.SIZE_OF_UINT16))
                return null;
            var length = this.data.getUint16(this.position, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        __egretProto__.$check = function () {
            var index = 0;
            while (this[i] != undefined) {
                if (this[index] != null)
                    delete this[index];
                index++;
            }
            this.position = 0;
            for (var i = 0; i < this.length; i++) {
                this[i] = this.readUnsignedByte();
            }
        };
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @method egret.ByteArray#readUTFBytes
         */
        __egretProto__.readUTFBytes = function (length) {
            if (!this.validate(length))
                return null;
            var bytes = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
            this.position += length;
            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
             for (var i = 0; i < length; i++) {
             bytes[i] = this.data.getUint8(this.position++);
             }*/
            return this.decodeUTF8(bytes);
        };
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
        __egretProto__.writeBoolean = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_BOOLEAN);
            this.data.setUint8(this.position++, value ? 1 : 0);
            this.$check();
        };
        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @method egret.ByteArray#writeByte
         */
        __egretProto__.writeByte = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT8);
            this.data.setInt8(this.position++, value);
            this.$check();
        };
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
        __egretProto__.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
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
        };
        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @method egret.ByteArray#writeDouble
         */
        __egretProto__.writeDouble = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT64);
            this.data.setFloat64(this.position, value, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT64;
            this.$check();
        };
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @method egret.ByteArray#writeFloat
         */
        __egretProto__.writeFloat = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_FLOAT32);
            this.data.setFloat32(this.position, value, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_FLOAT32;
            this.$check();
        };
        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @method egret.ByteArray#writeInt
         */
        __egretProto__.writeInt = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT32);
            this.data.setInt32(this.position, value, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT32;
            this.$check();
        };
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
        __egretProto__.writeShort = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_INT16);
            this.data.setInt16(this.position, value, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_INT16;
            this.$check();
        };
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
        __egretProto__.writeUnsignedInt = function (value) {
            this.validateBuffer(ByteArray.SIZE_OF_UINT32);
            this.data.setUint32(this.position, value, this.endian == flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT32;
            this.$check();
        };
        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @method egret.ByteArray#writeUTF
         */
        __egretProto__.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(ByteArray.SIZE_OF_UINT16 + length);
            this.data.setUint16(this.position, length, this.endian === flash.Endian.LITTLE_ENDIAN);
            this.position += ByteArray.SIZE_OF_UINT16;
            this._writeUint8Array(utf8bytes, false);
            this.$check();
        };
        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @method egret.ByteArray#writeUTFBytes
         */
        __egretProto__.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
            this.$check();
        };
        __egretProto__.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        };
        /**
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        __egretProto__._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            if (validateBuffer) {
                this.validateBuffer(this.position + bytes.length);
            }
            for (var i = 0; i < bytes.length; i++) {
                this.data.setUint8(this.position++, bytes[i]);
            }
            this.$check();
        };
        /**
         * @private
         */
        __egretProto__.validate = function (len) {
            //len += this.data.byteOffset;
            if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
                return true;
            }
            else {
                egret.$error(1025);
            }
        };
        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        __egretProto__.validateBuffer = function (len, needReplace) {
            if (needReplace === void 0) { needReplace = false; }
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            if (this.data.byteLength < len || needReplace) {
                var tmp = new Uint8Array(new ArrayBuffer(len + this.BUFFER_EXT_SIZE));
                var length = Math.min(this.data.buffer.byteLength, len + this.BUFFER_EXT_SIZE);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
            }
        };
        /**
         * UTF-8 Encoding/Decoding
         */
        __egretProto__.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count, offset;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
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
        };
        __egretProto__.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte === this.EOF_byte) {
                    if (utf8_bytes_needed !== 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed === 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            }
                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            }
                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)
                            result += flash.String["fromCharCode"](code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += flash.String["fromCharCode"](0xD800 + ((code_point >> 10) & 0x3ff));
                        result += flash.String["fromCharCode"](0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        __egretProto__.encoderError = function (code_point) {
            egret.$error(1026, code_point);
        };
        __egretProto__.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
                egret.$error(1027);
            }
            return opt_code_point || 0xFFFD;
        };
        __egretProto__.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        __egretProto__.div = function (n, d) {
            return Math.floor(n / d);
        };
        __egretProto__.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else {
                    if (i === n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        ByteArray.SIZE_OF_BOOLEAN = 1;
        ByteArray.SIZE_OF_INT8 = 1;
        ByteArray.SIZE_OF_INT16 = 2;
        ByteArray.SIZE_OF_INT32 = 4;
        ByteArray.SIZE_OF_UINT8 = 1;
        ByteArray.SIZE_OF_UINT16 = 2;
        ByteArray.SIZE_OF_UINT32 = 4;
        ByteArray.SIZE_OF_FLOAT32 = 4;
        ByteArray.SIZE_OF_FLOAT64 = 8;
        return ByteArray;
    })();
    flash.ByteArray = ByteArray;
    ByteArray.prototype.__class__ = "flash.ByteArray";
})(flash || (flash = {}));
