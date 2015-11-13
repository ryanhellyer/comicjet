
		<h1 id="site-title"><?php echo esc_html($this->access_data->_get_comic_title( $this->lang1, $this->comic_dir ) ); ?></h1>
		<h2 id="site-description">page <?php echo esc_html( $this->page_number ); ?></h2>

		<div id="pagination-top">
			<div class="pagination previous-link"><?php echo $this->_get_previous_link(); ?></div>
			<div class="pagination current-language">
				<div onclick="toggle_image()">
					<?php printf( 'Switch to %s', '<span>' . esc_html( $this->languages[$this->lang1] ) . '</span>' ); ?>
				</div>
			</div>
			<div class="pagination next-link"><?php echo $this->_get_next_link(); ?></div>
		</div>

		<div id="comic-display">
			<div class="image-display">
				<img src="<?php echo esc_url( $image_url_lang1 ); ?>" />
				<img id="bubble" onmouseover="this.style.cursor='pointer'" onclick="toggle_image()" src="<?php echo esc_url( $image_url_lang2 ); ?>" />
			</div>

			<div id="pagination-bottom">

				<div class="pagination previous-link"><?php echo $this->_get_previous_link(); ?></div>
					<div class="pagination current-language">
						<div onclick="toggle_image()">
							<?php printf( 'Switch to %s', '<span>' . esc_html( $this->languages[$this->lang1] ) . '</span>' ); ?>
						</div>
					</div>
					<div class="pagination next-link"><?php echo $this->_get_next_link(); ?></div>
				</div>

			</div>
		</div>
<?php

/**
 * Add scripts.
 */

$script_vars['bubble_image_0'] = $image_url_lang1;
if ( isset( $image_url_lang2 ) ) {
	$script_vars['bubble_image_1'] = $image_url_lang2;
}
$script_vars['current_language1'] = "<div onclick=\'toggle_image()\'>Switch to <span>English</span></div>";
$script_vars['current_language2'] = "<div onclick=\'toggle_image()\'>Switch to <span>Deutsch</span></div>";

$script_vars['page_slug'] = $this->comic_slug ;


// Working out the last page number
$count = 1;
while ( $count < COMICJET_MAXIMUM_COMIC_LENGTH ) {
	if ( ! isset( $last_page_number ) ) {
		$file = COMICJET_DIR . 'assets/' . $this->comic_dir . '/' . $count . '-' . $this->lang1 . '.jpg';

		if ( file_exists( $file ) ) {
			$last_page_number = $count;
		}

	}
	$count++;
}

// Set the page number
if ( $last_page_number == $this->page_number ) {
	$script_vars['page_number'] = 'end';
} else {
	$script_vars['page_number'] = $this->page_number;
}

$script_vars['comicjet_root_url'] = COMICJET_URL;
$script_vars['comicjet_slug'] = $this->comic_slug;



if ( 1 != $this->page_number ) {
	$script_vars['comicjet_prev_url'] = $this->_get_previous_url();
}

$dir = COMICJET_DIR . 'assets/' . $this->comic_dir . '/';
$file = $dir . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.jpg';
if ( file_exists( $file ) ) {
	$script_vars['comicjet_next_url'] = $this->_get_next_url();
}

// If second language set, then dynamically change speech bubble onclick
if ( isset( $bubble_image[0] ) ) {
	$scripts[] = 'toggle-image.js';
}

$scripts[] = 'cookie-functions.js';
$scripts[] = 'toggle-image.js';
$scripts[] = 'arrow-key-support.js';
