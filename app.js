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

    // --- 10. Full Inventory Grid & Filtering (rugs-for-sale.html) ---
    const inventoryGridContainer = document.getElementById('inventory-grid-container');
    if (inventoryGridContainer) {
        const inventoryManager = new InventoryManager();
        let allRugs = [];
        let activeFilters = {
            collection: new Set(),
            style: new Set(),
            size: new Set(),
            material: new Set(),
            price: null
        };

        const filterStyleContainer = document.getElementById('filter-style');
        const filterSizeContainer = document.getElementById('filter-size');
        const filterMaterialContainer = document.getElementById('filter-material');
        const inventoryCount = document.getElementById('inventory-count');
        const clearFiltersBtn = document.getElementById('clear-filters-btn');

        inventoryManager.fetchInventory().then(rugs => {
            allRugs = rugs;
            
            // 1. Extract dynamic filter options
            const collections = new Set();
            const styles = new Set();
            const sizes = new Set();
            const materials = new Set();
            
            rugs.forEach(rug => {
                if (rug.collection) collections.add(rug.collection);
                if (rug.style) styles.add(rug.style);
                if (rug.size) sizes.add(rug.size);
                if (rug.material) materials.add(rug.material);
            });

            // 2. Render Checkboxes
            const renderCheckboxes = (container, items, filterType) => {
                if (!container) return;
                
                let sortedItems = Array.from(items);
                if (filterType === 'size') {
                    const sizeOrder = [
                        'Runner',
                        "3' x 5'",
                        "4' x 6'",
                        "5' x 8'",
                        "6' x 9'",
                        "8' x 10'",
                        "9' x 12'",
                        "10' x 14'",
                        "Oversized"
                    ];
                    sortedItems.sort((a, b) => {
                        let idxA = sizeOrder.indexOf(a);
                        let idxB = sizeOrder.indexOf(b);
                        if (idxA === -1) idxA = 999;
                        if (idxB === -1) idxB = 999;
                        if (idxA === idxB) return a.localeCompare(b);
                        return idxA - idxB;
                    });
                } else {
                    sortedItems.sort();
                }
                
                sortedItems.forEach(item => {
                    const label = document.createElement('label');
                    label.className = 'filter-label';
                    label.innerHTML = `<input type="checkbox" value="${item}" data-filter-type="${filterType}">
                        <div class="checkbox-custom"></div>
                        <span class="filter-name">${item}</span>
                        <span class="filter-count">(0)</span>`;
                    container.appendChild(label);
                });
            };

            const filterCollectionContainer = document.getElementById('filter-collection');
            renderCheckboxes(filterCollectionContainer, collections, 'collection');
            renderCheckboxes(filterStyleContainer, styles, 'style');
            renderCheckboxes(filterSizeContainer, sizes, 'size');
            renderCheckboxes(filterMaterialContainer, materials, 'material');

            // 3. Sync Logic & Event Listeners
            const updateURL = () => {
                const params = new URLSearchParams();
                
                if (activeFilters.style.size > 0) params.set('style', Array.from(activeFilters.style).join(','));
                if (activeFilters.size.size > 0) params.set('size', Array.from(activeFilters.size).join(','));
                if (activeFilters.material.size > 0) params.set('material', Array.from(activeFilters.material).join(','));
                if (activeFilters.price && (activeFilters.price.min > 0 || activeFilters.price.max < 10000)) {
                    params.set('price', `${activeFilters.price.min}-${activeFilters.price.max}`);
                }
                if (activeFilters.collection.size > 0) params.set('collection', Array.from(activeFilters.collection).join(','));
                
                const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
                window.history.pushState({ filters: true }, '', newUrl);
            };

            const loadFiltersFromURL = () => {
                const params = new URLSearchParams(window.location.search);
                
                activeFilters.style.clear();
                activeFilters.size.clear();
                activeFilters.material.clear();
                activeFilters.price = null;
                activeFilters.collection.clear();
                
                const styleParam = params.get('style');
                if (styleParam) styleParam.split(',').forEach(s => activeFilters.style.add(s));
                
                const sizeParam = params.get('size');
                if (sizeParam) sizeParam.split(',').forEach(s => activeFilters.size.add(s));
                
                const materialParam = params.get('material');
                if (materialParam) materialParam.split(',').forEach(m => activeFilters.material.add(m));
                
                const priceParam = params.get('price');
                if (priceParam) {
                    const parts = priceParam.split('-');
                    if (parts.length === 2) {
                        activeFilters.price = { min: parseInt(parts[0]), max: parseInt(parts[1]) };
                    }
                }

                const collectionParam = params.get('collection');
                if (collectionParam) collectionParam.split(',').forEach(c => activeFilters.collection.add(c));
                
                // Sync UI checkboxes and radios
                document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
                    const type = cb.getAttribute('data-filter-type');
                    if (type && activeFilters[type]) {
                        cb.checked = activeFilters[type].has(cb.value);
                    }
                });
                
                const priceMin = document.getElementById('price-min');
                const priceMax = document.getElementById('price-max');
                if (priceMin && priceMax) {
                    if (activeFilters.price) {
                        priceMin.value = activeFilters.price.min;
                        priceMax.value = activeFilters.price.max;
                    } else {
                        priceMin.value = 0;
                        priceMax.value = 10000;
                    }
                    if (typeof updatePriceUI === 'function') updatePriceUI();
                }
            };

            const attachFilterEvents = () => {
                const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.addEventListener('change', (e) => {
                        const type = e.target.getAttribute('data-filter-type');
                        if (type && activeFilters[type]) {
                            if (e.target.checked) {
                                activeFilters[type].add(e.target.value);
                            } else {
                                activeFilters[type].delete(e.target.value);
                            }
                            updateURL();
                            renderGrid();
                        }
                    });
                });

                // Price Slider Logic
                const priceMin = document.getElementById('price-min');
                const priceMax = document.getElementById('price-max');
                const priceDisplay = document.getElementById('price-display');
                const priceTrack = document.getElementById('price-range-track');

                window.updatePriceUI = () => {
                    if (!priceMin || !priceMax) return;
                    let minVal = parseInt(priceMin.value);
                    let maxVal = parseInt(priceMax.value);

                    if (minVal > maxVal) {
                        let tmp = minVal;
                        minVal = maxVal;
                        maxVal = tmp;
                    }

                    if (priceDisplay) {
                        priceDisplay.innerHTML = `$${minVal.toLocaleString()} &mdash; $${maxVal >= 10000 ? '10,000+' : maxVal.toLocaleString()}`;
                    }

                    if (priceTrack) {
                        const minPercent = (minVal / 10000) * 100;
                        const maxPercent = (maxVal / 10000) * 100;
                        priceTrack.style.left = `${minPercent}%`;
                        priceTrack.style.right = `${100 - maxPercent}%`;
                    }
                };

                const handlePriceChange = () => {
                    let minVal = parseInt(priceMin.value);
                    let maxVal = parseInt(priceMax.value);
                    
                    if (minVal > maxVal) {
                        let tmp = minVal;
                        minVal = maxVal;
                        maxVal = tmp;
                        priceMin.value = minVal;
                        priceMax.value = maxVal;
                    }

                    activeFilters.price = { min: minVal, max: maxVal };
                    updateURL();
                    renderGrid();
                };

                if (priceMin && priceMax) {
                    priceMin.addEventListener('input', window.updatePriceUI);
                    priceMax.addEventListener('input', window.updatePriceUI);
                    
                    priceMin.addEventListener('change', handlePriceChange);
                    priceMax.addEventListener('change', handlePriceChange);
                    
                    window.updatePriceUI();
                }

                if (clearFiltersBtn) {
                    clearFiltersBtn.addEventListener('click', () => {
                        activeFilters.style.clear();
                        activeFilters.size.clear();
                        activeFilters.material.clear();
                        activeFilters.price = null;
                        activeFilters.collection.clear();
                        
                        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
                        const priceMin = document.getElementById('price-min');
                        const priceMax = document.getElementById('price-max');
                        if (priceMin && priceMax) {
                            priceMin.value = 0;
                            priceMax.value = 10000;
                            if (typeof window.updatePriceUI === 'function') window.updatePriceUI();
                        }
                        
                        updateURL();
                        renderGrid();
                    });
                }
                
                // Handle browser Back/Forward navigation
                window.addEventListener('popstate', () => {
                    loadFiltersFromURL();
                    renderGrid();
                });
            };

            attachFilterEvents();

            // 4. Render Grid Logic
            const renderGrid = () => {
                let filteredRugs = allRugs;

                // Apply Collection
                if (activeFilters.collection.size > 0) {
                    filteredRugs = filteredRugs.filter(rug => activeFilters.collection.has(rug.collection));
                }

                // Apply Styles
                if (activeFilters.style.size > 0) {
                    filteredRugs = filteredRugs.filter(rug => activeFilters.style.has(rug.style));
                }
                
                // Apply Sizes
                if (activeFilters.size.size > 0) {
                    filteredRugs = filteredRugs.filter(rug => activeFilters.size.has(rug.size));
                }

                // Apply Materials
                if (activeFilters.material.size > 0) {
                    filteredRugs = filteredRugs.filter(rug => activeFilters.material.has(rug.material));
                }

                // Apply Price
                if (activeFilters.price) {
                    filteredRugs = filteredRugs.filter(rug => {
                        const price = rug.price;
                        const min = activeFilters.price.min;
                        const max = activeFilters.price.max;
                        
                        if (price < min) return false;
                        if (max < 10000 && price > max) return false;
                        return true;
                    });
                }

                const updateFilterCounts = () => {
                    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
                    checkboxes.forEach(cb => {
                        const filterType = cb.getAttribute('data-filter-type');
                        const value = cb.value;
                        let count = 0;
                        allRugs.forEach(rug => {
                            let matchesOther = true;
                            if (filterType !== 'collection' && activeFilters.collection.size > 0 && !activeFilters.collection.has(rug.collection)) matchesOther = false;
                            if (filterType !== 'style' && activeFilters.style.size > 0 && !activeFilters.style.has(rug.style)) matchesOther = false;
                            if (filterType !== 'size' && activeFilters.size.size > 0 && !activeFilters.size.has(rug.size)) matchesOther = false;
                            if (filterType !== 'material' && activeFilters.material.size > 0 && !activeFilters.material.has(rug.material)) matchesOther = false;
                            if (activeFilters.price) {
                                if (rug.price < activeFilters.price.min) matchesOther = false;
                                if (activeFilters.price.max < 10000 && rug.price > activeFilters.price.max) matchesOther = false;
                            }
                            if (matchesOther && rug[filterType] === value) count++;
                        });
                        
                        const countSpan = cb.parentElement.querySelector('.filter-count');
                        if (countSpan) countSpan.textContent = `(${count})`;
                    });
                };

                const renderFilterChips = () => {
                    let chipContainer = document.getElementById('active-filter-chips');
                    if (!chipContainer) {
                        const inventoryHeader = document.querySelector('.inventory-results-header');
                        if (inventoryHeader) {
                            chipContainer = document.createElement('div');
                            chipContainer.id = 'active-filter-chips';
                            chipContainer.className = 'active-filter-chips';
                            inventoryHeader.parentNode.insertBefore(chipContainer, inventoryHeader.nextSibling);
                        } else return;
                    }
                    
                    chipContainer.innerHTML = '';
                    let hasFilters = false;
                    
                    const addChip = (text, type, val) => {
                        hasFilters = true;
                        const chip = document.createElement('div');
                        chip.className = 'filter-chip';
                        chip.innerHTML = `<span>${text}</span> <i class="fa-solid fa-xmark"></i>`;
                        chip.addEventListener('click', () => {
                            if (type === 'price') {
                                activeFilters.price = null;
                                const priceMin = document.getElementById('price-min');
                                const priceMax = document.getElementById('price-max');
                                if (priceMin && priceMax) {
                                    priceMin.value = 0; priceMax.value = 10000;
                                    if (typeof window.updatePriceUI === 'function') window.updatePriceUI();
                                }
                            } else {
                                activeFilters[type].delete(val);
                                const cb = document.querySelector(`.filter-options input[data-filter-type="${type}"][value="${val}"]`);
                                if (cb) cb.checked = false;
                            }
                            updateURL();
                            renderGrid();
                        });
                        chipContainer.appendChild(chip);
                    };

                    activeFilters.collection.forEach(val => addChip(val, 'collection', val));
                    activeFilters.style.forEach(val => addChip(val, 'style', val));
                    activeFilters.size.forEach(val => addChip(val, 'size', val));
                    activeFilters.material.forEach(val => addChip(val, 'material', val));
                    
                    if (activeFilters.price && (activeFilters.price.min > 0 || activeFilters.price.max < 10000)) {
                        const minStr = activeFilters.price.min.toLocaleString();
                        const maxStr = activeFilters.price.max >= 10000 ? '10,000+' : activeFilters.price.max.toLocaleString();
                        addChip(`Price: $${minStr}–$${maxStr}`, 'price', null);
                    }

                    if (hasFilters) {
                        const clearBtn = document.createElement('div');
                        clearBtn.className = 'filter-chip clear-all';
                        clearBtn.textContent = 'Clear All';
                        clearBtn.addEventListener('click', () => {
                            const clearSidebarBtn = document.getElementById('clear-filters');
                            if (clearSidebarBtn) clearSidebarBtn.click();
                        });
                        chipContainer.appendChild(clearBtn);
                    }
                };

                updateFilterCounts();
                renderFilterChips();


                // Update UI
                inventoryGridContainer.innerHTML = '';
                if (inventoryCount) {
                    inventoryCount.textContent = `Showing ${filteredRugs.length} ${filteredRugs.length === 1 ? 'rug' : 'rugs'}`;
                }

                if (filteredRugs.length === 0) {
                    inventoryGridContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 4rem;">No rugs found matching your filters. Try adjusting your selections.</p>';
                    return;
                }

                filteredRugs.forEach(rug => {
                    const card = document.createElement('article');
                    card.className = 'rug-card';
                    
                    const imgSrc = rug.images && rug.images.length > 0 ? rug.images[0].file : 'images/showroom.png';
                    const formatPrice = `$${rug.price.toLocaleString()}`;
                    
                    card.innerHTML = `
                        <div class="rug-card-img-wrapper">
                            <img src="${imgSrc}" alt="${rug.name}" class="rug-card-image" loading="lazy">
                        </div>
                        <div class="rug-card-content">
                            <div class="rug-card-header">
                                <h2 class="rug-card-title"><a href="rug-detail.html?slug=${rug.slug}" class="stretched-link">${rug.name}</a></h2>
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
            };


            // 5. Collapsible Filter Sections
            const filterTitleBtns = document.querySelectorAll('.filter-title-btn');
            const isMobile = window.innerWidth <= 768;
            
            filterTitleBtns.forEach(btn => {
                const controlsId = btn.getAttribute('aria-controls');
                const content = document.getElementById(controlsId);
                if (!content) return;
                
                if (isMobile) {
                    btn.setAttribute('aria-expanded', 'false');
                    content.classList.add('collapsed');
                } else {
                    btn.setAttribute('aria-expanded', 'true');
                    content.classList.remove('collapsed');
                }

                btn.addEventListener('click', () => {
                    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                    if (isExpanded) {
                        btn.setAttribute('aria-expanded', 'false');
                        content.classList.add('collapsed');
                    } else {
                        btn.setAttribute('aria-expanded', 'true');
                        content.classList.remove('collapsed');
                    }
                });
            });

            // Initial Render
            loadFiltersFromURL();
            renderGrid();
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

                // --- Update Visible Breadcrumbs ---
                const breadcrumbContainer = document.getElementById('rug-breadcrumb-container');
                if (breadcrumbContainer) {
                    breadcrumbContainer.innerHTML = `
                        <a href="index.html" style="color: var(--color-text-muted); text-decoration: none;">Home</a>
                        <span style="margin: 0 0.5rem;">/</span>
                        <a href="rugs-for-sale.html" style="color: var(--color-text-muted); text-decoration: none;">Rugs for Sale</a>
                        <span style="margin: 0 0.5rem;">/</span>
                        <span style="color: var(--color-text);">${rug.name}</span>
                    `;
                }

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

                // --- Schema Markup (JSON-LD) ---
                let availabilitySchema = "https://schema.org/InStock";
                if (rug.availability && rug.availability.toLowerCase().includes("reserved")) {
                    availabilitySchema = "https://schema.org/LimitedAvailability";
                } else if (rug.availability && rug.availability.toLowerCase().includes("sold")) {
                    availabilitySchema = "https://schema.org/SoldOut";
                }
                
                const currentUrl = window.location.href;
                
                // Build additionalProperty array for specifications
                const additionalProperties = [];
                if (rug.specifications) {
                    if (rug.specifications.foundation) additionalProperties.push({ "@type": "PropertyValue", "name": "Foundation", "value": rug.specifications.foundation });
                    if (rug.specifications.knotDensity) additionalProperties.push({ "@type": "PropertyValue", "name": "Knot Density", "value": rug.specifications.knotDensity });
                    if (rug.specifications.dyes) additionalProperties.push({ "@type": "PropertyValue", "name": "Dyes", "value": rug.specifications.dyes });
                }
                if (rug.age) additionalProperties.push({ "@type": "PropertyValue", "name": "Age", "value": rug.age });

                const productSchema = {
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": rug.name,
                    "description": rug.description || defaultDesc,
                    "image": rug.images && rug.images.length > 0 ? rug.images.map(img => window.location.origin + '/' + img.file) : [],
                    "sku": rug.inventory_id,
                    "brand": {
                        "@type": "Brand",
                        "name": "Noor Oriental Rugs"
                    },
                    "material": rug.material,
                    "category": rug.style,
                    "itemCondition": rug.condition ? `Condition: ${rug.condition}` : "https://schema.org/UsedCondition",
                    "size": rug.size,
                    "additionalProperty": additionalProperties,
                    "url": currentUrl,
                    "offers": {
                        "@type": "Offer",
                        "price": rug.price,
                        "priceCurrency": "USD",
                        "availability": availabilitySchema,
                        "url": currentUrl
                    }
                };

                // Remove old schema if navigating client-side (future proofing)
                let oldSchema = document.getElementById("product-schema");
                if (oldSchema) oldSchema.remove();

                const script = document.createElement('script');
                script.id = "product-schema";
                script.type = 'application/ld+json';
                script.text = JSON.stringify(productSchema, null, 2);
                document.head.appendChild(script);

                // --- BreadcrumbList Schema ---
                const breadcrumbSchema = {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": window.location.origin + "/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Rugs for Sale",
                            "item": window.location.origin + "/rugs-for-sale.html"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": rug.name,
                            "item": currentUrl
                        }
                    ]
                };

                let oldBreadcrumbSchema = document.getElementById("breadcrumb-schema");
                if (oldBreadcrumbSchema) oldBreadcrumbSchema.remove();
                const breadcrumbScript = document.createElement('script');
                breadcrumbScript.id = "breadcrumb-schema";
                breadcrumbScript.type = 'application/ld+json';
                breadcrumbScript.text = JSON.stringify(breadcrumbSchema, null, 2);
                document.head.appendChild(breadcrumbScript);

                // --- ImageObject Schema ---
                if (rug.images && rug.images.length > 0) {
                    const imageSchemas = rug.images.map(img => ({
                        "@context": "https://schema.org/",
                        "@type": "ImageObject",
                        "contentUrl": window.location.origin + "/" + img.file,
                        "url": window.location.origin + "/" + img.file,
                        "description": img.alt || rug.name,
                        "representativeOfPage": img.order === 1
                    }));

                    let oldImageSchema = document.getElementById("image-schema");
                    if (oldImageSchema) oldImageSchema.remove();
                    const imageScript = document.createElement('script');
                    imageScript.id = "image-schema";
                    imageScript.type = 'application/ld+json';
                    imageScript.text = JSON.stringify(imageSchemas, null, 2);
                    document.head.appendChild(imageScript);
                }

            });
        }
    }

});
