
function Class_Scroll(e) {

	/**
	 * Class constructor.
	 */
	var __construct = function () {

		// Get current page number, and add all pages up to that point
		var hash = window.location.hash
		if ( '' == hash ) {
			var current_page_number = 1;
		} else {
			var current_page_number = hash.replace('#', '');
		}
		for (i = 0; i < current_page_number; i++) {
			this.maybe_add_new_page();
		}

		// Add new pages on scrolling.
		document.onscroll = function() {
			this.maybe_add_new_page();

			current_page_number = this.get_current_page_number();
			this.set_page_url(current_page_number);
		};
	}

	/**
	 * Add a new page if required.
	 *
	 * @param  int  page_number  The page number to add
	 */
	this.add_new_page = function (page_number) {
		var li_node = document.createElement('li');
		var img_node = document.createElement('img');
		var new_li = document.getElementById('comic').appendChild(li_node);
		var new_img = new_li.appendChild(img_node);
		var comic_slug = comic.slug['en'];
		new_img.src = comics_folder_url+comic_slug+'/'+page_number+'-'+primary_language+'.jpg';
		new_img.id = page_number;
	}

	/**
	 * Add a new page if required.
	 */
	this.maybe_add_new_page = function () {
		var all_existing_pages = document.getElementById('comic');

		var list_items = all_existing_pages.getElementsByTagName('li');
		var lis = Array.prototype.slice.call(list_items); // Convert to array

		if ( 0 == lis.length ) {
			this.add_new_page(1);
		} else {
			var number_of_pages = comic.pages;
			var number_already_displayed = lis.length;

			if ( number_already_displayed < number_of_pages ) {

				var length = lis.length - 1; // Need to subtract 1 because the array starts at 0
				var last_page = lis[length];
				var rect = last_page.getBoundingClientRect();
				var distance_of_last_page_from_top = rect.top + document.body.scrollTop;
				var current_distance_from_top = document.body.scrollTop + window.innerHeight;

				// If the distance of the last page from the top is less than the current distance from the top, then add a new page
				if ( distance_of_last_page_from_top < ( current_distance_from_top ) ) {
					this.add_new_page(length + 2);
				}

			}
		}
	}

	/**
	 * Set the current page URL.
	 * URL is based on the page number we are at.
	 */
	this.get_current_page_number = function () {
		var all_existing_pages = document.getElementById('comic');
		list_items = all_existing_pages.getElementsByTagName('li');
		lis = Array.prototype.slice.call(list_items); // Convert to array

		for (i = 0; i < list_items.length; i++) {

			var rect = lis[i].getBoundingClientRect();
			var distance_from_top = rect.top + document.body.scrollTop;

			var current_distance_from_top = document.body.scrollTop + window.innerHeight;

			// If If the distance of the last page from the top is less than the current distance from the top, then add a new page
			if ( distance_from_top < ( current_distance_from_top ) ) {
				current_page_number = i + 1;
			}

		}

		return current_page_number;
	}

	/**
	 * Set the current page URL.
	 * URL is based on the page number we are at.
	 *
	 * Note: This is not very performant. 
	 *       Changing the hash causes graphical glitches.
	 */
	this.set_page_url = function (current_page_number) {
		var hash = window.location.hash.substring(1);
		if ( hash != current_page_number ) { // Making sure we don't hammer pushState unnecessarily
			var comic_slug = comic.slug[primary_language];
			var string = '/'+primary_language+'/'+secondary_language+'/'+comic_slug;
			if ( is_number(current_page_number) ) {
				string = string + '#' + current_page_number;
			}
			window.history.pushState(null, null, string);
		}
	}

	__construct();
}
document.addEventListener("DOMContentLoaded", Class_Scroll );
