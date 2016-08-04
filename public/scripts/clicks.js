
document.getElementById('page-content').addEventListener("click", function (e) {

	// Change language
	if(e.target && e.target.id == 'select-language') {

		// Preventing form submission
		event.preventDefault();

		var primary_language = document.getElementById('language1').value;
		var secondary_language = document.getElementById('language2').value;

		var string = '/'+primary_language+'/'+secondary_language+'/';

		window.history.pushState(null, null, string);

		home_page();

	}

	// Change the comic language
	if(e.target && e.target.nodeName == 'IMG') {

		var img = e.target;
		var id = e.target.id;''
		var src = e.target.src;

		var end_of_file = src.substr(src.length - 7);

		if ( '-'+get_secondary_language()+'.jpg' == end_of_file ) {
			var new_language = get_primary_language();
		} else if ( '-'+get_primary_language()+'.jpg' == end_of_file ) {
			var new_language = get_secondary_language();
		}

		var comic_slug = comic.slug['en'];

		img.src = comics_folder_url+comic_slug+'/'+id+'-'+new_language+'.jpg';

	}

});
