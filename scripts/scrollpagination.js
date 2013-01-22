/*
 **  Anderson Ferminiano
 **  contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
 **  jQuery ScrollPagination
 **  28th/March/2011
 **  http://andersonferminiano.com/jqueryscrollpagination/
 **  You may use this script for free, but keep my credits.
 **  Thank you.
 */ (function ($) {


  $.fn.scrollPagination = function (options) {

    var opts = $.extend($.fn.scrollPagination.defaults, options);
    var target = opts.scrollTarget;
    if (target == null) {
      target = obj;
    }
    opts.scrollTarget = target;

    return this.each(function () {
      $.fn.scrollPagination.init($(this), opts);
    });

  };

  $.fn.startScrollPagination = function () {
    return this.each(function () {
      $(this).prop('scrollPagination', true).trigger('scrollPaginationLoadContent');
    });
  };

  $.fn.stopScrollPagination = function () {
    return this.each(function () {
      $(this).prop('scrollPagination', false);
    });
  };

  $.fn.scrollPagination.loadContent = function (obj, opts) {
    var target = opts.scrollTarget;
    var mayLoadContent = $(target).scrollTop() + opts.heightOffset >= $(document).height() - $(target).height();
    if (mayLoadContent) {
      if (opts.beforeLoad != null) {
        opts.beforeLoad();
      }
      $(obj).children().attr('rel', 'loaded');
      contentData = opts.contentData;
      if ($.isFunction(contentData)) {
        contentData = opts.contentData();
      }
      $.ajax({
        type: 'POST',
        url: opts.contentPage,
        data: contentData,
        success: function (data) {
          opts.onSuccess(obj, data);
          var objectsRendered = $(obj).children('[rel!=loaded]');
          if (opts.afterLoad != null) {
            opts.afterLoad(objectsRendered);
          }
        },
        dataType: opts.dataType
      });
    }

  };

  $.fn.scrollPagination.init = function (obj, opts) {
    var target = opts.scrollTarget;

    $(obj).bind('scrollPaginationLoadContent', function () {
      $.fn.scrollPagination.loadContent($(this), opts);
    });

    $(target).scroll(function (event) {
      if ($(obj).prop('scrollPagination')) {
        $.fn.scrollPagination.loadContent(obj, opts);
      } else {
        event.stopPropagation();
      }
    });

    $(obj).startScrollPagination();
  };

  $.fn.scrollPagination.defaults = {
    'contentPage': null,
    'contentData': {},
    'beforeLoad': null,
    'afterLoad': null,
    'scrollTarget': null,
    'heightOffset': 0,
    'dataType': 'html',
    'onSuccess': function (obj, data) {
      $(obj).append(data);
    }
  };
})(jQuery);
