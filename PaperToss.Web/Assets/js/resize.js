'use strict';

$(function () {
    var $window = $(window),
        viewAreaHeight = 920,
        viewAreaWidth = 640,
        $content = $('#wrapper');
       

    if (typeof InnerViewAreaWidth != 'undefined' && InnerViewAreaWidth > 0) {
        viewAreaWidth = InnerViewAreaWidth;
    }
    if (typeof InnerViewAreaHeight != 'undefined' && InnerViewAreaHeight > 0) {
        viewAreaHeight = InnerViewAreaHeight;
    }

    /**
     * Function returns true if it's a mobile device
     *
     * @function
     * @name isMobile
     * @returns {boolean}
     */
    function isMobile() {
        return /Android|webOS|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Function makes element's size relevant to windows size
     *
     * @function
     * @name resizeElement
     * @param {jQuery} $element
     * @returns {undefined}
     */
    function resizeElement($element) {
        var $wrapper = $element.parent('.js-wrapper'),
            hscale = $window.height() / viewAreaHeight,
            wscale = $window.width() / viewAreaWidth;

        var scale = hscale < wscale ? hscale : wscale;

        $wrapper.css({
            height: $element.height() * scale,
            'margin-top': hscale < wscale ? 0 : ($window.height() - viewAreaHeight) / 2
        });

        $element.css({
            '-ms-transform': 'scale(' + scale + ')',
            '-o-transform': 'scale(' + scale + ')',
            '-moz-transform': 'scale(' + scale + ')',
            '-webkit-transform': 'scale(' + scale + ')',
            'transform': 'scale(' + scale + ')',
            'transform-origin': 'center top'
        });
    }

    /**
     * Function makes screen responsive for differs types of devices
     *
     * @function
     * @name makeResponsive
     * @returns {undefined}
     */
    function makeResponsive() {
        var $contentWrapper = $('<div>', { 'class': 'content-wrapper js-wrapper' });

        //if (isMobile()) {
        //    $content.addClass('content-mobile');
        //    return;
        //}

        $content.addClass('content-desktop');
        $content.wrap($contentWrapper);
        resizeElement($content);
        $window.on('resize', function () {
            resizeElement($content);
        });
    }

    makeResponsive();
});