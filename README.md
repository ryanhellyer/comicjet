# comicjet
Comic Jet language learning application

Fix #'s so that that page scrolls to them even when clicking home page links.


TODO:
http://comicbookplus.com/
http://digitalcomicmuseum.com/
http://furycomics.com/
Main comic is creative commons ... http://www.jesusandmo.net/images/jesusogmosmags.pdf (Jesus and Mo)

Tutorial:
	unavoidable - happens on viewing your first comice

Save:
	store last page info and fades out read comics on home page and highlights last one in reading

Nginx redirect all old comic URLs to the new ones
	ie: http://comicjet.com/en/de/breaking-all-barriers/71/ goes to http://comicjet.com/en/de/breaking-all-barriers/#71

Finish "back to comic selection page" button on each comic.
	also needs translated


Convert file formats:
mogrify -format jpg /home/ryan/vagrant/VVV/www/dev.comicjet.com/public/comics/xkcd1/*.png



Language selector:
	Change to single select box, otherwise people click "learn german" and nothing happens.



CREDITS:
Michelle Krüll - bug hunting
Northern Girl - design advice
Nina - UX and UI advice

