package net
{
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.ServerSocket;
	import flash.net.Socket;
	import flash.text.TextField;
	import flash.utils.ByteArray;
	
	public class ServerSocket843
	{
		private var serverSocket:ServerSocket;
		private var IP:String="192.168.1.100";
		private var port:int=843;
		private var txt:TextField;
		
		public function ServerSocket843()
		{
		}
		
		public function createServerSocket():void
		{ 
			serverSocket = new ServerSocket();
			serverSocket.bind(port,IP);
			serverSocket.addEventListener(ServerSocketConnectEvent.CONNECT, onConnect );
			serverSocket.listen();
			addText("843 wait connect...");
		}

		protected function onConnect(e:ServerSocketConnectEvent):void{
			//addText("new client connect 843 , send safey xml...");
			var xml:XML =<cross-domain-policy> 
				   <site-control permitted-cross-domain-policies="all"/> 
				   <allow-access-from domain="*" to-ports="*"/>
				   </cross-domain-policy>
			var tmpsocket:Socket=e.socket
			tmpsocket.writeUTFBytes(xml.toString());
			tmpsocket.flush();
			tmpsocket.close();
			
			
		}
		
		private function addText(msg:String):void{
			if(txt != null){
				txt.appendText(msg + "\n");
			}
		}
		
		public function  setLogTxt(logTxt:TextField):void{
			txt = logTxt;
		}
	}
}