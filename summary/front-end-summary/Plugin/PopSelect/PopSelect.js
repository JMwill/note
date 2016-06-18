+function($) {
  'use strict';
  var PopSelect = function (el, options) {
    this.el = $(el);
    this.init('PopSelect', el, options);
  }

  PopSelect.DEFAULTS = {
    trigger: 'click',
    selectWrapTmpl:
        '<div class="pop-select-target-container">'
            + '<span class="pop-select-target-cover"></span>'
        + '</div>',
    selectTmpl:
        '<div class="pop-select-cover">'
            + '<div class="pop-select-container">'
                + '<div class="pop-select-list-container"></div>'
                + '<button class="pop-select-cancel">取消</button>'
            + '</div>'
        + '</div>',

  }

  PopSelect.TRANSITION_DURATION = 150;

  PopSelect.prototype.select = function (wrap) {
    var $select = this.el;

    var options = wrap.find('option');
    var popSelectOptions = $('<ul></ul>');
    options.each(function (o) {
        var $o = $(this);
        popSelectOptions.append('<li data-value="' + $o.attr('value') + '">' + $o.text() + '</li>');
    });
    this.popSelect
        .find('.pop-select-list-container')
        .html(popSelectOptions);
    this.popSelect.addClass('show');
  }

  PopSelect.prototype.init = function () {
    // insert pop select container
    var $that = this;
    var $select = this.el;

    // select element wrapper
    var selectWrap = $(PopSelect.DEFAULTS.selectWrapTmpl);

    // replace select element
    var selectHeight = $select.outerHeight();
    var selectCover = selectWrap.find('.pop-select-target-cover');
    $select.clone().appendTo(selectWrap);
    $select.replaceWith(selectWrap);
    selectCover.height(selectHeight);

    selectWrap.on(PopSelect.DEFAULTS.trigger, function (e) {
        var $target = $(e.target);
        if ($target.hasClass('pop-select-target-cover')) {
            $that.select(selectWrap);
        }
    });

    if ($('.pop-select-container').length === 0) {
        var $popSelect = $(PopSelect.DEFAULTS.selectTmpl);

        var windowHeight = $(window).height();
        $popSelect
            .height(windowHeight)
            .find('.pop-select-list-container')
            .height(windowHeight - 110);

        $('body').append($popSelect)

        this.popSelect = $popSelect;
        $popSelect.on(PopSelect.DEFAULTS.trigger, function (e) {
            var $target = $(e.target);
            if ($target.hasClass('pop-select-cancel')) {
                $popSelect.removeClass('show');
            } else if ($target.prop('tagName') === 'LI') {
                selectWrap
                    .find('select')
                    .val($target.attr('data-value'));
                $popSelect.removeClass('show');
            }
        });
    }
  }


  function Plugin(option) {
    return this.each(function () {
        var $this = $(this);
        var data = $this.data('pop.select')
        var options = typeof option == 'object' && option

        if (!data) $this.data('pop.select', (data = new PopSelect(this, options)));
        if (typeof option == 'string') data[option]()
    });
  }

  var old = $.fn.PopSelect;

  $.fn.PopSelect             = Plugin;
  $.fn.PopSelect.Constructor = PopSelect;

  $.fn.PopSelect.noConflict = function () {
    $.fn.PopSelect = old;
    return this;
  }
}(jQuery);
