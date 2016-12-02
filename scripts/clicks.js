
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


            // Getting storage slug
            for (var key2 in the_comics) {
//                console.log(             comics[key2].slug         );

if ( typeof comics[ key2 ].slug != "undefined" ) {
    console.log( "TEST");
//    console.log(    comics[ key2 ].slug    );
}

            }
console.log('test');

            var comic_url = get_home_link_url()+the_comics[key].parentNode.id+"/";
            window.history.pushState(null, null, comic_url);

            refresh_comic();
        }

    }

    // Clicking the tutorial button
    if (
        "tutorial-blob" == e.target.className
        ||
        e.target && e.target.nodeName == "IMG" && "comic-page" == e.target.className
    ) {

        // Set new tutorial step
        if ( null == localStorage.getItem( 'tutorial' ) ) {
            localStorage.setItem( 'tutorial', 1 );
        } else if ( 1 == localStorage.getItem( 'tutorial' ) ) {
            localStorage.setItem( 'tutorial', 2 );
        }

        // Change text
        if ( e.target && e.target.nodeName == "IMG" && "comic-page" == e.target.className ) {
            var element = e.target.nextElementSibling;
            tutorial_blob_text( element );
        }

        // If clicking tutorial blob, then change the comic language
        if ( "tutorial-blob" == e.target.className ) {
            tutorial_blob_text( e.target );
            change_comic_language( e.target.previousElementSibling );
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

    // Language switcher
    if ( "language-selector-pulldown" == e.target.parentElement.id ) {
        
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
