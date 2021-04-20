(function ($) {
    /*
    * This JS will add functionality to a list of items 
    * to allow horizontal scrolling and will come with an
    * indicator at the bottom which will show the scroll percentage.
    * 
    * How to use: 
    * Call this function with the parent of the list of items.
    *   $elementsWrapper.horizontalScrollIndicator(options);
    * 
    * Default options:
    * {
        color: "#e81c24",
        height: "3",
        arrow: true,
        marginTop: "15",
      }
    * 
    * The rest of styles can be found in src/sass/02_components/header/_horizontal-scroll-indicator.scss
    * 
    * To destroy the functionality and added elements use:
    *   $elementsWrapper.destroyHorizontalScrollIndicator();
    * 
    * Created by Juan de la Oliva (juandelaoliva)
    * 20/April/2021
    */

    $.fn.horizontalScrollIndicator = function (options) {
        const $container = this;
        const $libraryContainer = $('<div class="x-scroll-indicator--container">');
        const $wrapper = $('<div class="x-scroll-indicator--wrapper">');
        const $indicator = $('<div class="x-scroll-indicator--indicator">');
        const $arrow = $('<div class="x-scroll-indicator--arrow show-arrow">');

        $container.addClass('horizontal-scroll-indicator')

        // Default options.
        var settings = $.extend({
            color: "#e81c24",
            height: "3",
            arrow: true,
            marginTop: "15",
        }, options);

        // Apply options.
        $indicator.css({
            background: settings.color,
            height: settings.height + "px",
            marginTop: settings.marginTop + "px",
        })

        // Locate DOM elements.
        $container.children().each(function () {
            $(this).appendTo($wrapper)
        });
        $wrapper.appendTo($libraryContainer)
        $indicator.appendTo($libraryContainer)
        $libraryContainer.appendTo($container)
        $arrow.appendTo($container)

        // This functions manages the scroll indicator.
        function move() {
            var wrapperWidth = $wrapper[0].scrollWidth;
            var viewportWidth = $libraryContainer.width();
            var hasScrolledHorizontal = $libraryContainer[0].scrollLeft;
            var percent = (hasScrolledHorizontal / (wrapperWidth - viewportWidth)) * 100;

            $indicator.css({
                maxWidth: $libraryContainer.width()
            })

            // Check if we need the scrollbar indicator.
            if (wrapperWidth > viewportWidth) {
                $indicator.css("display", "block");
            } else {
                $indicator.css("display", "none");
                console.log(settings.arrow)
                if(settings.arrow){
                    $arrow.removeClass("show-arrow");
                console.log('rem')

                }
            }

            // Check if we need the arrow indicator.
            if ((!settings.arrow) || percent > 30 || (wrapperWidth <= viewportWidth)) {
                $arrow.removeClass("show-arrow");
            } else {
                $arrow.addClass("show-arrow");
            }

            // Update scrollbar indicator width.
            // 30px less because of the paddings.
            $indicator.css("width", "calc(" + percent + "% - 30px)");
        }

        // Trigger function when the page loads.
        $(document).ready(function () {
            move();
        });

        // Trigger function when scroll.
        $libraryContainer.scroll(function () {
            move();
        });

        // Trigger function when the page is resized.
        $(window).resize(function () {
            move();
        });

    };

     // If the library was added this function will destroy the functionality and the elements.
    $.fn.destroyHorizontalScrollIndicator = function (options) {
        const $container = this;
        if($container.hasClass('horizontal-scroll-indicator')){
            const $libraryContainer = $container.find('.x-scroll-indicator--container');
            const $wrapper = $container.find('.x-scroll-indicator--wrapper');
            const $indicator = $container.find('.x-scroll-indicator--indicator');
            const $arrow = $container.find('.x-scroll-indicator--arrow');
    
            // Remove non item elements inside the container.
            $arrow.remove();
            $indicator.remove();

            // Move items to original parent.
            $wrapper.children().each(function () {
                $(this).appendTo($container)
            });

            // Remove wrapper and container.
            $wrapper.remove();
            $libraryContainer.remove();

            // Remove library class
            $container.removeClass('horizontal-scroll-indicator')
        }
    };

}(jQuery));
