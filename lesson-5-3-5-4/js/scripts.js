var Actors = {
	init: function(config){
		this.config = config;
		this.setupTemplates();
		this.bindEvents();
		$.ajaxSetup({
			url: 'index.php',
			type: 'POST'
		})
	},
	bindEvents: function(){
		this.config.letterSelection.on('change', this.fetchActors);
		this.config.actorList.on('click', 'li', this.displayActorInfo);
		this.config.actorInfo.on('click', 'span.close', this.closeOverlay);
	},
	setupTemplates: function(){
		this.config.actorListTemplate = Handlebars.compile(this.config.actorListTemplate);
		this.config.actorInfoTemplate = Handlebars.compile(this.config.actorInfoTemplate);
		Handlebars.registerHelper('fullName', function(actor){
			return actor.first_name + ' ' + actor.last_name;
		});
	},
	fetchActors: function(){
		var self = Actors;
		$.ajax({
			data: self.config.form.serialize(),
			dataType: 'json',
			success: function(results){
				self.config.actorList.empty();
				if (results[0]) {
					self.config.actorList.append(this.config.actorListTemplate(results));
				} else {
					self.config.actorList.append('<li>Nothing returned</li>');
				}
			};
		});
	},
	displayActorInfo: function(e){
		var self = Actors;

		$.ajax({
			data: {actor_id: $(this).data('actor_id')}
		}).done(function(results){
			self.config.actorInfo.html(this.config.actorInfoTemplate({info: results}));
		});
		e.preventDefault();
	},
	closeOverlay: function(){
		this.config.actorInfo.fadeOut(300);
	}
}

Actors.init({
	letterSelection: $('#q'),
	form: $('#actor-selection'),
	actorListTemplate: $('#actor_list_template').html(),
	actorInfoTemplate: $('#actor_info_template').html(),
	actorList: $('ul.actor_list'),
	actorInfo: $('div.actor_info')
});