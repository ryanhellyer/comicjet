# comicjet
Comic Jet language learning application


TODO:
http://comicbookplus.com/
http://digitalcomicmuseum.com/
http://furycomics.com/
Main comic is creative commons ... http://www.jesusandmo.net/images/jesusogmosmags.pdf (Jesus and Mo)

Tutorial:
	unavoidable - happens on viewing your first comic

Save:
	store last page info and fades out read comics on home page and highlights last one in reading

Nina and F
	Remove comics on first page
		Show background image with person reading tablet
		On click "Get started" (changed from begin learning), start tutorial
	Home page
		Maybe move comic title above image
		Maybe make thumbnails less tall
	Make comics skinnier at desktop

Annika,
	Title in comics should be smaller
	Logo is shit 
	Get started button is diffidence shape

Nginx redirect all old comic URLs to the new ones
	ie: http://comicjet.com/en/de/breaking-all-barriers/71/ goes to http://comicjet.com/en/de/breaking-all-barriers/#71

Finish "back to comic selection page" button on each comic.
	also needs translated


Convert file formats:
mogrify -format jpg /home/ryan/vagrant/VVV/www/dev.comicjet.com/public/comics/xkcd1/*.png







Tutorial:

Have text which shows, then disappears once they've clicked comic. It stays fixed to bottom of page rather than bottom of comic, so that it's always present.


Huge radial circle, heart beat in middle.

"Tap to switch languages"

Have it stay on every single comic, until clicked.

On desktop: follow mouse cursor perhaps.
