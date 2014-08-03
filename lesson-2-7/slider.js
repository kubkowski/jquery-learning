(function($) {
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
			imgs = sliderUL.find('img'),
			imgWidth = imgs.first().width(),
			imgLen = imgs.length,
			current = 1,
			totalImgsWidth = imgLen * imgWidth;

			$('#slider-nav').show().find('button').on('click', function() {
				var direction = $(this).data('dir');
						loc = imgWidth;

				// update current value
				if (direction === "next") {
					current += 1;
					if (current > imgLen) {
						current = 1;
						loc = 0;
						
					}
				} else {
					current -= 1;
					if (current < 1) {
						direction = 'next';
						current = imgLen;
						loc = totalImgsWidth - imgWidth;					
					}
				};
				console.log(loc, direction)
				transition(sliderUL,loc, direction);

			});
			
			function transition(container, loc, direction){
				var unit;

				if (direction && loc !== 0) {
					unit = (direction === 'next') ? '-=' : '+=';
					console.log(direction, unit, loc);
				} 
				console.log(direction, unit, loc);
				container.animate({
					'margin-left' : unit ? (unit + loc) : loc
				})
				console.log(container.css('margin-left'));
			};

})(jQuery);