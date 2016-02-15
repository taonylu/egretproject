
var app = require('express')();         //引入express
var http = require('http').Server(app);

//加载模块，file相当于一个单例类，无论require多少次，指向同一个对象
var file = require('./com/io/readfile.js');
var event = require('./com/event/event.js');
var single = require('./com/module/single.js');


app.get('/', function(req, res){
    res.send("welcome");  //在浏览器打开时显示在页面上的信息..
});

http.listen(3000, function(){
    console.log('listening on *:3000');
    
    //file.readFile();      //测试读取文本
    //event.eventTest();    //测试事件

    //测试模块
//    single.setName("abc");
//    console.log(single.name);  //peter
//    console.log(single.getName()); //abc
//    var single2 =require('./com/module/single.js');
//    console.log(single2.getName()); //abc

    //测试模块对象
//    var Hello = require("./com/module/module.js");
//    var hello = new Hello();
//    hello.setName("peter");
//    console.log(hello.getName()); //peter
//
//    var hello2 = new Hello();
//    hello.setName("peter2");
//    console.log(hello.getName());  //peter2

});


console.log("HTTP server is listening at port 3000.");

