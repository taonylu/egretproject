/**
 * Created by huitao on 2015/5/18.
 */
module flash {

    /**
     * 使用之前请修改项目egretProperties.json 文件加入 ｛"name":"socket"｝
     * 然后在 项目目录下执行 egret build -e 加入第三方库
     * 所有的write*方法 flush后才会写入socket
     */
    export class Socket extends egret.EventDispatcher {

        //包含的websocket
        private $webSocket:egret.WebSocket;

        //发送消息的缓冲区
        private $sendArray:flash.ByteArray;

        //接受消息的缓冲区
        private $getArray:flash.ByteArray;

        //接受消息的缓存
        private $temp:flash.ByteArray;

        private $timeout:number = 10;

        public set timeout(val:number) {
            this.$timeout = val;
        }

        public get timeout():number {
            return this.$timeout;
        }

        private $endian:string = "";

        public get endian():string {
            return this.$sendArray.endian;
        }


        public close():void {
            this.$webSocket.close();
        }

        public set endian(val:string) {
            this.$sendArray.endian = val;
            this.$temp.endian = val;
            this.$getArray.endian = val;
        }

        constructor(host?:string, port?:number) {
            super();
            this.$webSocket = new egret.WebSocket(host, port);
            this.$webSocket.type = egret.WebSocket.TYPE_BINARY;

            //添加socket的监听事件
            this.$webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.$webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.$webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.$webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIoError, this);
            this.$webSocket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.onSocketSecurity, this);

            this.$sendArray = new flash.ByteArray();
            this.$getArray = new flash.ByteArray();
            this.$temp = new flash.ByteArray();
        }

        public connect(host:string, port:number):void {
            this.$webSocket.connect(host, port);
        }

        /**
         * socket 关闭是调用 并派发出去
         * @param e
         */
        private onSocketClose(e:egret.Event):void {
            this.dispatchEvent(e);
        }


        /**
         * 在出现输入/输出错误并导致发送或加载操作失败时调度。 并派发出去
         * @param e
         */
        private onSocketIoError(e:egret.Event):void {
            this.dispatchEvent(e);
        }


        /**
         * 这个是flash 中的注释
         * 若对 Socket.connect() 的调用尝试连接到调用方安全沙箱外部的服务器或端口号低于 1024 的端口，则进行调度
         * @param e
         */
        private onSocketSecurity(e:egret.Event):void {
            this.dispatchEvent(e);
        }

        /**
         * 在建立网络连接后调度。并且派发
         * @param e
         */
        private onSocketOpen(e:egret.Event):void {
            this.dispatchEvent(e);
        }


        private onReceiveMessage(e:egret.Event):void {
            this.$webSocket.readBytes(<any>this.$temp);
            //读取所有数据
            this.$temp.readBytes(this.$getArray, this.$getArray.length, this.$temp.length);
            this.$temp.clear();
            this.dispatchEvent(e);
        }


        /**
         * 指示此 Socket 对象目前是否已连接。
         * @returns {boolean}
         */
        public get connected():boolean {
            return this.$webSocket.connected;
        }

        /**
         * 输入缓冲区中可读取的数据的字节数
         * @returns {number}
         */
        public get bytesAvailable():number {
            return this.$getArray.bytesAvailable;
        }

        /**
         * 读取到字节流的位置
         * @returns {number}
         */
        public get position():number {
            return this.$getArray.position;
        }

        public set position(val:number) {
            this.$getArray.position = val;
        }

        /**
         * 从套接字读取 length 参数所指定的数据的字节数。
         * @param bytes  要将数据读入的 ByteArray 对象。
         * @param offset 数据读取的偏移量应从该字节数组中开始。
         * @param length 要读取的字节数。 默认值 0 导致读取所有可用的数据。
         */
        public readBytes(bytes:ByteArray, offset:number = 0, length:number = 0):void {
            this.$getArray.readBytes(bytes, offset, length);
            this.clear();
        }

        /**
         * 从套接字读取一个布尔值。 在读取一个字节之后，如果该字节不为零，则该方法返回 true，否则返回 false。
         * @returns {boolean}
         */
        public readBoolean():boolean {
            var b:boolean = this.$getArray.readBoolean();
            this.clear();
            return b;
        }

        /**
         * 从套接字读取一个带符号字节。
         * @returns {number}
         */
        public readByte():number {
            var n:number = this.$getArray.readByte();

            this.clear();
            return n;
        }

        /**
         * 从套接字读取一个 IEEE 754 双精度浮点数。
         * @returns {number}
         */
        public readDouble():number {
            var n:number = this.$getArray.readDouble();
            this.clear();
            return n;
        }

        /**
         * 从套接字读取一个 IEEE 754 单精度浮点数。
         * @returns {number}
         */
        public readFloat():number {
            var n:number = this.$getArray.readFloat();
            this.clear();
            return n;
        }

        /**
         * 释放资源
         */
        private clear():void {
            if (this.$getArray.position == this.$getArray.length) {
                this.$getArray.clear();
            }
        }


        public readInt():number {
            var n:number = this.$getArray.readInt();
            this.clear();
            return n;
        }

        /**
         * @todo 没有实现
         * @returns {number}
         */
        public readMultiByte():number {
            //return this._getArray.readMultiByte();
            this.clear();
            return 0;
        }

        /**
         * @todo 没有实现
         * @returns {any}
         */
        public readObject():number {
            this.clear();
            return this.$getArray.readObject();
        }

        /**
         *从套接字读取一个带符号的 16 位整数
         * @returns {number}
         */
        public readShort():number {
            this.clear();
            return this.$getArray.readShort();
        }

        /**
         * 从套接字读取一个无符号字节。
         * @returns {number}
         */
        public readUnsignedByte():number {
            var n:number = this.$getArray.readUnsignedByte();
            this.clear();
            return n;
        }

        /**
         *从套接字读取一个无符号的 32 位整数。
         * @returns {number}
         */
        public readUnsignedInt():number {
            var n:number = this.$getArray.readUnsignedInt();
            this.clear();
            return n;
        }

        /**
         * 从套接字读取一个无符号的 16 位整数。
         * @returns {number}
         */
        public readUnsignedShort():number {
            var n:number = this.$getArray.readUnsignedShort();
            this.clear();
            return n;
        }

        /**
         * 从套接字读取一个 UTF-8 字符串。 假定该字符串的前缀是指示字符串长度（以字节为单位）的无符号短整数。
         * @returns {string}
         */
        public readUTF():string {
            var s:string = this.$getArray.readUTF()
            this.clear();
            return s;
        }


        /**
         * 从套接字读取 length 参数所指定的 UTF-8 数据的字节数，并返回一个字符串。
         * @param length
         * @returns {string}
         */
        public readUTFBytes(length:number):string {
            var s:string = this.$getArray.readUTFBytes(length);
            this.clear();

            return s;
        }

        /**
         * 将一个布尔值写入套接字。 此方法写入了一个字节，其值为 1 (true ) 或 0 ( false)。
         * @param val
         */
        public writeBoolean(val:boolean):void {
            this.$sendArray.writeBoolean(val);
        }

        /**
         * 将一个字节写入套接字。
         * @param val
         */
        public writeByte(val:number):void {
            this.$sendArray.writeByte(val);
        }

        /**
         * 从指定的字节数组写入一系列字节。 写入操作从 offset 指定的位置开始。
         * @param bytes
         * @param offset bytes ByteArray 对象中从零开始的偏移量，应由此开始执行数据写入。
         * @param length 要写入的字节数。 默认值 0 导致从 offset 参数指定的值开始写入整个缓冲区。
         */
        public writeBytes(bytes:ByteArray, offset?:number, length?:number):void {
            this.$sendArray.writeBytes(bytes, offset, length);
        }

        /**
         * 将一个 IEEE 754 双精度浮点数写入套接字。
         * @param val
         */
        public writeDouble(val:number):void {
            this.$sendArray.writeDouble(val);
        }

        /**
         * 将一个 IEEE 754 单精度浮点数写入套接字。
         * @param val
         */
        public writeFloat(val:number):void {
            this.$sendArray.writeFloat(val);
        }

        /**
         * 将一个带符号的 32 位整数写入套接字。
         * @param val
         */
        public writeInt(val:number):void {
            this.$sendArray.writeInt(val);
        }

        /**
         * 使用指定的字符集，从该字节流写入一个多字节字符串。
         * @param val
         * @param chat
         */
        public writeMultiByte(val:string, chat:string):void {
            this.$sendArray.writeMultiByte(val, chat);
        }

        /**
         * 以 AMF 序列化格式将一个对象写入套接字。没有实现
         * @param val
         */
        public writeObject(val:boolean):void {
            this.$sendArray.writeObject(val);
        }

        /**
         * 将一个 16 位整数写入套接字。 写入的字节如下：
         *(v >> 8) & 0xff v & 0xff使用了该参数的低 16 位；忽略了高 16 位。
         * @param val
         */
        public writeShort(val:number):void {
            this.$sendArray.writeShort(val);
        }

        /**
         * 将一个无符号的 32 位整数写入套接字。
         * @param val
         */
        public writeUnsignedInt(val:number):void {
            this.$sendArray.writeUnsignedInt(val);
        }

        /**
         * 将以下数据写入套接字：一个无符号 16 位整数，它指示了指定 UTF-8 字符串的长度（以字节为单位），后面跟随字符串本身。
         * @param val
         */
        public writeUTF(val:string):void {
            this.$sendArray.writeUTF(val);
        }

        /**
         * 将一个 UTF-8 字符串写入套接字。
         * @param val
         */
        public writeUTFBytes(val:string):void {
            this.$sendArray.writeUTFBytes(val);
        }

        /**
         * 对套接字输出缓冲区中积累的所有数据进行刷新。
         */
        public flush():void {
            this.$webSocket.writeBytes(<any>this.$sendArray);
            this.$webSocket.flush();
            this.$sendArray.clear();
        }

    }


}
