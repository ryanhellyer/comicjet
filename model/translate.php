<?php

/**
 * Translation class.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 */
class ComicJet_Model_Translate {

	/**
	 * Available languages.
	 */
	public $languages = array(
		'en' => 'English',
		'nb' => 'Norsk Bokmål',
	);

	/**
	 * Massive list of translated strings.
	 *
	 * @access private
	 */
	private $translations = array(
		0 => array(
			'en' => 'About',
			'nb' => 'Om',
		),
		1 => array(
			'en' => 'about',
			'nb' => 'om',
		),
	);

	/**
	 * Translate strings.
	 *
	 * @param  string  $string  The string to be translated
	 * @param  string  $lang1   The language being translated from
	 * @param  string  $lang2   The language being translated to
	 * @return string  The language was translated, so giving up and spitting out original string
	 */
	protected function translate( $string, $lang1, $lang2 ) {

		// Loop through every string
		foreach ( $this->translations as $key => $translation ) {

			// Loop through every translation of that string
			foreach ( $translation as $lang => $translated_string ) {			

				// If string matches current translated string
				if ( $string == $translated_string && $lang == $lang1 ) {

					// If translation exists, spit it out
					if ( isset( $translation[$lang2] ) ) {
						return $translation[$lang2];
					}
				}
			}
		}

		return $string;
	}

}
