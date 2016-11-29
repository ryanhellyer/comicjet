
function root_page() {
    window.history.pushState(null, null, get_home_link_url() );
    replace_body_class( "root" );
    home_page();
}
