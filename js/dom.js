mahjong.dom = (function() {
    var $ = Sizzle;

    function hasClass(element, className) {
        return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
    }

    function removeClass(element, className) {
        return element.className = element.className.replace(className, '');
    }

    function bind(element, event, handler) {
        if (typeof element == 'string') {
            element = $(element)[0];
        }

        element.addEventListener(event, handler, false);
    }

    return {
        bind:        bind,
        hasClass:    hasClass,
        removeClass: removeClass
    }
})();