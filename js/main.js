// for animation of bar and cross in mobile view
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});


$(".card-header").click(function(){
  $(".card-header").removeClass("active");
  $(this).addClass("active");
});

$('#about_carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoPlaySpeed: 1000,
    autoplayHoverPause: true,
    dots: true,
    nav: false,
    // navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
    responsive: {
        0: {
            items: 1
        },
        960: {
            items: 1
        }
    }
});