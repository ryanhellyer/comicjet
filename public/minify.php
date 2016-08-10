<?php

function minify_js( $js ) {

return $js;
    return preg_replace(
        array(
//            '#\s*\/\/.*$#m', // Remove inline comment(s) [^1]
//            '#\s*([!%&*\(\)\-=+\[\]\{\}|;:,.<>?\/])\s*#', // Remove white-space(s) around punctuation(s) [^2]
//            '#[;,]([\]\}])#', // Remove the last semi-colon and comma [^3]
//            '#\btrue\b#', '#\bfalse\b#', '#\breturn\s+#' // Replace `true` with `!0` and `false` with `!1` [^4]
        ),
        array(
//            "",  // [^1]
//            '$1', // [^2]
//            '$1', // [^3]
//            '!0', // [^4]
            '!1',
            'return '
        ),
    $js);



	// No minifier is in place yet
// make it into one long line
//$js = str_replace(array("\n","\r"),'',$js);

// replace all multiple spaces by one space
//$js = preg_replace('!\s+!',' ',$js);


	// Replace some unneeded spaces
	$js = str_replace(array(' {',' }','{ ','; '),array('{','}','{',';'),$js);

	$js = str_replace( '    ', '', $js );

	return $js;
}

function minify_css( $css ) {
	$css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
	$css = str_replace( ': ', ':', $css );
	$css = str_replace( array( "\r\n" , "\r", "\n", "\t", '  ', '    ', '    '), '', $css );
	return $css;
}
