<!DOCTYPE html>
<html lang="en_US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<title><?php echo esc_html( $this->_get_page_title() ); ?></title>

	<link rel="stylesheet" href="<?php echo COMICJET_ASSETS_URL; ?>/style.css" type="text/css" media="all" />
</head>
<body class="<?php echo esc_attr( $template ); ?>">

<header id="site-header">
	<h1>
		<a href="<?php echo $this->_get_home_url(); ?>">COMIC JET! 
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
					">
							beta
					</small>
		</a>
	</h1>
</header>

<div id="wrap">
	<div class="inner">
		<div class="content">
