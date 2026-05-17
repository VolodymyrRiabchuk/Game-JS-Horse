const sX=800;
const sY=400;

let img=[];
let fname=[];
let horse;
let bkgrd;
let bkgrd1, bkgrd2, bkgrd3;
let bkx=0;
let hay;
let obst;

class Sprite {
    constructor(speed, animation, x, y) {
        this.animation=animation;
        this.len=this.animation.length;
        this.speed=speed;
        this.index=0;
        this.x=x;
        this.y=y;
        this.vy=0;
        this.gravity=0.5;
    }
    show() {
       image(this.animation[floor(this.index) % this.len],this.x,this.y,100,100);
       //rect(this.x,this.y,100,100);
    }
    
    animate() {
        this.index+=this.speed;
        this.y+=this.vy;
        this.vy+=this.gravity;
        this.y=constrain(this.y,0,300);
        }
    
    jump() {
        if (this.y==300) {    
            this.vy=-10; 
        }
    }
    hits(other){
        return collideRectRect(this.x,this.y,100,100,other.x,other.y,80,50);
    }
}
//----------
class Enemy {
    constructor(x,y,speed, pict){
        this.x=x;
        this.y=y;
        this.speed=speed;
        this.pict=pict;
    }
    
    show() {
        image(this.pict, this.x, this.y,80,50);
        /*noFill();
       strokeWeight(1);
        stroke(0);
        rect(this.x,this.y,80,50);*/
    }
    move(){
        this.x+=-this.speed;
        if (this.x<-50) {
            this.x=width;
        }
    }
}
//----
class Layer {
    constructor(x,y,img,speed){
        this.x=x;
        this.y=y;
        this.img=img;
        this.speed=speed;
    }
    show(){
        image(this.img,this.x,this.y,width,height);
        image(this.img,this.x+width,this.y,width,height);
    }
    move(){
        this.x-=this.speed;
        if (this.x<=-width) {this.x=0;}
    }
}

function preload() {
    bkgrd=loadImage('assets/parallax-mountain-bg.png');
    bkgrd1=loadImage('assets/parallax-mountain-montain-far.png');
    bkgrd2=loadImage('assets/parallax-mountain-mountains.png');
    bkgrd3=loadImage('assets/parallax-mountain-trees.png');
    obst=loadImage('assets/hay1.png');
    //horse
    for (let i=0; i<7;i++){
      fname[i]='assets/horse-run-0'+i+'.png';
        img[i]=loadImage(fname[i]);    
    }
}

function setup() {
  createCanvas(sX, sY);
  background(0);
  ellipseMode(RADIUS);
    angleMode(DEGREES);
        horse = new Sprite(0.5,img, 100, 300);
        hay = new Enemy(width,350,10,obst);
        paralax1 = new Layer(0,0,bkgrd1,0.5);
        paralax2= new Layer(0,0,bkgrd2,1);
        paralax3 = new Layer(0,0,bkgrd3,5);
}

function keyPressed(){
    if(key==' ') {
        horse.jump();
    }
}
function draw() { 
    background(bkgrd);
    paralax1.show();
    paralax1.move();
        paralax2.show();
        paralax2.move();
            paralax3.show();
            paralax3.move();
    //background(135,206,235);
    fill('black');
    noStroke();
    rect(0,390,width,height-390);
        hay.show();
        hay.move();
        horse.show();
        horse.animate();
            if (horse.hits(hay)){
                textSize(32);
                fill(0);
                text("DEAD", width/2,200);
                noLoop();
            }
}

function mousePressed() {
    horse.jump();
}