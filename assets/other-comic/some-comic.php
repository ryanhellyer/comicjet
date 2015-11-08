<?php

$data = array(
	'slug' => array(
		'en' => 'some-comic',
		'nb' => 'noen-comic',
	),
	'title' => array(
		'en' => 'Some comic',
		'nb' => 'Noen comic',
	),
);
$data = json_encode( $data );
file_put_contents( 'some-comic.data', $data );
