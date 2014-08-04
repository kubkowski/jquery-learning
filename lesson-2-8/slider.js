function Slider(container, nav){
	this.container = container;
	this.nav = nav.show();

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs.first().width();
	this.imgLen = this.imgs.length;

	this.current = 0;
};

Slider.prototype.transition = function (coords) {
	this.container.animate({
		'margin-left': coords || -(this.current * this.imgWidth)
	});
};

Slider.prototype.setCurrent = function ( dir ) {
	var pos = this.current;

	(dir === 'next') ? pos += 1 : pos -= 1;

	this.current = (pos < 0) ? this.imgLen - 1 : pos % this.imgLen;
	return pos;
}

