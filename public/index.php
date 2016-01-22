<!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title>The Red Hall - Comic Jet</title>
	<link rel="stylesheet" href="style.css" type="text/css" media="all" />
</head>
<body class="comic">

<header id="site-header">
	<h1>
		<a href="https://dev.comicjet.com/en/de/">Comic Jet! 
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
			<li primary-language="en" secondary-language="de"><a href="#">English</a></li>
			<li primary-language="de" secondary-language="en"><a href="#">Deutsch</a></li>
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
		Copyright &copy; 2016 Comic Jet.
	</p>
</footer>

<script src="scripts/functions.js"></script>
<script src="scripts/infinite-scroll.js"></script>
<script src="scripts/clicks.js"></script>

<script>

var current_url = window.location.href;
var comics_folder_url = window.location.origin + '/comics/';
var primary_language = get_query_var('primary_language' );
var secondary_language = get_query_var('secondary_language' );

var comics = [
	{
		name:{'en':'The Red Hall','de':'Der Rote Saal'},
		slug:{'en':'the-red-hall','de':'der-rote-saal'},
		pages:4
	},
	{
		name:{'en':'Shadow dancers','de':'Dhadow danzers de'},
		slug:'shadowdancers',
		pages:4
	},
];

// Looping through all comics until finding current one
//              ==== used in both current JS files
var current_slug = get_query_var('comic');
for (i = 0; i < comics.length; i++) { 
	slugs = comics[i].slug;
	slug = slugs[primary_language];
	if ( current_slug == slug ) {
		var comic = comics[i];
	}
}

refresh_content();
</script>

</body>
</html>