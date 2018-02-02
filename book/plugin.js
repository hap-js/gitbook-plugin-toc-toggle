require(["gitbook", "jQuery"], function(gitbook, $) {

  function expand(chapter) {
    chapter.show();

    if (chapter.parent().attr('class') != 'summary' &&
      chapter.parent().attr('class') != 'book-summary' &&
      chapter.length != 0
    ) {
      expand(chapter.parent());
    }
	}
	

	function bindEvent(target) {
		$('li.chapter').find('ul.articles').hide();
    $children = target.children('ul.articles');
    $children = $children.length > 0 ? $children : target.children('span').children('ul.articles');
		
    expand(target);

    if ($children.length > 0) {
      $children.show();
    }
	}

  gitbook.events.bind("page.change", function() {
    
		var $chapter = $('li.chapter.active');
    bindEvent($chapter)
	});

	$(function() {
    $(document).on('click', 'a', function(event){
        if($(this).attr('href')=='./'){
          location.reload(true);
        }
    });

		$(document).on('click', 'span', function(event){
      event.stopPropagation();
			$('li.chapter.active').removeClass('active')
			var $active = $(event.target).closest('.chapter').addClass('active')
			bindEvent($active)
		})
	})
})