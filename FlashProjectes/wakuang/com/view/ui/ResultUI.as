package com.view.ui
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import com.view.scene.GameScene;
	import com.constant.GameConst;
	import com.common.LayerManager;
	import com.GameManager;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class ResultUI extends Sprite
	{
		public var goldText:TextField;
		public var gemText:TextField;
		public var diamondText:TextField;
		public var boxText:TextField;
		
		public var goldScoreText:TextField;
		public var gemScoreText:TextField;
		public var diamondScoreText:TextField;
		public var boxScoreText:TextField;
		
		public var depthText:TextField;
		public var totalScoreText:TextField;
		
		public var okBtn:Sprite;
		public var submitBtn:Sprite;
		
		private var totalScore:int;
		
		public function ResultUI() 
		{
			okBtn.addEventListener(MouseEvent.CLICK, onOKBtnClick);
			submitBtn.addEventListener(MouseEvent.CLICK, onSubmitBtnClick);
		}
		
		private function onOKBtnClick(e:MouseEvent):void {
			GameManager.getInstance().gameScene.resetGame();
			LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
		}
		
		private function onSubmitBtnClick(e:MouseEvent):void {
			//3366提交积分	
			//if(GameConst.platform == GameConst.platform3366){
				//if(Main.open3366Service != null)  
				//{  
					//Main.open3366Service.submitScore(totalScore);  
				//} 
			//}else if(GameConst.platform == GameConst.platform4399){
				if(Main.serviceHold){
					Main.serviceHold.showRefer(totalScore);
				}
			//}
		}
		
		public function setSocre(gameScene:GameScene):void {
			this.x = GameConst.stage.stageWidth / 2 - this.width / 2;
			this.y = GameConst.stage.stageHeight / 2 - this.height / 2;
			LayerManager.getInstance().popLayer.addChild(this);
			
			var goldNum:int = gameScene.gold;
			var gemNum:int = gameScene.gem;
			var diamondNum:int = gameScene.diamond;
			var boxNum:int = gameScene.box;
			var depth:int = gameScene.deep;
			
			var goldScore:int = goldNum * GameConst.goldScore;
			var gemScore:int = gemNum * GameConst.gemScore;
			var diamondScore:int = diamondNum * GameConst.diamondScore;
			var boxScore:int = boxNum * GameConst.boxScore;
			
			goldText.text = goldNum.toString();
			gemText.text = gemNum.toString();
			diamondText.text = diamondNum.toString();
			boxText.text = boxNum.toString();
			
			goldScoreText.text = goldScore.toString();
			gemScoreText.text = gemScore.toString();
			diamondScoreText.text = diamondScore.toString();
			boxScoreText.text = boxScore.toString();
			
			depthText.text = depth.toString();
			
			totalScore =  goldScore + gemScore + diamondScore + boxScore + depth * GameConst.deepthScore;
			
			totalScoreText.text = totalScore.toString();
		}
		
		public function hide():void{
			this.parent && this.parent.removeChild(this);
		}
		
		
		
	}

}