
document.body.addEventListener("click", function (e) {

	// Select a comic
	var the_comics = document.getElementsByClassName('block-inner');
	for (var key in the_comics) {

		// Bail out if key not numeric
		if ( isNaN( key ) ) {
			break;
		}

		var the_comic_id = the_comics[key]['id']
		if (
			( typeof e.target.id != 'undefined' && the_comic_id == e.target.id )
			||
			( typeof e.target.id != 'undefined' && the_comics[key].parentNode.id == e.target.id )
		) {

			// Get URL base - Note: this should probably be simplified by combinging with code in index.php
			if ( '' != get_primary_language_cookie() && '' != get_secondary_language_cookie() ) {

				// Redirect based on cookies
				var string = get_primary_language_cookie()+'/'+get_secondary_language_cookie()+'/';

			} else {

				// Redirect based on the browsers language setting
				var browser_language = navigator.language;
				var german_languages = ['de-AT', 'de-DE', 'de-LI', 'de-LU', 'de-CH'];
				var result = german_languages.indexOf(browser_language);
				if ( 0 == result ) {
					var string = 'de/en/';
				} else {
					var string = 'en/de/';
				}

			}

			string = home_url+string+the_comics[key].parentNode.id+'/';
			window.history.pushState(null, null, string);

			refresh_comic();
		}

	}

	// Scroll to top link
	if ( typeof e.target.id != 'undefined' && 'scroll-to-top' == e.target.id ) {

		window.scrollTo(0, 0);

		// Preventing form submission
		event.preventDefault();
	}

	// Legal notice link
	if ( typeof e.target.id != 'undefined' && 'legal-notice' == e.target.id ) {
		var url = home_url+'legal-notice/';

		window.history.pushState(null, null, url);

		legal_notice_page();

		window.scrollTo(0, 0);

		// Preventing form submission
		event.preventDefault();
	}

	// Home page links
	if ( typeof e.target.id != 'undefined' && ( 'header-link' == e.target.id || 'footer-link' == e.target.id ) ) {
		var url = home_url+get_primary_language_cookie()+'/'+get_secondary_language_cookie()+'/';

		window.history.pushState(null, null, url);

		home_page();

		window.scrollTo(0, 0);

		// Preventing form submission
		event.preventDefault();
	}

	// Language switcher button functionality
	if ( typeof e.target.id != 'undefined' && 'learn-english' == e.target.id ) {
		var switch_language = '/de/en/';
		set_primary_language_cookie( 'de' );
		set_secondary_language_cookie( 'en' );
	} else if ( typeof e.target.id != 'undefined' && 'learn-german' == e.target.id ) {
		var switch_language = '/en/de/';
		set_primary_language_cookie( 'en' );
		set_secondary_language_cookie( 'de' );
	}
	if ( typeof switch_language != 'undefined' ) {

		// Set the home links
		set_home_links();

		window.history.pushState(null, null, switch_language);

		home_page();

		// Preventing form submission
		event.preventDefault();
	}

	// Change the comic language
	if ( e.target && e.target.nodeName == 'IMG' && 'comic-page' == e.target.className ) {
		var img = e.target;
		var id = e.target.id;''
		var src = e.target.src;
		var end_of_file = src.substr(src.length - 7);

		if ( '-'+get_secondary_language()+'.jpg' == end_of_file ) {
			var new_language = get_primary_language();
		} else if ( '-'+get_primary_language()+'.jpg' == end_of_file ) {
			var new_language = get_secondary_language();
		}

		var comic_slug = get_current_comic().slug['en'];
		img.src = comics_folder_url+comic_slug+'/'+id+'-'+new_language+'.jpg';

	}

});
