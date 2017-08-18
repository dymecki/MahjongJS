mahjong.brick = {
    id:     floor + '-' + i + '-' + j,
    top:    y,
    left:   x,
    zIndex: zIndex,
    type:   brickTypes.pop(),
    x:      j,
    y:      i,
    z:      floor,
    remove: function() {
        console.log(this.id);
    },

    click: function() {
        var brick = document.getElementByClass('brick');

    },

    toggle: function(elem) {
        if (dom.hasClass(elem, 'active') === true) {
            dom.removeClass(elem, 'active');
        }
        else {
            this.className += ' active';
        }
    },

    getType: function(className) {
        var tmp = className.split(' ');

        for (var i = 0; i < tmp.length; i++) {
            if (tmp[i].search('type') > -1) {
                return tmp[i].replace('type', '');
            }
        }

        return false;
    }
};