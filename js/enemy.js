var enemies = [];
var gameOver = false;
var frameNo = 0;
//Each row contains 5 frame and at start we will display the first frame (assuming the index from 0)
var curFrameBad = 0; 

//The total frame is 5 
var frameCountBad = 5;

//x and y coordinates to render the sprite 
//sprite width
var spriteWidthBad = 215;
//sprite height
var spriteHeightBad = 82;


var rowsBad = 2; 
var colsBad = 5;

//To get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height 
var spriteWidthOneBad = spriteWidthBad/colsBad; 

//Same for the height we divided the height with number of rows 
var spriteHeightOneBad = spriteHeightBad/rowsBad;  

//x and y coordinates of the canvas to get the single frame 
// var srcXBad = 0; 
// var srcYBad = 0;

function create(amount) {
	for (var i = 0; i < amount; i++) {
		var x = Math.ceil(Math.random() * 760);
		var y = Math.ceil(Math.random() * 500) + 60;
		var speed = Math.ceil(Math.random() * 10);
		var direction = Math.ceil(Math.random() * 4);
		var enemy = {
				x: x,
				y: y,
				w: 40,
				h: 40,
				speed: speed,
				direction: direction,
				srcYBad: spriteHeightOneBad
		};
		var counter = 0
		if(!enemies.isEmpty) {
			for (var i = 0; i < enemies.length; i++) {
				if(x + enemy.w >= enemies[i].x && x <= enemies[i].x + enemies[i].w &&
					y + enemy.h >= enemies[i].y && y <= enemies[i].y + enemies[i].h ||
					x + enemy.w >= player.x && x <= player.x + player.w &&
					y + enemy.h >= player.y && y <= player.y + player.h) {
					counter += 1;
				}
			}
			if(counter === 0) {
				enemies.push(enemy);
			}
			else {
				create(counter);
			}
		}
		else {
			enemies.push(enemy);
		}
	}
}

//initially creating 4 enemies
create(20); 

function drawEnemy(enemy,context) {
	// for (var i = 0; i < enemies.length; i++) { 

		var enemyCharacter = new Image(); 

		var x = enemy.x;
		var y = enemy.y;
		// Load sprite sheet
		enemyCharacter.src = "../assets/bad_fish.png";
		context.drawImage(enemyCharacter,srcXBad,enemy.srcYBad,spriteWidthOneBad,spriteHeightOneBad,x,y,spriteWidthOneBad,spriteHeightOneBad);
	// }
}

function collisionDetection(enemy, number) {
	var collisionTrue = false;
	for (var i = 0; i < enemies.length; i++) {
		if(i === number) {
		}
		else if(enemy.x + enemy.w >= player.x - (player.w/2) && enemy.x <= player.x + (player.w/2) &&
				enemy.y + enemy.h >= player.y - (player.h /2) && enemy.y <= player.y + (player.h/2)) {

			if (player.life > 1) {
				player.life -= 1;
			}
			else {
				gameOver = true;
			}
		}
		else if((enemy.x + enemy.w >= enemies[i].x && enemy.x <= enemies[i].x + enemies[i].w &&
					enemy.y + enemy.h >= enemies[i].y && enemy.y <= enemies[i].y + enemies[i].h)) {
			collisionTrue = true;
		}
	}
	if(collisionTrue) {
		return collisionTrue;
	}
	else {
		collisionTrue = false;
		return collisionTrue;
	}
}
function updateFrame(ctx,i){
 	//Updating the frame index 
 	curFrameBad = ++curFrameBad % frameCountBad; 
 
 	//Calculating the x coordinate for spritesheet 
	srcXBad = curFrameBad * spriteWidthOneBad; 

	if(enemies[i].direction === 1) {
		//calculate srcY 
		enemies[i].srcYBad = 0; 
	}
	else {
		enemies[i].srcYBad = spriteHeightOneBad;
	}
	//Clearing the drawn frame 
	ctx.clearRect(enemies[i].x,enemies[i].y,spriteWidthOneBad,spriteHeightOneBad);
}
function moveEnemies(ctx) {
	for(var i = 0; i < enemies.length; i++) {
		move(enemies[i],i,ctx);
		updateFrame(ctx,i);
		drawEnemy(enemies[i],ctx);
	}
}
function move(enemy, i, ctx) {
	switch (enemy.direction) {
		case 1:
			enemy.direction = 1;
			enemy.x -= enemy.speed;
			if(collisionDetection(enemy, i)){
				enemy.direction = 2;
			}
			if(enemy.x <= 0) {
				enemy.direction = 2;
			}
			break;
		case 2:
			srcYBad = spriteHeightOneBad;
			enemy.direction = 2;
			enemy.x += enemy.speed;
			if(collisionDetection(enemy,i) == true){
				enemy.direction = 1;
			}
			if(enemy.x >= 760) {
				enemy.direction = 1;
			}
			break;
		case 3:
			enemy.direction = 3;
			enemy.y -= enemy.speed;
			if(collisionDetection(enemy,i) == true){
				enemy.direction = 4;
			}
			if(enemy.y <= 80) {
				enemy.direction = 4;
			}
			break;
		case 4:
			enemy.direction = 4;
			enemy.y += enemy.speed
			if(collisionDetection(enemy,i) == true){
				enemy.direction = 3;
			}
			if(enemy.y >= 560) {
				enemy.direction = 3;
			}
			break;
	}
}
function deleteEnemy(width,height) {
	//looping through all enemies
	for (var i = 0; i < enemies.length; i++) {
		if((enemies[i].x <= width && enemies[i].x  >= width - 40) &&
			(enemies[i].y <= height && enemies[i].y >= height - 40)  ) {
				enemies.splice(i, 1);
				frameNo += 100;
				if(player.life <= 90) {
					player.life += 10;
				}
				else if(player.life > 90 && player.life < 100) {
					player.life = 100;
				}
		}
	}
}