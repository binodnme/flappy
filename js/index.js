var marginLeft = 0;
var pipes = [];
var mainContainer = document.getElementsByClassName('main-container')[0];
var bgContainer = document.getElementsByClassName('bg-container')[0];

var hero = new Box();
hero.addClass('hero');
hero.setPos(100,140);
hero.setDimension(30,30);
hero.appendTo(mainContainer);

var actualWidth = 900;
var actualHeight = 300;
var maxWidth = 900-hero.width;
var maxHeight = 300-hero.height;

var pipeCreateId;

var gravity = 1;


var intervalId = window.setInterval(function(){
    
    //move background
    marginLeft-=5;
    bgContainer.style['marginLeft']=marginLeft+'px';
    
    //move pipes
    for(var pipeIndex in pipes){                        
        
        if(pipes[pipeIndex].x<=0){
            pipes[pipeIndex].element.remove();
//            pipes.splice(pipeIndex,1);
        }else{
            pipes[pipeIndex].x -=5;
            pipes[pipeIndex].element.style['left'] = pipes[pipeIndex].x +'px';
        }
    }
    
    //check ground collision
    if(hero.y<maxHeight){
        hero.y+=5;
        hero.element.style['top'] = hero.y+'px';
        if(hero.y>=maxHeight){
            dead();
        }
    }
    
    
    //check pipe collison
    for(var pipe in pipes){
        if((pipes[pipe].x + pipes[pipe].width) > hero.x){
            if(hero.hitTest(pipes[pipe])){
                dead();
            }
        }
    }
    
    //check end point
    if(marginLeft==-5000){
        window.clearInterval(intervalId);
        window.clearInterval(pipeCreateId);
    }    
},50);


var count=0;
var pipeCreateId = window.setInterval(function(){
    var pipe = new Box();
    pipe.addClass('pipe');
    pipe.setDimension(30,150);
    pipe.setLeft(900);
    pipe.element.style['background'] = 'blue';
    
    var pipe1 = new Box();
    pipe1.addClass('pipe');
    pipe1.setDimension(30,50);
    pipe1.setLeft(900);
    pipe1.element.style['background'] = 'blue';
    
    if(count%2==0){
        pipe.setTop(0);
        pipe1.setTop(actualHeight-pipe1.height);
    
        pipes.push(pipe);
        pipes.push(pipe1);
        pipe.appendTo(mainContainer);
        pipe1.appendTo(mainContainer);
    }else{
        pipe.setTop(actualHeight-pipe.height);
        pipe1.setTop(0);
        
        pipes.push(pipe1);
        pipes.push(pipe);
        pipe1.appendTo(mainContainer);
        pipe.appendTo(mainContainer);
    }
    
    count++;

},3000);

mainContainer.onkeydown = function(e){
    console.log('key down');
}

mainContainer.onmousedown = function(e){
    if(hero.y>=0){
        var tempTop = hero.y;
        var inc = 40;
        var interval = window.setInterval(function(){
            hero.y-=1; 
            hero.element.style['top'] = hero.y+'px';    
            if(hero.y< tempTop-inc || hero.y<=0){
                window.clearInterval(interval)
            }
        },5)
    }
    
}

function dead(){
    var newDiv = document.createElement('div');
    newDiv.style['width'] = '200px';
    newDiv.style['height'] = '100px';
    newDiv.style['background'] = 'red'
    newDiv.innerHTML = "OUT";
    newDiv.style['text-align']='center';
    newDiv.style['line-height']='100px';
    newDiv.style['font-size']='xx-large';
    newDiv.style['position'] = 'absolute';
    newDiv.style['top'] = (300/2 - 100/2) +'px';
    newDiv.style['left'] = (800/2-300/2) +'px';
    mainContainer.appendChild(newDiv);

    window.clearInterval(intervalId);
    window.clearInterval(pipeCreateId);
}