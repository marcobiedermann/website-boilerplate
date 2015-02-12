(function() {

  'use strict';

  document.createElement('picture');

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

})();
