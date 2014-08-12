$(document).ready(function() {
	$('#h-mobileButton').click(function(event) {
		event.preventDefault();
		GLOBALCONTROLS.mobileMenu();
	});
	$('#globalBackToTop a').click(function(event) {
		event.preventDefault();
		GLOBALCONTROLS.backToTop();
	});

	GLOBALCONTROLS.setPageWidth();

	$(window).resize(function(){
		GLOBALCONTROLS.setPageWidth();
	});

	$(window).scroll(function() {
		GLOBALCONTROLS.getPageScroll();
	});
	
});

var GLOBALCONTROLS = {
	pageWidth : window.innerWidth || document.documentElement.clientWidth,
	pageScroll : 0,
	isDesktop : false,
	mobileScrollUp : false,
	setPageWidth : function() {
		var tempHolder;
		tempHolder = GLOBALCONTROLS.isDesktop;
		GLOBALCONTROLS.pageWidth = window.innerWidth || document.documentElement.clientWidth;
		if (GLOBALCONTROLS.pageWidth > 767) {
			GLOBALCONTROLS.isDesktop = true;
			if (GLOBALCONTROLS.mobileScrollUp === true) {
				GLOBALCONTROLS.mobileToTop(0);
			}
		} else {
			GLOBALCONTROLS.isDesktop = false;
		}
		if (tempHolder !== GLOBALCONTROLS.isDesktop && GLOBALCONTROLS.isDesktop === true) {
			$('.JQueryClear').attr('style', ' ').removeClass('active');
		}
	},
	getPageScroll : function() {
	    var scrollTop = 0;
	    if (typeof(window.pageYOffset) === 'number') {
	        scrollTop = window.pageYOffset;
	        if ((scrollTop > 50 && GLOBALCONTROLS.pageScroll > scrollTop) && 
	        (GLOBALCONTROLS.isDesktop === false && GLOBALCONTROLS.mobileScrollUp === false)) {
	        	GLOBALCONTROLS.mobileToTop(1);
	        } else if ((scrollTop > 50 && GLOBALCONTROLS.pageScroll < scrollTop) && 
	        (GLOBALCONTROLS.isDesktop === false && GLOBALCONTROLS.mobileScrollUp === true)) {
	        	GLOBALCONTROLS.mobileToTop(0);
	        } else if (scrollTop <= 50 && (GLOBALCONTROLS.isDesktop === false && GLOBALCONTROLS.mobileScrollUp === true)) {
	        	GLOBALCONTROLS.mobileToTop(0);
	        }
	    }
	    $('#globalBackToTop').css('top', scrollTop + 5);
	    GLOBALCONTROLS.pageScroll = scrollTop;
	},
	mobileToTop : function (state) {
		if (state === 1) {
			$('#globalBackToTop').fadeIn();
			GLOBALCONTROLS.mobileScrollUp = true;
		} else if (state === 0) {
			$('#globalBackToTop').fadeOut();
			GLOBALCONTROLS.mobileScrollUp = false;
		}
	},
	backToTop : function() {
		if (navigator.userAgent.match(/Windows Phone/i)) {
			window.scrollTo(0, 0);
		} else {
			$("body,html").animate({
			    scrollTop: 0
			},500, "swing");		
		}
	}
};