
function Class_Scroll(e) {

	var last_updated_url_hash;
	var scroll_to_top_button = document.getElementById('scroll-to-top');

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
			this.maybe_add_new_page( true );
		}

		// Add scroll-to-top button if not already present
		var primary_menu =  document.getElementById('primary-menu');
		for (var key in primary_menu.childNodes) {

			// Bail out if key not numeric
			if ( isNaN( key ) ) {
				break;
			}

			if ( 'scroll-to-top' == primary_menu.childNodes[key]['id'] ) {
				var scroll_button_present = true;
			}
		}
		if (typeof(scroll_button_present) == 'undefined' ) {

			// Add scroll to top button
			var scroll_to_top_button = document.createElement('a');
			scroll_to_top_button.href = '#';
			scroll_to_top_button.id = 'scroll-to-top';
			scroll_to_top_button.innerHTML = 'Scroll to top';
			document.getElementById('primary-menu').appendChild(scroll_to_top_button);

		}
		scroll_to_top_button = document.getElementById('scroll-to-top');

		// Run actions on scrolling
		document.onscroll = function() {
			this.maybe_add_new_page();

			// Show scroll to top button
			var current_distance_from_top = document.body.scrollTop;
			console.log(current_distance_from_top);
			if ( 20 < current_distance_from_top ) {
				scroll_to_top_button.style.display = 'block';
			} else {
				scroll_to_top_button.style.display = 'none';
			}

			// Add new pages on scrolling
			current_page_number = this.get_current_page_number();
			if ( last_updated_url_hash != current_page_number) {
				last_updated_url_hash = current_page_number;
				this.set_page_url(current_page_number);
			}
		};

	}

	/**
	 * Add a new page if required.
	 *
	 * @param  int  page_number  The page number to add
	 */
	this.add_new_page = function (page_number) {

		// Add new list item with image
		var li_node = document.createElement('li');
		var img_node = document.createElement('img');
		var new_li = document.getElementById('comic').appendChild(li_node);
		var new_img = new_li.appendChild(img_node);
		var comic_slug = comic.slug['en'];
		new_img.src = comics_folder_url+comic_slug+'/'+page_number+'-'+get_secondary_language()+'.jpg';
		new_img.id = page_number;

		// Add page counter
		var page_count = document.createElement('div');
		page_count.innerHTML = '<strong>'+page_number+'</strong>/'+get_total_page_count(comic_slug);
		page_count.className = 'page-counter';
		new_li.appendChild(page_count);

	}

	/**
	 * Add a new page if required.
	 */
	this.maybe_add_new_page = function (load_to_specific_anchor = false) {
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
				if (
					true == load_to_specific_anchor // Allows for loading everything up until the specified anchor
					||
					( distance_of_last_page_from_top < current_distance_from_top )
				) {
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
			var comic_slug = comic.slug[get_primary_language()];
			var string = '/'+get_primary_language()+'/'+get_secondary_language()+'/'+comic_slug;
			if ( is_number(current_page_number) ) {
				string = string + '#' + current_page_number;
			}
			window.history.pushState(null, null, string);
		}
	}

	__construct();
}
