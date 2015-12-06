var marginLeft = 0;
var pipes = [];
var mainContainer = document.getElementsByClassName('main-container')[0];
var bgContainer = document.getElementsByClassName('bg-container')[0];

var hero = document.getElementsByClassName('hero')[0];
var heroStyle = window.getComputedStyle(hero);
var heroTop = parseInt(heroStyle.getPropertyValue('top'));
var heroLeft = parseInt(heroStyle.getPropertyValue('left'));
var heroHeight = parseInt(heroStyle.getPropertyValue('height'));
var heroWidth = parseInt(heroStyle.getPropertyValue('width'));
var maxWidth = 900-heroWidth;
var maxHeight = 300-heroHeight;

var pipeCreateId;

var gravity = 1;

var intervalId = window.setInterval(function(){
    
    //move background
    marginLeft-=5;
    bgContainer.style['marginLeft']=marginLeft+'px';
    
    
    //move pipes
    for(pipeIndex in pipes){
        var style = window.getComputedStyle(pipes[pipeIndex]);
        
        var pipeLeft = parseInt(style.getPropertyValue('left'));
        if(pipeLeft<=0){
            pipes[pipeIndex].remove();
//            pipes.splice(pipeIndex,1);
        }else{
            pipes[pipeIndex].style['left'] = (pipeLeft - 5) +'px';
        }                            
        
    }
    
    //check ground collision
    if(heroTop<maxHeight){
        heroTop+=5;
        hero.style['top'] = heroTop+'px';
        if(heroTop>=maxHeight){
            var newDiv = document.createElement('div');
            newDiv.style['width'] = '300px';
            newDiv.style['height'] = '100px';
            newDiv.style['background'] = 'red'
            newDiv.innerHTML = "OUT";
            newDiv.style['position'] = 'absolute';
            newDiv.style['top'] = (300/2 - 100/2) +'px';
            newDiv.style['left'] = (800/2-300/2) +'px';
            mainContainer.appendChild(newDiv);
            
            window.clearInterval(intervalId);
            window.clearInterval(pipeCreateId);
        }
    }
    
    
    //check pipe collison
    
    
    //check end point
    if(marginLeft==-5000){
        window.clearInterval(intervalId);
        window.clearInterval(pipeCreateId);
    }    
},50);


var count=0;
var pipeCreateId = window.setInterval(function(){
    
    var pipe = document.createElement('div');
    pipe.style['width'] = 30+'px';
    pipe.style['height'] = 150+'px';
    pipe.style['background'] = 'blue';
    pipe.style['position'] = 'absolute';
//    pipe.style['top'] = 0+'px';
    pipe.style['left'] = 900+'px';


    var pipe1 = document.createElement('div');
    pipe1.style['width'] = 30+'px';
    pipe1.style['height'] = 50+'px';
    pipe1.style['background'] = 'blue';
    pipe1.style['position'] = 'absolute';
//    pipe1.style['bottom'] = 0+'px';
    pipe1.style['left'] = 900+'px';
    
    if(count%2==0){
        pipe.style['top'] = 0+'px';
        pipe1.style['bottom'] = 0+'px';
    
        pipes.push(pipe);
        pipes.push(pipe1);
        mainContainer.appendChild(pipe);
        mainContainer.appendChild(pipe1);
    }else{
        pipe1.style['top'] = 0+'px';
        pipe.style['bottom'] = 0+'px';
        pipes.push(pipe1);
        pipes.push(pipe);
        mainContainer.appendChild(pipe1);
        mainContainer.appendChild(pipe);
    }
    
    count++;

},3000);

mainContainer.onkeydown = function(e){
    console.log('key down');
}

mainContainer.onmousedown = function(e){
    console.log('mouse down');
    if(heroTop>=0){
        var tempTop = heroTop;
        var inc = 40;
        var interval = window.setInterval(function(){
            heroTop-=1; 
            hero.style['top'] = heroTop+'px';    
            if(heroTop< tempTop-inc || heroTop<=0){
                window.clearInterval(interval)
            }
        },5)
    }
    
}


function hitTest(){
        var x1 = box.x;
        var y1 = box.y;
        var width1 = box.width;
        var height1 = box.height;
        
		var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;

		if (x <x1 + width1 && x + width > x1 && y<(y1 + height1) && (height + y)>y1) {
            // collision detected!

	    } else {
	        // no collision
//	         console.log('no collision');
	    }
		
	}

