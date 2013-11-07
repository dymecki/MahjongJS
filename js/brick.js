mahjong.brick = (function() {
	function click(){
		var brick = document.getElementByClass('brick');
		
	}
	
	function toggle(elem)
	{
		if (dom.hasClass(elem, 'active') === true) {
			dom.removeClass(elem, 'active');
		}
		else {
			this.className += ' active';
		}
	}
	
	
	function getType(className)
	{
		var tmp = className.split(' ');
		
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].search('type') > -1) {
				return tmp[i].replace('type', '');
			}
		}
		
		return false;
	}
	
	return {
		getType: getType,
		toggle: toggle
	}
})();