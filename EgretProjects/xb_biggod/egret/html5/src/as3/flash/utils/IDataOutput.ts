/**
 * Created by huitao on 2015/5/15.
 */
module flash
{

        export interface IDataOutput
        {

            writeBoolean(value:boolean):void;

            writeByte(value:number):void;

            writeBytes(bytes:ByteArray,offset?:number,length?:number):void;

            writeDouble(value:number):void;

            writeFloat(value:number):void;

            writeInt(value:number):void;

            writeMultiByte(value:string,charSet:string):void;

            writeObject(object:any):void;

            writeShort(value:number):void;

            writeUnsignedInt(value:number):void;

            writeUTF(value:string):void;

            writeUTFBytes(value:string):void;

        }

}

