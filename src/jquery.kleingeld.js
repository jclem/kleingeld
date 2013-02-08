// Generated by CoffeeScript 1.3.3
(function() {
  var Kleingeld;

  $(function() {
    return $('[data-kleingeld]').kleingeld();
  });

  $.fn.kleingeld = function(options) {
    return $(this).each(function(index, el) {
      return new Kleingeld($(el), options);
    });
  };

  Kleingeld = (function() {

    function Kleingeld($el, options) {
      var _this = this;
      options || (options = {});
      this.$el = $el;
      this.$container = $("<div class='kleingeld-container'></div>");
      this.$tokens = $("<span class='kleingeld-tokens'></span>");
      this.$prompt = $("<input type='text' class='kleingeld-input' size=1>");
      this.$widthTest = $("<span class='kleingeld-width-test'></span>");
      this.tokens = [];
      this.delimiter = options.delimiter || ',';
      this.triggers = options.triggers || [9, 13, 188];
      this.$el.attr('type', 'hidden');
      this.$el.after(this.$container);
      this.$container.append(this.$tokens);
      this.$tokens.after(this.$prompt);
      this.$prompt.after(this.$widthTest);
      this.$widthTest.css('font-size', this.$prompt.css('font-size'));
      this.$widthTest.css('font-family', this.$prompt.css('font-family'));
      this.$prompt.on('keydown', function() {
        return _this.promptKeyDown.apply(_this, arguments);
      });
      this.$prompt.on('keyup', function() {
        return _this.calculatePromptWidth.apply(_this, arguments);
      });
      this.$prompt.on('blur', function() {
        return _this.clearPrompt.apply(_this, arguments);
      });
      this.$container.on('click', '.kleingeld-token', function() {
        return _this.removeToken.apply(_this, arguments);
      });
      this.$container.on('click', function() {
        return _this.$prompt.focus();
      });
    }

    Kleingeld.prototype.promptKeyDown = function(e) {
      if (this.triggers.indexOf(e.keyCode) > -1) {
        e.preventDefault();
        this.addToken();
      } else if (e.keyCode === 8 && this.$prompt.val().length === 0) {
        this.removeLastToken();
      }
      return this.calculatePromptWidth();
    };

    Kleingeld.prototype.calculatePromptWidth = function() {
      var addtlWidth, width;
      this.$widthTest.html(this.$prompt.val());
      width = this.$widthTest.width();
      addtlWidth = parseInt(this.$prompt.css('font-size'));
      return this.$prompt.width(width + addtlWidth);
    };

    Kleingeld.prototype.clearPrompt = function() {
      this.$prompt.val('');
      return this.calculatePromptWidth();
    };

    Kleingeld.prototype.addToken = function() {
      var val;
      val = this.$prompt.val().trim();
      if (val.length && this.tokens.indexOf(val) === -1) {
        this.tokens.push(val);
      }
      this.clearPrompt();
      return this.updateTokens();
    };

    Kleingeld.prototype.removeLastToken = function() {
      this.tokens.pop();
      return this.updateTokens();
    };

    Kleingeld.prototype.removeToken = function(e) {
      e.stopPropagation();
      this.tokens.splice(this.tokens.indexOf($(e.target).html()), 1);
      return this.updateTokens();
    };

    Kleingeld.prototype.updateTokens = function() {
      var token, _i, _len, _ref, _results;
      this.$tokens.html('');
      this.$el.val(this.tokens.join(this.delimiter));
      _ref = this.tokens;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        _results.push(this.$tokens.append(this.makeToken(token)));
      }
      return _results;
    };

    Kleingeld.prototype.makeToken = function(val) {
      return $("<span class='kleingeld-token'>" + val + "</span>");
    };

    return Kleingeld;

  })();

}).call(this);
