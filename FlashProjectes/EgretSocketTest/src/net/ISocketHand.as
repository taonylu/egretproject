package net
{
	import flash.net.Socket;

	public interface ISocketHand
	{
		function onSocketData(json:Object, socket:Socket):void;
	}
}