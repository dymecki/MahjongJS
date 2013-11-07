var mahjong = {
	settings: {
		brickWidth: 42,
		brickHeight: 50,
		brickVisibleHeight: 56,
		brickTypes: 37,
		floorOffset: 8 // o ile pikseli trzeba przesun¹æ klocki na kazdym poziomie
	}
};

window.addEventListener('load', function() {
	Modernizr.load([{
		load: [
			'js/prototypes.js',
			'js/sizzle.js',
			'js/dom.js',
			'js/levels.js',
			'js/board.js',
			//'js/brickLiteral.js',
			'js/game.js'
		],
		
		complete: function() {
			//console.log('Zaladowano wszystkie pliki.');
			mahjong.game.run();
		}
	}]);
}, false);