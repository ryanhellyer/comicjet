
document.getElementById('comic').addEventListener("click", function (e) {
	// Change the comic language
	if(e.target && e.target.nodeName == "IMG") {

		var img = e.target;
		var id = e.target.id;''
		var src = e.target.src;

		var end_of_file = src.substr(src.length - 7);

		if ( '-'+secondary_language+'.jpg' == end_of_file ) {
			var new_language = primary_language;
		} else if ( '-'+primary_language+'.jpg' == end_of_file ) {
			var new_language = secondary_language;
		}

		var comic_slug = comic.slug['en'];

		img.src = comics_folder_url+comic_slug+'/'+id+'-'+new_language+'.jpg';

	}

});

document.getElementById('primary-menu').addEventListener("click", function (e) {

	// Change the comic language
	if(e.target && e.target.nodeName == "A") {
		primary_language = e.target.parentNode.getAttribute('primary-language');
		secondary_language = e.target.parentNode.getAttribute('secondary-language');

		// Get current page number, and add all pages up to that point
		var hash = window.location.hash
		if ( '' == hash ) {
			var current_page_number = 1;
		} else {
			var current_page_number = hash.replace('#', '');
		}
		var comic_slug = comic.slug[primary_language];

		window.history.pushState(null, null, 'index.html'+'?comic='+comic_slug+'&primary_language='+primary_language+'&secondary_language='+secondary_language+'#'+current_page_number);


		refresh_content();

	}

});