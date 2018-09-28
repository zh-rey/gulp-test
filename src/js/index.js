$(function(){
	var $navbox = $('.header .nav');
  seajs.use('swiper',function(){
    var indexSwiper = new Swiper('.index-bg .swiper-container',{
      pagination: '.index-bg .pagination',
      paginationClickable: true,
      createPagination :false,
      speed: 1000,
      mode: 'vertical',
      //initialSlide :2,
      mousewheelControl : true,
      onSlideChangeStart: function(swiper){
        var idx = $('.index-bg .swiper-wrapper .swiper-slide-active').index();
        $('.index-bg .slide-bg li').removeClass('active').eq(idx).addClass('active');
        $('.index .nav li').removeClass('active').eq(idx).addClass('active');
        var $t =  $('.index .nav li.active a');
        var leftX = $t.position().left;
        var newWidth = $t.parent().width();
        $navbox.find('.line').stop().animate({
          left: leftX,
          width: newWidth
        },300);
        $navbox.find('.line').data('rightLeft',leftX).data('rightWidth',newWidth);
        if(idx===$('.index-bg .swiper-wrapper .swiper-slide').length-1){
          $('.swiper-next-btn').addClass('top');
        }else{
          $('.swiper-next-btn').removeClass('top');
        }
        if(idx===2||idx===3){
          $('.index').addClass('dark');
        }else{
          $('.index').removeClass('dark');
        }
      }
    });
    $('.swiper-next-btn').click(function(){
      indexSwiper.swipeNext();
    });
  });
});