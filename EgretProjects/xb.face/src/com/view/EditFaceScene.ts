/**
 * 上传和编辑照片场景
 * @author 
 *
 */
class EditFaceScene extends BaseScene{
    public chooseImgBtn:eui.Image;  //上传照片按钮
    public testBtn:eui.Image;    //测颜值按钮
    public http:HttpUtil = new HttpUtil();  //http
    
    private selectID: string;  //本地选择图片id
    private serverID:string;   //微信服务器图片id
    
	public constructor() {
    	super("EditFaceSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        this.configListeners();
    }

    public onRemove(): void {

    }
    
    private configListeners(){
        this.chooseImgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseImgBtnTouch, this);
        this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtnTouch, this);
    }
    
    private deConfigListeners(){
        this.chooseImgBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseImgBtnTouch,this);
        this.testBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTestBtnTouch,this);
    }
    
    //选择图片
    private onChooseImgBtnTouch(){
        //选择相册图片
        var self: EditFaceScene = this;
        var chooseImageBody = {
            count: 1, // 默认9
            sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                egret.log("选择相册的ID:",localIds);
                self.selectID = localIds[0];
                //self.showPic(localIds[0]);
            },
            fail: function() {
                egret.log("上传失败");
            }
        };
        wx.chooseImage(chooseImageBody);
    } 
    
    //测颜值，上传图片到微信服务端，将返回的图片ID传递给信步服务端对接face++，再传数据回来
    private onTestBtnTouch(){
        var self:EditFaceScene = this;
        wx.uploadImage({
            localId:this.selectID, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                self.serverID = serverId;
                self.uploadImageToXB();
                
            },
            fail:function(){
                //TODO show error msg
            }
        });
    }
    
    private uploadImageToXB(){
        this.http.completeHandler = this.revUploadImageToXB;
        this.http.httpMethod = egret.HttpMethod.POST;
        var data = "mediaId=" + this.selectID 
                    + "&teamName=" + "" 
                    + "&_csrf=" + GameConst.csrf;
        this.http.send("http://local.yii.com/zhongchouf4/upload",data,this);
    }
    
    private revUploadImageToXB(data){
        egret.log("revUploadImage:",data);
        var json = JSON.parse(data);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        if(code == 200){
            var data = json.data;
            var age = data.age;
            var gender = data.gender;
            var fscore = data.fscore;
            var isCaptain = data.isCaptain;
        }else{
            //TODO show error msg
        }
    }
    
    private showPic(url){
        var imgload: egret.ImageLoader = new egret.ImageLoader();
        imgload.addEventListener(egret.Event.COMPLETE,function() {
            var bm: egret.Bitmap = new egret.Bitmap(imgload.data);
            this.addChild(bm);  
        },this);
        imgload.load(url);
    }
}












