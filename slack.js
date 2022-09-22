class Game{
    constructor(){
        this.cub=document.querySelector('.cub');
        this.spin=document.querySelector('.spin');
        this.resultsDiv=document.querySelector('.results-div');
        this.loginValue=  prompt('write your name to start');
        this.resultShow();
        this.cub.addEventListener('click',(evt)=>{
            this.findNearestWall();
        })
        this.second=3;
        this.point=0;
        this.wallBesideSpin="";
        this.array=['rgb(0,0,0)','rgb(0, 128, 0)','rgb(255, 234, 0)','rgb(255, 0, 0)'];
        this.h1=document.querySelector('h1');
        this.info=[];
    }
 
     resultShow(){
    this.resultsDiv.innerHTML="";
    function allStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
            console.log(keys)
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]));  
        }
        return values;
    }
   const localInfo= allStorage()
   localInfo.forEach((item)=>{
    let y=item.split(" ")
    let z=y[0].split(",")
    const divInResultsDiv=document.createElement('div');
    divInResultsDiv.classList.add('div-In-Results-Div');
    divInResultsDiv.innerHTML=`<h4>${z[0]}  /</h4><p>${z[1]}</p>`
    this.resultsDiv.appendChild(divInResultsDiv)
   })
}

 login(){
    if(this.loginValue){
    this.info=[this.loginValue,this.point];
    localStorage.setItem(this.loginValue,[this.info[0],this.info[1]]);
    }
}

findNearestWall(){
    const transformMatrix = getComputedStyle(this.spin).transform
    const matrixArr = transformMatrix.slice(7,transformMatrix.length - 1).split(',');
    const a = matrixArr[0];
    const b = matrixArr[1];
    const angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
if(angle > -45 && angle < 45){ 
    this.NearestWall="rgb(255, 234, 0)"  //yellow//  
}
else if(angle > 45 && angle < 135){
    this.NearestWall="rgb(255, 0, 0)"  //red//     
} 
else if (angle > 135 || angle < -135){
    this.NearestWall="rgb(0, 0, 0)"  //black//  
}
 else if (angle > -135 && angle < -45) {
    this.NearestWall="rgb(0, 128, 0)"  //green//       
}
this.change();
}

change(){
    const style = getComputedStyle(this.spin)
    const backgroundColor = style.backgroundColor 
if(backgroundColor==this.NearestWall){
    if (this.second<=0.25){
        this.second-=0.05;
    }
    else if(this.second<=0.05){
        this.second-=0.01;
    }
     else if(this.second==0){
        alert('Congratulations YOU WIN ')
        this.login();
        this.resultShow();
    }
    else{
    this.second-=0.25;
    }
    const SpinColor = this.array[Math.floor(Math.random()*4)];
    this.spin.style.backgroundColor = SpinColor;
    this.spin.style.animation=` spin ${this.second}s linear infinite`;
    this.point+=1;
    this.h1.innerHTML=`Your Right Clickes are ${this.point}/ 16<br>The Spinner rotates by ${this.second}second speed`
}

else{
    this.spin.style.animation=' spin 0s linear infinite';
    alert('Game Over')
    this.login();
    this.resultShow();
}
}

}
const game= new Game({

})