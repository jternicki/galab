// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function($) {
    $.fn.jmenu = function (options) {

        var menu = this,
            strip = this.find('#nav-strip'),
            links = this.find('a');

        shiftMenuStrip();

        function setActiveLink(hash) {
            var classname = 'active',
                more = false;
            if (hash.indexOf('-more') != -1) {
                hash = hash.replace('-more','');
                classname = 'active more';
                more = true;
            }

            var link = menu.find('a[href*="'+ hash +'"]');

            if (link.length) {
                links.removeClass('active more');
                link.addClass(classname);
                shiftMenuStrip(more);
            } else {
                links.removeClass('active more');
                strip.css('top', 0);
            }
        }

        setActiveLink(location.hash.replace(/^#/, ''))

        function shiftMenuStrip(more) {
            var index = menu.find('a.active').index();

            strip.css('top', 90 * index);
            if (more) {
                strip.css('left', '110px');
            } else {
                strip.css('left', '-40px');
            }
        }

        $(window).bind('hashchange', function (e, triggered) {
            setActiveLink(location.hash.replace(/^#/, ''))
        });
    }
})(jQuery);

(function($) {
    $.simpleHashNav = function (options) {
        var body = $('body'),
            settings,
            bodyPageClasses = {};

        settings = $.extend({
            classNamePrefix: '',
            defaultRoute: ''
        }, options);

        $(window).bind('hashchange', function (e, triggered) {
            var hash = location.hash.replace(/^#/, ''),
                classname = '';

            if (hash) {
                body.removeClass(_.values(bodyPageClasses).join(' '));

                if (settings.classNamePrefix) {
                    classname =
                        hash.indexOf(settings.classNamePrefix) != -1
                            ? hash
                            : settings.classNamePrefix + hash;
                } else {
                    classname = hash;
                }

                if (!bodyPageClasses[classname]) {
                    bodyPageClasses[classname] = classname;
                }

                body.addClass(classname);
            } else if (settings.defaultRoute) {
                location.hash = settings.defaultRoute;
            }
        });

        $(window).trigger('hashchange');
    }
})(jQuery);

(function($) {

    $.fn.dottip = function (options) {

        var tooltipsContainer = this.find('.tooltips-container'),
            defaultTooltip = tooltipsContainer.find('.default'),
            dottipsContainer = this.find('.dottips-container'),
            dottips = dottipsContainer.find('.dottip'),
            dotropes = dottipsContainer.find('.dotrope');

        var dotropeTimeout, dottipInterval;

        dottips.hover(function (e) {
            clearTimeout(dotropeTimeout);

            var tooltip = tooltipsContainer.find('p.' + $(this).data('item'));

            defaultTooltip.removeClass('active');

            if (tooltipsContainer.find('.active').length <= 0) {
                tooltip.addClass('active');
            } else {
                dottipInterval = setInterval(function () {
                    if (tooltipsContainer.find('.active').length <= 0) {
                        clearInterval(dottipInterval);
                        tooltip.addClass('active');
                    }
                }, 50);
            }

            dotropes.css('opacity', 0);
        }, function (e) {
            clearInterval(dottipInterval);
            tooltipsContainer.find('.active').removeClass('active');

            dotropeTimeout = setTimeout(function () {
                defaultTooltip.addClass('active');
                dotropes.css('opacity', 1);
            }, 1000);
        })

    }

})(jQuery);
