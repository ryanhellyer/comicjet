function home_page() {

	document.getElementById('site-title').innerHTML = 'Home page (needs translated)';

var content_area = `
<form id="comic-type" name="comic-type" method="post" action="">

			<label>I speak</label>
			<select id="language1" name="language1">
				<option selected="selected" value="en">English</option>
				<option value="de">Deutsch</option>
			</select>

			<span></span>

			<label>I want to learn</label>
			<select id="language2" name="language2">
				<option value="en">English</option>
				<option selected="selected" value="de">Deutsch</option>
			</select>

			<span></span>

			<input type="submit" id="select-language" name="select-language" value="Start learning&nbsp; &gt;" />
		</form>


		<div id="comic-selection">
			<div class="block block-1" id="comic-tutorial">
				<a id="comic-link-1" href="http://comicjet.com/en/de/tutorial/" class="block-inner">
					<img id="comic-thumb-tutorial" src="http://comicjet.com/assets/tutorial/thumbnail-en.jpg" />
					<p>Tutorial</p>
				</a>
			</div>
			<div class="block block-2" id="comic-the-red-hall">
				<a id="comic-link-2" href="http://comicjet.com/en/de/the-red-hall/" class="block-inner">
					<img id="comic-thumb-the-red-hall" src="http://comicjet.com/assets/the-red-hall/thumbnail-en.jpg" />
					<p>The Red Hall</p>
				</a>
			</div>
			<div class="block block-3" id="comic-xkcd1">
				<a id="comic-link-3" href="http://comicjet.com/en/de/xkcd1/" class="block-inner">
					<img id="comic-thumb-xkcd1" src="http://comicjet.com/assets/xkcd1/thumbnail-en.png" />
					<p>XKCD #1</p>
				</a>
			</div>
			<div class="block block-4" id="comic-shadowdancers">
				<a id="comic-link-4" href="http://comicjet.com/en/de/shadowdancers/" class="block-inner">
					<img id="comic-thumb-shadowdancers" src="http://comicjet.com/assets/shadowdancers/thumbnail-en.png" />
					<p>Shadowdancers</p>
				</a>
			</div>
			<div class="block block-5" id="comic-xkcd2">
				<a id="comic-link-5" href="http://comicjet.com/en/de/xkcd2/" class="block-inner">
					<img id="comic-thumb-xkcd2" src="http://comicjet.com/assets/xkcd2/thumbnail-en.png" />
					<p>XKCD #2</p>
				</a>
			</div>
			<div class="block block-6" id="comic-the-tower-in-the-sky">
				<a id="comic-link-6" href="http://comicjet.com/en/de/the-tower-in-the-sky/" class="block-inner">
					<img id="comic-thumb-the-tower-in-the-sky" src="http://comicjet.com/assets/the-tower-in-the-sky/thumbnail-en.png" />
					<p>The tower in the sky</p>
				</a>
			</div>
			<div class="block block-7" id="comic-xkcd3">
				<a id="comic-link-7" href="http://comicjet.com/en/de/xkcd3/" class="block-inner">
					<img id="comic-thumb-xkcd3" src="http://comicjet.com/assets/xkcd3/thumbnail-en.png" />
					<p>XKCD #3</p>
				</a>
			</div>
			<div class="block block-8" id="comic-the-letter-of-jael-bara">
				<a id="comic-link-8" href="http://comicjet.com/en/de/the-letter-of-jael-bara/" class="block-inner">
					<img id="comic-thumb-the-letter-of-jael-bara" src="http://comicjet.com/assets/the-letter-of-jael-bara/thumbnail-en.png" />
					<p>The letter of Jael Bara</p>
				</a>
			</div>
			<div class="block block-9" id="comic-xkcd4">
				<a id="comic-link-9" href="http://comicjet.com/en/de/xkcd4/" class="block-inner">
					<img id="comic-thumb-xkcd4" src="http://comicjet.com/assets/xkcd4/thumbnail-en.png" />
					<p>XKCD #4</p>
				</a>
			</div>
			<div class="block block-10" id="comic-breaking-all-barriers">
				<a id="comic-link-10" href="http://comicjet.com/en/de/breaking-all-barriers/" class="block-inner">
					<img id="comic-thumb-breaking-all-barriers" src="http://comicjet.com/assets/breaking-all-barriers/thumbnail-en.png" />
					<p>Breaking all barriers</p>
				</a>
			</div>
			<div class="block block-11" id="comic-xkcd5">
				<a id="comic-link-11" href="http://comicjet.com/en/de/xkcd5/" class="block-inner">
					<img id="comic-thumb-xkcd5" src="http://comicjet.com/assets/xkcd5/thumbnail-en.png" />
					<p>XKCD #5</p>
				</a>
			</div>
		</div>
`;


/*
	var content_area;
	content_area = content_area.concat( '<form id="comic-type" name="comic-type" method="post" action="">' );
	content_area = content_area.concat( '<label>I speak</label>' );
	content_area = content_area.concat( '<select id="language1" name="language1">' );
	content_area = content_area.concat( '<option selected="selected" value="en">English</option>' );
	content_area = content_area.concat( '<option value="de">Deutsch</option>' );
	content_area = content_area.concat( '</select>' );

	content_area = content_area.concat( '<span></span>' );

	content_area = content_area.concat( '<label>I want to learn</label>' );
	content_area = content_area.concat( '<select id="language2" name="language2">' );
	content_area = content_area.concat( '<option value="en">English</option>' );
	content_area = content_area.concat( '<option selected="selected" value="de">Deutsch</option>' );
	content_area = content_area.concat( '</select>' );

	content_area = content_area.concat( '<span></span>' );

	content_area = content_area.concat( '<input type="submit" id="select-language" name="select-language" value="Start learning&nbsp; &gt;" />' );
	content_area = content_area.concat( '</form>' );
console.log(content_area);
*/
//	document.getElementById('comic').innerHTML = content_area;
//	document.getElementById('comic').innerHTML = 'This should include the big concatenated string but does not.';
	document.getElementById('comic').innerHTML = content_area;

}
