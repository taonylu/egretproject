//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private path: string = "";  //路由路径
    
    protected createChildren(): void {
        this.example();
    }

    private socket;
    private url: string = "http://192.168.1.103:3000";
    
    public example(){
        
        //-------------------------[连接socket]----------------------------
        //this.socket = io.connect(this.url);    
        this.socket = io.connect(this.url,{ reconnection: false });
        
        //-------------------------[socket属性]----------------------------
        //console.log(io.Manager);  //?
        //console.log(io.protocol);   //协议
        
        //-------------------------[socket方法]----------------------------
//        on(event: string,fn: Function): Socket;
//        once(event: string,fn: Function): Socket;
//        off(event ?: string,fn ?: Function): Socket;
//        emit(event: string,...args: any[]): Socket;
//        listeners(event: string): Function[];
//        hasListeners(event: string): boolean;
//        connected: boolean;
        
        
        
        var self:Main = this;
        
        //连接成功 
        this.socket.on('connect',function() {
            egret.log("connenct succss");
            self.sendMessage("login",{"a":1},self.revLogin,this);
        });    
            
        //连接失败    
        this.socket.on('error',function(data) {
            egret.log("connenct erro");
        });   
            
        //断开连接    
        this.socket.on('disconnect',function() {
            egret.log("connenct close");
        });  
        
        //尝试重新连接
        this.socket.on('reconnect_attempt',function() {
            egret.log("reconnect_attempt");
        }); 
        
        //重连成功
        this.socket.on('reconnect',function() {
            egret.log("reconnect");
        }); 
        
        //重连中
        this.socket.on('reconnecting',function() {
            egret.log("reconnecting");
        }); 
        
        //重连失败
        this.socket.on('reconnect_error',function() {
            egret.log("reconnect_error");
        }); 
        
        //重连错误
        this.socket.on('reconnect_failed',function() {
            egret.log("reconnect_failed");
        }); 
        
        
       
        
    }
 //===================接收=========================
    
    private revLogin(data){
        console.log("接收login");
    }
    
    //发送消息
    public sendMessage(cmd: string,data = null,callBack: Function = null,thisObject = null): void {
        if(this.socket.connected) {
            this.socket.emit(cmd,data,function(data) {
                if(callBack && thisObject) {
                    callBack.call(thisObject,data);
                }
            });
        }
    }
}










