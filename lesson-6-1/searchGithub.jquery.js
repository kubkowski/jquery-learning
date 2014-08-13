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
				self.search = (typeof options === 'string')
					? options
					: options.search;

				self.options = $.extend({}, $.fn.searchGithub.options, options);
				self.refresh(1);
		},

		refresh: function(length){
			var self = this;
			
			setTimeout(function(){
				self.fetch().done(function(results){
					results = self.limit(results.data, self.options.limit);
					self.buildFrag(results);
					self.display();
					if (typeof self.options.onComplete === 'function') {
						self.options.onComplete.apply(self.elem, arguments);
					};

					if (self.options.refresh) {
						self.refresh();
					};

				});
			}, length || self.options.refresh);
		},

		fetch: function(){
			return $.ajax({
				url: this.url + this.search + '/repos',
				dataType: 'jsonp'
			});
		},
		
		buildFrag: function(results){
			var self = this;
			self.repos = $.map(results, function(obj, index) {
				return $(self.options.wrapEachWith).append(obj.name);
			});
		},

		display: function(){
			var self = this;
			
			if (self.options.transition === 'none' || !self.options.transition) {
				self.$elem.html(self.repos);
			} else {
				self.$elem[self.options.transition](500, function(){
					$(this).html(self.repos)[self.options.transition](500);
				});
			}			
		},

		limit: function(obj, count){
			return obj.slice(0, count);
		}



	};
	$.fn.searchGithub = function(options) {
		return this.each(function(){
			var github = Object.create(Github);
			github.init(options, this);
			$.data(this, 'searchGithub', github)
		});
	};
	$.fn.searchGithub.options = {
		search: 'kubkowski',
		wrapEachWith: '<li></li>',
		limit: 10,
		refresh: null,
		onComplete: null,
		transition: 'fadeToggle'
	};

})(jQuery, window, document );

