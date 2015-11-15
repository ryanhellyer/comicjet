
		<h1 id="site-title"><?php echo esc_html($this->access_data->_get_comic_title( $this->lang1, $this->comic_dir ) ); ?></h1>
		<h2 id="site-description">page <?php echo esc_html( $this->page_number ); ?></h2>

		<div id="pagination-top">
			<div class="pagination previous-link"><?php echo $this->_get_previous_link(); ?></div>
			<div class="pagination current-language">
				<div onclick="toggle_image()">
					<?php printf( $translate->convert( 'Switch to %s' ), '<span>' . esc_html( $translate->languages[$this->lang1] ) . '</span>' ); ?>
				</div>
			</div>
			<div class="pagination next-link"><?php echo $this->_get_next_link(); ?></div>
		</div>

		<div id="comic-display">
			<div class="image-display">
				<img src="<?php echo esc_url( $image_url_lang1 ); ?>" />
				<img id="bubble" onmouseover="this.style.cursor='pointer'" onclick="toggle_image()" src="<?php echo esc_url( $image_url_lang2 ); ?>" /><?php
			$credits = $this->access_data->_get_credits( $this->lang1, $this->comic_dir );
			if ( $credits ) {
				?>

				<p class="credits"><?php echo escape_content( $credits ); ?></p><?php
			}
			?>

			</div>

			<div id="pagination-bottom">

				<div class="pagination previous-link"><?php echo $this->_get_previous_link(); ?></div>
					<div class="pagination current-language">
						<div onclick="toggle_image()">
							<?php printf( $translate->convert( 'Switch to %s' ), '<span>' . esc_html( $translate->languages[$this->lang1] ) . '</span>' ); ?>
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
$script_vars['current_language1'] = "<div onclick=\'toggle_image()\'>" . sprintf( $translate->convert( 'Switch to %s' ), ' <span>' . esc_html( $this->access_data->_get_lang_name( $this->lang1 ) ) . '</span>' ) . '</div>';
$script_vars['current_language2'] = "<div onclick=\'toggle_image()\'>" . sprintf( $translate->convert( 'Switch to %s' ), ' <span>' . esc_html( $this->access_data->_get_lang_name( $this->lang2 ) ) . '</span>' ) . '</div>';

$script_vars['page_slug'] = $this->comic_slug ;


$file = COMICJET_DIR . 'assets/' . $this->comic_dir . '/' . ( $this->page_number + 1 ) . '-' . $this->lang1 . '.';
if ( file_exists( $file . 'jpg' ) || file_exists( $file . 'png' ) ) {
	$script_vars['comicjet_next_url'] = $this->_get_next_url();
	$script_vars['page_number'] = $this->page_number;
} else {
	$script_vars['page_number'] = 'end';
}

$script_vars['comicjet_root_url'] = COMICJET_URL;
$script_vars['comicjet_slug'] = $this->access_data->_get_comic_dir( $this->comic_slug );

// Get previous URL
if ( 1 != $this->page_number ) {
	$script_vars['comicjet_prev_url'] = $this->_get_previous_url();
}


// If second language set, then dynamically change speech bubble onclick
if ( isset( $bubble_image[0] ) ) {
	$scripts[] = 'toggle-image.js';
}

$scripts[] = 'toggle-image.js';
$scripts[] = 'arrow-key-support.js';
