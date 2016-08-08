function root_page() {

	if ( '' != get_primary_language_cookie() && '' != get_secondary_language_cookie() ) {

		// Redirect based on cookies
		var string = '/'+get_primary_language_cookie()+'/'+get_secondary_language_cookie()+'/';

	} else {

		// Redirect based on the browsers language setting
		var browser_language = navigator.language;
		var german_languages = ['de-AT', 'de-DE', 'de-LI', 'de-LU', 'de-CH'];
		var result = german_languages.indexOf(browser_language);
		if ( 0 == result ) {
			var string = '/de/en/';
		} else {
			var string = '/en/de/';
		}

	}

	window.history.pushState(null, null, string);
	home_page();
}
