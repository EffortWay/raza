(function($) {
    "use strict";
    $(document).ready(function() {
        //Owl Carousel
        $('.owl-carousel').owlCarousel({
            responsiveClass:true,
            margin: 30,
            dots: false,
            nav: true,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            loop: true,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items:1,
                },
                // breakpoint from 480 up
                576 : {
                    items:1,
                },
                // breakpoint from 768 up
                768 : {
                    items:2,
                }
            }
        });

        var skill = $('.progressbar-area');

        var width1 = $(".prog1").data("progress");
        var progBar1 = $(".prog1");
        skill.waypoint(function() {
            progBar1.css({
            "width": width1,
            "transition": "2s ease-in"
            });
        }, {

        offset: width1
        });


        var width2 = $(".prog2").data("progress");
        var progBar2 = $(".prog2");
        skill.waypoint(function() {
            progBar2.css({
            "width": width2,
            "transition": "2s ease-in"
            });
        }, {

        offset: width2
        });


        var width3 = $(".prog3").data("progress");
        var progBar3 = $(".prog3");
        skill.waypoint(function() {
            progBar3.css({
            "width": width3,
            "transition": "2s ease-in"
            });
        }, {

        offset: width3
        });

        var width4 = $(".prog4").data("progress");
        var progBar4 = $(".prog4");
        skill.waypoint(function() {
            progBar4.css({
            "width": width4,
            "transition": "2s ease-in"
            });
        }, {

        offset: width3
        });

        
        //Direction Arraw
        $(".item-img").each(function() {
            $(this).hoverdir({
                speed: 300,
                easing: 'ease'
            });
        });

        //Isotope

        var $grid = $('.grid');
        $grid.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
        });
        $('.filter-portfolio').on( 'click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
        $('.portfolio button').on('click', function() {
            $('.portfolio .current').removeClass('current');
            $(this).addClass('current');
        });

        //FancyBox
        $(".single-image").fancybox({
            loop: true,
            hash: true,
            transitionEffect: "slide",
            /* zoom VS next////////////////////
            clickContent - i modify the deafult - now when you click on the image you go to the next image - i more like this approach than zoom on desktop (This idea was in the classic/first lightbox) */
            clickContent: function(current, event) {
                return current.type === "image" ? "next" : false;
            }
        });
        // Google Map
        $('.google-map').each(function() {
            var element = $(this),
                center = {lat: element.data('lat'), lng: element.data('lng')},
                zoom = element.data('zoom');

            var map = new google.maps.Map(element.get(0), {
                center: center,
                zoom: zoom
            });

            var marker = new google.maps.Marker({
                position: center,
                map: map
            });
        });

        
        // when the form is submitted
        $('#contact-form').on('submit', function (e) {

            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                
                var form = $(this), url = form.prop('action');

                // POST values in the background the the script URL
                $.ajax({
                    type: "POST",
                    url: url,
                    data: form.serialize(),
                    success: function (data)
                    {
                        // data = JSON object that contact.php returns

                        var messageAlert = 'alert-' + ( data.success ? 'success' : 'danger' );
                        var messageText = data.data;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        
                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            form.find('.messages').html(alertBox);
                            // empty the form
                            // form[0].reset();

                            // setTimeout(function() {
                            //     form.find('.messages').html('');
                            // }, 10000);
                        }
                    }
                });
                return false;
            }
        });

    });


    //Scroll
    $(window).on('scroll load resize', function(event) {
        var scroll = $(window).scrollTop();
        if (scroll>70) {
            $(".nav-scroll").addClass('scrolled');
        }
        else {
            $(".nav-scroll").removeClass('scrolled');
        }
    });

    $(document).on('click', '.nav-main a[href*="#"]', function() {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - $('.main-navbar').height()
        }, 1000);
        return false;
    });

    $(document).on('click', '.nav-toggle', function() {
        $('.nav-main').slideToggle();
    });

})(jQuery);