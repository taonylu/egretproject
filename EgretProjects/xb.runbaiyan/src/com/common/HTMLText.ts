/**
 *
 * @author 
 *
 */
class HTMLText {
    private myText:HTMLParagraphElement;
    
	public constructor() {
        var gameDiv = document.getElementById("gameDiv");
        this.myText = document.createElement("p");
        this.myText.style.border = "0px";
        this.myText.style.backgroundColor = "transparent";
        this.myText.style.position = "absolute";
        this.myText.style.fontSize = "25px";
        this.myText.style.display = "none";
        
        gameDiv.appendChild(this.myText);
	}
	
    public setValue(value:string): void {
        this.myText.style.display = "inline";
        this.myText.innerHTML = value; 
    }

    
    public setPosition(_x: number,_y: number) {
        this.myText.style.left = _x + "px";
        this.myText.style.top = _y + "px";
    }
    
    public hide() {
        this.myText.style.display = "none";
    }
	
}
