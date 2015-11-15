	</div>
</div>

</div>

<footer>
	<p>
		<?php echo esc_html( sprintf( $translate->convert( 'Copyright &copy; %s Comic Jet.' ), date( 'Y' ) ) ); ?>
		Generated in <?php echo round( ( 1000 * ( microtime( true ) - COMICJET_TIMER ) ), 2 ); ?> ms.
		<!--
		HTML output start at: <?php echo COMICJET_HEADER_TIMER; ?> ms.
		Start of footer at: <?php echo COMICJET_FOOTER_TIMER; ?> ms.
		-->
	</p>
</footer>

<?php echo $this->scripts( $script_vars, $scripts ); ?>

</body>
</html>