(function ($) {

    var slider, wrapper, container, prevBtn, nextBtn, toViewBtn,
        allSlides,
        slidesLength,
        currentSlide, prevSlide, nextSlide,
        currentSlideIndex, lastSlideIndex,
        lockEvents,
        settings,
        slideWidth, slideHeight, currentSlideWidth, currentSlideHeight,
        win,
        minWidth;

    //TODO 1. add classes to slides to make smooth fade
    //TODO 2. center slide

    $.fn.jslider = function (options) {
        settings = $.extend({
            debug: false,
            startSlideIndex: 0,
            slideDuration: 400 + 10, //this value must be the same in CSS transitions,
            afterAnimationDelay: 400,
            afterAnimationDuration: 400,
            minWidth: 1024,
            wrapperPaddingsRightLeft: 160,
            sliderPaddingTop: 100,
            sliderPaddingBottom: 130
        }, options);

        slider = this;
        win = $(window);
        wrapper = slider.find('#slider-wrapper');
        container = slider.find('#slider-container');
        prevBtn = slider.find('#slide-prev');
        nextBtn = slider.find('#slide-next');
        toViewBtn = $('#to-page-view');
        allSlides = container.children();
        slidesLength = allSlides.length;
        minWidth = settings.minWidth;

        init();

        return this;
    };

    function init() {
        setup();
        bindEvents();
        hideOrShowButtons();

        slider.addClass('shown').addClass('after-animation');
    }

    function setup() {
        currentSlideIndex = settings.startSlideIndex;
        lastSlideIndex = slidesLength - 1;
        setSlides();
        recalculate();
    }

    function hideOrShowButtons() {
        if (currentSlideIndex == 0) {
            slider.addClass('hide-prev');
        } else if (currentSlideIndex == lastSlideIndex) {
            slider.addClass('hide-next');
        } else {
            slider.removeClass('hide-prev hide-next');
        }

        var hrefLink = currentSlide.data('href');

        if (hrefLink) {
            toViewBtn.show().attr('href', '#' + hrefLink);
        } else {
            toViewBtn.hide();
        }
    }

    function setSlides() {
        currentSlide = container.children(':eq(' + currentSlideIndex + ')').addClass('current');
        if (currentSlideIndex - 1 != -1) {
            prevSlide = container.children(':eq(' + (currentSlideIndex - 1) + ')').addClass('prev');
        }
        nextSlide = container.children(':eq(' + (currentSlideIndex + 1) + ')').addClass('next');
    }

    function recalculate() {
        var winWidth = win.width(),
            wrapperWidth = winWidth <= minWidth ? minWidth : winWidth;

        //wrapper.width(wrapperWidth - (settings.wrapperPaddingsRightLeft * 2));
        wrapper.css({
            'width': wrapperWidth,
            'padding-left': settings.wrapperPaddingsRightLeft,
            'padding-right': settings.wrapperPaddingsRightLeft
        });

        wrapper.height(slider.height()); // - (settings.sliderPaddingTop + settings.sliderPaddingBottom)

        slideWidth = wrapper.width() / 4;
        slideHeight = wrapper.height() > 300 ? 300 : wrapper.height();

        currentSlideWidth = wrapper.width() / 2;
        currentSlideHeight = wrapper.height() > 600 ? 600 : wrapper.height();

        allSlides.css({
            'width': slideWidth,
            'height': slideHeight,
            'top': (container.height() / 2) - (slideHeight / 2),
            'line-height': (slideHeight - 40) + 'px'
        });

        currentSlide.width(currentSlideWidth);

        currentSlide.css({
            'top': 0,
            'height': currentSlideHeight,
            'line-height': (currentSlideHeight - 220) + 'px'
        });

        container.css({
            'left': slideWidth * (1 - currentSlideIndex),
            'top': (wrapper.height() / 2) - (container.height() / 2)
        });
    }

    function bindEvents() {
        prevBtn.click(function () {
            slide('prev');
        });
        nextBtn.click(function () {
            slide('next');
        });

        win.on('resize', recalculate);
    }

    function canSlide(dir) {
        if (dir == 'prev') {
            return currentSlideIndex != 0;
        }

        if (dir == 'next') {
            return currentSlideIndex != lastSlideIndex;
        }
    }

    function slide(dir) {
        if (lockEvents || !canSlide(dir)) { return; }
        lockEvents = true;

        slider.removeClass('no-transitions').removeClass('after-animation');
        currentSlide.removeClass('current');
        prevSlide.removeClass('prev');
        nextSlide.removeClass('next');
        currentSlide.width(slideWidth);

        if (dir == 'next') {
            currentSlideIndex++;
            container.css('left', '-=' + slideWidth);
        }

        if (dir == 'prev') {
            currentSlideIndex--;
            container.css('left', '+=' + slideWidth);
        }

        setSlides();
        currentSlide.width(currentSlideWidth).addClass('current');
        recalculate();
        hideOrShowButtons();

        setTimeout(function () {
            slider.addClass('after-animation');
        }, settings.afterAnimationDelay);

        setTimeout(function () {
            slider.addClass('no-transitions');
            lockEvents = false;
        }, settings.slideDuration + settings.afterAnimationDuration);
    }

    function debug(msg) {
        if (settings.debug) {
            console.debug('ja_slider: '+msg);
        }
    }

})(jQuery);