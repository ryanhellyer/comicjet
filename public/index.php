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
			<ol id="comic"></ol>
		</div>
	</div>
</div>

<footer>
	<p>
		<span id="copyright">Copyright</span> &copy; 2016 <a href="<?php echo $base_url; ?>">Comic Jet</a>.
		<a id="legal-notice" href="#" class="alignright">Legal Notice</a>
	</p>
</footer>

<script src="<?php echo $base_url; ?>scripts/functions.js"></script>
<script src="<?php echo $base_url; ?>scripts/infinite-scroll.js"></script>
<script src="<?php echo $base_url; ?>scripts/clicks.js"></script>
<script src="<?php echo $base_url; ?>scripts/templates/home-page.js"></script>
<script src="<?php echo $base_url; ?>scripts/templates/error-404-page.js"></script>
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
if ( '/' == window.location.pathname ) {
	home_page();
} else if ( '/'+get_primary_language()+'/'+get_secondary_language()+'/' == window.location.pathname ) {
	home_page();
} else if (undefined == comic) {
	error_404_page();
} else {
	document.addEventListener("DOMContentLoaded", Class_Scroll );
	refresh_content();
}

</script>

</body>
</html>