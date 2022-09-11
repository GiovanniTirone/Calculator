//operazioni
let operators = {
    sum : function sum (a,b)  {return a+b},
    multiply : function multiply (a,b) {return a*b},
    subtract : function subtract  (a,b) {return a-b},
    divide : function divide (a,b) {return a/b},
};

let symbols = {
    sum : '+',
    multiply : "x",
    subtract : "-",
    divide : ":",
};


//DOM
const container = document.querySelector('#container');

//creo le righe e il monitor
let row0 = document.createElement("div");
row0.id = "row0";
row0.classList.add("row");
container.appendChild(row0);
let monitor = document.createElement("div");
monitor.id = "monitor";
row0.appendChild(monitor);
let monitorRow0 = document.createElement("div");
monitorRow0.id = "monitorRow0";
monitorRow0.innerHTML=0;
monitor.appendChild(monitorRow0);
let monitorRow1 = document.createElement("div");
monitorRow1.id = "monitorRow1";
monitorRow1.innerHTML=0;
monitor.appendChild(monitorRow1);
let row1 = document.createElement("div");
row1.id = "row1";
row1.classList.add("row");
container.appendChild(row1);
let row2 = document.createElement("div");
row2.id = "row2";
row2.classList.add("row");
container.appendChild(row2);
let row3 = document.createElement("div");
row3.id = "row3";
row3.classList.add("row");
container.appendChild(row3);
let row4 = document.createElement("div");
row4.id = "row4";
row4.classList.add("row");
container.appendChild(row4);
let row5 = document.createElement("div");
row5.id = "row5";
row5.classList.add("row");
container.appendChild(row5);

//row1
let tastoAc = document.createElement("button");
tastoAc.id="ac";
tastoAc.classList.add("tastoLungo");
tastoAc.innerHTML="AC";
row1.appendChild(tastoAc);
let tastoC = document.createElement("button");
tastoC.id="c";
tastoC.classList.add("tastoLungo");
tastoC.innerHTML="C";
row1.appendChild(tastoC);


//creo i numeri 
let keyNumbers = [];
for(i=0; i<10; i++){
    keyNumbers[i] = document.createElement("button");
    keyNumbers[i].id = i ;
    keyNumbers[i].classList.add("tasto"); 
    keyNumbers[i].innerHTML= i ; 
    switch (i){
        case 0:
            break;
        case 1: case 2: case 3:
            row2.appendChild(keyNumbers[i]);
            break;
        case 4: case 5: case 6:  
            row3.appendChild(keyNumbers[i]);
            break;
        case 7: case 8: case 9:
            row4.appendChild(keyNumbers[i]);
            break;
    };
};

//colonna di fianco ai numeri
let plus = document.createElement("button");
plus.id="sum";
plus.classList.add("tasto");
plus.innerHTML="+";
row2.appendChild(plus);
let minus = document.createElement("button");
row3.appendChild(minus);
minus.id="subtract";
minus.innerHTML="-";
minus.classList.add("tasto");
let cross = document.createElement("button");
row4.appendChild(cross);
cross.id="multiply";
multiply.innerHTML="x";
cross.classList.add("tasto");


//riga finale
let point = document.createElement("button");
row5.appendChild(point);
point.id="point";
point.innerHTML=".";
point.classList.add("tasto");
row5.appendChild(keyNumbers[0]);
let equal = document.createElement("button");
equal.id="equal";
equal.innerHTML="=";
equal.classList.add("tasto");
row5.appendChild(equal);
let divisor = document.createElement("button");
divisor.id="divide";
divisor.classList.add("tasto");
divisor.innerHTML=":";
row5.appendChild(divisor);

//variabili per fare le operazioni

let memory = [ ]; 
let start =true;
let first = true;  
let time = 0 ; 
memory[0] = {
    name : "operation",
    content : null,
};
memory[1] = {
    name : "first",
    content: 0, 
    positive: true, 
    numberOfDecimals : 0 ,
    decimalNumber : false,
};
memory[2] = { 
    name : "second",
    content: 0, 
    positive: true, 
    numberOfDecimals : 0,
    decimalNumber :false,
};


//funzioni

function reverseString(str) {
    return str.split("").reverse().join("");
};

function reset (){
    memory[0] = {
        name : "operation",
        content : null ,
    };
    memory[1] = {
        name : "first",
        content: 0, 
        positive: true, 
        numberOfDecimals : 0,
        decimalNumber:false,
    };
    memory[2] = { 
        name : "second",
        content: 0, 
        positive: true,
        numberOfDecimals : 0, 
        decimalNumber:false,
    };
    start=true;
    time=0;
    monitorRow1.innerHTML="0";
    monitorRow0.innerHTML="0";
};

function addToMonitor (str){
     monitorRow1.innerHTML+=str;
};

function removeFromMonitor(str){
    let l = monitorRow1.innerHTML.length;
    let n = str.length;
    if (l-n==0){ 
        monitorRow1.innerHTML="";
    } else {
        monitorRow1.innerHTML = monitorRow1.innerHTML.substring(0,l-n);
    };
};

function addDigit (firstOrSecond,n,d) {
    let str = n.toString();
    if(d=="."){
        memory[firstOrSecond].decimalNumber=true;  
        d="";
    }else if (memory[firstOrSecond].decimalNumber==true){
        memory[firstOrSecond].numberOfDecimals +=1;
    };
    str += d ;
    console.log("memory["+firstOrSecond+"].numberOfDecimals= "+memory[firstOrSecond].numberOfDecimals);
    return Number(str);
};  


function removeDigit(firstOrSecond) {
    let str = memory[firstOrSecond].content.toString();
    let digitRemoved = str.substring(str.length-1);
    str = str.substring(0,str.length-1);
    if (digitRemoved == "-") { memory[firstOrSecond].positive =true } ;
    if (memory[firstOrSecond].numberOfDecimals>0){
        memory[firstOrSecond].numberOfDecimals-=1
    };
    if(memory[firstOrSecond].numberOfDecimals==0){
        memory[firstOrSecond].decimalNumber=false;
    };
    return Number(str);
};

function pressNumber(d){
    if (d == "point") { d = "." } ; 
    switch (time){    
        case 3 : 
            memory[1].content=0;  
        case 0:
            if(d=="."){start=false};
        case 1 :  
            memory[1].content = addDigit(1,memory[1].content,d);
            start ? monitorRow1.innerHTML=d : addToMonitor(d);
            start = false; 
            time =1;
            break;
        case 2 :  
            memory[2].content = addDigit(2,memory[2].content,d);
            console.log(memory[2].content);
            addToMonitor(d); 
            break;
        case 1.5 :
            memory[2].content = addDigit(2,memory[2].content,d);
            monitorRow0.innerHTML+=monitorRow1.innerHTML;
            monitorRow1.innerHTML=memory[2].content;
            time=2;
            break;
    };
};

function pressOperation (op){
     switch (time) {
        case 0: 
            if(op == "subtract"){
                //memory[1].content = addDigit(memory[1].content,"-");
                memory[1].positive = false;
                monitorRow1.innerHTML="-";
                time =1;
                start=false;
                break;
            };
        case 1 : case 3:
            memory[0].content = operators[op];
            monitorRow0.innerHTML=monitorRow1.innerHTML;
            monitorRow1.innerHTML=symbols[op];
            time=1.5; 
            start=false;
            break;
        case 1.5 :
            if(op=="subtract"){
                //memory[2].content = addDigit(memory[2].content,"-");
                memory[2].positive=false;
                monitorRow0.innerHTML+=monitorRow1.innerHTML;
                monitorRow1.innerHTML="-";
                time=2;
                break;
            } else {
                memory[0].content = operators[op];
                monitorRow1.innerHTML=symbols[op];
                break;
            };
        case 2: 
            return; 
     };
};

function pressEqual (){
    switch (time) {
        case 2:
            memory[1].content = memory[1].content/(10**(memory[1].numberOfDecimals));
            memory[2].content = memory[2].content/(10**(memory[2].numberOfDecimals));
            if (memory[1].positive == false) {memory[1].content = (-1)*memory[1].content };
            if (memory[2].positive == false) {memory[2].content = (-1)*memory[2].content };
            memory[1].content = memory[0].content(memory[1].content,memory[2].content);
            monitorRow0.innerHTML+=monitorRow1.innerHTML+" =";
            monitorRow1.innerHTML=memory[1].content;
            memory[2].content = 0;
            memory[2].numberOfDecimals = 0;
            memory[2].positive =true; 
            memory[1].numberOfDecimals= 0;
            time=3;
            start=true;  
            break; 
        case 1: case 3: case 1.5:
            return;  
    };         
};
    

function pressC (){
    switch (time) {
        case 1:
            memory[1].content = removeDigit(1);
            removeFromMonitor("1");
            break; 
        case 2: 
            memory[2].content = removeDigit(2);
            removeFromMonitor("1");
            break; 
        case 1.5:
            memory[0].content = null;
            monitorRow1.innerHTML = "" ;
            break; 
        case 3: 
            reset();
    };
};

//Listeners


function pressKey(e){
    let mouse = e.target.getAttribute("id");
    console.log(e);
    console.log("mouse:"+mouse);
    console.log(typeof(mouse));

    if (mouse in [0,1,2,3,4,5,6,7,8,9] || mouse == "point"){
            pressNumber(mouse);

    } else if (mouse in {sum,subtract,multiply,divide}){
           pressOperation(mouse);
            
    } else if (mouse == "equal"){
            pressEqual();
            
    } else if (mouse == "c"){
            pressC();

    } else if (mouse == "ac"){
            reset();
    };
};

window.addEventListener("click",pressKey);

/*function coloring(e){
    let mouse = e.target.getAttribute("id");
    if(mouse=="tasto"||"tastoLungo"){
        realCasella.classList.add("colored");
        setTimeout(function(){
        realCasella.classList.remove("colored");
        },500);
                };
};

window.addEventListener("mouseover",coloring);*/

