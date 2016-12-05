
var home_url = "http://dev.comicjet.com/";
/**
 * Refresh the page content.
 */
function refresh_page_content() {
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
}


/**
 * Reset the page content.
 * Used for shifting between comics and the home page.
 */
function refresh_comic() {

    if ( "undefined" != typeof get_current_comic() ) {

        // Set the page title
        document.getElementById("site-title").innerHTML = get_current_comic().name[get_secondary_language()];

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
    var home_slug;

    if ( "" != get_primary_language_cookie() && "" != get_secondary_language_cookie() ) {

        // Redirect based on cookies
        home_slug = get_primary_language_cookie()+"/"+get_secondary_language_cookie()+"/";

    } else {

        // Redirect based on the browsers language setting
        var browser_language = navigator.language;
        var german_languages = ["de-AT", "de-DE", "de-LI", "de-LU", "de-CH"];
        var result = german_languages.indexOf(browser_language);
        if ( 0 == result ) {
            home_slug = "de/en/";
        } else {
            home_slug = "en/de/";
        }

    }

    return home_url+home_slug;
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

    for (i = 0; i < comics.length; i+= 1) {
        if (comic_slug == comics[i].slug.en) {
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
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    var i;
    var c;
    for(i=0; i<ca.length; i+= 1) {
        c = ca[i];

        while (c.charAt(0)==" ") {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    setCookie(name,"",-1);
}

/**
 * Get the current comic slug.
 */
function get_current_comic_slug(language) {
    var current_url_chunks = window.location.pathname.split( "/" );
    var current_slug = current_url_chunks[3];
    var comic_slug;

    for (i = 0; i < comics.length; i+= 1) {
        slugs = comics[i].slug;
        slug = slugs[get_primary_language()];
        if ( current_slug == slug ) {
            if ( null != language ) {
                comic_slug = slugs[language];
            } else {
                comic_slug = slug;
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
    var comic;
    for (gcc_counter = 0; gcc_counter < comics.length; gcc_counter+= 1) {

        slugs = comics[gcc_counter].slug;
        slug = slugs[get_primary_language()];
        if ( current_slug == slug ) {
            comic = comics[gcc_counter];
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
        "undefined" == typeof get_current_comic()
        ||
        ( "-1" == available_languages.indexOf(current_url[1]) )
        ||
        ( "-1" == available_languages.indexOf(current_url[2]) )
        ||
        ( "" != current_url[4] )
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

/**
 * Redirecting to URL with trailing slash.
 */
function redirect_to_trailing_slash() {
    var current_url = window.location.pathname.split( "/" );
    
    if ( "/" != window.location.pathname.slice(-1) ) {
        window.history.pushState( null, null, window.location.pathname + "/" );        
    }

}

/**
 * Replace body class.
 */
function replace_body_class( class_name ) {
    var body_tag = obj=document.getElementsByTagName('body')[0];
    body_tag.className = class_name;
}

/**
 * Handling the tutorial text blob when clicked or iniitially loaded.
 */
function tutorial_blob_text( element ) {

    if ( 2 == localStorage.getItem( 'tutorial' ) ) {
        element.style.display = "none";
    }

    var initial_text = "<span class=\"tutorial-click-to-change\">X</span>";
    var second_text = "<span class=\"tutorial-click-to-revert\">Z</span>";

    if ( null == localStorage.getItem( 'tutorial' ) ) {
        element.innerHTML = initial_text;
    } else if ( 1 == localStorage.getItem( 'tutorial' ) ) {
        element.innerHTML = second_text;
        localStorage.setItem( 'tutorial', 1 );
    } else if ( 2 == localStorage.getItem( 'tutorial' ) ) {
        element.innerHTML = "";
    }

}

/**
 * Change the comic language (usually on click).
 */
function change_comic_language( ccl_img ) {
    var id = ccl_img.id;
    var src = ccl_img.src;
    var end_of_file = src.substr(src.length - 7);

    if ( "-"+get_secondary_language()+".jpg" == end_of_file ) {
        var new_language = get_primary_language();
    } else if ( "-"+get_primary_language()+".jpg" == end_of_file ) {
        var new_language = get_secondary_language();
    }

    var comic_slug = get_current_comic().slug["en"];
    ccl_img.src = comics_folder_url+comic_slug+"/"+id+"-"+new_language+".jpg";
}

/**
 * Handling the tutorial text blob when clicked or iniitially loaded.
 */
function store_current_page( comic, page_number ) {

    localStorage.setItem( comic, page_number );

}
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

        var primary_menu =  document.getElementById("primary-menu");

        // Add home button
        var home_button =  document.getElementById("home");
        if (null == home_button ) {
            home_button = document.createElement("a");
            home_button.href = get_home_link_url();
            home_button.id = "home";
            home_button.innerHTML = "Home";
            document.getElementById("primary-menu").appendChild(home_button);
        }

        // Add scroll to top button
        scroll_to_top_button = document.getElementById("scroll-to-top");
        if (typeof(scroll_button_present) == "undefined") {

            // Add scroll to top button
            var scroll_to_top_button = document.createElement("a");
            scroll_to_top_button.href = "#";
            scroll_to_top_button.id = "scroll-to-top";
            scroll_to_top_button.innerHTML = "To top";
            document.getElementById("primary-menu").appendChild(scroll_to_top_button);

        }

        var self = this;

        // Run actions on scrolling
        document.onscroll = function() {
            self.maybe_add_new_page();

            // Show scroll to top button
            var current_distance_from_top = document.body.scrollTop;
            if ( 20 < current_distance_from_top ) {
                scroll_to_top_button.style.visibility = "visible";
            } else {
                scroll_to_top_button.style.visibility = "hidden";
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

document.body.addEventListener("click", function (e) {

    // Select a comic
    var the_comics = document.getElementsByClassName("block-inner");
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

            // Get required page number if stored
            for (var comic_number in comics) {
                if ( comics[comic_number].slug[ get_secondary_language() ] == the_comics[key].parentNode.id ) {
                    var storageslug = the_comics[key].parentNode.id;
                } else if ( comics[comic_number].slug[ get_primary_language() ] == the_comics[key].parentNode.id ) {
                    var storageslug = the_comics[key].parentNode.id;
                }
            }
            var page_number = localStorage.getItem( storageslug );
            if ( null != page_number ) {
                page_number = "#" + page_number;
            } else {
                page_number = "";   
            }

            // Add URL to browser address bar
            var comic_url = get_home_link_url()+the_comics[key].parentNode.id+"/" + page_number;
            window.history.pushState(null, null, comic_url);

            refresh_comic();
        }

    }

    // Clicking language selector
    if ( "language-selector" == e.target.id ) {
        var pulldown = document.getElementById("language-selector-pulldown");
        if ( "0px" == pulldown.style.left ) {
            pulldown.style.left = "-999em";
        } else {
            pulldown.style.left = "0px";
        }
    }

    // Clicking the tutorial button
    if (
        "tutorial-blob" == e.target.className
        ||
        e.target && e.target.nodeName == "IMG" && "comic-page" == e.target.className
        ||
        "tutorial-blob" == e.target.parentNode.className

    ) {

        // Set new tutorial step
        if ( null == localStorage.getItem( 'tutorial' ) ) {
            localStorage.setItem( 'tutorial', 1 );
        } else if ( 1 == localStorage.getItem( 'tutorial' ) ) {
            localStorage.setItem( 'tutorial', 2 );
        }

//console.log( e.target.parentNode.previousElementSibling );
//console.dir( e.target.parentNode.previousElementSibling );

// Change text
if (
    null != e.target.nodeName
    &&
    e.target.nodeName == "IMG"
    &&
    "comic-page" == e.target.className
) {
    var img_element = e.target;
    var tut_element = e.target.nextElementSibling;

//    var elements = e.target.getElementsByClassName( "tutorial-click-to-change" );
  //  var element = elements[0];
//    console.log(  );

    tutorial_blob_text( tut_element );
//    tutorial_blob_text( tut_element );

} else if (
    typeof e.target.parentNode.previousElementSibling !== "undefined"
    &&
    null != e.target.parentNode.previousElementSibling
    &&
    e.target.parentNode.previousElementSibling.nodeName == "IMG"
    &&
    "comic-page" == e.target.parentNode.previousElementSibling.className
) {

    var img_element = e.target.parentNode.previousElementSibling;
    var tut_element = e.target.parentNode;

    tutorial_blob_text( tut_element );
    change_comic_language( img_element );
} else if (
    typeof e.target.previousElementSibling.nodeName !== "undefined"
    &&
    null != e.target.previousElementSibling.nodeName
    &&
    e.target.previousElementSibling.nodeName == "IMG"
    &&
    "comic-page" == e.target.previousElementSibling.className
) {

    var img_element = e.target.previousElementSibling;
    var tut_element = e.target;

    tutorial_blob_text( tut_element );
    change_comic_language( img_element );
}

/*
    console.log( img_element );
    console.log( tut_element );
*/

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
/*
console.log('start');
console.dir( e.target );
console.dir( e.target.parentElement );
console.dir( e.target.parentElement.id );
console.log('end');
*/
    // Language switcher
    if (
        null !== e.target.parentElement
        &&
        "language-selector-pulldown" == e.target.parentElement.id
    ) {
        
        var language_switcher_button_id = e.target.id;
        var language = language_switcher_button_id.replace( "learn-", "" );

        if ( "en" == language ) {
            var switch_language = "/de/en/";
            set_primary_language_cookie( "de" );
            set_secondary_language_cookie( "en" );
        } else if ( "de" == language ) {
            var switch_language = "/en/de/";
            set_primary_language_cookie( "en" );
            set_secondary_language_cookie( "de" );
        }

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
        change_comic_language( e.target );
    }

    location_on_page_load = window.location.href;

});
function home_page() {

    document.getElementById("site-title").innerHTML = "Learn languages from comics";

    var content_area = '<div id="language-selector"><span id="language-selector-text">Select a language to learn</span> &nbsp;&#x25bc;<div id="language-selector-pulldown"><span class="select-language" id="learn-de">Learn German</span><span class="select-language" id="learn-en">Englisch lernen</span></div></div><div id="comic-selection">';


    if(typeof get_primary_language()!="undefined") {
        for (i = 0; i < comics.length; i+= 1) {
            slugs = comics[i].slug;
            names = comics[i].name;
            name = names[get_primary_language()];
            var slug = slugs[get_primary_language()];

            var storageslug = slugs[get_primary_language()];
            var page_number = localStorage.getItem( storageslug );
            if ( null != page_number ) {
                page_number = "#" + page_number;
            } else {
                page_number = "";   
            }

            content_area = content_area + '<div class="block block-1" id="'+slug+'"><a id="comic-link-'+i+'" href="'+home_url+get_primary_language()+'/'+get_secondary_language()+'/'+slug+'/'+page_number+'" class="block-inner"><img id="'+slug+'" src="'+home_url+'comics/'+slugs["en"]+'/thumbnail-en.jpg" /><p>'+name+'</p></a></div>';
        }
    }

    content_area = content_area + '</div>';

    document.getElementById("page-content").innerHTML = content_area;

    replace_body_class( "home" );

    clean_non_comic_pages();
}

function error_404_page() {
    document.getElementById("site-title").innerHTML = "404 Error";
    var content_area = "<img src='" + home_url + "/images/404.png' />";
    document.getElementById("page-content").innerHTML = content_area;

    replace_body_class( "error-404" );

    clean_non_comic_pages();
}
function legal_notice_page() {
    document.getElementById("site-title").innerHTML = "Legal Notice";

   var content_area = '<div id="static-page"><h3>Personal Information</h3><p>Like most websites, we collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, Internet Protocol (IP) address, referring site, and the date and time of each visitor request. Our purpose in collecting non-personally identifying information is to better understand how our visitors use our website. From time to time, we may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of the website.</p><h3>Browser storage</h3><p>Browser storage allows a website to store information on a visitor’s computer. We use this to store information such as the last visited comic, last page read and whether the end of the comic has been reached previously.</p><h3>Contact information</h3><p><a href="https://ryan.hellyer.kiwi/contact/">Ryan Hellyer</a><br />Friedrichstraße 123<br />Berlin 10117<br />Germany<br /></p></div>';

    document.getElementById("page-content").innerHTML = content_area;

    replace_body_class( "legal-notice" );

    clean_non_comic_pages();
}

function root_page() {
    window.history.pushState(null, null, get_home_link_url() );
    replace_body_class( "root" );
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
            "en":"Learn German from comics",
            "de":"Englisch lernen von Comics",
            "when":"home",
        },
        {
            "id":"creation",
            "en":"A creation of",
            "de":"Eine kreation von",
        },
        {
            "id":"scroll-to-top",
            "en":"To top",
            "de":"Nach oben",
            "when":"comic",
        },
        {
            "id":"language-selector-text",
            "en":"Select a language to learn",
            "de":"Wählen Sie eine Sprache zum Lernen",
            "when":"home",
        }
/*          NEEDS TO USE CLASS SO THAT CAN BE SHOWN ON ALL COMIC PAGES AT ONCE 
        {
            "id":"tutorial-click-to-change",
            "en":"Click the comic to change it's language",
            "de":"Klick auf den Comic für Deutsch",
        },
        {
            "id":"tutorial-click-to-revert",
            "en":"Click the comic to revert back to the original language",
            "de":"Klick den comic für die Ausgangssprache",
        }
        */
    ];

    for (i = 0; i < translation_strings.length; i+= 1) {

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
 * If back button is hit, we still need the page to refresh.
 * To solve this, we simply check if the window location has changed recently, and if so, we refresh the page content again.
 */
var location_on_page_load = window.location.href;
setInterval(
    function(){
        if ( window.location.href != location_on_page_load ) {
            location_on_page_load = window.location.href;
            if ( window.location.hash == "" ) { // We don't want to refesh the page everytime someone goes back from a #
            	refresh_page_content();
        	}
        }
    },
    500
);
/**
 * Redirect to correct URL.
 */
redirect_to_trailing_slash();

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
 * Work out which comic we are on. Note: These should be accessed via the functions directly now (they weren't as functions originally)
 */
var comic_slug = get_current_comic_slug();
var comic = get_current_comic();

set_home_links();
var current_url;
refresh_page_content();
