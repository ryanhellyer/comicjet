<?php

$base_url = 'http://dev.comicjet.com/';

?><!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title>Comic Jet</title>
	<link rel="stylesheet" href="<?php echo $base_url; ?>style.css" type="text/css" media="all" />
</head>
<body class="comic">

<header id="site-header">
	<h1>
		<a id="header-link" href="<?php echo $base_url; ?>">Comic Jet! 
					<small style="
						display: inline-block;
						text-shadow: none;
						-webkit-text-stroke-width: 0.3px;
						-webkit-text-stroke-color: #aa5500;
						text-stroke-width: 0;
						border:none;
						position: relative;
						font-weight: bold;
						letter-spacing:0;
						font-size:24px;
						color: #ffcc00;
						font-family:sans-serif;
						position: relative;
						top: -10px;
						text-transform: lowercase;
					">
							beta
					</small>
		</a>
	</h1>

	<nav id="primary-menu">
		<ul>
			<li primary-language="en" secondary-language="de"><a href="">English</a></li>
			<li primary-language="de" secondary-language="en"><a href="">Deutsch</a></li>
		</ul>
	</nav>

</header>

<div id="wrap">
	<div class="inner">
		<div class="content">
			<h1 id="site-title"></h1>
			<div id="page-content"></div>
			<div id="to-comic-selection">
				<a id="to-comic-selection-link" href="#">Back to comic selection page</a>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		<span id="copyright">Copyright</span> &copy; 2016 <a href="<?php echo $base_url; ?>">Comic Jet</a>. <span id="creation">A creation of</span> <a href="https://geek.hellyer.kiwi/">Ryan Hellyer</a>
		<a id="legal-notice" href="<?php echo $base_url; ?>legal-notice/" class="alignright">Legal Notice</a>
	</p>
</footer>

<script src="<?php echo $base_url; ?>scripts/functions.js"></script>
<script src="<?php echo $base_url; ?>scripts/infinite-scroll.js"></script>
<script src="<?php echo $base_url; ?>scripts/clicks.js"></script>
<script src="<?php echo $base_url; ?>scripts/templates/home-page.js"></script>
<script src="<?php echo $base_url; ?>scripts/templates/error-404-page.js"></script>
<script src="<?php echo $base_url; ?>scripts/templates/legal-notice-page.js"></script>
<script src="<?php echo $base_url; ?>scripts/translation.js"></script>

<script>

/**
 * Set available languages and comics.
 */
var available_languages = ["en","de"];
var comics = [
	{
		name:{'en':'The Red Hall','de':'Der Rote Saal'},
		slug:{'en':'the-red-hall','de':'der-rote-saal'},
		pages:49
	},
	{
		name:{'en':'Shadow dancers','de':'Dhadow danzers de'},
		slug:{'en':'shadowdancers','de':'dhadow-danzers-de'},
		pages:93
	},
	{
		name:{'en':'Breaking all barriers','de':'Alle Schranken Fallen'},
		slug:{'en':'breaking-all-barriers','de':'alle-schranken-fallen'},
		pages:121
	},
	{
		name:{'en':'The Letter of Jael Bara','de':'Der Brief der Jael Bara'},
		slug:{'en':'the-letter-of-jael-bara','de':'der-brief-der-jael-bara'},
		pages:82
	},
	{
		name:{'en':'The Tower in the Sky','de':'Der Turm im Himmel'},
		slug:{'en':'the-tower-in-the-sky','de':'der-turm-im-himmel'},
		pages:52
	},
	{
		name:{'en':'Monster','de':'Monster'},
		slug:{'en':'monster','de':'monster'},
		pages:32
	},
	{
		name:{'en':'XKCD #1','de':'XKCD #1'},
		slug:{'en':'xkcd-1','de':'xkcd-1'},
		pages:39
	},
	{
		name:{'en':'XKCD #2','de':'XKCD #2'},
		slug:{'en':'xkcd-2','de':'xkcd-2'},
		pages:39
	},
	{
		name:{'en':'XKCD #3','de':'XKCD #3'},
		slug:{'en':'xkcd-3','de':'xkcd-3'},
		pages:39
	},
	{
		name:{'en':'XKCD #4','de':'XKCD #4'},
		slug:{'en':'xkcd-4','de':'xkcd-4'},
		pages:39
	},
	{
		name:{'en':'XKCD #5','de':'XKCD #5'},
		slug:{'en':'xkcd-5','de':'xkcd-5'},
		pages:39
	},
];


var home_url = '<?php echo $base_url; ?>';
var comics_folder_url = window.location.origin + '/comics/';

/**
 * Get current URL chunks.
 */
var current_url_chunks = window.location.pathname.split( '/' );

/**
 * Work out which comic we're on.
 */
var current_slug = current_url_chunks[3];
for (i = 0; i < comics.length; i++) { 
	slugs = comics[i].slug;
	slug = slugs[get_primary_language()];
	if ( current_slug == slug ) {
		var comic_slug = slug;
		var comic = comics[i];
	}
}

set_header_link();
var current_url = window.location.pathname.split( '/' );
console.log(available_languages.indexOf(current_url[1]));
console.log(available_languages.indexOf(current_url[2]));
if ( '/' == window.location.pathname ) {
	var page_type = 'home';

	// Redirect, based on the browsers language setting
	var browser_language = navigator.language;
	var german_languages = ['de-AT', 'de-DE', 'de-LI', 'de-LU', 'de-CH'];
	var result = german_languages.indexOf(browser_language);
	if ( 0 == result ) {
		var string = '/de/en/';
	} else {
		var string = '/en/de/';
	}
	window.history.pushState(null, null, string);
	home_page();

} else if ( '/'+get_primary_language()+'/'+get_secondary_language()+'/' == window.location.pathname ) {
	var page_type = 'home';
	home_page();
} else if ( '/legal-notice/' == window.location.pathname ) {
	var page_type = 'legal-notice';
	legal_notice_page();
} else if (
	undefined == comic
	||
	( '-1' == available_languages.indexOf(current_url[1]) )
	&&
	( '-1' == available_languages.indexOf(current_url[2]) )
) {
	var page_type = '404';
	error_404_page();
} else {
	var page_type = 'comic';
	document.addEventListener("DOMContentLoaded", Class_Scroll );
	refresh_content();
}

</script>

</body>
</html>