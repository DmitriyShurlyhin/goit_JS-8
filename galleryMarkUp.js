import gallery from './gallery-items.js'

// console.log(gallery);

const container = document.querySelector('.js-gallery');
const cardMarkUp = createGalleryHtml(gallery);

container.insertAdjacentHTML('afterbegin', cardMarkUp);

function createGalleryHtml(gallery) {
    
    return gallery
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
        .join('')
    
}

createGalleryHtml(gallery);

// REFS
const galleryItems = document.querySelector('.gallery__item');
const lightboxEl = document.querySelector('.lightbox');
const modalClose = document.querySelector('[data-action="close-lightbox"]')

// OPEN MODAL 
const addClass = (evt) => {
    evt.preventDefault();
    lightboxEl.classList.add('is-open')
}
galleryItems.addEventListener('click', addClass)

// CLOSE MODAL 
const removeClass = (evt) => {
    lightboxEl.classList.remove('is-open')
}
modalClose.addEventListener('click', removeClass)