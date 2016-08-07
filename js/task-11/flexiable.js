'use strict';

(function (win, doc) {
    var dpr = win.devicePixelRatio;

    var maxWidth = 768;
    var maxFontSize = 32;

    function setFontSize(size) {
        doc.documentElement.style.fontSize = '' + size + 'px';
    }

    function flexiable() {
        var width = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        if (width >= maxWidth) {
            setFontSize(maxFontSize);
        } else {
            setFontSize(width / maxWidth * maxFontSize);
        }
    }

    alert(dpr);

    win.addEventListener('load', flexiable);
    win.addEventListener('resize', flexiable);
    
})(window, document);