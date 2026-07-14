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
                if (collectionParam) {
                    collectionParam.split(',').forEach(c => {
                        let val = c.trim();
                        // Normalize short URL collection names to match dynamic dataset checkbox values
                        if (val === 'Beacon Hill') val = 'Beacon Hill Collection';
                        else if (val === 'Seaport') val = 'Seaport Collection';
                        else if (val === 'Back Bay') val = 'Back Bay Collection';
                        activeFilters.collection.add(val);
                    });
                }
                
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
                const finalTitle = rug.seo && rug.seo.title ? rug.seo.title : `${rug.name} | Noor Oriental Rugs`;
                document.title = finalTitle;
                
                // Meta Description
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = 'description';
                    document.head.appendChild(metaDesc);
                }
                const defaultDesc = (rug.description || 'Browse our handmade Persian and Oriental rugs.').substring(0, 155) + '...';
                const finalDesc = rug.seo && rug.seo.description ? rug.seo.description : defaultDesc;
                metaDesc.content = finalDesc;

                // Dynamic Canonical Tag
                let canonical = document.querySelector('link[rel="canonical"]');
                const detailUrl = window.location.href;
                if (canonical) {
                    canonical.href = detailUrl;
                }

                // Dynamic Open Graph & Twitter Tags for Premium Sharing Previews
                const updateMetaProperty = (property, content) => {
                    let meta = document.querySelector(`meta[property="${property}"]`);
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.setAttribute('property', property);
                        document.head.appendChild(meta);
                    }
                    meta.content = content;
                };

                const updateMetaName = (name, content) => {
                    let meta = document.querySelector(`meta[name="${name}"]`);
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.setAttribute('name', name);
                        document.head.appendChild(meta);
                    }
                    meta.content = content;
                };

                const mainImageAbsolute = window.location.origin + '/' + (rug.images && rug.images.length > 0 ? rug.images[0].file : 'images/showroom.png');

                updateMetaProperty('og:title', finalTitle);
                updateMetaProperty('og:description', finalDesc);
                updateMetaProperty('og:image', mainImageAbsolute);
                updateMetaProperty('og:url', detailUrl);
                updateMetaProperty('og:type', 'product');

                updateMetaName('twitter:title', finalTitle);
                updateMetaName('twitter:description', finalDesc);
                updateMetaName('twitter:image', mainImageAbsolute);
                updateMetaName('twitter:card', 'summary_large_image');

                // --- Update Visible Breadcrumbs ---
                const breadcrumbContainer = document.getElementById('rug-breadcrumb-container');
                if (breadcrumbContainer) {
                    const originLabel = rug.origin === 'Turkey' ? 'Turkish' : (rug.origin === 'Persia' ? 'Persian' : rug.origin);
                    const intermediate = `${originLabel} Rugs`;
                    breadcrumbContainer.innerHTML = `
                        <a href="index.html" style="color: var(--color-text-muted); text-decoration: none;" class="cta-sub-link">Home</a>
                        <span style="margin: 0 0.4rem; color: var(--color-text-muted);">›</span>
                        <a href="rugs-for-sale.html" style="color: var(--color-text-muted); text-decoration: none;" class="cta-sub-link">Rugs for Sale</a>
                        <span style="margin: 0 0.4rem; color: var(--color-text-muted);">›</span>
                        <a href="rugs-for-sale.html?origin=${encodeURIComponent(rug.origin)}" style="color: var(--color-text-muted); text-decoration: none;" class="cta-sub-link">${intermediate}</a>
                        <span style="margin: 0 0.4rem; color: var(--color-text-muted);">›</span>
                        <span style="color: var(--color-text); font-weight: 500;">${rug.name}</span>
                    `;
                }

                // --- Content Generation ---

                // Separate customer gallery images from documentation images
                // Documentation images: inventory tags, labels, paperwork — not for the main gallery
                const DOC_KEYWORDS = ['inventory_tag', 'authenticity_label', 'tag', 'label', 'document'];
                const isDocImage = (file) => DOC_KEYWORDS.some(k => file.toLowerCase().includes(k));

                const allImages    = rug.images || [];
                const mainImages   = allImages.filter((img, idx) => idx === 0 || !isDocImage(img.file));
                const docImages    = allImages.filter(img => isDocImage(img.file));

                // Use first main image as hero
                const imgSrc = mainImages.length > 0 ? mainImages[0].file : 'images/showroom.png';
                const imgAlt = mainImages.length > 0 && mainImages[0].alt ? mainImages[0].alt : rug.name;
                const formatPrice = `$${rug.price.toLocaleString()}`;

                // Build customer gallery thumbnails (only non-doc images)
                // We still track original indices so the lightbox stays in sync with allImages
                let thumbnailsHTML = '';
                if (mainImages.length > 1) {
                    thumbnailsHTML += `<div class="rug-detail-thumbnails">`;
                    mainImages.forEach((img) => {
                        const origIdx = allImages.indexOf(img);
                        thumbnailsHTML += `
                            <button class="rug-thumb-btn ${origIdx === 0 ? 'active' : ''}" data-index="${origIdx}" aria-label="View image: ${img.alt || img.file}">
                                <img src="${img.file}" alt="${img.alt}" loading="lazy">
                            </button>
                        `;
                    });
                    thumbnailsHTML += `</div>`;
                }

                // Build "Additional Documentation" section for inventory/authenticity images
                let documentationHTML = '';
                if (docImages.length > 0) {
                    const docThumbsHTML = docImages.map(img => {
                        const origIdx = allImages.indexOf(img);
                        return `
                            <button class="rug-thumb-btn" data-index="${origIdx}" aria-label="View documentation: ${img.alt || img.file}">
                                <img src="${img.file}" alt="${img.alt}" loading="lazy">
                            </button>
                        `;
                    }).join('');
                    documentationHTML = `
                        <div class="rug-detail-documentation">
                            <span class="rug-detail-documentation-label"><i class="fa-solid fa-file-invoice" style="margin-right:0.4em;"></i>Inventory Documentation</span>
                            <div class="rug-detail-thumbnails">${docThumbsHTML}</div>
                        </div>
                    `;
                }

                // Format description text helper supporting section headings — premium editorial style
                const renderDescription = (text) => {
                    if (!text) return '';
                    // Split into blocks separated by double newlines
                    const blocks = text.split('\n\n');
                    let html = '';
                    let inSection = false;

                    blocks.forEach((block, idx) => {
                        if (block.startsWith('### ')) {
                            // Close previous section if open
                            if (inSection) html += `</div>`;
                            const headingText = block.replace('### ', '').trim();
                            // Open new editorial section with heading
                            html += `
                                <div class="rug-editorial-section">
                                    <h3 class="rug-editorial-heading">
                                        <span class="rug-editorial-heading-accent"></span>
                                        ${headingText}
                                    </h3>
                            `;
                            inSection = true;
                        } else {
                            // Body paragraph — apply subtle keyword emphasis
                            const emphasizedBlock = block
                                .replace(/\b(hand-knotted|handmade|hand knotted|hand-woven|handwoven)\b/gi, '<em class="rug-editorial-em">$1</em>')
                                .replace(/\b(natural wool|100% natural wool|pure wool|natural lanolin)\b/gi, '<em class="rug-editorial-em">$1</em>')
                                .replace(/\b(professionally (hand-washed|restored|cleaned)|organic (green )?shampoo)\b/gi, '<em class="rug-editorial-em">$1</em>')
                                .replace(/\b(one-of-a-kind|unique collector'?s? piece|heritage|cultural heritage|collector'?s? piece)\b/gi, '<em class="rug-editorial-em">$1</em>');
                            html += `<p class="rug-editorial-body">${emphasizedBlock}</p>`;
                        }
                    });

                    // Close last open section
                    if (inSection) html += `</div>`;
                    return html;
                };

                // Dynamic Specification Listing (camelCase keys translated to Title Case)
                let specsHTML = '';
                if (rug.specifications) {
                    const formatLabel = (key) => {
                        const result = key.replace(/([A-Z])/g, " $1");
                        return result.charAt(0).toUpperCase() + result.slice(1);
                    };
                    
                    Object.entries(rug.specifications).forEach(([key, value]) => {
                        if (key === 'dimensions') return;
                        if (value !== undefined && value !== null && value !== '') {
                            let displayVal = value;
                            if (typeof value === 'boolean') displayVal = value ? 'Yes' : 'No';
                            specsHTML += `
                                <div class="rug-detail-spec-box">
                                    <span class="rug-detail-spec-label">${formatLabel(key)}</span>
                                    <span class="rug-detail-spec-value">${displayVal}</span>
                                </div>
                            `;
                        }
                    });
                }

                // Generate Availability and "Only One Available" Badge
                const availabilityBadge = rug.availability === 'Only One Available'
                    ? `
                        <div style="display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.25rem;">
                            <span class="availability-badge-alert" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(212, 175, 55, 0.08); color: var(--color-primary); border: 1px solid rgba(212, 175, 55, 0.2); padding: 0.35rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: fit-content; margin-bottom: 2px;">
                                <i class="fa-solid fa-gem" style="font-size: 0.9em;"></i> One-of-a-Kind Handmade Rug
                            </span>
                            <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 400; display: block;">Once sold, this exact piece cannot be replaced.</span>
                        </div>
                    `
                    : '';

                // Dynamic Related Rugs generation (Scoring similarity engine)
                const getSimilarityScore = (r1, r2) => {
                    let score = 0;
                    if (r1.origin === r2.origin) score += 5;
                    if (r1.style === r2.style) score += 3;
                    if (r1.collection === r2.collection) score += 2;
                    if (r1.material === r2.material) score += 1;
                    
                    const priceDiff = Math.abs(r1.price - r2.price) / r1.price;
                    if (priceDiff <= 0.3) score += 2;
                    if (r1.size === r2.size) score += 2;
                    return score;
                };

                const displayRelated = (rugs || [])
                    .filter(r => r.slug !== rug.slug)
                    .map(r => ({ rug: r, score: getSimilarityScore(rug, r) }))
                    .sort((a, b) => b.score - a.score)
                    .map(x => x.rug)
                    .slice(0, 3);

                let relatedHTML = '';
                if (displayRelated.length > 0) {
                    relatedHTML += `
                        <div style="margin-top: 3.5rem; margin-bottom: 3.5rem; border-top: 1px solid var(--color-border); padding-top: 3.5rem;">
                            <h2 style="font-family: var(--font-heading); font-size: 1.65rem; margin-bottom: 0.5rem; color: var(--color-text);">Similar Handmade Masterpieces</h2>
                            <p style="font-size: 0.95rem; color: var(--color-text-muted); margin: 0 0 2rem 0; font-family: var(--font-body); line-height: 1.6;">Our specialists selected these rugs based on similar craftsmanship, weaving traditions, design language, and overall character.</p>
                            <div class="related-rugs-grid">
                    `;
                    displayRelated.forEach(item => {
                        const itemImg = item.images && item.images.length > 0 ? item.images[0].file : 'images/showroom.png';
                        const itemAlt = item.images && item.images.length > 0 ? item.images[0].alt : item.name;
                        
                        // Determine recommendation label dynamically
                        let label = 'Handpicked';
                        if (item.origin === rug.origin) {
                            label = `${item.origin} Tradition`;
                        } else if (item.style === rug.style) {
                            label = `Similar ${item.style}`;
                        } else if (item.collection === rug.collection) {
                            label = "Collector's Choice";
                        }
                        
                        relatedHTML += `
                            <a href="rug-detail.html?slug=${item.slug}" style="text-decoration: none; color: inherit; display: block;" class="related-rug-card-link">
                                <div class="related-rug-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden; transition: var(--transition-quick); height: 100%; display: flex; flex-direction: column; position: relative;">
                                    <div style="aspect-ratio: 4/3; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; position: relative;">
                                        <img src="${itemImg}" alt="${itemAlt}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" class="related-card-img" loading="lazy">
                                    </div>
                                    <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem;">
                                        <div>
                                            <!-- Dynamic Recommendation Label -->
                                            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-primary); font-weight: 600; display: block; margin-bottom: 0.5rem;">${label}</span>
                                            
                                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600; line-height: 1.3;">${item.name}</h3>
                                            
                                            <!-- Specifications list in column -->
                                            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--color-text-muted);">
                                                <span><strong>Origin:</strong> ${item.origin}</span>
                                                <span><strong>Type:</strong> ${item.style} Rug</span>
                                                <span><strong>Size:</strong> ${item.size}</span>
                                            </div>
                                        </div>
                                        
                                        <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; margin-top: auto; display: flex; flex-direction: column; gap: 0.75rem;">
                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <span style="color: var(--color-primary); font-weight: 600; font-size: 1.2rem;">$${item.price.toLocaleString()}</span>
                                                <!-- One-of-a-Kind badge -->
                                                <span style="font-size: 0.7rem; background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.2); padding: 0.2rem 0.5rem; border-radius: 3px; color: var(--color-primary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-gem" style="font-size: 0.85em;"></i> Unique</span>
                                            </div>
                                            
                                            <!-- View Details button -->
                                            <span class="btn btn-outline" style="padding: 0.65rem 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 0.4rem; justify-content: center; width: 100%; font-weight: 500; border-color: rgba(212, 175, 55, 0.3);">View Details <i class="fa-solid fa-arrow-right" style="font-size: 0.8em; margin-left: 2px;"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    });
                    relatedHTML += `
                            </div>
                        </div>
                    `;
                }

                // Social Proof & Trust Badges Section
                const trustBadgesHTML = `
                    <div style="border-top: 1px solid var(--color-border); padding-top: 3.5rem; margin-top: 3.5rem; margin-bottom: 3.5rem;">
                        <h2 style="font-family: var(--font-heading); font-size: 1.65rem; margin-bottom: 1.5rem; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Purchase With Confidence</h2>
                        <div class="rug-trust-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
                            <div class="rug-trust-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 4px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%;">
                                <div style="color: var(--color-primary); font-size: 1.75rem;"><i class="fa-solid fa-magnifying-glass"></i></div>
                                <div>
                                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600;">Individually Inspected</h3>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">Every rug is carefully examined by our specialists for authenticity, craftsmanship, and overall condition before being added to our collection.</p>
                                </div>
                            </div>
                            <div class="rug-trust-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 4px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%;">
                                <div style="color: var(--color-primary); font-size: 1.75rem;"><i class="fa-solid fa-soap"></i></div>
                                <div>
                                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600;">Professionally Washed & Restored</h3>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">This rug has been professionally hand washed using traditional methods and restored only where necessary to preserve its beauty and structural integrity.</p>
                                </div>
                            </div>
                            <div class="rug-trust-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 4px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%;">
                                <div style="color: var(--color-primary); font-size: 1.75rem;"><i class="fa-solid fa-gem"></i></div>
                                <div>
                                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600;">One of a Kind</h3>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">Every handmade rug is unique. Once sold, this exact piece cannot be replaced.</p>
                                </div>
                            </div>
                            <div class="rug-trust-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 4px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%;">
                                <div style="color: var(--color-primary); font-size: 1.75rem;"><i class="fa-solid fa-comments"></i></div>
                                <div>
                                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600;">Expert Consultation</h3>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">Our specialists are available to answer questions, provide additional photographs, discuss room placement, and schedule private showroom visits.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Dynamic FAQ Accordion generation
                const conditionLabel = rug.condition ? (rug.condition.includes('/') ? rug.condition.split('/')[0].trim() : rug.condition) : 'Excellent';
                const faqHTML = `
                    <h2 style="font-family: var(--font-heading); font-size: 1.65rem; margin-top: 3.5rem; margin-bottom: 1.25rem; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Frequently Asked Questions</h2>
                    <div class="rug-faq-accordion">
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Is this rug handmade?</summary>
                            <div class="rug-faq-content">
                                Yes. Every rug in our collection is hand-knotted by skilled weavers using traditional techniques. This ${rug.name} features an authentic, meticulous hand-knotted weave, representing months of dedicated artisan craftsmanship.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Is this rug one of a kind?</summary>
                            <div class="rug-faq-content">
                                Yes, this rug is a one-of-a-kind collector's piece. Because each design is woven by hand from memory and local tradition rather than machine-printed templates, no two patterns are ever identical. Once sold, this exact piece cannot be replaced.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">What materials are used?</summary>
                            <div class="rug-faq-content">
                                This rug is constructed with a warp and weft foundation made of ${rug.material}. The natural wool fibers provide excellent durability, stain resistance, and a rich patina that characteristically soft-tones with age.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Has this rug been professionally washed or restored?</summary>
                            <div class="rug-faq-content">
                                Yes. To preserve its heritage values and structural integrity, this rug has been professionally hand-washed using organic green shampoo and restored where necessary (reinforced side bindings and fringe securing). It is currently in ${conditionLabel.toLowerCase()} condition and ready for immediate placement.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Can I view this rug in person?</summary>
                            <div class="rug-faq-content">
                                Yes, you can view the ${rug.name} at our physical showroom in Cambridge, MA (serving the greater Boston area). We invite you to inspect the weave and organic colors under natural light, or schedule a complimentary 3-day in-home trial.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Do you provide additional photographs or videos?</summary>
                            <div class="rug-faq-content">
                                Absolutely. If you need close-up photographs of specific pattern segments, side edges, backing knots, or a custom video tour showing the rug's true light profile, please contact our support team or request a video tour.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">How should I care for this rug?</summary>
                            <div class="rug-faq-content">
                                We recommend vacuuming regularly without a beater bar and blotting liquid spills immediately with a dry cloth and cold water. Professional hand-washing is advised every 3 to 5 years depending on the room's foot traffic.
                            </div>
                        </details>
                        <details class="rug-faq-item">
                            <summary class="rug-faq-summary">Can Noor Oriental Rugs help with future cleaning or restoration?</summary>
                            <div class="rug-faq-content">
                                Yes. We provide full-service professional organic cleaning, repair, fringe restoration, and appraisal services. We are committed to preserving the value and beauty of your handmade rugs for decades.
                            </div>
                        </details>
                    </div>
                `;

                detailContainer.className = '';
                detailContainer.innerHTML = `
                    <div class="rug-detail-layout">
                        <div class="rug-detail-image-column">
                            <div class="rug-detail-image-wrapper" id="main-zoom-wrapper" style="position: relative; background: var(--color-card-bg); overflow: hidden; display: flex; align-items: center; justify-content: center; width: fit-content; max-width: 100%; margin: 0 auto;">
                                <!-- Elegant loading spinner behind the image -->
                                <div class="gallery-spinner" style="position: absolute; color: var(--color-primary); font-size: 1.5rem; z-index: 1;"><i class="fa-solid fa-spinner fa-spin"></i></div>
                                
                                <img src="${imgSrc}" alt="${imgAlt}" class="rug-detail-main-img" id="main-rug-img" data-index="0" style="position: relative; z-index: 2; cursor: zoom-in; opacity: 1;">
                                
                                <!-- Elegant Image Counter overlay -->
                                <div id="gallery-counter" style="position: absolute; bottom: 1rem; right: 1rem; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); color: #fff; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; pointer-events: none; border: 1px solid rgba(255, 255, 255, 0.1); z-index: 3; transition: opacity 0.25s ease;">
                                    Image 1 of ${mainImages.length}
                                </div>
                            </div>
                            ${thumbnailsHTML}
                            ${documentationHTML}
                        </div>
                        <div class="rug-detail-info">
                            <!-- H1: Main Title -->
                            <h1 class="rug-detail-title">${rug.name}</h1>
                            
                            <div class="rug-detail-price-row" style="display: flex; align-items: center; gap: 1.5rem; margin-top: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; flex-wrap: wrap;">
                                <div class="rug-detail-price" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0; font-size: 2.25rem; font-weight: 500; color: var(--color-text);">${formatPrice}</div>
                                ${availabilityBadge}
                            </div>
     
                            <!-- Compact 'Rug at a Glance' Section (5 key facts: Origin, Size, Material, Age, Condition) -->
                            <div class="rug-glance-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.75rem; margin-bottom: 2.5rem; width: 100%;">
                                <div class="rug-glance-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); padding: 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem; height: 100%;">
                                    <div style="color: var(--color-primary); font-size: 1.25rem;"><i class="fa-solid fa-location-dot"></i></div>
                                    <div>
                                        <span style="display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">Origin</span>
                                        <span style="font-size: 0.9rem; color: var(--color-text); font-weight: 500; display: block; margin-top: 2px;">${rug.origin}</span>
                                    </div>
                                </div>
                                <div class="rug-glance-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); padding: 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem; height: 100%;">
                                    <div style="color: var(--color-primary); font-size: 1.25rem;"><i class="fa-solid fa-maximize"></i></div>
                                    <div>
                                        <span style="display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">Size</span>
                                        <span style="font-size: 0.9rem; color: var(--color-text); font-weight: 500; display: block; margin-top: 2px;">${rug.size}</span>
                                    </div>
                                </div>
                                <div class="rug-glance-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); padding: 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem; height: 100%;">
                                    <div style="color: var(--color-primary); font-size: 1.25rem;"><i class="fa-solid fa-layer-group"></i></div>
                                    <div>
                                        <span style="display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">Material</span>
                                        <span style="font-size: 0.9rem; color: var(--color-text); font-weight: 500; display: block; margin-top: 2px;">${rug.material}</span>
                                    </div>
                                </div>
                                <div class="rug-glance-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); padding: 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem; height: 100%;">
                                    <div style="color: var(--color-primary); font-size: 1.25rem;"><i class="fa-solid fa-clock"></i></div>
                                    <div>
                                        <span style="display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">Age</span>
                                        <span style="font-size: 0.9rem; color: var(--color-text); font-weight: 500; display: block; margin-top: 2px;">${rug.age}</span>
                                    </div>
                                </div>
                                <div class="rug-glance-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); padding: 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem; height: 100%;">
                                    <div style="color: var(--color-primary); font-size: 1.25rem;"><i class="fa-solid fa-sparkles"></i></div>
                                    <div>
                                        <span style="display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">Condition</span>
                                        <span style="font-size: 0.9rem; color: var(--color-text); font-weight: 500; display: block; margin-top: 2px;">${rug.condition.includes('/') ? rug.condition.split('/')[0].trim() : rug.condition}</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Description: Premium Editorial Article -->
                            <div class="rug-editorial-article">
                                <h2 class="rug-editorial-article-title">Description</h2>
                                <div class="rug-detail-description-content">
                                    ${renderDescription(rug.description)}
                                </div>
                            </div>
    
                            <!-- Storytelling Section -->
                            ${rug.story ? `
                                <h2 style="font-family: var(--font-heading); font-size: 1.65rem; margin-top: 3.5rem; margin-bottom: 1.25rem; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">The Story Behind This Rug</h2>
                                <div class="rug-story-container" style="background: rgba(255, 255, 255, 0.01); border: 1px solid var(--color-border); padding: 2rem; border-radius: 4px; margin-bottom: 3.5rem;">
                                    <!-- Elegant pull quote -->
                                    <div class="rug-story-quote" style="font-family: var(--font-heading); font-size: 1.25rem; font-style: italic; color: var(--color-primary); line-height: 1.6; text-align: center; margin-bottom: 2rem; position: relative; padding: 0 1.5rem;">
                                        <span style="font-size: 3rem; opacity: 0.2; position: absolute; left: 0; top: -1rem; font-family: Georgia, serif;">&ldquo;</span>
                                        A one-of-a-kind Anatolian masterpiece, hand-knotted with pure wool and preserved with three centuries of heritage expertise.
                                        <span style="font-size: 3rem; opacity: 0.2; position: absolute; right: 0; bottom: -2rem; font-family: Georgia, serif;">&rdquo;</span>
                                    </div>
                                    <div class="rug-story-content" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-muted);">
                                        ${renderDescription(rug.story)}
                                    </div>
                                    <!-- Decorative traditional rug divider -->
                                    <div class="rug-story-divider" style="text-align: center; margin-top: 2rem; color: var(--color-primary); opacity: 0.5; font-size: 1.2rem; letter-spacing: 0.3em;">
                                        &#10070; &nbsp; &#10070; &nbsp; &#10070;
                                    </div>
                                </div>
                            ` : ''}
    
                            ${specsHTML ? `
                                <h2 style="font-family: var(--font-heading); font-size: 1.65rem; margin-top: 3.5rem; margin-bottom: 1.25rem; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Specifications</h2>
                                <div class="rug-detail-specs-grid" style="margin-top: 1.5rem;">${specsHTML}</div>
                            ` : ''}
    
                            <!-- Luxury Purchase Experience Panel -->
                            <div class="luxury-purchase-card" style="border: 1px solid var(--color-border); padding: 2.25rem; border-radius: 4px; background: rgba(255, 255, 255, 0.01); margin-top: 3.5rem; margin-bottom: 3.5rem; display: flex; flex-direction: column; gap: 1.75rem;">
                                <div>
                                    <h2 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-text); margin: 0 0 0.5rem 0; font-weight: 600; text-transform: none; letter-spacing: 0;">Acquire This Rug</h2>
                                    <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">Our specialists are available to answer questions, provide additional photographs, arrange private showroom visits, or schedule a personalized video consultation.</p>
                                </div>
    
                                <!-- Scarcity / Availability Indicator -->
                                <div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 500; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.03); padding-bottom: 0.75rem;">
                                    <i class="fa-solid fa-gem" style="font-size: 0.85em;"></i>
                                    <span>Only One Authentic Piece Exists &nbsp;&bull;&nbsp; Once Sold, This Rug Will Not Return</span>
                                </div>
    
                                <!-- Primary CTA Button (Visually Dominant) -->
                                <div>
                                    <a href="index.html?interest=contact-team&rug=${encodeURIComponent(rug.name)}#contact" class="btn btn-primary" style="display: block; width: 100%; text-align: center; padding: 1.15rem; font-size: 1.05rem; font-weight: 600; letter-spacing: 0.05em; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15); transition: var(--transition-quick);"><i class="fa-solid fa-circle-info" style="margin-right: 0.5rem;"></i> Request More Information</a>
                                </div>
    
                                <!-- Secondary CTA Actions (Grid / Stack) -->
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.03); padding-top: 1rem;">
                                    <a href="index.html?interest=showroom&rug=${encodeURIComponent(rug.name)}#contact" class="btn btn-outline" style="text-align: center; padding: 0.85rem 1rem; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><i class="fa-solid fa-calendar-days"></i> Schedule Showroom Viewing</a>
                                    <a href="index.html?interest=video-tour&rug=${encodeURIComponent(rug.name)}#contact" class="btn btn-outline" style="text-align: center; padding: 0.85rem 1rem; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><i class="fa-solid fa-video"></i> Video Consultation</a>
                                    <a href="tel:+16178686667" class="btn btn-outline" style="text-align: center; padding: 0.85rem 1rem; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><i class="fa-solid fa-phone"></i> Call Specialists</a>
                                </div>
    
                                <!-- Trust Signals (Visually Understated) -->
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; border-top: 1px solid rgba(255, 255, 255, 0.03); padding-top: 1rem; font-size: 0.85rem; color: var(--color-text-muted);">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fa-solid fa-check" style="color: var(--color-primary); font-size: 0.9em;"></i>
                                        <span>One-of-a-Kind Handmade Rug</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fa-solid fa-check" style="color: var(--color-primary); font-size: 0.9em;"></i>
                                        <span>Professionally Inspected</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fa-solid fa-check" style="color: var(--color-primary); font-size: 0.9em;"></i>
                                        <span>Ready for Immediate Acquisition</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fa-solid fa-check" style="color: var(--color-primary); font-size: 0.9em;"></i>
                                        <span>Additional Photos Upon Request</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Core Services & Appraisal Links -->
                            <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid var(--color-border); padding: 1.5rem; border-radius: 4px; margin-bottom: 3.5rem;">
                                <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-text); margin-top: 0; margin-bottom: 1rem;">Additional Services & Consultations</h3>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                    <a href="rug-cleaning.html" style="color: var(--color-text-muted); text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;" class="cta-sub-link"><i class="fa-solid fa-circle-arrow-right" style="color: var(--color-primary);"></i> Professional Rug Cleaning</a>
                                    <a href="rug-restoration.html" style="color: var(--color-text-muted); text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;" class="cta-sub-link"><i class="fa-solid fa-circle-arrow-right" style="color: var(--color-primary);"></i> Expert Rug Restoration</a>
                                    <a href="rug-appraisals.html" style="color: var(--color-text-muted); text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;" class="cta-sub-link"><i class="fa-solid fa-circle-arrow-right" style="color: var(--color-primary);"></i> Certified Rug Appraisal</a>
                                    <a href="index.html?interest=consultation#contact" style="color: var(--color-text-muted); text-decoration: none; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;" class="cta-sub-link"><i class="fa-solid fa-circle-arrow-right" style="color: var(--color-primary);"></i> Schedule a Rug Consultation</a>
                                </div>
                            </div>
    
                            <!-- Social Proof & Trust Badges -->
                            ${trustBadgesHTML}
                        </div>
                    </div>
                    
                    <!-- Bottom full-width sections outside the 2-column grid -->
                    <div class="rug-detail-bottom-sections" style="width: 100%; margin-top: 3.5rem;">
                        <!-- Dynamic FAQ Section -->
                        ${faqHTML}
    
                        <!-- Related Rugs Section (Visual Cards Grid) -->
                        ${relatedHTML}
    
                        <!-- Redesigned 'Visit Our Showroom' Section -->
                        <div class="showroom-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-left: 3px solid var(--color-primary); padding: 1.75rem; border-radius: 4px; margin-top: 3.5rem; margin-bottom: 3.5rem;">
                            <div style="display: flex; gap: 1rem; align-items: flex-start; flex-wrap: wrap;">
                                <div style="color: var(--color-primary); font-size: 1.75rem; margin-top: 0.25rem;"><i class="fa-solid fa-store"></i></div>
                                <div style="flex: 1; min-width: 250px;">
                                    <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--color-text); margin-top: 0; margin-bottom: 0.5rem; font-weight: 600;">Experience This Rug In Person</h3>
                                    <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">We invite you to view this exquisite Chanakaleh rug at our historic showroom in Cambridge, MA (just outside Boston). Feel the wool texture, inspect the knot density, and see the organic colors in true light. We also offer a complimentary 3-day in-home trial.</p>
                                    <a href="index.html?interest=showroom&rug=${encodeURIComponent(rug.name)}#contact" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;"><i class="fa-solid fa-calendar-check"></i> Schedule a Visit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // --- Bind Interactive Gallery & Lightbox Event Listeners ---
                const mainImg = document.getElementById('main-rug-img');
                const mainWrapper = document.getElementById('main-zoom-wrapper');
                const thumbBtns = document.querySelectorAll('.rug-thumb-btn');

                const updateGalleryCounter = (index) => {
                    const counterEl = document.getElementById('gallery-counter');
                    if (counterEl) {
                        const img = rug.images[index];
                        const mainIdx = mainImages.indexOf(img);
                        if (mainIdx !== -1) {
                            counterEl.textContent = `Image ${mainIdx + 1} of ${mainImages.length}`;
                        } else {
                            const docIdx = docImages.indexOf(img);
                            if (docIdx !== -1) {
                                counterEl.textContent = `Doc ${docIdx + 1} of ${docImages.length}`;
                            }
                        }
                    }
                };

                if (thumbBtns.length > 0 && mainImg) {
                    thumbBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            if (btn.classList.contains('active')) return;
                            
                            thumbBtns.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            const idx = parseInt(btn.getAttribute('data-index'));
                            if (rug.images && rug.images[idx]) {
                                // Smooth opacity cross-fade
                                mainImg.style.opacity = '0';
                                setTimeout(() => {
                                    mainImg.src = rug.images[idx].file;
                                    mainImg.alt = rug.images[idx].alt;
                                    mainImg.setAttribute('data-index', idx);
                                    updateGalleryCounter(idx);
                                    mainImg.onload = () => {
                                        mainImg.style.opacity = '1';
                                    };
                                }, 150);
                            }
                        });
                    });
                }

                // Interactive Zoom Effect on Hover
                if (mainWrapper && mainImg) {
                    mainWrapper.addEventListener('mousemove', (e) => {
                        const rect = mainWrapper.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const xPercent = (x / rect.width) * 100;
                        const yPercent = (y / rect.height) * 100;
                        mainImg.style.transform = 'scale(1.5)';
                        mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                    });

                    mainWrapper.addEventListener('mouseleave', () => {
                        mainImg.style.transform = 'scale(1)';
                        mainImg.style.transformOrigin = 'center center';
                    });
                }

                // Accordion FAQ behavior: only one open at a time
                const faqs = document.querySelectorAll('.rug-faq-item');
                faqs.forEach(faq => {
                    faq.addEventListener('toggle', () => {
                        if (faq.open) {
                            faqs.forEach(other => {
                                if (other !== faq) other.open = false;
                            });
                        }
                    });
                });

                // Lightbox Modal Setup
                let lightbox = document.getElementById('dynamic-rug-lightbox');
                if (!lightbox) {
                    lightbox = document.createElement('div');
                    lightbox.id = 'dynamic-rug-lightbox';
                    lightbox.className = 'rug-lightbox';
                    lightbox.innerHTML = `
                        <button class="rug-lightbox-close" aria-label="Close lightbox">&times;</button>
                        <button class="rug-lightbox-btn rug-lightbox-prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
                        <div class="rug-lightbox-content">
                            <img id="lightbox-main-img" class="rug-lightbox-img" src="" alt="">
                        </div>
                        <button class="rug-lightbox-btn rug-lightbox-next" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
                    `;
                    document.body.appendChild(lightbox);
                }

                const lightboxImg = document.getElementById('lightbox-main-img');
                const closeBtn = lightbox.querySelector('.rug-lightbox-close');
                const prevBtn = lightbox.querySelector('.rug-lightbox-prev');
                const nextBtn = lightbox.querySelector('.rug-lightbox-next');
                let currentGalleryIndex = 0;

                const openLightbox = (index) => {
                    currentGalleryIndex = index;
                    updateLightboxImage();
                    lightbox.classList.add('active');
                    document.body.classList.add('lightbox-open');
                };

                const closeLightbox = () => {
                    lightbox.classList.remove('active');
                    document.body.classList.remove('lightbox-open');
                };

                const updateLightboxImage = () => {
                    if (rug.images && rug.images[currentGalleryIndex]) {
                        lightboxImg.style.opacity = '0';
                        setTimeout(() => {
                            lightboxImg.src = rug.images[currentGalleryIndex].file;
                            lightboxImg.alt = rug.images[currentGalleryIndex].alt;
                            lightboxImg.onload = () => {
                                lightboxImg.style.opacity = '1';
                            };
                        }, 150);
                    }
                };

                const showNextImage = () => {
                    if (rug.images) {
                        currentGalleryIndex = (currentGalleryIndex + 1) % rug.images.length;
                        updateLightboxImage();
                        const nextThumb = document.querySelector(`.rug-thumb-btn[data-index="${currentGalleryIndex}"]`);
                        if (nextThumb) {
                            // Clear all actives, set active
                            thumbBtns.forEach(b => b.classList.remove('active'));
                            nextThumb.classList.add('active');
                            mainImg.src = rug.images[currentGalleryIndex].file;
                            mainImg.alt = rug.images[currentGalleryIndex].alt;
                            mainImg.setAttribute('data-index', currentGalleryIndex);
                            updateGalleryCounter(currentGalleryIndex);
                        }
                    }
                };

                const showPrevImage = () => {
                    if (rug.images) {
                        currentGalleryIndex = (currentGalleryIndex - 1 + rug.images.length) % rug.images.length;
                        updateLightboxImage();
                        const prevThumb = document.querySelector(`.rug-thumb-btn[data-index="${currentGalleryIndex}"]`);
                        if (prevThumb) {
                            thumbBtns.forEach(b => b.classList.remove('active'));
                            prevThumb.classList.add('active');
                            mainImg.src = rug.images[currentGalleryIndex].file;
                            mainImg.alt = rug.images[currentGalleryIndex].alt;
                            mainImg.setAttribute('data-index', currentGalleryIndex);
                            updateGalleryCounter(currentGalleryIndex);
                        }
                    }
                };

                if (mainImg) {
                    mainImg.addEventListener('click', () => {
                        const idx = parseInt(mainImg.getAttribute('data-index') || '0');
                        openLightbox(idx);
                    });
                }

                closeBtn.addEventListener('click', closeLightbox);
                nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
                prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target.classList.contains('rug-lightbox-content')) {
                        closeLightbox();
                    }
                });

                // Mobile Swipe Support
                let touchstartX = 0;
                let touchendX = 0;
                
                lightbox.addEventListener('touchstart', e => {
                    touchstartX = e.changedTouches[0].screenX;
                }, { passive: true });
                
                lightbox.addEventListener('touchend', e => {
                    touchendX = e.changedTouches[0].screenX;
                    const threshold = 50;
                    if (touchendX < touchstartX - threshold) {
                        showNextImage();
                    }
                    if (touchendX > touchstartX + threshold) {
                        showPrevImage();
                    }
                }, { passive: true });

                // Keypress navigation for Accessibility
                document.addEventListener('keydown', (e) => {
                    if (!lightbox.classList.contains('active')) return;
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowRight') showNextImage();
                    if (e.key === 'ArrowLeft') showPrevImage();
                });

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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            // Close all others
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                }
            });
            // Toggle current
            btn.classList.toggle('active');
        });
    });
});

// Auto-select Request Type and pre-fill form from URL Parameters
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const interestParam = urlParams.get('interest');
    const rugParam = urlParams.get('rug');
    
    if (interestParam) {
        const interestSelect = document.getElementById('interest');
        if (interestSelect) {
            // Check if the option exists
            const optionExists = Array.from(interestSelect.options).some(opt => opt.value === interestParam);
            if (optionExists) {
                interestSelect.value = interestParam;
            }
        }
    }
    
    if (rugParam) {
        const messageTextArea = document.getElementById('message');
        if (messageTextArea) {
            const decodedRug = decodeURIComponent(rugParam);
            if (interestParam === 'trial') {
                messageTextArea.value = `I am interested in arranging a 3-Day In-Home Trial for the rug: "${decodedRug}". Please contact me to coordinate.`;
            } else if (interestParam === 'evaluation') {
                messageTextArea.value = `I would like to request a free evaluation for the rug: "${decodedRug}". Please provide details on next steps.`;
            } else {
                messageTextArea.value = `Inquiry regarding rug: "${decodedRug}".`;
            }
        }
    }
});
