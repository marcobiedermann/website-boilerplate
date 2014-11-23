'use strict';

(function() {

	// scrollTo

	$('.scroll-to').on('click', function(e) {

		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);

		return false;

	});

	// scrollTop

	$('.scroll-top').on('click', function(e) {

		e.preventDefault();

		$('html, body').animate({ scrollTop: 0 }, 'slow');

		return false;

	});

	// fancybox

	if ($('.fancybox'))  {

		$('.fancybox').fancybox({

			helpers: {
				overlay: {
					locked: false
				}
			}

		});

	}

	// Placeholder

	if ($('input, textarea')) {

		$('input, textarea').placeholder();

	}

	// carouFredSel

	if ($('.caroufredsel-slider')) {

		$('.caroufredsel-slider').carouFredSel({
			responsive: true,
			width: '100%',
			height: 'variable',
			items: {
				visible: 1,
				start: 'random',
				height: 'variable'
			},
			scroll: {
				duration: 750,
			},
			prev: {
				button: '.caroufredsel-prev',
				key: 'left'
			},
			next: {
				button: '.caroufredsel-next',
				key: 'right'
			},
			pagination: {
				container: 'caroufredsel-pagi',
				keys: true
			},
			swipe: {
				onTouch: true
			},
			transition: true
		});

	}

	// Accordion

	if ($('.accordion')) {

		$('.accordion').accordion();

	}

	// Datepicker

	if ($('.datepicker')) {

		$('.datepicker').datepicker();

	}

	// Spinner

	if ($('.spinner')) {

		$('.spinner').spinner();

	}

	// Tabs

	if ($('.tabs')) {

		$('.tabs').tabs();

	}

	// Tooltip

	if ($('document')) {

		$('document').tooltip();

	}

	// Google Maps

	// function initialize() {

	// 	var mapOptions = {
	// 		zoom: 8,
	// 		center: new google.maps.LatLng(-34.397, 150.644)
	// 	};

	// 	var map = new google.maps.Map(document.getElementById('google-maps'), mapOptions);

	// }

})();
