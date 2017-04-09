$(document).ready( function(){
	$(window).unload(saveSettings);
    loadSettings();
	var canvas = document.createElement('canvas');
	canvas.setAttribute("id","canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.body.appendChild(canvas);

	var keysDown = {};
	var buttonsNav = [];
	var buttons = [];
	var names = [];
	var scores = [];

	window.addEventListener('keydown', function(e) {
		e.preventDefault();
		keysDown[e.keyCode] = true;
	})
	window.addEventListener('keyup', function(e) {
		e.preventDefault();
		delete keysDown[e.keyCode];
	})
	$( "#canvas" ).mousedown(function(e) {
  		var X = e.clientX - 97;
  		var Y = e.clientY - 132;
  		deleteEnemy(X,Y);
  		if(gameOver) {
	  		if (isInside(X,Y)) {
	  			frameNo = 0;
	        	reset(ctx);
	    	}
    	}
    	if(isInsideNav(X,Y,buttonsNav) == 0){
    		changeSpeed("add");
    	}
    	else if(isInsideNav(X,Y,buttonsNav) == 1){
    		changeSpeed("less");
    	}
	});
	$("#faster").click('click',function(e) {
		changeSpeed("add");
	});

	$("#slower").click('click',function(e) {
		changeSpeed("less");
	});
	$("#reset").click('click',function(e) {
		reset(ctx);
	});

	var button1 = {
	    x:300,
	    y:320,
	    w:200,
	    h:50
	};
	var button2 = {
	    x:600,
	    y:0,
	    w:100,
	    h:50
	};
	var button3 = {
	    x:700,
	    y:0,
	    w:100,
	    h:50
	};
	buttons.push(button1);
	buttonsNav.push(button2);
	buttonsNav.push(button3);

	function drawButtons(array) {
		for (var i = 0; i < array.length; i++) {
			ctx.fillStyle = "#434342";
			ctx.fillRect(
				array[i].x,
				array[i].y,
				array[i].w,
				array[i].h)
			ctx.font = "30px Arial";
			ctx.fillStyle = "#FFFFFF";
			if(array === buttons) {
				ctx.fillText("Restart",350,355);
			}
			else if(i === 0) {
				ctx.fillText("Faster",608,35);
			}
			else if(i === 1) {
				ctx.fillText("Slower",704,35);
			}
		}
	}
	function isInside(width,height){
    	return width > button1.x && width < button1.x + button1.w && height < button1.y+button1.h && height > button1.y
	}
	function isInsideNav(width,height,array){
		for (var i = 0; i < array.length; i++) {
			if(width > array[i].x && width < array[i].x + array[i].w && height < array[i].y+array[i].h && height > array[i].y) {
				return i
			}
		}
	}
	var render = function() {
		frameNo += 1;
		ctx.clearRect(0 , 0 , canvas.width , canvas.height);
		if(frameNo % 60 === 0) {
			create(1);
		}
		drawPlayer(ctx);
		for (var i = 0; i < enemies.length; i++) {
			drawEnemy(enemies[i],ctx);
		} 
		drawButtons(buttonsNav);
		ctx.fillText("Score: " + frameNo,20,30);
		ctx.fillText("Health: " + player.life,20,60);
	};
	function drawGameOver() {
		ctx.clearRect(0 , 0 , canvas.width , canvas.height);
		ctx.fillStyle = '#000000';
		ctx.font = "60px Arial";
		ctx.fillText("Game Over!",250,150);
		ctx.font = "30px Arial";
		ctx.fillText("Score: " + frameNo,340,250);
		drawButtons(buttonsNav);
		drawButtons(buttons);
		if(countGameOver === 0) {
			var name = prompt("Add your name to your score to the scoreboard!", "");
			names.push(name);
			scores.push(frameNo);
		}
		countGameOver ++;
	};
	function loadSettings () {
		 console.log(localStorage);
		// console.log(localStorage.scores);
		// if(localStorage.names !== undefined) {
  //       	// for (var i = 0; i < localStorage.names.length; i++) {
	 //    		names = JSON.parse(localStorage.getItem("names"));
	 //    	// }
	 //    	// for (var i = 0; i < localStorage.scores.length; i++) {
	 //    		scores = JSON.parse(localStorage.getItem("scores"));
	 //    	// }
  //   	}
	}
	function saveSettings() {
	    // if(gameOver) {
	    // 	for (var i = 0; i < names.length; i++) {
	    // 	localStorage.names += JSON.stringify(names[i])
	    // 	}
	    // 	for (var i = 0; i < scores.length; i++) {
	    // 		localStorage.scores += JSON.stringify(scores[i]);
	    // 		}
	    // 	}
	    }
	    // if(!gameOver) {
	    // 	names = JSON.parse(localStorage.getItem("names"));
     //    	scores = JSON.parse(localStorage.getItem("scores"));
	    // }
	function update() {
		moveEnemies(ctx);
		if(38 in keysDown) {
			right = true;
			movePlayer("up");
			player.updateFrame(ctx);
			drawPlayerMove(ctx);
			right = false;
		}
		if(40 in keysDown) {
			right = true;
			movePlayer("down");
			player.updateFrame(ctx);
			drawPlayerMove(ctx);
			right = false;
		}
		if(39 in keysDown) {
			right = true;
			movePlayer("right");
			player.updateFrame(ctx);
			drawPlayerMove(ctx);
			right = false;
		}
		if(37 in keysDown) {
			movePlayer("left");
			player.updateFrame(ctx);
			drawPlayerMove(ctx);
		}
	}

	function main() {
		if(!gameOver) {
			update();
			render();
			requestAnimationFrame(main);
		}
		else {
			drawGameOver();
			requestAnimationFrame(main);
		}
	}
	main();
});