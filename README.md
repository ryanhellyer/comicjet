# comicjet
Comic Jet language learning application


TODO:

/ - home page
	Remove redirect
	Force user to enter language selection to reach actual page

/tutorial/ - tutorial page
	Decide where button will be.
	1. Shows flashing language selector form
	2. Shows comic with flashing language selector button
		- comic has arrow pointing to speech bubble stating the current language
	3. Changes comic language as per usual
		- comic has arrow pointing to speech bubble stating new language
	This can be implemented with only a flashing button, and the arrow and text can be held within the image.
	Load via comic template.
		Add JS in router to provide flashing button effect
