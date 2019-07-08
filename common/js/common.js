$(function(){
  /** JQuery元素新增方法 **/
  if(typeof jQuery === 'function'){
    jQuery.fn.extend({
      loading: function(){
        $(this).addClass('loading')
      },
      endloading: function(){
        $(this).removeClass('loading')
      },
      hasloading: function(){
        return $(this).hasClass('loading')
      }
    });
  }

  $('body').on('click','.back.iconleft',function(){ // 返回操作
    window.history.go(-1);
  });

  //全局弹框
  window.$alert = function(str, fun) {

  }
  window.$confirm = function(str, fun) {
    
  }
  var msgTimer = null;
  window.$message = function(str, type) { //顶部提示弹框
    msgTimer && clearTimeout(msgTimer)
    !type && (type = '');
    if($('.alert_message').length){
      $('.alert_message').removeClass('success warning error').addClass(type).find('span').text(str);
      $('.alert_message').fadeIn(200);
    }else{
      $('body').append('<div class="alert_message '+type+'"><span>'+str+'</span></div>');
      setTimeout(function(){
        $('.alert_message').fadeIn(200)
      }, 0);
    }
    msgTimer = setTimeout(function(){
      $('.alert_message').fadeOut(200)
    },2500)
  }
});