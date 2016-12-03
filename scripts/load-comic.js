setTimeout(function () {
//    window.location.hash = "#30";
}, 3000);



function Load_Comic(e) {

    var last_updated_url_hash;
    var scroll_to_top_button = document.getElementById("scroll-to-top");

    /**
     * Class constructor.
     */
    var __construct = function() {

        // Replace body class
        replace_body_class( "comic" );

        // Get current page number, and add all pages up to that point
        var hash = window.location.hash;

        var current_page_number;
        if ( "" == hash ) {
            current_page_number = 1;
        } else {
            current_page_number = hash.replace("#", "");
        }

        for (ix = 0; ix < current_page_number; ix++) {
            this.maybe_add_new_page( true );
        }

        // Add scroll-to-top button if not already present
        var primary_menu =  document.getElementById("primary-menu");
        var key;

        for (key in primary_menu.childNodes) {

            // Bail out if key not numeric
            if ( isNaN( key ) ) {
                break;
            }

            if ( "scroll-to-top" == primary_menu.childNodes[key]["id"] ) {
                var scroll_button_present = true;
            }
        };


        if (typeof(scroll_button_present) == "undefined") {

            // Add scroll to top button
            var scroll_to_top_button = document.createElement("a");
            scroll_to_top_button.href = "#";
            scroll_to_top_button.id = "scroll-to-top";
            scroll_to_top_button.innerHTML = "Scroll to top";
            document.getElementById("primary-menu").appendChild(scroll_to_top_button);

        }
        scroll_to_top_button = document.getElementById("scroll-to-top");

        var self = this;

        // Run actions on scrolling
        document.onscroll = function() {
            self.maybe_add_new_page();

            // Show scroll to top button
            var current_distance_from_top = document.body.scrollTop;
            if ( 20 < current_distance_from_top ) {
                scroll_to_top_button.style.display = "block";
            } else {
                scroll_to_top_button.style.display = "none";
            }

            // Add new pages on scrolling
            current_page_number = self.get_current_page_number();
            if ( last_updated_url_hash != current_page_number) {
                last_updated_url_hash = current_page_number;
                self.set_page_url(current_page_number);
            }

            // Store current page number for later use
            var comic_slug = get_current_comic_slug( get_primary_language() );
            localStorage.setItem( comic_slug, current_page_number );
        };

        // If hash exists, then scroll to the hash once it's image has loaded (important to only do it after the image has loaded, because otherwise it'll have nowhere to scroll to)
        var hash = window.location.hash;
        if ( "" != hash ) {
            var img_to_scroll_to = document.getElementById( hash.replace( "#", "" ) );

            img_to_scroll_to.onload = function () {
                img_to_scroll_to.scrollIntoView();
            }

        }

    }

    this.comicjet_image_preload = function( args, callback ) {
      "use strict";

        var imgs = args["imgs"];
        var page_number = args["page_number"];

        var loaded = 0;
        var images = [];
        imgs = Object.prototype.toString.apply( imgs ) === "[object Array]" ? imgs : [imgs];
        var inc = function() {
            loaded += 1;
            if ( loaded === imgs.length && callback ) {
                callback( args );
            }
        };
        for ( var i = 0; i < imgs.length; i++ ) {
            images[i] = new Image();
            images[i].onabort = inc;
            images[i].onerror = inc;
            images[i].onload = inc;
            images[i].src = imgs[i];
        }
    }

    /**
     * Add a new page if required.
     *
     * @param  int  page_number  The page number to add
     */
    this.add_new_page = function(page_number) {

        // Add new list item with image
        var li_node = document.createElement("li");
        var img_node = document.createElement("img");
        img_node.className = "comic-page";
        var new_li = document.getElementById("comic").appendChild(li_node);

        var new_img = new_li.appendChild(img_node);


        // Add tutorial message
        var span_node = document.createElement("span");
        span_node.className = "tutorial-blob";
        tutorial_blob_text( span_node );
        var new_span_node = new_li.appendChild(span_node);


        var primary_image_url = comics_folder_url+get_current_comic_slug("en")+"/"+page_number+"-"+get_secondary_language()+".jpg";
        var secondary_image_url = comics_folder_url+get_current_comic_slug("en")+"/"+page_number+"-"+get_primary_language()+".jpg";

        new_img.style.width = "20%";
        new_img.src = home_url+"images/loading.gif";
        new_img.id = page_number;
        var args = [];
        args["imgs"] = [primary_image_url, secondary_image_url];
        args["page_number"] = page_number;
        args["new_image"] = new_img;

        this.comicjet_image_preload( args, function(args) {
            var new_image = args["new_image"];
            var primary_image_url = comics_folder_url+get_current_comic_slug("en")+"/"+page_number+"-"+get_secondary_language()+".jpg";
            new_image.style.width = "100%";
            new_image.src = primary_image_url;
        } );

        // Add page counter
        var page_count = document.createElement("div");
        page_count.innerHTML = "<strong>"+page_number+"</strong>/"+get_total_page_count(get_current_comic_slug("en"));
        page_count.className = "page-counter";
        new_li.appendChild(page_count);

    }

    /**
     * Add a new page if required.
     */
    this.maybe_add_new_page = function(load_to_specific_anchor) {

        if ( load_to_specific_anchor != true) {
            load_to_specific_anchor = false;
        }

        if ( "comic" != get_page_type() ) {
            return;
        }

        var all_existing_pages = document.getElementById("comic");

        var list_items = all_existing_pages.getElementsByTagName("li");
        var lis = Array.prototype.slice.call(list_items); // Convert to array

        if ( 0 == lis.length ) {
            this.add_new_page(1);
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
                    this.add_new_page(length + 2);
                }

            }
        }
    }

    /**
     * Set the current page URL.
     * URL is based on the page number we are at.
     */
    this.get_current_page_number = function() {

        if ( "comic" != get_page_type() ) {
            return;
        }

        var all_existing_pages = document.getElementById("comic");
        list_items = all_existing_pages.getElementsByTagName("li");
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
    this.set_page_url = function(current_page_number) {

        if ( "comic" != get_page_type() ) {
            return;
        }

        var hash = window.location.hash.substring(1);
        if ( hash != current_page_number ) { // Making sure we do not hammer pushState unnecessarily
            var string = "/"+get_primary_language()+"/"+get_secondary_language()+"/"+get_current_comic_slug()+"/";
            if ( is_number(current_page_number) ) {
                string = string + "#" + current_page_number;
            }
            window.history.pushState(null, null, string);
        }
    }

    __construct();
}
