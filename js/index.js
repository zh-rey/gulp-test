$(function(){
  seajs.use('swiper', function(){
    var bannerSwiper = new Swiper('.banner .swiper-container',{
      autoplay : 3000,
      autoplayDisableOnInteraction : false,
      pagination : '.banner .swiper-pagination',
      paginationClickable : '.banner .swiper-pagination',
      loop : true
    });
  });
	
});