
/**
 * Reset the page content.
 * Used for shifting between comics and the home page.
 */
function refresh_content() {

	// Set the page title
	document.getElementById('site-title').innerHTML = comic.name[get_primary_language()];

	// Reset the page content
	document.getElementById('page-content').innerHTML = '<ol id="comic"></ol>';
	var thecomic = document.getElementById('comic');
	thecomic.innerHTML = '';
	Class_Scroll();
}

/**
 * Get a query var from URL.
              ==== used in both current JS files
 */
function get_query_var(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * If is number.
 */
function is_number(obj) {
	return !isNaN(parseFloat(obj));
}

/**
 * Get primary language.
 */
function get_primary_language() {
	var current_url = window.location.pathname.split( '/' );
	if ( '-1' != available_languages.indexOf(current_url[1]) ) {
		var primary_language = current_url[1];
	}

	return primary_language;
}

/**
 * Get secondary language.
 */
function get_secondary_language() {
	var current_url = window.location.pathname.split( '/' );
	if ( '-1' != available_languages.indexOf(current_url[2]) ) {
		var secondary_language = current_url[2];
	}

	return secondary_language;
}

/**
 * Set home link URLs.
 */
function set_home_links() {

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



	document.getElementById('header-link').href = home_url+string;
	document.getElementById('footer-link').href = home_url+string;
}

/**
 * Get total page count for a specific comic.
 */
function get_total_page_count(comic_slug) {

	for (i = 0; i < comics.length; i++) { 
		if (comic_slug == comics[i].slug['en']) {
			pages = comics[i].pages;
			return pages;
		}
	}

}

/**
 * Set the primary language cookie.
 *
 * @param  string  The primary language to be set
 */
function set_primary_language_cookie(language) {
	setCookie('primary_lang',language,365);
}

/**
 * Set the secondary language cookie.
 *
 * @param  string  The secondary language to be set
 */
function set_secondary_language_cookie(language) {
	setCookie('secondary_lang',language,365);
}

/**
 * Get the primary language cookie.
 */
function get_primary_language_cookie() {
	return getCookie('primary_lang');
}

/**
 * Get the secondary language cookie.
 */
function get_secondary_language_cookie() {
	return getCookie('secondary_lang');
}

function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function eraseCookie(name) {
	setCookie(name,"",-1);
}
