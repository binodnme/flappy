function Box() {
    
    this.width ;        //in px
    this.height;
    
	
    var maxWidth = 900-this.width;
    var maxHeight = 300-this.height;
    var minWidth = 0;
    var minHeight = 0;
    
    this.x;
    this.y;
    
    this.element = document.createElement("div");
    
//    this.element.style['left'] = this.x;
//    this.element.style['top'] = this.y;
    
//    this.element.style['width'] = this.width +'px';
//    this.element.style['height'] = this.height +'px';
    
    this.speed=1;
    this.dirX=0;
    this.dirY=0;
    
    this.setDimension = function(width, height){
        this.width = width;
        this.height = height;
        
        this.element.style['width'] = this.width +'px';
        this.element.style['height'] = this.height +'px';
        
    }
    
    
    this.setLeft = function(left){
        this.x=left;
        this.element.style['left'] = this.x+'px';
    }
    
    this.setTop = function(top){
        this.y=top;
        this.element.style['top'] = this.y+'px';
    }
    
    this.setBottom = function(bottom){
        this.y=bottom;
        this.element.style['bottom'] = this.y+'px';
    }
    
    this.setPos = function(left, top){
        this.x = left;
        this.y = top;
        this.element.style['left'] = this.x+'px';
        this.element.style['top'] = this.y+'px';
    }
    
    this.setDir = function(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;
    }
    
    this.setSpeed = function(speed){
        this.speed = speed;
    }
 
	this.appendTo = function(parentElement) {
		parentElement.appendChild(this.element);
	}

	this.addClass = function(className) {
		this.element.setAttribute("class", 
			this.element.getAttribute("class") + " " + className);
	}

	this.removeClass = function(className) {
		
	}
   

	this.hitTest = function(box) {

        var x1 = box.x;
        var y1 = box.y;
        var width1 = box.width;
        var height1 = box.height;
        
		var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;
        
//        console.log(box.y);

		if (x <x1 + width1 && x + width > x1 && y<(y1 + height1) && (height + y)>y1) {
            // collision detected!
        	console.log('collision');
            return 1;
            
	    } else {
	        // no collision
//	         console.log('no collision');
            return 0;
	    }
		
	}
}