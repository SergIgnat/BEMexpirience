$(document).ready(function() {
    // ! Carousel

    $(".carousel__inner").slick({
        speed: 500,
        adaptiveHeight: true,
        dotsClass: "my-dots",
        prevArrow:
            '<button type="button" class="slick-prev"><img src="img/slider/left.svg"></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="img/slider/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    // !Catalog

    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab_active)",
        function() {
            $(this)
                .addClass("catalog__tab_active")
                .siblings()
                .removeClass("catalog__tab_active")
                .closest("div.container")
                .find("div.catalog__content")
                .removeClass("catalog__content_active")
                .eq($(this).index())
                .addClass("catalog__content_active");
        }
    );

    // !catalog- item

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on("click", function(e) {
                e.preventDefault();
                $(".catalog-item__content")
                    .eq(i)
                    .toggleClass("catalog-item__content_active");
                $(".catalog-item__list")
                    .eq(i)
                    .toggleClass("catalog-item__list_active");
            });
        });
    }
    toggleSlide(".catalog-item__link-back");
    toggleSlide(".catalog-item__link");

    // !Modal

    $("[data-modal=consultation]").on("click", function() {
        $(".overlay, #consultation").fadeIn("slow");
    });

    $(".modal__close").on("click", function() {
        $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
    });

    $(".button_catalog").each(function(i) {
        $(this).on("click", function() {
            $("#order .modal__descr").text(
                $(".catalog-item__subtitle")
                    .eq(i)
                    .text()
            );
            $(".overlay, #order").fadeIn("slow");
        });
    });

    // !Validate form

    function modalValidate(form) {
        $(form).validate({
            errorClass: "modalError",
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format(
                        "Имя должно содердать минимум {0} символа!"
                    )
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    email: "Введен неправильный адрес почты",
                    required: "Пожалуйста, введите свой Email"
                }
            }
        });
    }
    modalValidate("#consultation_form");
    modalValidate("#consultation form");
    modalValidate("#order form");

    // !maskedInput

    $(".feed-form-phone").mask("+7 (999) 999-99-99");

    // !Ajax

    // $('form').submit(function(e) {
    // 	e.preventDefault();
    // 	if (modalValidate("#consultation_form, #consultation form, #order").done()) {
    // 		$.ajax ({
    // 			type: "POST",
    // 			url: "mailer/smart.php",
    // 			data: $(this).serialize()
    // 		}).done(function(){
    // 			$(this).find('input').val('');
    // 			$('#consultation, #order').fadeOut();
    // 			$('#thanks').fadeIn('slow');
    // 			$('form').trigger('reset');
    // 		});
    // 		return false;
    // 	} else {
    // 		modalValidate('#consultation_form, #consultation form, #order');
    // 	}
    // });

    $("form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this)
                .find("input")
                .val("");
            $("#consultation, #order").fadeOut();
            $("#thanks").fadeIn("slow");

            $("form").trigger("reset");
        });
        return false;
    });

    // !Smooth scrolling and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    $('a[href^="#"]').click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    // !WoW.JS animate.css

    new WOW().init();
});
