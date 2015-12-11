<?php

/**
 * Access data class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Model_Access_Data {

	/**
	 * Get comic data for all comics.
	 *
	 * @param   string $lang1  language 1
	 * @param   string $lang2  language 2
	 * @return  array  $data   All comic data
	 */
	public function _get_comic_all_data() {

		$creative_commons = array(
			'en' => 'This work is licensed under a Creative Commons Attribution-NonCommercial 2.5 License.',
			'de' => 'Diese Arbeit ist unter Lizenz von einer kreativen, nicht kommerziellen GbR ( Gesellschaft bürgerlichen Rechts) 2.5 Lizenz.',
		);

		$xkcd_credits = array(
			'en' => 'Thanks to <a href="http://xkcd.com/">XKCD</a> for this comic. ' . $creative_commons['en'],
			'de' => 'Vielen Dank an <a href="http://xkcd.com/">XKCD</a> für dieses Comic und an <a href="http://xkcde.dapete.net/">xkcde.dapete.net</a> für die deutsche Übersetzung.' . $creative_commons['de'],
		);


		$data = array(
			/*
			0 => array(
				'slug' => array(
					'en' => 'tutorial',
					'de' => 'tutorial',
				),
				'title' => array(
					'en' => 'Tutorial',
					'de' => 'Tutorial',
				),
				'comics' => array(
					'number' => 2,
				),
				'tutorials' => array(
					1 => array(
						0 => array(
							'marker' => array(
								'top' => 14,
								'left' => 49,
							),
							'text' => array(
								'top' => 3,
								'left' => 55,
								'width' => 21,
								'en' => 'Click on the comic to switch language',
								'de' => 'Some German text goes here',
							),
						),
						1 => array(
							'marker' => array(
								'top' => 14,
								'left' => 49,
							),
							'text' => array(
								'top' => 3,
								'left' => 55,
								'width' => 21,
								'en' => 'Click on the comic to switch back to the original language',
								'de' => 'Some other German text goes here',
							),
						),
						2 => array(
							'marker' => array(
								'top' => 1,
								'left' => 95,
							),
							'text' => array(
								'top' => 10,
								'left' => 80,
								'width' => 21,
								'en' => 'Click on the next button',
								'de' => 'And another other German text goes here',
							),
						),
					),
					2 => array(
						0 => array(
							'marker' => array(
								'top' => 17,
								'left' => 2,
							),
							'text' => array(
								'top' => 7,
								'left' => 8,
								'width' => 24,
								'en' => 'Head back to the home page to begin learning!',
								'de' => 'Some German text goes here',
							),
						),
					),
				),
				'credits' => array(
					'en' => 'This is comic is based on work by <a href="http://xkcd.com/">XKCD</a>. ' . $creative_commons['en'],
					'de' => 'Diese Comic basiert auf (der) Arbeit von <a href="http://xkcd.com/">XKCD</a>. ' . $creative_commons['de'],
				),
			),
			*/
			5 => array(
				'slug' => array(
					'en' => 'the-red-hall',
					'de' => 'der-rote-saal ',
				),
				'title' => array(
					'en' => 'The Red Hall',
					'de' => 'Der Rote Saal',
				),
				'comics' => array(
					'number' => 49,
				),
			),
			10 => array(
				'slug' => array(
					'en' => 'xkcd1',
					'de' => 'xkcd1',
				),
				'title' => array(
					'en' => 'XKCD #1',
					'de' => 'XKCD #1',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
				'comics' => array(
					'number' => 39,
				),
			),
			15 => array(
				'slug' => array(
					'en' => 'shadowdancers',
					'de' => 'schattentänzer',
				),
				'title' => array(
					'en' => 'Shadowdancers',
					'de' => 'Schattentänzer',
				),
				'comics' => array(
					'number' => 93,
				),
			),
			20 => array(
				'slug' => array(
					'en' => 'xkcd2',
					'de' => 'xkcd2',
				),
				'title' => array(
					'en' => 'XKCD #2',
					'de' => 'XKCD #2',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
				'comics' => array(
					'number' => 39,
				),
			),
			25 => array(
				'slug' => array(
					'en' => 'the-tower-in-the-sky',
					'de' => 'der-turm-im-himmel',
				),
				'title' => array(
					'en' => 'The tower in the sky',
					'de' => 'Der Turm im Himmel',
				),
				'comics' => array(
					'number' => 52,
				),
			),
			30 => array(
				'slug' => array(
					'en' => 'xkcd3',
					'de' => 'xkcd3',
				),
				'title' => array(
					'en' => 'XKCD #3',
					'de' => 'XKCD #3',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
				'comics' => array(
					'number' => 39,
				),
			),
			35 => array(
				'slug' => array(
					'en' => 'the-letter-of-jael-bara',
					'de' => 'der-brief-der-jael-bara',
				),
				'title' => array(
					'en' => 'The letter of Jael Bara',
					'de' => 'Der brief der Jael Bara',
				),
				'comics' => array(
					'number' => 82,
				),
			),
			40 => array(
				'slug' => array(
					'en' => 'xkcd4',
					'de' => 'xkcd4',
				),
				'title' => array(
					'en' => 'XKCD #4',
					'de' => 'XKCD #4',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
				'comics' => array(	
					'number' => 39,
				),
			),
			45 => array(
				'slug' => array(
					'en' => 'breaking-all-barriers',
					'de' => 'alle-schranken-fallen',
				),
				'title' => array(
					'en' => 'Breaking all barriers',
					'de' => 'Alle Schranken fallen',
				),
				'comics' => array(
					'number' => 121,
				),
			),
			50 => array(
				'slug' => array(
					'en' => 'xkcd5',
					'de' => 'xkcd5',
				),
				'title' => array(
					'en' => 'XKCD #5',
					'de' => 'XKCD #5',
				),
				'credits' => array(
					'en' => $xkcd_credits['en'],
					'de' => $xkcd_credits['de'],
				),
				'comics' => array(
					'number' => 39,
				),
			),
		);


		/* Pulls data directly from disk 
		$assets_dir = COMICJET_DIR . 'assets/';
		$items = scandir( $assets_dir );

		$all_data = array();
		foreach ( $items as $key => $comic ) {

			$file = $assets_dir . $comic . '/'. $comic . '.data';
			if ( file_exists( $file ) ) {
				$data = $this->_get_single_comic_data( $comic );
				if ( ! empty( $data ) ) {
					$all_data[] = $data;
				}
			}

		}
		*/

		return $data;
	}

	/**
	 * Get comic data for a single comic.
	 *
	 * @param   string $comic  The comic slug
	 * @return  array  $data   All comic data
	 */
	public function _get_single_comic_data( $comic ) {

		$data = array();
		$all_data = $this->_get_comic_all_data();
		foreach ( $all_data as $key => $comic_data ) {
			foreach ( $comic_data['slug'] as $lang => $string ) {
				if ( $comic == $string ) {
					$data = $comic_data;
					break;
				}
			}
		}

		/* Access data directly from disk
		$file = COMICJET_DIR . 'assets/' . $comic . '/' . $comic . '.data';
		$data = array();
		if ( file_exists( $file ) ) {
			$data_json = file_get_contents( $file );
			$data = json_decode( $data_json, true );
		} else {


			$all_comic_data = $this->_get_comic_all_data();
			foreach ( $all_comic_data as $key => $comic_data ) {
				foreach ( $comic_data['slug'] as $lang => $slug ) {
					if ( $slug == $comic ) {
						$comic = $comic_data['slug']['en']; // Grab English slug
						$file = COMICJET_DIR . 'assets/' . $comic . '/' . $comic . '.data';
						$data_json = file_get_contents( $file );
						$data = json_decode( $data_json, true );
					}
				}
			}

		}
		*/

		return $data;
	}

	/**
	 * Get tutorials.
	 *
	 * @param  string  $lang         The language
	 * @param  string  $comic_dir    The comic directory
	 * @param  int     $page_number  The current page number
	 * @return string  $tutorials    The tutorials
	 */
	public function _get_tutorials( $lang, $comic_dir, $page_number ) {
		$data = $this->_get_single_comic_data( $comic_dir );
		if ( isset( $data['tutorials'][$page_number][0]['text'][$lang] ) ) {
			$tutorials = $data['tutorials'][$page_number];
		} else {
			$tutorials = false;
		}

		return $tutorials;
	}

	/**
	 * Get the comic title.
	 *
	 * @param  string  $lang       The language
	 * @param  string  $comic_dir  The comic directory
	 * @return string  $title      The comic title
	 */
	public function _get_comic_title( $lang, $comic_dir ) {
		$data = $this->_get_single_comic_data( $comic_dir );
		if ( isset( $data['title'][$lang] ) ) {
			$title = $data['title'][$lang];
		} else {
			$title = '';
		}

		return $title;
	}

	/**
	 * Get the comic credit text.
	 *
	 * @param  string  $lang       The language
	 * @param  string  $comic_dir  The comic directory
	 * @return string  $title      The comic title
	 */
	public function _get_credits( $lang, $comic_dir ) {
		$data = $this->_get_single_comic_data( $comic_dir );

		if ( isset( $data['credits'][$lang] ) ) {
			$title = $data['credits'][$lang];
		} else {
			$title = '';
		}

		return $title;
	}


	/**
	 * Get the comic credit text.
	 *
	 * @param  string  $comic_slug  The comic directory
	 * @return string  $comic_dir   The comic directory
	 */
	public function _get_comic_dir( $comic_slug ) {
		$comic_dir = $comic_slug;
		$data = array();
		$all_data = $this->_get_comic_all_data();
		foreach ( $all_data as $key => $comic_data ) {
			foreach ( $comic_data['slug'] as $lang => $string ) {
				if ( $comic_slug == $string ) {
					$comic_dir = $comic_data['slug']['en'];
					break;
				}
			}
		}

		return $comic_dir;
	}

	/**
	 * Get the comic credit text.
	 *
	 * @param  string  $comic_slug  The comic directory
	 * @return string  $comic_dir   The comic directory
	 */
	public function _get_number_of_pages( $comic_slug ) {
		$comic_dir = $comic_slug;
		$data = array();
		$all_data = $this->_get_comic_all_data();
		$number = false;
		foreach ( $all_data as $key => $comic_data ) {
			foreach ( $comic_data['slug'] as $lang => $string ) {
				if ( $comic_slug == $string ) {

					// Grab the number of pages
					if ( isset( $comic_data['comics']['number'] ) ) {
						$number = $comic_data['comics']['number'];
					}

					break;
				}
			}
		}

		return $number;
	}

	/**
	 * Get the language name via the language slug.
	 *
	 * @param  string  $lang_slug  The language slug
	 * @return string  $lang_name  The language name
	 */
	public function _get_lang_name( $lang_slug ) {
		$translate = new ComicJet_Model_Translate();
		$lang_name = $translate->languages[$lang_slug];

		return $lang_name;
	}

}
