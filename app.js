/* ==========================================================================
   NOOR ORIENTAL RUGS - JS Interactivity & Web Application Logic
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


    // --- 4. Interactive Virtual Showroom Rug Visualizer (Dynamic Integration) ---
    class InventoryManager {
        constructor() {
            this.inventory = [];
        }

        async fetchInventory() {
            try {
                const response = await fetch('inventory.json');
                if (!response.ok) throw new Error('Network response was not ok');
                this.inventory = await response.json();
                return this.inventory;
            } catch (error) {
                console.error("Could not load inventory data:", error);
                return [];
            }
        }

        getFeaturedRugs(limit = 3) {
            return this.inventory.filter(rug => rug.featured).slice(0, limit);
        }
    }

    const visualizerContainer = document.getElementById('visualizer-options-container');
    const activeOverlay = document.getElementById('active-rug-overlay');
    const visualizerLoader = document.getElementById('visualizer-loader');
    
    const specTitle = document.getElementById('spec-title');
    const specOrigin = document.getElementById('spec-origin');
    const specPrice = document.getElementById('spec-price');
    
    if (visualizerContainer) {
        const inventoryManager = new InventoryManager();
        
        inventoryManager.fetchInventory().then(rugs => {
            if (rugs.length === 0) {
                visualizerContainer.innerHTML = '<p style="color: var(--color-text-muted); padding: 1rem;">Failed to load collections.</p>';
                return;
            }
            
            // Get featured rugs to show as options
            const featuredOptions = inventoryManager.getFeaturedRugs(3);
            
            // Clear loading text
            visualizerContainer.innerHTML = '';
            
            // Generate buttons
            featuredOptions.forEach((rug, index) => {
                const isFirst = index === 0;
                
                const btn = document.createElement('button');
                btn.className = `rug-select-btn ${isFirst ? 'active' : ''}`;
                
                const imgSrc = rug.images && rug.images.length > 0 ? rug.images[0].file : 'images/showroom.png';
                const formatPrice = `From $${rug.price.toLocaleString()}`;
                
                btn.setAttribute('data-rug-src', imgSrc);
                btn.setAttribute('data-title', rug.name);
                btn.setAttribute('data-price', formatPrice);
                btn.setAttribute('data-origin', rug.origin);
                
                btn.innerHTML = `
                    <div class="selector-thumb">
                        <img src="${imgSrc}" alt="${rug.name} Thumbnail" width="1024" height="1024">
                    </div>
                    <div class="selector-info">
                        <h3>${rug.name}</h3>
                        <p>${rug.style}</p>
                    </div>
                `;
                
                visualizerContainer.appendChild(btn);
            });
            
            // Wire up event listeners
            const generatedButtons = document.querySelectorAll('.rug-select-btn');
            
            generatedButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('active')) return;
                    
                    generatedButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    visualizerLoader.classList.add('active');
                    if (activeOverlay) activeOverlay.style.opacity = '0';
                    
                    const targetSrc = btn.getAttribute('data-rug-src');
                    const targetTitle = btn.getAttribute('data-title');
                    const targetPrice = btn.getAttribute('data-price');
                    const targetOrigin = btn.getAttribute('data-origin');
                    
                    const tempImg = new Image();
                    tempImg.src = targetSrc;
                    tempImg.onload = () => {
                        if (activeOverlay) {
                            activeOverlay.setAttribute('src', targetSrc);
                            activeOverlay.style.opacity = '0.95';
                        }
                        
                        if (specTitle) specTitle.textContent = targetTitle;
                        if (specOrigin) specOrigin.textContent = targetOrigin;
                        if (specPrice) specPrice.textContent = targetPrice;
                        
                        setTimeout(() => {
                            if (visualizerLoader) visualizerLoader.classList.remove('active');
                        }, 300);
                    };
                });
            });
            
            // Trigger initial specs card population based on the first featured rug
            if (generatedButtons.length > 0) {
                const firstBtn = generatedButtons[0];
                if (specTitle) specTitle.textContent = firstBtn.getAttribute('data-title');
                if (specOrigin) specOrigin.textContent = firstBtn.getAttribute('data-origin');
                if (specPrice) specPrice.textContent = firstBtn.getAttribute('data-price');
                if (activeOverlay) {
                    activeOverlay.setAttribute('src', firstBtn.getAttribute('data-rug-src'));
                    activeOverlay.style.opacity = '0.95';
                }
            }
        });
    }


    // --- 5. "Request In-Home Trial" Linkage ---
    const homeTrialBtn = document.getElementById('btn-request-home-trial');
    const requestSelect = document.getElementById('interest');
    const optTrial = document.getElementById('opt-trial');
    const formMessage = document.getElementById('message');
    
    if (homeTrialBtn && requestSelect && formMessage) {
        homeTrialBtn.addEventListener('click', () => {
            // Find current selected rug info
            const activeRug = document.querySelector('.rug-select-btn.active');
            const activeRugTitle = activeRug ? activeRug.getAttribute('data-title') : 'Noor Esfahan Classic';
            
            // Select the "In-Home Trial" option in the dropdown
            requestSelect.value = 'trial';
            
            // Auto-fill details in text area
            formMessage.value = `I would like to request a 3-Day In-Home Trial for: "${activeRugTitle}". Let's arrange a time to review options in my home.`;
            
            // Smooth scroll to the contact form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }


    // --- 6. Form Submission Handling ---
    const form = document.getElementById('consultation-form');
    const successMsg = document.getElementById('form-success');
    
    if (form && successMsg) {
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
    }

    // --- 7. Charity Section Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items if open for clean accordion behavior
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
                    }
                });
                
                // Toggle active state
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                } else {
                    item.classList.add('active');
                    // Set max-height dynamically to scrollHeight for smooth transition
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // --- 8. File Upload Input Interactivity ---
    const fileInput = document.getElementById('rug-photos');
    const fileDisplay = document.getElementById('file-name-display');
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                fileDisplay.textContent = files.length === 1 
                    ? files[0].name 
                    : `${files.length} photos selected`;
            } else {
                fileDisplay.textContent = 'No files selected';
            }
        });
    }

    // --- 9. Before/After Slider Logic ---
    const baSliders = document.querySelectorAll('.ba-slider');
    baSliders.forEach(slider => {
        const range = slider.querySelector('.ba-range');
        if (range) {
            range.addEventListener('input', (e) => {
                slider.style.setProperty('--clip-pos', e.target.value + '%');
            });
        }
    });

    // --- 10. Full Inventory Grid Loading (rugs-for-sale.html) ---
    const inventoryGridContainer = document.getElementById('inventory-grid-container');
    if (inventoryGridContainer) {
        // Reuse the InventoryManager defined earlier in app.js
        const inventoryManager = new InventoryManager();
        
        inventoryManager.fetchInventory().then(rugs => {
            inventoryGridContainer.innerHTML = ''; // Clear loading spinner
            
            if (rugs.length === 0) {
                inventoryGridContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted);">No inventory available at the moment.</p>';
                return;
            }
            
            rugs.forEach(rug => {
                const card = document.createElement('article');
                card.className = 'rug-card';
                
                const imgSrc = rug.images && rug.images.length > 0 ? rug.images[0].file : 'images/showroom.png';
                const formatPrice = `From $${rug.price.toLocaleString()}`;
                
                card.innerHTML = `
                    <img src="${imgSrc}" alt="${rug.name}" class="rug-card-image" loading="lazy">
                    <div class="rug-card-content">
                        <div class="rug-card-header">
                            <h2 class="rug-card-title">${rug.name}</h2>
                            <span class="rug-card-origin">${rug.origin}</span>
                        </div>
                        <div class="rug-card-specs">
                            <div class="rug-card-spec-item">
                                <span class="rug-card-spec-label">Size</span>
                                <span class="rug-card-spec-value">${rug.size}</span>
                            </div>
                            <div class="rug-card-spec-item">
                                <span class="rug-card-spec-label">Material</span>
                                <span class="rug-card-spec-value">${rug.material}</span>
                            </div>
                            <div class="rug-card-spec-item">
                                <span class="rug-card-spec-label">Condition</span>
                                <span class="rug-card-spec-value">${rug.condition}</span>
                            </div>
                        </div>
                        <div class="rug-card-footer">
                            <span class="rug-card-price">${formatPrice}</span>
                            <a href="rug-detail.html?slug=${rug.slug}" class="btn btn-primary rug-card-btn">View Details</a>
                        </div>
                    </div>
                `;
                
                inventoryGridContainer.appendChild(card);
            });
        });
    }
    // --- 11. Dynamic Detail Page Loading (rug-detail.html) ---
    const detailContainer = document.getElementById('rug-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (!slug) {
            detailContainer.innerHTML = `
                <div class="error-container">
                    <h1 class="error-title">No Rug Selected</h1>
                    <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Please select a rug from our inventory.</p>
                    <a href="rugs-for-sale.html" class="btn btn-primary">Browse Inventory</a>
                </div>
            `;
        } else {
            const inventoryManager = new InventoryManager();
            inventoryManager.fetchInventory().then(rugs => {
                const rug = rugs.find(r => r.slug === slug);
                
                if (!rug) {
                    detailContainer.innerHTML = `
                        <div class="error-container">
                            <h1 class="error-title">Rug Not Found</h1>
                            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">The rug you are looking for may have been sold or removed.</p>
                            <a href="rugs-for-sale.html" class="btn btn-primary">Browse Inventory</a>
                        </div>
                    `;
                    return;
                }
                
                // --- SEO: Update Dynamic Metadata ---
                // Title Tag
                document.title = rug.seo && rug.seo.title ? rug.seo.title : `${rug.name} | Noor Oriental Rugs`;
                
                // Meta Description
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = 'description';
                    document.head.appendChild(metaDesc);
                }
                const defaultDesc = (rug.description || 'Browse our handmade Persian and Oriental rugs.').substring(0, 155) + '...';
                metaDesc.content = rug.seo && rug.seo.description ? rug.seo.description : defaultDesc;

                // --- Content Generation ---
                const imgSrc = rug.images && rug.images.length > 0 ? rug.images[0].file : 'images/showroom.png';
                const imgAlt = rug.images && rug.images.length > 0 && rug.images[0].alt ? rug.images[0].alt : rug.name;
                const formatPrice = `$${rug.price.toLocaleString()}`;
                
                let specsHTML = '';
                if (rug.specifications) {
                    if (rug.specifications.knotDensity) {
                        specsHTML += `
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Knot Density</span>
                                <span class="rug-detail-spec-value">${rug.specifications.knotDensity}</span>
                            </div>
                        `;
                    }
                    if (rug.specifications.pileHeight) {
                        specsHTML += `
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Pile Height</span>
                                <span class="rug-detail-spec-value">${rug.specifications.pileHeight}</span>
                            </div>
                        `;
                    }
                    if (rug.specifications.dyes) {
                        specsHTML += `
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Dyes</span>
                                <span class="rug-detail-spec-value">${rug.specifications.dyes}</span>
                            </div>
                        `;
                    }
                    if (rug.specifications.foundation) {
                        specsHTML += `
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Foundation</span>
                                <span class="rug-detail-spec-value">${rug.specifications.foundation}</span>
                            </div>
                        `;
                    }
                }
                
                detailContainer.className = 'rug-detail-layout';
                detailContainer.innerHTML = `
                    <div class="rug-detail-image-column">
                        <div class="rug-detail-image-wrapper">
                            <img src="${imgSrc}" alt="${imgAlt}" class="rug-detail-main-img">
                        </div>
                    </div>
                    <div class="rug-detail-info">
                        <!-- H1: Main Title -->
                        <h1 class="rug-detail-title">${rug.name}</h1>
                        <span class="rug-detail-origin">${rug.origin}</span>
                        
                        <div class="rug-detail-price">${formatPrice}</div>
                        
                        <div class="rug-detail-specs-grid">
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Availability</span>
                                <span class="rug-detail-spec-value" style="color: var(--color-primary);">${rug.availability}</span>
                            </div>
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Size</span>
                                <span class="rug-detail-spec-value">${rug.size}</span>
                            </div>
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Style</span>
                                <span class="rug-detail-spec-value">${rug.style}</span>
                            </div>
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Material</span>
                                <span class="rug-detail-spec-value">${rug.material}</span>
                            </div>
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Age</span>
                                <span class="rug-detail-spec-value">${rug.age}</span>
                            </div>
                            <div class="rug-detail-spec-box">
                                <span class="rug-detail-spec-label">Condition</span>
                                <span class="rug-detail-spec-value">${rug.condition}</span>
                            </div>
                        </div>
                        
                        <!-- Semantic H2 Headings -->
                        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-text);">Description</h2>
                        <p class="rug-detail-desc">${rug.description || 'A beautiful piece curated by Noor Oriental Rugs.'}</p>
                        
                        ${specsHTML ? `
                            <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: var(--color-text);">Specifications</h2>
                            <div class="rug-detail-specs-grid">${specsHTML}</div>
                        ` : ''}

                        <!-- Internal Contextual Links -->
                        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 3rem; margin-bottom: 1rem; color: var(--color-text);">Related Rugs & Services</h2>
                        <ul style="list-style: none; padding: 0; line-height: 1.8; margin-bottom: 2rem;">
                            <li><i class="fa-solid fa-arrow-right" style="color: var(--color-primary); font-size: 0.8rem; margin-right: 0.5rem;"></i> <a href="rugs-for-sale.html" style="color: var(--color-text-muted); text-decoration: underline;">Browse More Rugs for Sale</a></li>
                            <li><i class="fa-solid fa-arrow-right" style="color: var(--color-primary); font-size: 0.8rem; margin-right: 0.5rem;"></i> <a href="rug-cleaning.html" style="color: var(--color-text-muted); text-decoration: underline;">Professional Rug Cleaning</a></li>
                            <li><i class="fa-solid fa-arrow-right" style="color: var(--color-primary); font-size: 0.8rem; margin-right: 0.5rem;"></i> <a href="rug-restoration.html" style="color: var(--color-text-muted); text-decoration: underline;">Rug Restoration Services</a></li>
                            <li><i class="fa-solid fa-arrow-right" style="color: var(--color-primary); font-size: 0.8rem; margin-right: 0.5rem;"></i> <a href="restoration-gallery.html" style="color: var(--color-text-muted); text-decoration: underline;">Restoration Before & After Gallery</a></li>
                        </ul>

                        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: var(--color-text);">Visit Our Showroom</h2>
                        <p style="color: var(--color-text-muted); margin-bottom: 1rem;">Interested in this piece? <a href="index.html#contact" style="color: var(--color-primary); text-decoration: underline; font-weight: 500;">Contact us for a free evaluation</a> or to schedule an in-home trial in the Boston area.</p>
                    </div>
                `;
            });
        }
    }

});
