
var home_url = "http://dev.comicjet.com/";

/**
 * Reset the page content.
 * Used for shifting between comics and the home page.
 */
function refresh_comic() {

    if ( "undefined" != typeof get_current_comic() ) {

        // Set the page title
        document.getElementById("site-title").innerHTML = get_current_comic().name[get_primary_language()];

        // Reset the page content
        document.getElementById("page-content").innerHTML = "<ol id='comic'></ol>";

        var thecomic = document.getElementById("comic");
        thecomic.innerHTML = "";

    }

    Load_Comic();

    // Preventing page reload
    if ( "undefined" != typeof event ) {
        event.preventDefault();
    }
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
    var current_url = window.location.pathname.split( "/" );
    if ( "-1" != available_languages.indexOf(current_url[1]) ) {
        var primary_language = current_url[1];
    }

    return primary_language;
}

/**
 * Get secondary language.
 */
function get_secondary_language() {
    var current_url = window.location.pathname.split( "/" );
    if ( "-1" != available_languages.indexOf(current_url[2]) ) {
        var secondary_language = current_url[2];
    }

    return secondary_language;
}

/**
 * Get the current home link URL.
 */
function get_home_link_url() {
    if ( "" != get_primary_language_cookie() && "" != get_secondary_language_cookie() ) {

        // Redirect based on cookies
        var string = get_primary_language_cookie()+"/"+get_secondary_language_cookie()+"/";

    } else {

        // Redirect based on the browsers language setting
        var browser_language = navigator.language;
        var german_languages = ["de-AT", "de-DE", "de-LI", "de-LU", "de-CH"];
        var result = german_languages.indexOf(browser_language);
        if ( 0 == result ) {
            var string = "de/en/";
        } else {
            var string = "en/de/";
        }

    }

    return home_url+string;
}

/**
 * Set home link URLs.
 */
function set_home_links() {


    document.getElementById("header-link").href = get_home_link_url();
    document.getElementById("footer-link").href = get_home_link_url();
}

/**
 * Get total page count for a specific comic.
 */
function get_total_page_count(comic_slug) {

    for (i = 0; i < comics.length; i++) { 
        if (comic_slug == comics[i].slug["en"]) {
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
    setCookie("primary_lang",language,365);
}

/**
 * Set the secondary language cookie.
 *
 * @param  string  The secondary language to be set
 */
function set_secondary_language_cookie(language) {
    setCookie("secondary_lang",language,365);
}

/**
 * Get the primary language cookie.
 */
function get_primary_language_cookie() {
    return getCookie("primary_lang");
}

/**
 * Get the secondary language cookie.
 */
function get_secondary_language_cookie() {
    return getCookie("secondary_lang");
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

/**
 * Get the current comic slug.
 */
function get_current_comic_slug(language = null) {
    var current_url_chunks = window.location.pathname.split( "/" );
    var current_slug = current_url_chunks[3];

    for (i = 0; i < comics.length; i++) { 
        slugs = comics[i].slug;
        slug = slugs[get_primary_language()];
        if ( current_slug == slug ) {
            if ( null != language ) {
                comic_slug = slugs[language];
            } else {
                var comic_slug = slug;
            }
        }
    }

    return comic_slug;
}

/**
 * Get the current comic object.
 */
function get_current_comic() {
    var current_url_chunks = window.location.pathname.split( "/" );
    var current_slug = current_url_chunks[3];
    for (i = 0; i < comics.length; i++) { 
        slugs = comics[i].slug;
        slug = slugs[get_primary_language()];
        if ( current_slug == slug ) {
            var comic = comics[i];
        }
    }

    return comic;
}

/**
 * Get page type (home, legal-notice, comic etc).
 */
function get_page_type() {

    var current_url = window.location.pathname.split( "/" );
    if ( "/" == window.location.pathname ) {
        return "root";
    } else if ( "/"+get_primary_language()+"/"+get_secondary_language()+"/" == window.location.pathname ) {
        return "home";
    } else if ( "/legal-notice/" == window.location.pathname ) {
        return "legal-notice";
    } else if (
        'undefined' == typeof get_current_comic()
        ||
        ( "-1" == available_languages.indexOf(current_url[1]) )
        ||
        ( "-1" == available_languages.indexOf(current_url[2]) )
    ) {
        return "404";
    } else {
        return "comic";
    }

}

/**
 * Clean non comic pages.
 */
function clean_non_comic_pages() {

    // Remove scroll to top button
    var scroll_to_top = document.getElementById("scroll-to-top");
    if ( null != scroll_to_top ) {
        scroll_to_top.remove();
    }

    // Translate stuff
    translate_page();
}

function Load_Comic(e) {

    var last_updated_url_hash;
    var scroll_to_top_button = document.getElementById("scroll-to-top");

    /**
     * Class constructor.
     */
    var __construct = function() {

        // Get current page number, and add all pages up to that point
        var hash = window.location.hash
        if ( "" == hash ) {
            var current_page_number = 1;
        } else {
            var current_page_number = hash.replace("#", "");
        }

        for (i = 0; i < current_page_number; i++) {
            this.maybe_add_new_page( true );
        }

        // Add scroll-to-top button if not already present
        var primary_menu =  document.getElementById("primary-menu");
        for (var key in primary_menu.childNodes) {

            // Bail out if key not numeric
            if ( isNaN( key ) ) {
                break;
            }

            if ( "scroll-to-top" == primary_menu.childNodes[key]["id"] ) {
                var scroll_button_present = true;
            }
        }
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

        };

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
    this.maybe_add_new_page = function(load_to_specific_anchor = false) {
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
            var string = "/"+get_primary_language()+"/"+get_secondary_language()+"/"+get_current_comic_slug();
            if ( is_number(current_page_number) ) {
                string = string + "#" + current_page_number;
            }
            window.history.pushState(null, null, string);
        }
    }

    __construct();
}

document.body.addEventListener("click", function (e) {

    // Select a comic
    var the_comics = document.getElementsByClassName('block-inner');
    for (var key in the_comics) {

        // Bail out if key not numeric
        if ( isNaN( key ) ) {
            break;
        }

        var the_comic_id = the_comics[key]["id"]
        if (
            ( typeof e.target.id != "undefined" && the_comic_id == e.target.id )
            ||
            ( typeof e.target.id != "undefined" && the_comics[key].parentNode.id == e.target.id )
        ) {

            // Get URL base - Note: this should probably be simplified by combinging with code in index.php
            if ( "" != get_primary_language_cookie() && "" != get_secondary_language_cookie() ) {

                // Redirect based on cookies
                var string = get_primary_language_cookie()+"/"+get_secondary_language_cookie()+"/";

            } else {

                // Redirect based on the browsers language setting
                var browser_language = navigator.language;
                var german_languages = ["de-AT", "de-DE", "de-LI", "de-LU", "de-CH"];
                var result = german_languages.indexOf(browser_language);
                if ( 0 == result ) {
                    var string = "de/en/";
                } else {
                    var string = "en/de/";
                }

            }

            string = home_url+string+the_comics[key].parentNode.id+"/";
            window.history.pushState(null, null, string);

            refresh_comic();
        }

    }

    // Scroll to top link
    if ( typeof e.target.id != "undefined" && "scroll-to-top" == e.target.id ) {

        window.scrollTo(0, 0);

        // Preventing form submission
        event.preventDefault();
    }

    // Legal notice link
    if ( typeof e.target.id != "undefined" && "legal-notice" == e.target.id ) {
        var url = home_url+"legal-notice/";

        window.history.pushState(null, null, url);

        legal_notice_page();

        window.scrollTo(0, 0);

        // Preventing form submission
        event.preventDefault();
    }

    // Home page links
    if ( typeof e.target.id != "undefined" && ( "header-link" == e.target.id || "footer-link" == e.target.id ) ) {

        window.history.pushState( null, null, get_home_link_url() );
        event.preventDefault();
        home_page();

        window.scrollTo(0, 0);

        // Preventing form submission
        event.preventDefault();
    }

    // Language switcher button functionality
    if ( typeof e.target.id != "undefined" && "learn-english" == e.target.id ) {
        var switch_language = "/de/en/";
        set_primary_language_cookie( "de" );
        set_secondary_language_cookie( "en" );
    } else if ( typeof e.target.id != "undefined" && "learn-german" == e.target.id ) {
        var switch_language = "/en/de/";
        set_primary_language_cookie( "en" );
        set_secondary_language_cookie( "de" );
    }
    if ( typeof switch_language != "undefined" ) {

        // Set the home links
        set_home_links();

        window.history.pushState(null, null, switch_language);

        home_page();

        // Preventing form submission
        event.preventDefault();
    }

    // Change the comic language
    if ( e.target && e.target.nodeName == "IMG" && "comic-page" == e.target.className ) {
        var img = e.target;
        var id = e.target.id;
        var src = e.target.src;
        var end_of_file = src.substr(src.length - 7);

        if ( "-"+get_secondary_language()+".jpg" == end_of_file ) {
            var new_language = get_primary_language();
        } else if ( "-"+get_primary_language()+".jpg" == end_of_file ) {
            var new_language = get_secondary_language();
        }

        var comic_slug = get_current_comic().slug["en"];
        img.src = comics_folder_url+comic_slug+"/"+id+"-"+new_language+".jpg";

    }

});
function home_page() {

	document.getElementById('site-title').innerHTML = 'Learn languages from comics';

	var content_area = `

		<div class="buttons">
			<a id="learn-german" class="button" href="`+home_url+`en/de/`+`">Learn German</a>
			<a id="learn-english" class="button" href="`+home_url+``+`de/en/">Englisch lernen</a>
		</div>

		<div id="comic-selection">
`;

	if(typeof get_primary_language()!='undefined') {
		for (i = 0; i < comics.length; i++) { 
			slugs = comics[i].slug;
			names = comics[i].name;
			name = names[get_primary_language()];
			var slug = slugs[get_primary_language()];
			content_area = content_area + `
			<div class="block block-1" id="`+slug+`">
				<a id="comic-link-`+i+`" href="`+home_url+get_primary_language()+`/`+get_secondary_language()+`/`+slug+`/" class="block-inner">
					<img id="`+slug+`" src="`+home_url+`comics/`+slugs['en']+`/thumbnail-en.jpg" />
					<p>`+name+`</p>
				</a>
			</div>`;
		}
	} else {
alert('home without selection');
console.log('home without language selection yet');
	}




	content_area = content_area + `

		</div>
`;

	document.getElementById('page-content').innerHTML = content_area;

	clean_non_comic_pages();
}

function error_404_page() {
	document.getElementById("site-title").innerHTML = "404 Error";
	var content_area = "<img src='" + home_url + "/images/404.png' />";
	document.getElementById("page-content").innerHTML = content_area;

	clean_non_comic_pages();
}
function legal_notice_page() {
	document.getElementById('site-title').innerHTML = 'Legal Notice';

	var content_area = `

		<div id="static-page">
			<h3>Personal Information</h3>
			<p>
				Like most websites, we collect non-personally-identifying information of the sort that web browsers and 
				servers typically make available, such as the browser type, language preference, Internet Protocol (IP) address, referring site, and the 
				date and time of each visitor request. Our purpose in collecting non-personally identifying information 
				is to better understand how our visitors use our website. From time to time, we may release 
				non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the 
				usage of the website.
			</p>

			<h3>Browser storage</h3>
			<p>
				Browser storage allows a website to store information on a visitor’s computer. We use this to store 
				information such as the last visited comic, last page read and whether the end of the comic has been
				reached previously.
			</p>

			<h3>Contact information</h3>
			<p>
				<a href="https://ryan.hellyer.kiwi/contact/">Ryan Hellyer</a><br />
				Friedrichstraße 123<br />
				Berlin 10117<br />
				Germany<br />
			</p>
		</div>
`;

	document.getElementById('page-content').innerHTML = content_area;

	clean_non_comic_pages();
}
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
/**
 * Set translation strings.
 */
function translate_page() {

	// Set every translation string
	var translation_strings = [
		{
			"id":"copyright",
			"en":"Copyright",
			"de":"Copyright",
		},
		{
			"id":"legal-notice",
			"en":"Legal Notice",
			"de":"Impressum (auf Englisch)",
		},
		{
			"id":"site-title",
			"en":"Learn languages from comics",
			"de":"Sprachen lernen von Comics",
			'when':"home",
		},
		{
			"id":"creation",
			"en":"A creation of",
			"de":"Eine kreation von",
		},
		{
			"id":"scroll-to-top",
			"en":"Scroll to top",
			"de":"Scrolle nach oben",
		}
	];

	for (i = 0; i < translation_strings.length; i++) { 
		var id = translation_strings[i]["id"];
		var when = translation_strings[i]["when"];

		if ( typeof when == "undefined" || get_page_type() == when ) {
			var element = document.getElementById(id);
			if ( element && typeof element.innerHTML != "undefined" && element.innerHTML != "") {
				element.innerHTML = translation_strings[i][get_primary_language()];
			} else if ( element && typeof element.value != "undefined" && element.value != "") {
				element.value = translation_strings[i][get_primary_language()];
			}
		}

	}
}
document.addEventListener("DOMContentLoaded", translate_page );
/**
 * Set available languages and comics.
 */
var available_languages = ["en","de"];
var comics = [
    {
        name:{"en":"The Red Hall","de":"Der Rote Saal"},
        slug:{"en":"the-red-hall","de":"der-rote-saal"},
        pages:49
    },
    {
        name:{"en":"Shadow dancers","de":"Schatten tänzer"},
        slug:{"en":"shadowdancers","de":"schatten-tanzer"},
        pages:93
    },
    {
        name:{"en":"Breaking all barriers","de":"Alle Schranken Fallen"},
        slug:{"en":"breaking-all-barriers","de":"alle-schranken-fallen"},
        pages:121
    },
    {
        name:{"en":"The Letter of Jael Bara","de":"Der Brief der Jael Bara"},
        slug:{"en":"the-letter-of-jael-bara","de":"der-brief-der-jael-bara"},
        pages:82
    },
    {
        name:{"en":"The Tower in the Sky","de":"Der Turm im Himmel"},
        slug:{"en":"the-tower-in-the-sky","de":"der-turm-im-himmel"},
        pages:52
    },
    {
        name:{"en":"Monster","de":"Monster"},
        slug:{"en":"monster","de":"monster"},
        pages:32
    },
    {
        name:{"en":"XKCD #1","de":"XKCD #1"},
        slug:{"en":"xkcd-1","de":"xkcd-1"},
        pages:39
    },
    {
        name:{"en":"XKCD #2","de":"XKCD #2"},
        slug:{"en":"xkcd-2","de":"xkcd-2"},
        pages:39
    },
    {
        name:{"en":"XKCD #3","de":"XKCD #3"},
        slug:{"en":"xkcd-3","de":"xkcd-3"},
        pages:39
    },
    {
        name:{"en":"XKCD #4","de":"XKCD #4"},
        slug:{"en":"xkcd-4","de":"xkcd-4"},
        pages:39
    },
    {
        name:{"en":"XKCD #5","de":"XKCD #5"},
        slug:{"en":"xkcd-5","de":"xkcd-5"},
        pages:39
    },
];


var comics_folder_url = window.location.origin + "/comics/";
var page_type;

/**
 * Work out which comic we're on. Note: These should be accessed via the functions directly now (they weren't as functions originally)
 */
var comic_slug = get_current_comic_slug();
var comic = get_current_comic();

set_home_links();
var current_url = window.location.pathname.split( "/" );
if ( "root" == get_page_type() ) {
    root_page();
} else if ( "home" == get_page_type() ) {
    home_page();
} else if ( "legal-notice" == get_page_type()) {
    legal_notice_page();
} else if ( "404" == get_page_type() ) {
    error_404_page();
} else if ( "comic" == get_page_type() ) {
    refresh_comic();
}
