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
    for (i = 0; i < comics.length; i+= 1) {
        slugs = comics[i].slug;
        slug = slugs[get_primary_language()];
        if ( current_slug == slug ) {
            comic = comics[i];
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

    var initial_text = "Click the comic to change it's language";
    var second_text = "Click the comic to revert back to the original language";

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
function change_comic_language( element ) {
    var img = element;
    var id = element.id;
    var src = element.src;
    var end_of_file = src.substr(src.length - 7);

    if ( "-"+get_secondary_language()+".jpg" == end_of_file ) {
        var new_language = get_primary_language();
    } else if ( "-"+get_primary_language()+".jpg" == end_of_file ) {
        var new_language = get_secondary_language();
    }

    var comic_slug = get_current_comic().slug["en"];
    img.src = comics_folder_url+comic_slug+"/"+id+"-"+new_language+".jpg";
}

/**
 * Handling the tutorial text blob when clicked or iniitially loaded.
 */
function store_current_page( comic, page_number ) {

    localStorage.setItem( comic, page_number );

}
