const gallery = document.querySelector('.gallery');
const popover = document.querySelector('#my-popover');
const popImg = popover.querySelector('img');

gallery.addEventListener('click', function (event) {
	if (event.target.tagName == 'IMG') {
		const largeImg = event.target.getAttribute('data-large');

		popImg.setAttribute('src', largeImg);

		// trigger reflow in Safari
		popImg.style.height = 'auto';

		// highlight the currently active list item
		gallery.querySelector('[aria-current]')?.removeAttribute('aria-current');
		event.target.closest('li').setAttribute('aria-current', 'true');
	}
});

popover.addEventListener('click', function (event) {
	if (event.target.tagName == 'BUTTON' && event.target.classList.contains('page')) {

		// find current list item
		const img = gallery.querySelector('[data-large="'+popImg.getAttribute('src')+'"]');
		const listItem = img.closest('li');

		// get index from gallery
		const galleryItems = gallery.querySelectorAll('li');
		const index = Array.from(galleryItems).findIndex(function (searchItem) {
			return searchItem == listItem;
		});

		// calculate next/prev index
		let nextIndex;
		if (event.target.classList.contains('next')) {
			nextIndex = index+1;
			if (index+1 === galleryItems.length) {
				nextIndex = 0;
			}
		} else {
			nextIndex = index-1;
			if (index-1 < 0) {
				nextIndex = galleryItems.length-1;
			}
		}

		// set the new popover image
		const nextImage = galleryItems[nextIndex].querySelector('img').getAttribute('data-large');
		popImg.setAttribute('src', nextImage);

		// highlight the currently active list item
		gallery.querySelector('[aria-current]')?.removeAttribute('aria-current');
		galleryItems[nextIndex].setAttribute('aria-current', 'true');
	}
});
