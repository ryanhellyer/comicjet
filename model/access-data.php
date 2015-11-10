<?php

/**
 * Access data class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Model_Access_Data {

	/**
	 * Get comic data.
	 *
	 * @return  array  $data  All comic data
	 */
	public function _get_comic_data( $lang1 = NULL, $lang2 = NULL ) {
		$assets_dir = COMICJET_DIR . 'assets/';
		$items = scandir( $assets_dir );

		$data = array();
		foreach ( $items as $key => $item ) {
			$path = $assets_dir . $item;
			if ( is_dir( $path ) && '.' != $item && '..' != $item ) {
				$folder = $item;
				$file = $assets_dir . $item . '/' . $item . '.data';
				if ( file_exists( $file ) ) {
					$data_json = file_get_contents( $file );
					$decoded_data = json_decode( $data_json, true );
//echo $decoded_data['slug'][$lang1];
					// Only use data if it matches the languages we are using
//					$slug1 = $decoded_data[0]['slug'][$lang1];
//					$slug2 = $decoded_data[0]['slug'][$lang2];
					if ( isset( $decoded_data['slug'][$lang1] ) && isset( $decoded_data['slug'][$lang2] ) ) {
						$data[] = $decoded_data;
					}
				}
			}
		}

		return $data;
	}

}
