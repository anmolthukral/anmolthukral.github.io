document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                if (menuToggle) {
                   const icon = menuToggle.querySelector('i');
                   icon.classList.remove('fa-times');
                   icon.classList.add('fa-bars'); 
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const modalGallery = document.getElementById('modal-gallery');
    const closeModal = document.querySelector('.close-modal');

    // Portfolio Data (Extracted from HTML to keep JS clean logic)
    // In a real app this might come from a JSON file, but we'll parse the DOM clicks
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const mainImg = item.getAttribute('data-img');
            // Assuming gallery images are stored in a data attribute as comma separated string
            // or just use the main image for now if gallery data isn't easily available without restructuring
            // For now, let's grab the hidden content within the item if we want to be fancy, 
            // OR simpler: we rely on data attributes I will add to the HTML.
            
            /* 
               The previous HTML had extensive modals. 
               To keep it simple and sleek, we will try to populate the modal 
               dynamically based on the clicked item's attributes.
            */
            
            // Populate Modal
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalImg.src = mainImg;
            
            // Clear previous gallery
            modalGallery.innerHTML = '';

            // If we have extra images defined in data-gallery (e.g. "img/1.png,img/2.png")
            const galleryImages = item.getAttribute('data-gallery');
            if (galleryImages) {
                const images = galleryImages.split(',');
                images.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src.trim();
                    img.className = 'modal-img'; // reuse style
                    modalGallery.appendChild(img);
                });
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
