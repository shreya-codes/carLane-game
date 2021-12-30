const car= document.getElementById('car');
let index=0;
const laneMap={
    0:'lane-left',
    1:'lane-middle',
    2:'lane-right'
};

document.addEventListener("keydown",(event)=>{
    if (event.code=="ArrowLeft"){
        index--;
        if (index<0){
            index=0;
        }
    }
    else if(event.code=="ArrowRight"){
        index++;
        if(index>laneCount-1){
            laneCount
        }
    }
    const laneMapValue=laneMap[this.index];
    this.element.setAttribute('class',`car ${laneMapValue}`)
    
})
class Obstacle{
    constructor(){
        this.index=0;
        this.y=-50
    }
}

