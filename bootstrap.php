<?php

/**
 * ComicJet - Bootstrap
 *
 * @package  ComicJet
 * @author   Ryan Hellyer <ryanhellyer@gmail.com>
 */


require( 'config.php' );
require( 'functions.php' );


/**
 * The autoloader.
 *
 * @param  string  $class  The class being instantiated
 */
function __autoload_comicjet( $class ) {

	// Converting from class name to file name
	$file_data = strtolower( $class );
	$file_data = str_replace( '_', '-', $file_data );

	$split = explode( '-', $file_data );
	$folder = $split[1];

	// Removing the class prefix and folder name
	unset( $split[0] );
	unset( $split[1] );

	// Finally, load the file
	$file = COMICJET_DIR . $folder . '/' . implode( '-', $split ) . '.php';

	require( $file );
}
spl_autoload_register( '__autoload_comicjet' );



new ComicJet_Controller_Router();
