package net
{
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.ServerSocket;
	import flash.net.Socket;
	import flash.text.TextField;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	
	import json.JSON;

	
	public class ServerSocketCommon
	{
		private var serverSocket:ServerSocket;
		private var IP:String="192.168.1.32";
		private var port:int=8901;
		private var txt:TextField;
		private var clientList:Array = [];
		private var bHandShake:Boolean = false;
		
		public function ServerSocketCommon()
		{
			
		}
		
		public function createServerSocket():void
		{ 
			serverSocket = new ServerSocket();
			serverSocket.bind(port,IP);
			serverSocket.addEventListener(ServerSocketConnectEvent.CONNECT, onConnect );
			serverSocket.addEventListener(IOErrorEvent.IO_ERROR, onError);
			serverSocket.listen();
			addText("common socket wait connect...");
		}
		
		
		
		protected function onConnect(e:ServerSocketConnectEvent):void{
			var tmpsocket:Socket=e.socket
			
			clientList.push(tmpsocket);
			tmpsocket.addEventListener(Event.CLOSE,onClose);
			tmpsocket.addEventListener(ProgressEvent.SOCKET_DATA,onSocketData);
			//tmpsocket.writeUTFBytes("服务器消息:你已连接到服务器") 
			//tmpsocket.flush();
			addText("new client connect common socket...");
		}
		
		private function onError(e:IOErrorEvent):void{
			addText("common connect error..." + e.toString());
		}
		
		protected function onClose(e:Event):void{
			for (var clt:int=0;clt<clientList.length;clt++){
				if(clientList[clt].remoteAddress==e.target.remoteAddress){
					clientList.splice(clt,1); 
				}
			}
			addText("common socket close...");
			
			
		}
		
		
		public function  close():void{
			this.serverSocket.close();
			addText("close socket ...");
		}
		
		protected function onSocketData(e:ProgressEvent):void{
			var socket:Socket=e.target as Socket;
			
			
			//if(msg.indexOf("<policy-file-request/>")>-1){
			//	addText("不安全的客户端");
			//}else{
			   if(bHandShake){
				  
				 //  var msg:String= socket.readUTFBytes(socket.bytesAvailable);
				  // addText("common rev:" + msg);
				  
//				   var len:int =  socket.bytesAvailable;
//				   var revByteArray:ByteArray = new ByteArray();
//				   socket.readBytes(revByteArray,0,len);
//				   var msg:String;
//				   msg  = revByteArray.readBoolean() + "";
				   //msg = socket.readMultiByte(len, "unicode") + "";
				   //msg = readStringByByteArray(revByteArray, len );
				   
//				   addText("rev:" + len + "," +msg);
//				   
//				
//				   
//					var sendByteArray:ByteArray = new ByteArray();
//					sendByteArray.writeUTF(msg);
//					sendByteArray.position = 0;
//					socket.writeBytes(sendByteArray);
//					socket.flush();
//					sendByteArray.clear();
//					addText("send:" + msg);
				   
				   readMessage(socket);
				   sendMessage(socket,"信息123");
					
				  //var json:Object =  json.JSON.decode(readMessage(socket));
				  //addText("rev json:" + json);
				  //sendMessage(socket, json.JSON.encode({"cmd":1001,"userID":"1","userName":"把的风格123abc"}));
				  
					
				   
			  	}else{
					addText("开始握手");
					doHandShake(socket);
					bHandShake = true;
				}
				
				
			//}
		}
		
		private function readMessage(clientSocket:Socket):String
		{
			/*var policy_file = '<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>';
			clientSocket.writeUTFBytes(policy_file);
			clientSocket.flush();*/
			var buffer:ByteArray = new ByteArray();
			var outBuffer:ByteArray=new ByteArray();
			var mask:ByteArray=new ByteArray();
			
			//discard for now
			var typeByte:int=clientSocket.readByte();
			
			var byteTwo:int=clientSocket.readByte() & 127;
			//trace("byteTwo ",byteTwo);
			
			var sizeArray:ByteArray=new ByteArray();
			
			if(byteTwo==126)
			{
				//large frame size, 2 more frame size bytes
				clientSocket.readBytes(sizeArray,0,2);
			}else if(byteTwo==127)
			{
				//larger frame size (8 more frame size bytes)
				clientSocket.readBytes(sizeArray,0,8);
			}
			//Read the mask bytes
			clientSocket.readBytes(mask,0,4);
			
			//Copy payload data into buffer
			clientSocket.readBytes(buffer,0,clientSocket.bytesAvailable);
			buffer.position=0;
			var len:uint=buffer.bytesAvailable;
			for(var j:uint=0;j<len;j++)
			{
				//unmask buffer data into output buffer
				outBuffer.writeByte(applyMask(mask,buffer.readByte(),j));
			}
			outBuffer.position=0;
			//var msg:String=outBuffer.readUTFBytes(outBuffer.bytesAvailable);
			if(outBuffer.bytesAvailable < 5){
				return "";
			}
			var msg:String = outBuffer.readBoolean() + "";
			msg += "," + outBuffer.readInt();
			msg += "," + outBuffer.readUTF();
			addText("rev:" + msg);
			return msg;
			//dispatchEvent(new ClientEvent(ClientEvent.CLIENT_MESSAGE_EVENT,clientSocket,msg));
		}
		
		private function applyMask(mask:ByteArray,byte:int,index:uint):int
		{
			mask.position=index % 4;
			var maskByte:int=mask.readByte();
			
			return byte ^ maskByte;
		}
		
		private function doHandShake(clientSocket:Socket):void
		{
			var socketBytes:ByteArray = new ByteArray();
			clientSocket.readBytes(socketBytes,0,clientSocket.bytesAvailable);
			var message:String = socketBytes.readUTFBytes(socketBytes.bytesAvailable);

			var i:uint = 0;
			if(message.indexOf("GET ") == 0)
			{
				var messageLines:Array = message.split("\n");
				var fields:Object = {};
				var requestedURL:String = "";
				for(i = 0; i < messageLines.length; i++)
				{
					var line:String = messageLines[i];
					if(i == 0)
					{
						var getSplit:Array = line.split(" ");
						if(getSplit.length > 1)
						{
							requestedURL = getSplit[1];
						}
					}
					else
					{
						var index:int = line.indexOf(":");
						if(index > -1)
						{
							var key:String = line.substr(0, index);
							fields[key] = line.substr(index + 1).replace( /^([\s|\t|\n]+)?(.*)([\s|\t|\n]+)?$/gm, "$2" );
						}
					}
				}
				
				if(fields["Sec-WebSocket-Key"] != null)
				{
					
					var joinedKey:String=fields["Sec-WebSocket-Key"]+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
					//var joinedKey:String="U00QUfV1CRfIIU0NkcUCnA=="+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
					  
					
					//addText("key:" + joinedKey);
					
					//hash it
					var base64hash:String = SHA1.hashToBase64(joinedKey);
					//addText("base64key:" +  base64hash);
					var response:String = "HTTP/1.1 101 Switching Protocols\r\n" +
						"Upgrade: webSocket\r\n" +
						"Connection: Upgrade\r\n" +
						"Sec-WebSocket-Accept: "+base64hash+"\r\n"+
						"Sec-WebSocket-Origin: " + fields["Origin"] + "\r\n" +
						"Sec-WebSocket-Location: ws://" + fields["Host"] + requestedURL + "\r\n" +
						"\r\n";
					//addText("Origin:" + fields["Origin"]);
					//addText("requestedURL:" +requestedURL);
					//addText("Host:" + fields["Host"]);
					var responseBytes:ByteArray = new ByteArray();
					responseBytes.writeUTFBytes(response);
					responseBytes.position = 0;
					clientSocket.writeBytes(responseBytes);
					clientSocket.flush();
					socketBytes.clear();
				}
			}
		}
		
		public function sendMessage(clientSocket:Socket,msg:String,continuation:Boolean=false):void
		{
			if( clientSocket != null && clientSocket.connected )
			{
				var rawData:ByteArray=new ByteArray()
				var indexStartRawData:uint;
				//rawData.writeUTFBytes( msg );
				rawData.writeBoolean(false);
				rawData.writeInt(999);
				//rawData.writeUTF("蓝蓝路");
				rawData.position=0;
				var bytesFormatted:Array=[];
				
				if(continuation)
				{
					bytesFormatted[0] = 128;
				}else{
					//Text Payload
					bytesFormatted[0] = 129; 
				}
				
				if (rawData.length <= 125)
				{
					bytesFormatted[1] = rawData.length;
					
					//indexStartRawData = 2;
				}else if(rawData.length >= 126 && rawData.length <= 65535){
					
					
					bytesFormatted[1] = 126
					bytesFormatted[2] = ( rawData.length >> 8 ) & 255
					bytesFormatted[3] = ( rawData.length) & 255
					
					//indexStartRawData = 4
				}else{
					bytesFormatted[1] = 127
					bytesFormatted[2] = ( rawData.length >> 56 ) & 255
					bytesFormatted[3] = ( rawData.length >> 48 ) & 255
					bytesFormatted[4] = ( rawData.length >> 40 ) & 255
					bytesFormatted[5] = ( rawData.length >> 32 ) & 255
					bytesFormatted[6] = ( rawData.length >> 24 ) & 255
					bytesFormatted[7] = ( rawData.length >> 16 ) & 255
					bytesFormatted[8] = ( rawData.length >>  8 ) & 255
					bytesFormatted[9] = ( rawData.length       ) & 255
					
					//indexStartRawData = 10;
				}
				
				// put raw data at the correct index
				var dataOut:ByteArray=new ByteArray();
				
				for(var i:uint=0;i<bytesFormatted.length;i++)
				{
					dataOut.writeByte(bytesFormatted[i]);
				}
				
				dataOut.writeBytes(rawData);
				dataOut.position=0;
				clientSocket.writeBytes(dataOut);
				clientSocket.flush(); 
				addText("send:" + msg);
			}else{
				
			}
		}
		
		private function addText(msg:String):void{
			if(txt != null){
				txt.appendText(msg + "\n");
			}
		}
		
		public function  setLogTxt(logTxt:TextField):void{
			txt = logTxt;
		}
		
		/**
		 * 写入文本到字节流
		 * @param	dst
		 * @param	val
		 * @param	length
		 */
		public static function writeStringToByteArray(dst:ByteArray, val:String, length:uint):void
		{
			var bytes:ByteArray = new ByteArray();
			bytes.writeMultiByte(val, "gb2312");    //转码
			dst.writeBytes(bytes);
			var len:int = length - bytes.length;
			for (var i:int = 0; i < len ; i++)
			{
				dst.writeByte(0);
			}
		}
		
		/**
		 * 从字节流读取文本
		 * @param	dst
		 * @param	length
		 * @return
		 */
		public static function readStringByByteArray(dst:ByteArray,length:uint):String
		{
			if(length > (dst.length - dst.position))  
				length =  dst.length - dst.position;
			//return dst.readUTFBytes(length);
			return dst.readMultiByte(length, "gb2312");  //转码
		}
	}
}