const score=document.querySelector('.score');
const startScreen =document.querySelector('.startScreen')
//const gameContainer=document.querySelector('.carGame');
const gameArea=document.querySelector('.gameArea')
//To start game
document.addEventListener('click',start);

//initializing speed and score of eah player
let player={
    speed:5,
    score:0
}
//state of keys pressed
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}
//listening to the arrow pressed
document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)

///changeing state of the arrowkey when pressed
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
     console.log(e.key)
    // console.log(keys[e.key])
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    console.log(`${e.key}:${keys[e.key]}`)
}

function randomColor(){
    function hex(){
        let hex=Math.floor(Math.random()*256).toString(16);//c.toString(16)converts the number into hexadecimal
        return(String(hex))
    }
    return('#'+hex()+hex()+hex());
}

function moveLines(){
    let lines=document.querySelectorAll('.lines')
    //console.log(Array.from(lines));
    lines.forEach(function(item){
    //console.log('line')
    if(item.y >=650){
    item.y-=740;
    }
    item.y+=player.speed;
    item.style.top=item.y+"px";
    })
}

function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy')
    //console.log(enemy);
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            //console.log('bang!')
            endGame()
        }
        if(item.y>=750){
            item.y=-300
            item.style.left=Math.floor(Math.random()*350)+'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';
    })

}

function gamePlay(){
    console.log('gameplay function');
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
            /*console.log(road);*/
                //console.log(car)
    //console.log(road)
    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y>(road.top+70)){
            player.y-=player.speed
        }
        if(keys.ArrowDown && player.y<(road.bottom-85)){
            player.y+=player.speed
        }
        if(keys.ArrowLeft && player.x>0 ){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed
        }
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        let ps=player.score-1;
        score.innerText="Score: "+ps;
    }

}
function start(){
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true
    player.score=0;
    window.requestAnimationFrame(gamePlay)
//create the road lines moving effect
    for(x=0;x<5;x++){
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+'px';
        gameArea.appendChild(roadLine)
    }
    let car=document.createElement('div');
car.setAttribute('class','car')
gameArea.appendChild(car);
console.log(car)

//position of the player
player.x=car.offsetLeft;
player.y=car.offsetTop;

for(x=0;x<3;x++){
    let enemyCar= document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y=((x+1)*350)*-1; //-350,-700,-1050
    enemyCar.style.top=enemyCar.y+'px';
    enemyCar.style.backgroundColor=randomColor();
    enemyCar.style.left=Math.floor(Math.random()*350)+'px';
    gameArea.appendChild(enemyCar)
    // console.log('here')
    // console.log(enemyCar)
}
}
function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
    
}
function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="Game Over <br> Final score:"+player.score+" "+"<br>Click on the screen to restart";
}