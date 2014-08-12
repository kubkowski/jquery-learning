// Utility

if (typeof Object.create !== 'function') {
	Object.create = function(obj){
		function F(){};
		F.prototype = obj;
		return new F();
	}
}

(function($, window, document, undefined) {
	var Github = {
		init: function(options, elem) {
				var self = this;
				self.elem = elem;
				self.$elem = $(elem);
				self.url = 'https://api.github.com/users/';
				if (typeof options === 'string') {
					self.search = options + '/repos';
				} else {
					self.search = options.search + '/repos';
					self.options = $.extend({}, $.fn.searchGithub.options, options);
					console.log(self.options);
				}
		},
		fetch: function(){
			return $.ajax({
				url: this.url + this.search,
				dataType: 'jsonp'
			});
		},
		display: function(){
			this.$elem.html(self.repos);
		}



	};
	$.fn.searchGithub = function(options) {
		return this.each(function(){
			var github = Object.create(Github);
			github.init(options, this);
		});
	};
	$.fn.searchGithub.options = {
		search: 'kubkowski'
	};

})(jQuery, window, document );

