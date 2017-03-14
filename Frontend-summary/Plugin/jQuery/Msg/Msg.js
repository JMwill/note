var App = {};
+(function (App, $) {
    var PopMsg = function (el, options) {
        this.el = $(el);
        this.init(el, options);
    };

    PopMsg.TRANSITION_DURATION = 1500;
    PopMsg.prop = {};
    PopMsg.DEFAULT = {
        trigger: 'click',
        tmpl:
            '<div class="pop-msg">'
                + '<p class="pop-msg-title"></p>'
                + '<p class="pop-msg-content"></p>'
            + '</div>'
    };

    PopMsg.prototype.show = function (setting) {
        var title = setting.title || '';
        var content = setting.content || '';
        var $msg = PopMsg.prop.MSGBOX;
        $msg
            .find('.pop-msg-title')
            .html(title)
            .end()
            .find('.pop-msg-content')
            .html(content)
            .end()
            .addClass('show')
            .css({
                'margin-top': parseInt($msg.height() / -2),
                'margin-left': parseInt($msg.width() / -2)
            });
        this.hide();
    }

    PopMsg.prototype.hide = function (setting) {
        var timeout = (setting && setting.timeout) || PopMsg.TRANSITION_DURATION;
        clearTimeout(PopMsg.prop.animating);
        PopMsg.prop.animating = setTimeout(function () {
            PopMsg.prop.MSGBOX.removeClass('show');
        }, timeout);
    };

    PopMsg.prototype.init = function (el, opt) {
        var $el = this.el;
        var $that = this;
        options = {};
        $.extend(options, PopMsg.DEFAULT, opt || {});

        if (!PopMsg.prop.MSGBOX) {
            PopMsg.prop.MSGBOX = $(options.tmpl);
            $('body').append(PopMsg.prop.MSGBOX);
        }
        if ($el.length) {
            $el.on(options.trigger, function () {
                $that.show(options);
            });
        }
    }

    // function Plugin(option) {
    //     return this.each(function () {
    //         var $this = $(this);
    //         var data = $this.data('pop.msg');
    //         var options = typeof option == 'object' && option;

    //         if (!data) $this.data('pop.msg', (data = new PopMsg(this, options)));
    //         if (typeof option == 'string') data[option]();
    //     });
    // }

    // var old = $.fn.PopMsg;
    // $.fn.PopMsg             = Plugin;
    // $.fn.PopMsg.Constructor = PopMsg;

    // $.fn.PopMsg.noConflict = function () {
    //     $.fn.PopMsg = old;
    //     return this;
    // }
    App.PopMsg = function (el, options) {
        return new PopMsg(el, options)
    };
}(App, jQuery));
