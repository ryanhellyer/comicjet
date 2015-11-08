
		<h1 id="site-title"><?php echo esc_html( $this->_get_comic_title( $this->comic_dir ) ); ?></h1>
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
