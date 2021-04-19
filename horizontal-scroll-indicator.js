(function ($) {

    $.fn.horizontalScrollIndicator = function (options) {
        const $container = this;
        const $libraryContainer = $('<div class="x-scroll-indicator--container">');
        const $wrapper = $('<div class="x-scroll-indicator--wrapper">');
        const $indicator = $('<div class="x-scroll-indicator--indicator">');

        $wrapper.css({
            display: "flex"
        })

        $libraryContainer.css({
            overflowX: "scroll",
        })

        // Default options.
        var settings = $.extend({
            color: "#e81c24",
            height: "3",
            arrow: true,
            marginTop: "15",
        }, options);

        $indicator.css({
            background: settings.color,
            height: settings.height + "px",
            position: "absolute",
            display: "block",
            marginTop: settings.marginTop + "px",
            minWidth: "30px"
        })

        $container.children().each(function () {
            $(this).appendTo($wrapper)
        });
        $wrapper.appendTo($libraryContainer)
        $indicator.appendTo($libraryContainer)
        $libraryContainer.appendTo($container)

        function move() {
            var wrapperWidth = $wrapper[0].scrollWidth;
            var viewportWidth = $libraryContainer.width();
            var hasScrolledHorizontal = $libraryContainer[0].scrollLeft;
            var percent = (hasScrolledHorizontal / (wrapperWidth - viewportWidth)) * 100;
            console.log(wrapperWidth, viewportWidth, hasScrolledHorizontal, percent)

            $indicator.css({
                maxWidth: $libraryContainer.width()
            })

            // Check if we need the scrollbar indicator.
            if (wrapperWidth > viewportWidth) {
                $indicator.css("display", "block");
            } else {
                $indicator.css("display", "none");
                $libraryContainer.removeClass("arrow");
            }

            // Check if we need the arrow indicator.
            if (percent > 30 || (wrapperWidth < viewportWidth)) {
                $libraryContainer.removeClass("arrow");
            } else {
                $libraryContainer.addClass("arrow");
            }

            // Update scrollbar indicator width.
            // 30px less because of the paddings.
            $indicator.css("width", "calc(" + percent + "% - 30px)");
        }

        $(document).ready(function () {
            move();
        });

        $libraryContainer.scroll(function () {
            move();
        })

        $(window).resize(move());

    };

}(jQuery));
