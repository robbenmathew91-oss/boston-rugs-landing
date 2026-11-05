/* ==========================================================================
   NOOR ORIENTAL RUGS - Knowledge Center: header, mobile menu and article search
   (articles are separate pages in blog/, built by build_blog.py)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');
    
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        mobileToggle.classList.toggle('active');
        
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });


    // --- 3. Search Filtering Logic ---
    const searchInput = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchInput) searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        blogCards.forEach(card => {
            const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const tag = card.querySelector('.blog-card-tag').textContent.toLowerCase();
            
            if (title.includes(query) || excerpt.includes(query) || tag.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

});
