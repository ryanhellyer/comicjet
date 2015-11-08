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
	public function _get_comic_data() {
		$assets_dir = COMICJET_DIR . 'assets/';
		$items = scandir( $assets_dir );

		foreach ( $items as $key => $item ) {
			$path = $assets_dir . $item;
			if ( is_dir( $path ) && '.' != $item && '..' != $item ) {
				$folder = $item;
				$data_json = file_get_contents( $assets_dir . $item . '/' . $item . '.data' );
				$data[] = json_decode( $data_json, true );
			}
		}

		return $data;
	}

}
