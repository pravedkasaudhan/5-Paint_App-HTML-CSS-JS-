let canvas = document.getElementById("canvas");
canvas.width = '685';
canvas.height = innerHeight*(5/7);
let sides;
let con = canvas.getContext("2d");
con.fillStyle = "pink";
con.fillRect(0, 0, canvas.width, canvas.height);
con.lineWidth = 4;

let x_cordi, y_cordi, snapshot;
function reset(event) {
    x_cordi = event.clientX - canvas.getBoundingClientRect().left,
        y_cordi = event.clientY - canvas.getBoundingClientRect().top;
    return { x_cordi, y_cordi };
}
function snapget() {
    snapshot = con.getImageData(0, 0, canvas.width, canvas.height);
}
function snapset() {
    con.putImageData(snapshot, 0, 0);
}
function clearcanvas(turn) {
    con.clearRect(0, 0, canvas.width, canvas.height);
    con.fillStyle = "pink";
    con.fillRect(0, 0, canvas.width, canvas.height);
    snapshot = null;
    console.log("canvas reset");
}

let movingposition, startingposition;
let moving = false;

let brush = document.getElementById("brush");
let line = document.getElementById("line");
let rectangle = document.getElementById("rectangle");
let circle = document.getElementById("circle");
let pentagon = document.getElementById("pentagon");

document.getElementById("btn").addEventListener('click', clearcanvas);

let turn;
brush.addEventListener('click', clickHandler);
line.addEventListener('click', clickHandler);
rectangle.addEventListener('click', clickHandler);
circle.addEventListener('click', clickHandler);
pentagon.addEventListener('click', clickHandler1);


function Color(){
    let fill =document.querySelector("#fcolor").value;
    let stroke= document.querySelector("#scolor").value;
    return {fill,stroke};
}
function clickHandler(event) {
    turn = event.target.id;
    if (turn == null || event.target.id === turn) {
        
        clearcanvas(turn);
        console.log(turn);
        canvas.removeEventListener('mousedown', start, true);
        canvas.removeEventListener('mousemove', ongoing, true);
        canvas.removeEventListener('mouseup', end, true);
        draw(turn);
    }
}
function clickHandler1(event) {
    sides = prompt('sides');
    turn = event.target.id;
    if (turn == null || event.target.id === turn) {
        clearcanvas();
        console.log(turn);
        canvas.removeEventListener('mousedown', start, true);
        canvas.removeEventListener('mousemove', ongoing, true);
        canvas.removeEventListener('mouseup', end, true);
        canvas.removeEventListener('mousedown', brushdraw);
        draw(turn);
    }
}

// function removeevents(shape) {
//     circle.removeEventListener('click', clickHandler);
//     brush.removeEventListener('click', clickHandler)
//     rectangle.removeEventListener('click', clickHandler)
//     line.removeEventListener('click', clickHandler)
//     pentagon.removeEventListener('click', clickHandler1)
//     this[shape].addEventListener('click', clickHandler);
// }

function start(event) {
    console.log("mousedown", turn);
    moving = true;
    startingposition = reset(event);
    console.log(startingposition);
    snapget();
}
function ongoing(event) {
    if (moving == true) {
        movingposition = reset(event);
        snapset();
        drawing(turn);
    }
}
function end(event) {
    console.log("mouseup", turn);
    moving = false;
    movingposition = reset(event);
    console.log(movingposition);
    drawing(turn);
}
function draw(turn) {
    console.log('**********************', turn);
    canvas.addEventListener('mousedown', start, true);
    canvas.addEventListener('mousemove', ongoing, true);
    canvas.addEventListener('mouseup', end, true);
}
function linedraw() {
    con.beginPath();
    con.moveTo(startingposition.x_cordi, startingposition.y_cordi);
    con.lineTo(movingposition.x_cordi, movingposition.y_cordi);
    con.strokeStyle=Color().stroke;
    con.stroke();
    con.closePath();
}
function circledraw() {
    var x = Math.abs(startingposition.x_cordi - movingposition.x_cordi);
    var y = Math.abs(startingposition.y_cordi - movingposition.y_cordi);
    var radi = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    con.beginPath();
    con.arc(startingposition.x_cordi, startingposition.y_cordi, radi, 0, 2 * Math.PI, false);
    con.fillStyle=Color().fill;
    con.strokeStyle=Color().stroke;
    con.fill();
    con.stroke();
    con.closePath();
}
function rectangledraw() {
    var a = startingposition.x_cordi;
    var b = startingposition.y_cordi;
    var m = startingposition.x_cordi - movingposition.x_cordi
    var n = startingposition.y_cordi - movingposition.y_cordi
    console.log(m, n);
    var x = Math.abs(m);
    var y = Math.abs(n);
    var diag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var side = diag / Math.sqrt(2);
    console.log(side);
    con.beginPath();
    if (m > 0 || n > 0) {
        con.rect(a, b, -side, -side);
    } else {
        con.rect(a, b, side, side);
    }
    con.fillStyle=Color().fill;
    con.strokeStyle=Color().stroke;
    con.fill();
    con.stroke();
}

function brushdraw() {
    con.beginPath();
    con.lineWidth = 2;
    con.lineCap = 'round';
    con.moveTo(startingposition.x_cordi,startingposition.y_cordi);
    con.lineTo(movingposition.x_cordi,movingposition.y_cordi);
    con.strokeStyle=Color().stroke;
    con.stroke();
    con.closePath();
    snapget();
    startingposition=movingposition;
}

function pentagondraw(sides) {
    var a = startingposition.x_cordi;
    var b = startingposition.y_cordi;
    var m = startingposition.x_cordi - movingposition.x_cordi
    var n = startingposition.y_cordi - movingposition.y_cordi
    var x = Math.abs(m);
    var y = Math.abs(n);
    var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    console.log(radius);
    con.beginPath();
    var angle = ((Math.PI * 2) / sides);
    con.translate(a, b);
    con.moveTo(radius, 0);
    for (var i = 1; i < sides; i++) {
        con.lineTo(radius * Math.cos(angle * i), radius * Math.sin(angle * i));
    }
    con.closePath();
    con.fillStyle=Color().fill;
    con.strokeStyle=Color().stroke;
    con.fill();
    con.stroke();
    con.translate(-a, -b);
}
function drawing(tu) {
    
    switch (tu) {
        case 'brush':
            brushdraw();
            break;
        case 'line':
            linedraw();
            break;
        case 'rectangle':
            rectangledraw();
            break;
        case 'circle':
            circledraw();
            break;
        case 'pentagon':
            pentagondraw(sides);
            break;

    }
}
