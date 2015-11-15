<?php

/**
 * ComicJet - Bootstrap
 *
 * @package  ComicJet
 * @author   Ryan Hellyer <ryanhellyer@gmail.com>
 */


/**
 * Escaping a URL.
 *
 * @param  string  $url  The URL to be escaped
 * @return string  $url  The escaped URL
 */
function esc_url( $url ) {
	$url = filter_var( $url, FILTER_SANITIZE_URL );

	return $url;
}

/**
 * Escaping HTML.
 *
 * @param  string  $attribute  The HTML to be escaped
 * @return string  $attribute  The escaped HTML
 */
function esc_html( $html ) {
	$html = htmlspecialchars( $html );

	return $html;
}

/**
 * Escaping attributes.
 *
 * @param  string  $attribute  The attribute to be escaped
 * @return string  $attribute  The escaped attribute
 */
function esc_attr( $attribute ) {
	$attribute = htmlspecialchars( $attribute );

	return $attribute;
}

/**
 * Stripping unneeded HTML tags.
 *
 * @param  string  $html  Some HTML to be escaped
 * @return string  $html  The escaped HTML
 */
function escape_content( $html ) {
	$html = strip_tags( $html, '<strong><a>' );
	$html = stripslashes( $html );
	return $html;
}

/**
 * Set correct URL file extensions.
 *
 * @param  string  $url  The URL
 * @return string  $url  The fixed URL
 */
function comicjet_convert_file_extension( $url ) {
	$file = str_replace( COMICJET_ASSETS_URL, COMICJET_DIR . 'assets', $url );

	$file = substr_replace( $file, '.jpg', -4 );
	if ( file_exists( $file ) ) {
		$url = substr_replace( $url, '.jpg', -4 );
	}

	$file = substr_replace( $file, '.png', -4 );
	if ( file_exists( $file ) ) {
		$url = substr_replace( $url, '.png', -4 );
	}

	return $url;
}
