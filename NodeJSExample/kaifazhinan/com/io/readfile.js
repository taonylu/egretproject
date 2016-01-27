
//读取文本
exports.readFile = function (){
    var fs = require('fs');
	fs.readFile('./com/io/file.txt', 'utf-8', function(err,data){
		if(err){
			console.error(err);
		}else{
			console.log(data);
		}
	});
	console.log('end.');
 }