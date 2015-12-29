<?php
require_once "../jssdk.php";
$jssdk = new JSSDK('wx3e1ac9134b043c3d','5965ef92595fcf660e670786aa217691');
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Running Mom</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #888888;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

    <script src="jquery-1.5.2.min.js"></script>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/eui/eui.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.web.min.js"></script>
	<!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
	<script src="main.min.js?ver=1512201320"></script>
	<!--game_files_end-->
</head>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="60"
         data-content-width="640"
         data-content-height="1150"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>

    <audio id="bgm" src="resource/assets/sound/bgm.mp3" autoplay="autoplay" loop="loop"></audio>
    <audio id="click" src="resource/assets/sound/click.mp3" preload="auto"></audio>
    <audio id="box" src="resource/assets/sound/box.mp3" preload="auto"></audio>

<script>
        var bgm = document.getElementById("bgm");
        var click = document.getElementById("click");
        var box = document.getElementById("box");
		
		function playBGM(){
			bgm.currentTime = 0;
			bgm.play();
		}

        function pauseBGM(){
           bgm.pause();
        }

        function playClick(){
            click.play();
        }
        function playBox(){
            box.play();
        }

        egret.runEgret();
	

		function submit(phone){
			var bSuccess = false;
			$.ajax({
                type : "GET",
				url:"http://m.meitun.com/mobile/user/receivecouponbymobilejsonp.htm",
                dataType : 'jsonp',
				async : false,
                data:{"mobile": phone.mobile, "couponnumber":phone.couponnumber},
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                success : function(revData){
					var json = JSON.parse(revData);
					console.log(json);
					if(json.rescode.code == "0"){
						bSuccess = true;
					}
					console.log("success");
					alert(json.rescode.info);
					window.submitScene.onResult(bSuccess);
                },
                error:function(){
					alert(json.rescode.info);
					window.submitScene.onResult(bSuccess);
                }
				
            });
			
		}


    </script>

<!--调用微信分享接口开始-->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<!--监控-->
<script type="text/javascript" src="http://tarsocial.oss-cn-hangzhou.aliyuncs.com/tarsocial-monitor-v1002.js"></script>

<script>
	
	//---监控config---
	var userinfo = [];  //默认为空; 注意:如需监控openid、昵称、头像等信息,则需要将微信网页授权接口返回的JSON串写入[]中。
		tar.config({
            tar_debug:false,                      //选填，debug模式：值为true开启，默认关闭。
		    tar_token:"EA7c3OgJTJ8njJCEJNr3vmoa9TVJ%2Bi0",   //必填，监测系统分配给此次监测活动的token
		    tar_tid: "103078"    //必填，监测系统分配给此次监测活动的id
	       },userinfo);
	//---监控config---
		

    var wAppID;
    var wTimestamp
    var wNonceStr;
    var wSignature;
    
    $.ajax({
        type : "post",
        url:"http://weiphp.ekche.com/index.php?s=/addon/Babytree/Babytree/getJSdata",
        dataType : 'json',
        success : function(revData){
            wAppID = revData.appId;
            wTimestamp = revData.timestamp;
            wNonceStr = revData.nonceStr;
            wSignature = revData.signature;
			
			//---微信config---
			wx.config({
			        debug: false,
			        appId: '<?php echo $signPackage["appId"];?>',
			        timestamp: <?php echo $signPackage["timestamp"];?>,
			        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			        signature: '<?php echo $signPackage["signature"];?>',
			        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
		    });
			//---微信config---

			wx.ready(function () {
				
				//---监控代码---
				var shareData64 = {
					  title: "wuli麻麻不会轻易的狗带！",								  //必填,分享标题
					  desc: "圣诞老人你快跑，我追你，如果我追到你，我就把你……",           //选填,分享描述
					  imgUrl: "http://weiphp.ekche.com/Show/Babytree/runningmom.jpg?ver=1.0",     //选填,分享图片
					  link:"http://weiphp.ekche.com/Show/Babytree/index.php",             //必填,可跟get参数,现支持使用location.href
					  success: function () { 
					   // 用户确认分享后执行的回调函数
					  },
					  cancel: function () { 
					   // 用户取消分享后执行的回调函数
					  }
				};

				wx.onMenuShareAppMessage(tar.shapeShareAppMessage(shareData64));
				wx.onMenuShareTimeline(tar.shapeShareTimeline(shareData64));
				//---监控代码---

                //---分享朋友圈---
				//var xbtitle =  "wuli麻麻不会轻易的狗带！";
				//var xbdesc =  "圣诞老人你快跑，我追你，如果我追到你，我就把你……";
				//var xblink =  "http://weiphp.ekche.com/Show/Babytree/index.php";
				//var xbimgUrl =  "http://weiphp.ekche.com/Show/Babytree/runningmom.jpg?ver=1.0";
				
				/*
                wx.onMenuShareTimeline({   //朋友圈
                    title: xbtitle, // 分享标题
                    desc: xbdesc, // 分享描述
                    link: xblink, // 分享链接
                    imgUrl: xbimgUrl, // 分享图标
                    //type: '', // 分享类型,music、video或link,不填默认为link
                    //dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
                    success: function () {
                    },
                    cancel: function () {
                    }
                });*/
				//---分享朋友圈---
				
				//---分享好友---
				/*
				 wx.onMenuShareAppMessage({  //分享好友
					title: xbtitle, // 分享标题
					desc:xbdesc , // 分享描述
					link: xblink, // 分享链接
					imgUrl:xbimgUrl, // 分享图标
					type: '', // 分享类型,music、video或link,不填默认为link
					dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
					success: function () {},
					cancel: function () {}
				 });*/
				 //---分享好友---
            });

           
			
		
          } //success
    });	 //ajax
	
		  	


</script>
<!--调用分享接口end-->

<div style="display:none">
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1256984509'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1256984509' type='text/javascript'%3E%3C/script%3E"));</script>
</div>

</body>
</html>




















