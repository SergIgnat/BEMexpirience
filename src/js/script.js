$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 500,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/slider/right.svg"></button>',
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
  });

