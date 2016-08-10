
function root_page() {
    window.history.pushState(null, null, get_home_link_url() );
    home_page();
}
