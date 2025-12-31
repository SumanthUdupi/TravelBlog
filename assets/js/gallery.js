const GalleryLightbox = (() => {
    // Create Lightbox Elements
    const createLightbox = () => {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.ariaLabel = 'Close Gallery';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'lightbox-img-container';

        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';

        content.appendChild(closeBtn);
        content.appendChild(imgContainer);
        content.appendChild(caption);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);

        return { lightbox, closeBtn, imgContainer, caption };
    };

    const init = () => {
        const elements = createLightbox();
        const galleryItems = document.querySelectorAll('.gallery-item');

        const openLightbox = (item) => {
            const placeholder = item.querySelector('.placeholder-img');
            const color = placeholder.style.backgroundColor;
            const text = placeholder.innerText;

            // For real images, we would clone the img tag.
            // For placeholders, we replicate the div.
            elements.imgContainer.innerHTML = '';
            const clone = placeholder.cloneNode(true);
            clone.style.width = '100%';
            clone.style.height = '100%';
            clone.style.transform = 'none'; // Reset hover scale

            elements.imgContainer.appendChild(clone);
            elements.imgContainer.style.backgroundColor = color; // Ensure bg color carries over if div doesn't fill

            elements.caption.innerText = text;
            elements.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            elements.lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => openLightbox(item));
        });

        elements.closeBtn.addEventListener('click', closeLightbox);
        elements.lightbox.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) closeLightbox();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    };

    return { init };
})();

// Add to main init
document.addEventListener('DOMContentLoaded', () => {
    GalleryLightbox.init();
});
