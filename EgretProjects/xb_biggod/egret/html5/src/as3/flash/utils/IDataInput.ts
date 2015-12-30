/**
 * Created by huitao on 2015/6/29.
 */
module flash
{
    export interface IDataInput
    {
        bytesAvailable : number;
        endian : string;
        objectEncoding : number;

        readBoolean():boolean;
        readByte():number;
        readBytes(bytes:ByteArray,offset?:number,length?:number):void;
        readDouble():number;
        readFloat():number;
        readInt():number;
        readMultiByte(length:number, charSet:string):string;
        readObject():any;
        readShort():number
        readUnsignedByte():number;
        readUnsignedInt():number;
        readUnsignedShort():number;
        readUTF():string;
        readUTFBytes(length:number):string;
    }

}