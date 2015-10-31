var width = 1000;
var height = 600;
var circleRadius = 20;
var ringRadius = 50;
var moveAmount = 3;

var keyMap = []; 

var stage = new PIXI.Stage(0xFFFFFF);
var renderer = PIXI.autoDetectRenderer(width, height);
document.body.appendChild(renderer.view);

var circle = new PIXI.Graphics();
circle.beginFill(0x00A452);

circle.drawCircle(0, 0, circleRadius);
circle.x = width/2;
circle.y = height/2;
stage.addChild(circle);

var ring = new PIXI.Graphics();
ring.beginFill(0xFFFFFF);
ring.drawCircle(0, 0, ringRadius);
ring.beginFill(0x000000);
ring.drawCircle(0, 0, ringRadius-5);
moveRing();
stage.addChild(ring);

var score = 0;

var scoreText = new PIXI.Text("Score: 0", {font:"30px Trebuchet MS, Helvetica, sans-serif", fill:"white"});
stage.addChild(scoreText);

renderer.render(stage);

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyMap[e.keyCode] = e.type == 'keydown';
	e.preventDefault();
}

requestAnimationFrame( animate );

function animate() {
	requestAnimationFrame( animate );
	if(keyMap[37]){
		if(circle.x > (moveAmount + circleRadius)){
			circle.x-=moveAmount;
		}
	}
	if(keyMap[38]){
		if(circle.y > (moveAmount + circleRadius)){
			circle.y-=moveAmount;
		}
	}
	if(keyMap[39]){
		if((circle.x + circleRadius + moveAmount) < width){
			circle.x+=moveAmount;
		}
	}
	if(keyMap[40]){
		if((circle.y + circleRadius + moveAmount) < height){
			circle.y+=moveAmount;
		}
	}	
	hitRing();
	scoreText.text = 'Score: '+ score;
	renderer.render(stage);
}

function collide(){
	return Math.sqrt(Math.pow((circle.x-ring.x),2)+Math.pow((circle.y-ring.y),2))<50;
}

function moveRing(){
	ring.x = parseInt(Math.random()*width);
	ring.y = parseInt(Math.random()*height);
}

function hitRing(){
	if(collide()){
		score++;	
		moveRing();
	}
}

//var ringX = Math.random()*900;
//var ringY = Math.random()*500;