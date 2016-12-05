
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

            tutorial_blob_text( tut_element );

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
