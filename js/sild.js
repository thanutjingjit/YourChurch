document.addEventListener("touchstart", function(){}, true);


$(document).ready(function() {
   /*
   Video player 
   */
   $('.embed-container .play-video a').on('click',function(e) {
        e.preventDefault();
        $(this).closest('.embed-container .play-video').fadeOut();
        var videoId = $(this).attr('id').split('-');
        //console.log('video '+ videoId[1]);
        $('#video-'+videoId[1])[0].src += "&autoplay=1&showinfo=0&rel=0";
    });

   /*
   Slidershow
   */
   $('.videos').slick({
      centerMode: true,
      centerPadding: '160px',
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true
   });
});