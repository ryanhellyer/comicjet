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
