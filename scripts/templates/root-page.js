
function root_page() {
    window.history.pushState(null, null, get_home_link_url() );

    // Remove home button if it exists (only needed on comic pages)
    var home_button = document.getElementById( "home" );
    if ( null !== home_button ) {
        home_button.parentNode.removeChild(home_button);
    }

    replace_body_class( "root" );
    home_page();
}
