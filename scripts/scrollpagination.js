/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
**  fork by DivXPro.
*/

(function( $ ){
	 
		 
 $.fn.scrollPagination = function(options) {
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;
	 
		return this.each(function() {
		  $.fn.scrollPagination.init($(this), opts);
		});

  };
  
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });
	  
  };
  
  $.fn.scrollPagination.loadContent = function(obj, opts){
  	 if ($(obj).prop('scrollPaginationOnLoading')){
         return;
     }

	 var target = opts.scrollTarget;
	 var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
	 if (mayLoadContent){
	 	 $(obj).prop('scrollPaginationOnLoading', true);

		 if (opts.beforeLoad != null){
			opts.beforeLoad(); 
		 }
		 $(obj).children().attr('rel', 'loaded');
		 $.ajax({
			  type: opts.method,
			  url: opts.contentPage,
			  data: opts.contentData,
			  success: function(data){
			  	$(obj).prop('scrollPaginationOnLoading', false);

			  	if (opts.dataType == 'html'){
			  		$(obj).append(data); 
					var objectsRendered = $(obj).children('[rel!=loaded]');
					if (opts.afterLoad != null){
						opts.afterLoad(objectsRendered);	
					}
			  	} else if (opts.dataType == 'json') {
			  		if (opts.afterLoad != null){
			  			opts.afterLoad(data);
			  		}
			  	}
			  },
			  error: function(){
			  	if(opts.errorLoad != null){
			  		opts.errorLoad();
			  	}
			  },
			  dataType: opts.dataType
		 });
	 }
	 
  };
  
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;
	 $(obj).attr('scrollPagination', 'enabled');
	 $(obj).prop('scrollPaginationOnLoading', false);

	 $(target).scroll(function(event){
		if ($(obj).attr('scrollPagination') == 'enabled'){
	 		$.fn.scrollPagination.loadContent(obj, opts);		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 
	 $.fn.scrollPagination.loadContent(obj, opts);
	 
 };
	
 $.fn.scrollPagination.defaults = {
      	 'contentPage' : null,
     	 'contentData' : {},
		 'beforeLoad': null,
		 'afterLoad': null,
		 'errorLoad': null,
		 'scrollTarget': null,
		 'heightOffset': 0,
		 'method': 'GET',
		 'dataType': 'html'	  
 };	
})( jQuery );