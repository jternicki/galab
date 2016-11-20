$(document).ready(function () {

    var body = $('body'),
        pagesTransitionDuration = 600;

    // Main Slider
    $('#main-slider').jslider({
        debug: true,
        startSlideIndex: 1,
        slideDuration: 600
    });

    // Main Menu
    $('#main-nav').jmenu();

    $('#btn-back').click(function () {
        history.back();
    });

    // Hash navigation
    $.simpleHashNav({
        classNamePrefix: 'nx-',
        defaultRoute: 'main'
    });

    // Blueimp Gallery
    $('#gallery-links').click(function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            links = this.getElementsByTagName('a');
        blueimp.Gallery(links, {
            index: link,
            event: event,
            toggleControlsOnReturn: false
        });
    });

    // Dottips
    $('#page-view-1, #page-view-2').dottip();
});

$(window).load(function () {
    $('html').removeClass("preload");
});
