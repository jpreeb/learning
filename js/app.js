(function() {

  var App = Ember.Application.create();

  App.IndexRoute = Ember.Route.extend({
    constants: {
      LOCAL_STORAGE_KEY: 'colors',
      EMPTY_MODEL: Array(100).join(',').split(',')
    },
    model: function() {
      return JSON.parse(localStorage.getItem(this.constants.LOCAL_STORAGE_KEY)) ||
        this.constants.EMPTY_MODEL;
    },
    tiles: function() {
      return $('.grid div');
    },
    actions: {
      toggle: function(target) {
        if (target.tagName.toLowerCase() === 'div') {
          var color = '';
          if (target.style.background === color) {
            color = '#' + Math.random().toString(16).slice(2,8);
          }
          $(target).find('code').text(color);
          target.style.background = color;
        }
      },
      save: function() {
        var colors = [];
        this.tiles().each(function(index) {
          colors.push(this.style.background);
        });
        localStorage.setItem(this.constants.LOCAL_STORAGE_KEY, JSON.stringify(colors));
      },
      clear: function() {
        this.tiles().each(function(index) {
          $(this).css('background', '');
        });
      }
    }
  });

  App.ButtonsView = Ember.View.extend({
    classNames: ['buttons'],
    click: function(event) {
      this.get('controller').send(event.target.id);
    }
  });

  App.GridView = Ember.View.extend({
    classNames: ['grid'],
    click: function(event) {
      this.get('controller').send('toggle', event.target);
    }
  });

  Ember.Handlebars.registerHelper('hex', function(options) {
    var hex = '';
    var color = this.get('model')[options.data.view.contentIndex];
    if (color) {
      var parts = color.split('(')[1].split(')')[0].split(',');
      for (var i = 0, l = parts.length; i < l; i++) {
        hex += (parseInt(parts[i], 10).toString(16) + '0').substring(0, 2);
      };
    }
    return hex;
  });

  Ember.Handlebars.registerHelper('index', function(options) {
    return options.data.view.contentIndex + 1;
  });

})();
