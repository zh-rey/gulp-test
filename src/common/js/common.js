$(function(){
    if($('.header .nav').length>0){
        var $navbox = $('.header .nav');
        $navbox.find('.line').width($navbox.find('li.active').width()).css('left', $navbox.find('li.active').position().left).data('rightLeft', $navbox.find('.line').position().left).data('rightWidth', $navbox.find('.line').width());
        $navbox.find('ul li a').hover(function() {
            var $t = $(this);
            var leftX = $t.position().left;
            var newWidth = $t.parent().width();
            $navbox.find('.line').stop().animate({
                left: leftX,
                width: newWidth
            },300);
        }, function() {
            $navbox.find('.line').stop().animate({
                left: $navbox.find('.line').data('rightLeft'),
                width: $navbox.find('.line').data('rightWidth')
            },300)
        });
    }
    

	//构造通用弹窗函数
	function mSlider(options){
        this.defaults = {
            'dom': $(".menu-modal"),//弹出层
            'direction': 'left', //弹层方向
            'distance': '70%', //弹层宽度
            't': '0.3s'//过渡时间
        };
        this.opts = $.extend({}, this.defaults, options);
        this.menuModal = this.opts.dom;
        this.bgDom = this.opts.dom.children('div').eq(0);
        this.dom = this.opts.dom.children('div').eq(1);
        this.init();
    }
    mSlider.prototype = {
        init: function() {
            var _this = this;
            //弹层方向
            switch (_this.opts.direction) {
                case 'top':
                    _this.top = '0';
                    _this.bottom = 'no';
                    _this.left = '0';
                    _this.right = 'no';
                    _this.width = '100%';
                    _this.height = _this.opts.distance;
                    _this.translate = 'translate3d(0, -100%, 0)';
                    break;
                case 'bottom':
                    _this.top = 'no';
                    _this.bottom = '0';
                    _this.left = '0';
                    _this.right = 'no';
                    _this.width = '100%';
                    _this.height = _this.opts.distance;
                    _this.translate = 'translate3d(0, 100%, 0)';
                    break;
                case 'right':
                    _this.top = '0';
                    _this.bottom = 'no';
                    _this.left = 'no';
                    _this.right = '0';
                    _this.width = _this.opts.distance;
                    _this.height = '100%';
                    _this.translate = 'translate3d(100%, 0, 0)';
                    break;
                default:
                    //默认 left
                    _this.top = '0';
                    _this.bottom = 'no';
                    _this.left = '0';
                    _this.right = 'no';
                    _this.width = _this.opts.distance;
                    _this.height = '100%';
                    _this.translate = 'translate3d(-100%, 0, 0)';
            }
            //容器样式
            _this.dom.css({
                'position': 'fixed',
                'top': _this.top,
                'bottom': _this.bottom,
                'left': _this.left,
                'right': _this.right,
                'width': _this.width,
                'height': _this.height,
                'overflow-y': 'auto',
                'background-color': '#fff',
                'z-index': '1001',
            	'transform': _this.translate,
            	'-webkit-transform': _this.translate,
                '-webkit-transition': 'all '+_this.opts.t+' ease-out',
                'transition': 'all '+_this.opts.t+' ease-out',
                '-webkit-backface-visibility': 'hidden'
            });
            //遮罩处理
            _this.bgDom.css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background-color': 'black',
                'opacity': '0',
                'z-index': '1000',
                'pointer-events': 'none',
                '-webkit-transition': 'all '+_this.opts.t+' ease-out',
                'transition': 'all '+_this.opts.t+' ease-out',
                '-webkit-backface-visibility': 'hidden'
            });
            _this.bgDom.on('touchmove', function(event) {
                event.preventDefault();
            });
            _this.bgDom.on('touchend click', function(event) {
                event.preventDefault();
                _this.close();
            });
        	setTimeout(function(){_this.opts.dom.css('opacity','1')},500);
        },
        open: function(){
            var _this = this;
            _this.menuModal.show();
            _this.dom.css({'transform':'translate3d(0, 0, 0)','-webkit-transform':'translate3d(0, 0, 0)'});
            _this.bgDom.css({
                'opacity': '0.6',
                'pointer-events': 'auto'
            });
            $('.menu-btn').addClass('active');
        },
        close: function(){
            var _this = this;
            _this.dom.css({'transform':_this.translate,'-webkit-transform':_this.translate});
            _this.bgDom.css({
                'opacity': '0',
                'pointer-events': 'none'
            });
            $('.menu-btn').removeClass('active');
        }
    }
    //生成实例
    var menuBg = new mSlider({
        dom: $(".menu-modal"),
        direction: "left"
    });
    $(".menu-btn").on('click', function(e){
        menuBg.open();
    })
});