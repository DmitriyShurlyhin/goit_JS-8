import items from './gallery-items.js';

// Refs
const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector(
        'button[data-action="close-lightbox"]',
    ),
    lightboxContent: document.querySelector('.lightbox__content'),
    lightboxOverlay: document.querySelector('.lightbox__overlay')
};

const createGallery = ({ original, preview, description }) => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', original);

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('gallery__image');
    galleryImg.setAttribute('src', preview);
    galleryImg.setAttribute('data-source', original);
    galleryImg.setAttribute('alt', description);

    galleryLink.appendChild(galleryImg);
    galleryItem.appendChild(galleryLink);
    refs.gallery.appendChild(galleryItem);

    return galleryItem;
};

const galleryItems = items.map(item => createGallery(item));

refs.gallery.append(...galleryItems);

const openModal = event => {
    event.preventDefault();

    window.addEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onPressRight);
    window.addEventListener('keydown', onPressLeft);

    if (event.target === event.currentTarget) {
        return;
    }

    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = event.target.getAttribute('data-source');
    refs.lightboxImage.alt = event.target.alt;
};

const closeModal = () => {
    window.removeEventListener('keydown', onPressEsc);
    window.removeEventListener('keydown', onPressRight);
    window.removeEventListener('keydown', onPressLeft);

    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
};

const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

function onPressEsc(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
}

function onPressRight(event) {
    if (event.code === 'ArrowRight') {
        onRightNext();
    }
}

function onPressLeft(event) {
    if (event.code === 'ArrowLeft') {
        onLeftNext(items, refs.lightboxImage);
    }
}

function onRightNext() {
    const activeImg = items.find(
        img => img.original === refs.lightboxImage.src,
    );
    let index = activeImg ? items.indexOf(activeImg) : 0;

    if (index < items.length - 1) {
        index += 1;
    } else {
        index = 0;
    }

    refs.lightboxImage.src = items[index].original;
    refs.lightboxImage.alt = items[index].description;
}

function onLeftNext(arr, ref) {
    const activeImg = arr.find(img => img.original === ref.src);
    let index = activeImg ? arr.indexOf(activeImg) : 0;

    if (index > 0) {
        index -= 1;
    } else {
        index = arr.length - 1;
    }

    ref.src = arr[index].original;
    ref.alt = arr[index].description;
}

// Listeners
refs.gallery.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
// refs.lightboxContent.addEventListener('click', onOverlayClick);

refs.lightboxOverlay.addEventListener('click', onOverlayClick);
