function comic_test() {

	if ( 'undefined' != typeof get_current_comic() ) {

		// Set the page title
		document.getElementById('site-title').innerHTML = get_current_comic().name[get_primary_language()];

		// Reset the page content
		document.getElementById('page-content').innerHTML = '<ol id="comic"></ol>';

		var thecomic = document.getElementById('comic');
		thecomic.innerHTML = '';

	}



	// Get current page number, and add all pages up to that point
	var hash = window.location.hash
	if ( '' == hash ) {
		var current_page_number = 1;
	} else {
		var current_page_number = hash.replace('#', '');
	}

	for (i = 0; i < current_page_number; i++) {
		console.log('Number: '+i);
		maybe_add_new_page( true );
	}





//	Load_Comic();

	// Preventing page reload
	if ( 'undefined' != typeof event ) {
		event.preventDefault();
	}

}


/**
 * Add a new page if required.
 */
function maybe_add_new_page(load_to_specific_anchor = false) {

console.log(get_page_type());
//	if ( 'comic' != get_page_type() ) {
		return;
//	}

	var all_existing_pages = document.getElementById('comic');

	var list_items = all_existing_pages.getElementsByTagName('li');
	var lis = Array.prototype.slice.call(list_items); // Convert to array

	if ( 0 == lis.length ) {
//		add_new_page(1);
	} else {
		var number_of_pages = get_current_comic().pages;
		var number_already_displayed = lis.length;

		if ( number_already_displayed < number_of_pages ) {

			var length = lis.length - 1; // Need to subtract 1 because the array starts at 0
			var last_page = lis[length];
			var rect = last_page.getBoundingClientRect();
			var distance_of_last_page_from_top = rect.top + document.body.scrollTop;
			var current_distance_from_top = document.body.scrollTop + window.innerHeight;

			// If the distance of the last page from the top is less than the current distance from the top, then add a new page
			if (
				true == load_to_specific_anchor // Allows for loading everything up until the specified anchor
				||
				( distance_of_last_page_from_top < current_distance_from_top )
			) {
//				add_new_page(length + 2);
			}

		}
	}

}

function add_new_page() {
	console.log('add new page');
	return;
}
