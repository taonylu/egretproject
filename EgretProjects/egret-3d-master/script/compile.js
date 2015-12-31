/**
 * Created by wander on 15/12/25.
 */
var fs = require("fs");
var content = fs.readFileSync("Egret3D/Egret3D.lib.ts","utf-8");
var path = require("path");

String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

var mapFilePath = function(item){
    return item.substr("///import ".length).replace(".js",".ts").trim().replace("Egret3D/","");
}

var filterFilePath = function(item){
    return item.indexOf(".js") >= 0;
}

var arr = content.split("\n").filter(filterFilePath).map(mapFilePath);

var tsconfigFile = "Egret3D/tsconfig.json";
var configStr = fs.readFileSync(tsconfigFile,"utf-8");
var tsconfig = JSON.parse(configStr);
tsconfig.files = arr;
var outputConfigStr = JSON.stringify(tsconfig,null,"\t");
fs.writeFileSync(tsconfigFile,outputConfigStr)


var glslGlobalPath = "Egret3D/core/shaderSystem/shader";
var fileList = fs.readdirSync(glslGlobalPath);
fileList = fileList.filter(function(item){return item.indexOf(".glsl") >=0})
console.log (fileList)


var data = "module egret3d {\n"

data += "export var glsldata = {\n";

fileList.forEach( function(glslfile){
    var absluteGlslPath = path.join(glslGlobalPath,glslfile);
    var glslContent = fs.readFileSync(absluteGlslPath,"utf-8");
    if(glslContent.trim().length == 0) {
        data += "\t" + glslfile.replace(".glsl","") + ":" + "\"" + glslContent.replace(/\n/gi,"").replace(/\r\n/gi,"")  + "\"" + ",\n"
    }
    else {
        data += "\t" + glslfile.replace(".glsl","") + ":" + "\"";
        var arr = glslContent.split("\n");
        if(arr.length == 0) {
            arr = glslContent.slice("\r");
        }
        for(var i = 0 ; i <arr.length ; i++) {
            var content = arr[i];
            if(content.indexOf("//") != 0) {
                var index = content.indexOf("//");
                if(index != -1) {
                    data += content.slice(0, index);
                }
                else {
                    data += content;
                }
            }
        }
        data += "\"" + ",\n";
    }

})


data += "\n}";
data += "\n}";


var file = path.join("Egret3D/ProductionEnvironment.ts");
fs.writeFileSync(file,data);



