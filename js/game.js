mahjong.game = (function(){
	var $ = Sizzle,
	board = mahjong.board,
	dom = mahjong.dom,
	brick = mahjong.brick;

	function run() {
		board.init();
		board.populate();
		board.addShadow();

		var bricks = document.getElementsByClassName('brick');
		
		for (var i = 0; i < bricks.length; i++) {
			bricks[i].addEventListener('click', function() {
				board.addBrickClick(this.id);
				board.removeBricksPair();
				board.clearClicks();
			}, false);
		}
	}


	function init() {
		settings = mahjong.settings;
		brickWidth = settings.brickWidth;
		brickHeight = settings.brickHeight;
	};
	
	return {
		init: init,
		run: run
	}
})();