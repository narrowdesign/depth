/* Author: Nick Jones

*/
$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;
	var blurEnabled;
	if(Modernizr.cssfilters){
		blurEnabled = true;
	}else if(Modernizr.textshadow){
		shadowEnabled = true;
	}

	var WIN_H;
	var WIN_W;
	
	var focus = 0;

	var touchEnabled = Modernizr.touch;

	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var moved;

	var events = {
		init: function(){
			window.scrollTo(0, 1);
			pageResize();
			if(win.width() < 768){
				smallScreen = true;
			}
			win.bind('resize', pageResize);
			win.bind('keydown',keyHandler);

			$(win).mouseup(function(){
				win.unbind('mousemove');
			});
			win.bind('mousewheel', function(eventData,deltaY) {
				adjustFocus(deltaY*50);
				eventData.preventDefault();
			});
			win.bind('scroll', function(e) {
				e.preventDefault();
			});
			win.bind('mousemove', function(eventData){
				//moveHandler(eventData);
			});
			win.bind('touchmove',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moved = touch.pageY-touchStartY;
				adjustFocus(Math.floor(moved/3)*20);
				touchStartY = touch.pageY;
			})
			win.bind('touchstart',function(e){
				e.preventDefault();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchStartY = touch.pageY;
			})	
			if(!blurEnabled){
				$('#line').html('Better in Chrome 22+. Mousewheel to pull focus.');
			}
			if(touchEnabled){
				$('#line').html('Better in Chrome 22+. Pull focus.');
			}
			function pageResize (e) {
				if(win.width() < 768){
					smallScreen = true;
				}else{
					smallScreen = false;
				}
				WIN_H = win.height();
				WIN_W = win.width();
				initialized = true;
				adjustFocus(0);
			}
			function adjustFocus(deltaY){
				var myTop;
				var myBlur;
				focus -= deltaY;
				focus = Math.max(focus,0);
				focus = Math.min(focus,2000);
				$('#line').css({
					'top': (focus/7.2)+13});
				for(i=0;i<=$('.plane').index();i++){
					plane = $('.plane').eq(i);
					myTop = i*500;
					myBlur = Math.min(Math.abs((myTop-focus)/100),32);
					myBlur = Math.max(.5,myBlur);
					if(blurEnabled){
						plane.css({
							'-webkit-filter':'blur('+myBlur+'px)',
						})
					}else if(shadowEnabled){
						plane.css({
							color: 'rgba(255,255,255,0)',
							'text-shadow':'0 0 '+myBlur*2+'px #222'
						})
					}
				}
			}
			function keyHandler (argument) {
				clearError();
				if(argument.keyCode==38 || argument.keyCode==37){
					prev();
				}else if(argument.keyCode==40 || argument.keyCode==39){
					next();
				}else{
					return;
				}
			}
			function next(){

			}
			function prev(){

			}
		}
	};
	events.init();
});


























