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

  $('body').on('click','.back.iconleft, .back.iconclose',function(){ // 返回操作
    window.history.go(-1);
  });

  //全局弹框
  window.$loading = function() {
    $('body').append('<div class="loading model"></div>');
  }
  window.$endloading = function() {
    $('.loading.model').remove();
  }
  window.$alert = function(title, str, fun) {
    title = title || 'YiLiFang'
    $('body').append('<div class="model_alert"><div class="alert"><div class="title">'+title+'</div><div class="info">'+str+'</div><div class="btns"><span class="btnn ok">OK</span></div></div></div>');
    setTimeout(function(){
      $('.model_alert').on('click', '.ok', function(){
        typeof(fun) === 'function' && fun();
        $(this).parents('.model_alert').remove();
      });
    }, 0);
  }
  window.$confirm = function(title, str, fun) {
    title = title || 'YiLiFang'
    $('body').append('<div class="model_confirm"><div class="confirm"><div class="title">'+title+'</div><div class="info">'+str+'</div><div class="btns"><span class="btnn cancel">Cancel</span><span class="btnn ok">OK</span></div></div></div>');
    setTimeout(function(){
      $('.model_confirm').on('click', '.cancel', function(){
        $(this).parents('.model_confirm').remove();
      }).on('click', '.ok', function(){
        typeof(fun) === 'function' && fun();
        $(this).parents('.model_confirm').remove();
      });
    }, 0);
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