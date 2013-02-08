$ ->
  $('[data-kleingeld]').kleingeld()

$.fn.kleingeld = (options) ->
  new Kleingeld($(@), options)

class window.Kleingeld
  constructor: ($el, options) ->
    options || (options = {})

    @$el = $el
    @$container = $("<div class='kleingeld-container'></div>")
    @$tokens = $("<span class='kleingeld-tokens'></span>")
    @$prompt = $("<input type='text' class='kleingeld-input' size=1>")
    @$widthTest = $("<span class='kleingeld-width-test'></span>")

    @tokens = []

    @delimiter = options.delimiter || ','

    @$el.attr 'type', 'hidden'
    @$el.after @$container
    @$container.append @$tokens
    @$tokens.after @$prompt
    @$prompt.after @$widthTest

    @$widthTest.css('font-size', @$prompt.css('font-size'))
    @$widthTest.css('font-family', @$prompt.css('font-family'))

    @$prompt.on 'keydown', => @promptKeyDown.apply(@, arguments)
    @$prompt.on 'keyup', => @calculatePromptWidth.apply(@, arguments)
    @$prompt.on 'blur', => @clearPrompt.apply(@, arguments)
    @$container.on 'click', '.kleingeld-token', => @removeToken.apply(@, arguments)
    @$container.on 'click', => @$prompt.focus()

  promptKeyDown: (e) ->
    if [9, 13, 188].indexOf(e.keyCode) > -1
      e.preventDefault()
      @addToken()
    else if e.keyCode == 8 && @$prompt.val().length == 0
      @removeLastToken()
    @calculatePromptWidth()

  calculatePromptWidth: ->
    @$widthTest.html(@$prompt.val())
    width = @$widthTest.width()
    addtlWidth = parseInt @$prompt.css('font-size')
    @$prompt.width(width + addtlWidth)

  clearPrompt: ->
    @$prompt.val('')
    @calculatePromptWidth()

  addToken: ->
    val = @$prompt.val().trim()

    if val.length && @tokens.indexOf(val) == -1
      @tokens.push(val)

    @clearPrompt()
    @updateTokens()

  removeLastToken: ->
    @tokens.pop()
    @updateTokens()

  removeToken: (e) ->
    e.stopPropagation()
    @tokens.splice @tokens.indexOf($(e.target).html()), 1
    @updateTokens()

  updateTokens: ->
    @$tokens.html('')
    @$el.val @tokens.join(@delimiter)

    for token in @tokens
      @$tokens.append @makeToken(token)

  makeToken: (val) ->
    $("<span class='kleingeld-token'>#{val}</span>")
