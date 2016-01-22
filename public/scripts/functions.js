
/**
 * Reset the page content.
 * Used for shifting between comics and the home page.
 */
function refresh_content() {

	// Set the page title
	document.getElementById('site-title').innerHTML = comic.name[primary_language];

	// Reset the page content
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
