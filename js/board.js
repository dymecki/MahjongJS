mahjong.board = (function(){

	var clickedBricks = [],
		bricks = [];

	function init() {
		fields = mahjong.levels.getLevelBoard(1);
		brickTypes = getBricksList();

		//settings = mahjong.settings;
		brickWidth = mahjong.settings.brickWidth;
		brickHeight = mahjong.settings.brickHeight;
		brickVisibleHeight = mahjong.settings.brickVisibleHeight;
		floorOffset = mahjong.settings.floorOffset;
		
		generateBricks();
		populate();
	}
	
	function generateBricks() {
		var i, j, x, y, level, floor,
			zIndex;
		
		for (floor = 0; floor < fields.length; floor++) {
			zIndex = (floor + 1) * 100;
			bricks[floor] = [];

			for (i = 0; i < fields[floor].length; i++) {
				bricks[floor][i] = [];

				for (j = 0; j < fields[floor][i].length; j++) {
					if (fields[floor][i][j] instanceof Array) {
						x = fields[floor][i][j][0] * brickWidth;
						y = i * brickVisibleHeight + fields[floor][i][j][1] * brickVisibleHeight;
					}
					else {
						x = fields[floor][i][j] * brickWidth;
						y = i * brickVisibleHeight;
					}

					/*console.log(floor);
					console.log(i);
					console.log(j);
					console.log(bricks);
					console.log('---------');*/

					bricks[floor][i][j] = {
						id:		floor + '-' + i + '-' + j,
						top:	y,		// css, on page position
						left:	x,		// css on page position
						zIndex:	zIndex,
						type:	brickTypes.pop(),
						x: 		j,		// array position
						y: 		i,		// array position
						z: 		floor,	// array position

						remove: function() {
							console.log(this.id + ' is removed');
						},
						canMove: function() {
						},
						make: function() {
							var brick = document.createElement('div');

							brick.className		= 'brick type' + this.type;
							//brick.id			= floor + '-' + j + '-' + i;
							brick.id			= this.z + '-' + this.x + '-' + this.y;

							brick.style.width	= brickWidth + 'px';
							
							brick.style.left	= this.left + 'px';
							brick.style.top		= this.top + ((this.z + 1) * floorOffset) + 'px';
							brick.style.zIndex	= this.zIndex;

							brick.style.backgroundRepeat	= 'no-repeat';
							brick.style.backgroundPosition	= 'center';

							document.getElementById('game').appendChild(brick);
						}
					};
				}

				zIndex--;
			}
		}
	}


	function populate() {
		var i, j, x, y, level, floor,
			zIndex;
		
		for (floor = 0; floor < bricks.length; floor++) {
			for (i = 0; i < bricks[floor].length; i++) {
				for (j = 0; j < bricks[floor][i].length; j++) {
					//makeBrick(x, y, j, i, floor, zIndex);
					bricks[floor][i][j].make();
				}
			}
		}
	}
	

	/*function populate() {
		var i, j, x, y, level, floor,
			zIndex;
		
		for (floor = 0; floor < fields.length; floor++) {
			zIndex = (floor + 1) * 100;

			for (i = 0; i < fields[floor].length; i++) {
				for (j = 0; j < fields[floor][i].length; j++) {
					if (fields[floor][i][j] instanceof Array) {
						x = fields[floor][i][j][0] * brickWidth;
						y = i * brickVisibleHeight + fields[floor][i][j][1] * brickVisibleHeight;
					}
					else {
						x = fields[floor][i][j] * brickWidth;
						y = i * brickVisibleHeight;
					}
					
					makeBrick(x, y, j, i, floor, zIndex);
				}

				zIndex--;
			}
		}
	}*/
	
	function makeBrick(x, y, j, i, floor, zIndex) {
		var board = document.getElementById('game'),
			brick = document.createElement('div'),
			type = brickTypes.pop();

		brick.className			= 'brick type' + type;
		brick.id				= floor + '-' + j + '-' + i;
		brick.dataset.type		= type;

		brick.style.width		= brickWidth + 'px';
		brick.style.left		= x + 'px';
		brick.style.top			= y + ((floor + 1) * floorOffset) + 'px';
		brick.style.zIndex		= zIndex;

		brick.style.backgroundRepeat = 'no-repeat';
		brick.style.backgroundPosition = 'center';

		return board.appendChild(brick);
	}
	
	function getBrickCoords(id) {
		return id.split('-');
	}


	function removeBrick(id) {
		var first = document.getElementById(id);			
		first.parentNode.removeChild(first);
		
		
	}


	function getAllRows(arr) {
		var i, j, rows = 0;
		
		for (i = 0; i < arr.length; i++) {
			for (j = 0; j < arr[i].length; j++) {
				if (arr[i][j].length > 0) {
					rows++;
				}
			}
		}
		
		return rows
	}
	
	
	function countAllBricks(arr) {
		var arr = arr || fields;
		var floor, i, j, bricks = 0;

		for (floor = 0; floor < arr.length; floor++) {
			for (i = 0; i < arr[floor].length; i++) {
				if (arr[floor][i].length > 0) {
					for (j = 0; j < arr[floor][i].length; j++) {
						bricks++;
					}
				}
			}
		}
		
		return bricks;
	}
	
	/*
		Sprawdza czy mozna usunac dany klocek.
	*/
	function canMove(floor, x, y) {
		if (typeof fields[floor][y][parseInt(x) - 1] === "undefined" ||
			typeof fields[floor][y][parseInt(x) + 1] === "undefined") {
			return true;
		}
		
		return false;
	}
	
	/*
		Metoda sprawdza czy klocek znajduje sie w najnizszym szeregu.
	*/
	function hasBottom(floor, x, y) {
		var thisValue = fields[floor][parseInt(y)][x];
		
		//console.log(floor,x,y);
		
		if (typeof fields[floor][parseInt(y) + 1] === 'undefined')
			return false;
			
		return(fields[floor][parseInt(y) + 1].indexOf(thisValue) > -1);
	}
	
	/*function addShadow() {
		var floor, x, y;

		for (floor = 0; floor < fields.length; floor++) {
			for (y = 0; y < fields[floor].length; y++) {
				for (x = 0; x < fields[floor][y].length; x++) {
					if (hasBottom(floor, x, y) === false) {
						var id = floor + '-' + x + '-' + y;
						document.getElementById(id).className += ' shadow';
					}
				}
			}
		}
	}*/
	
	function addShadow() {
		var floor, x, y;

		for (floor = 0; floor < bricks.length; floor++) {
			for (y = 0; y < bricks[floor].length; y++) {
				for (x = 0; x < bricks[floor][y].length; x++) {
					if (hasBottom(floor, x, y) === false) {
						var id = floor + '-' + x + '-' + y;
						document.getElementById(id).className += ' shadow';
					}
				}
			}
		}
	}

	
	
	function getBricksList() {
		var arr = [], i, bricksAmount = countAllBricks();
		
		for (i = 1; i < bricksAmount; i += 2) {
			arr[i - 1] = arr[i] = Math.floor(Math.random() * 37) + 1;
		}
		
		return shuffle(shuffle(arr));
	}
	

	function setBrickType() {
		return 'b' + Math.floor(Math.random() * mahjong.settings.brickTypes);
	}


	function canRemove() {
		if (isPair()) {
			if (clickedBricks[0].type === clickedBricks[1].type) {
				return true;
			}
			else {
				clickedBricks = [];
				return false;
			}
		}
		
		return false;
	}
	
	function clearClicks() {
		if (clickedBricks.length >= 2) {
			clickedBricks = [];
		}
	}
	
	function removeBricksPair() {
		if (canRemove()) {
			var first, bar, second, params, parent;
			
			console.log('mozna usunac');

			first = document.getElementById(clickedBricks[0].id);
			first.parentNode.removeChild(first);

			second = document.getElementById(clickedBricks[1].id);
			second.parentNode.removeChild(second);

			//clickedBricks = [];

			/*params = getBrickCoords(clickedBricks[0]);
			delete fields[params[0]][params[1]][params[2]];

			params = getBrickCoords(clickedBricks[1]);
			delete fields[params[0]][params[1]][params[2]];*/
		}
	}
	

	function isPair() {
		return (getClickedBricksAmount() === 2) ? true : false;
	}

	

	function addBrickClick(id) {
		var amount = clickedBricks.length,
			clicked = isClicked(id),
			type = getBrickTypeById(id);
		
		if (clicked === -1) {
			clickedBricks.push({id: id, type: type});
		}
		else {
			clickedBricks.splice(clicked, 1);
			console.log('usunieto' + clickedBricks);
		}
	}
	
	
	function isClicked(id) {
		var i, amount = getClickedBricksAmount();

		console.log('Klikniêæ: ' + amount);
		
		if (amount > 0) {
			for (i = 0; i < amount; i++) {
				console.log(clickedBricks[i].id);
				console.log(id);
				console.log('------');

				if (clickedBricks[i].id === id)
					return i;
			}
		}

		return -1;
	}
	
	
	function getBrickTypeById(id) {
		var x, y, z, coords = getBrickCoords(id);

		z = coords[0];
		x = coords[1];
		y = coords[2];

		return bricks[z][y][x].type;
	}
	
	
	
	function getClickedBricksAmount() {
		return clickedBricks.length;

		var count = 0;
		
		for (var brick in clickedBricks)
			if (clickedBricks.hasOwnProperty(brick))
				count++;
			
		return count;
	}


	function shuffle(arr) {
		for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	}
	

	return {
		addBrickClick: addBrickClick,
		canRemove: canRemove,
		clearClicks: clearClicks,
		getClickedBricksAmount: getClickedBricksAmount,
		getBrickTypeById: getBrickTypeById,
		removeBricksPair: removeBricksPair,
		hasBottom: hasBottom,
		addShadow: addShadow,
		canMove: canMove,
		init: init,
		getBrickCoords: getBrickCoords,
		populate: populate,
		setBrickType: setBrickType,
		countAllBricks: countAllBricks
	}
})();