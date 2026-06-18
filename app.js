/* ==========================================================================
   BEACON HILL RUGS - JS Interactivity & Web Application Logic
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
        
        // Toggle mobile bars animation
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

    // Close mobile menu when clicking nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
                mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            }
        });
    });


    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. Interactive Virtual Showroom Rug Visualizer ---
    const rugButtons = document.querySelectorAll('.rug-select-btn');
    const activeOverlay = document.getElementById('active-rug-overlay');
    const visualizerLoader = document.getElementById('visualizer-loader');
    
    const specTitle = document.getElementById('spec-title');
    const specOrigin = document.getElementById('spec-origin');
    const specPrice = document.getElementById('spec-price');
    
    rugButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Avoid action if button already active
            if (btn.classList.contains('active')) return;
            
            // Toggle active state on buttons
            rugButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show loader & fade out current rug
            visualizerLoader.classList.add('active');
            activeOverlay.style.opacity = '0';
            
            // Extract data attributes
            const targetSrc = btn.getAttribute('data-rug-src');
            const targetTitle = btn.getAttribute('data-title');
            const targetPrice = btn.getAttribute('data-price');
            const targetOrigin = btn.getAttribute('data-origin');
            
            // Load the new image in background
            const tempImg = new Image();
            tempImg.src = targetSrc;
            tempImg.onload = () => {
                // Update image src
                activeOverlay.setAttribute('src', targetSrc);
                activeOverlay.style.opacity = '0.95';
                
                // Update Specs Card
                specTitle.textContent = targetTitle;
                specOrigin.textContent = targetOrigin;
                specPrice.textContent = targetPrice;
                
                // Hide loader
                setTimeout(() => {
                    visualizerLoader.classList.remove('active');
                }, 300);
            };
        });
    });


    // --- 5. "Request In-Home Trial" Linkage ---
    const homeTrialBtn = document.getElementById('btn-request-home-trial');
    const requestSelect = document.getElementById('interest');
    const optTrial = document.getElementById('opt-trial');
    const formMessage = document.getElementById('message');
    
    homeTrialBtn.addEventListener('click', () => {
        // Find current selected rug info
        const activeRug = document.querySelector('.rug-select-btn.active');
        const activeRugTitle = activeRug ? activeRug.getAttribute('data-title') : 'Beacon Hill Classic';
        
        // Select the "In-Home Trial" option in the dropdown
        requestSelect.value = 'trial';
        
        // Auto-fill details in text area
        formMessage.value = `I would like to request a 3-Day In-Home Trial for: "${activeRugTitle}". Let's arrange a time to review options in my home.`;
        
        // Smooth scroll to the contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });


    // --- 6. Form Submission Handling ---
    const form = document.getElementById('consultation-form');
    const successMsg = document.getElementById('form-success');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission
        
        // Simulate sending animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';
        
        setTimeout(() => {
            // Hide the form with a nice fade out
            form.style.opacity = '0';
            
            // Show the success panel
            setTimeout(() => {
                form.style.display = 'none';
                successMsg.classList.add('active');
            }, 400);
        }, 1500);
    });

});
