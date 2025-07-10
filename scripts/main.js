// Main Application Logic
class ScriptablePlayground {
    constructor() {
        this.widgets = window.WIDGETS_DATA;
        this.currentWidget = null;
        this.currentConfig = {};
        this.theme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        // this.setupScrollAnimations(); // Temporarily disabled
        this.renderWidgets();
        this.updateWidgetCount();
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');

        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterWidgets(btn.dataset.category);
                this.updateActiveFilter(btn);
            });
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal('widgetModal');
        });

        document.getElementById('closeQRModal').addEventListener('click', () => {
            this.closeModal('qrModal');
        });

        // Modal overlay clicks
        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeModal('widgetModal');
        });

        document.getElementById('qrModalOverlay').addEventListener('click', () => {
            this.closeModal('qrModal');
        });

        // Code actions
        document.getElementById('copyCode').addEventListener('click', () => {
            this.copyCode();
        });

        document.getElementById('downloadCode').addEventListener('click', () => {
            this.downloadCode();
        });

        document.getElementById('generateQR').addEventListener('click', () => {
            this.generateQRCode();
        });

        document.getElementById('downloadQR').addEventListener('click', () => {
            this.downloadQRCode();
        });

        // Size selector
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.changePreviewSize(btn.dataset.size);
                this.updateActiveSizeBtn(btn);
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal('widgetModal');
                this.closeModal('qrModal');
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.setupTheme();
    }

    updateWidgetCount() {
        const count = Object.keys(this.widgets).length;
        document.getElementById('widgetCount').textContent = count;
    }

    renderWidgets() {
        const grid = document.getElementById('widgetsGrid');
        grid.innerHTML = '';

        // Check if widgets data is loaded
        if (!this.widgets || Object.keys(this.widgets).length === 0) {
            grid.innerHTML = '<div class="loading-message">Loading widgets...</div>';
            return;
        }

        Object.entries(this.widgets).forEach(([id, widget]) => {
            const card = this.createWidgetCard(id, widget);
            grid.appendChild(card);
        });
    }

    createWidgetCard(id, widget) {
        const card = document.createElement('div');
        card.className = 'widget-card';
        card.dataset.category = widget.category;
        card.dataset.widgetId = id;

        card.innerHTML = `
            <div class="widget-card-header">
                <div class="widget-icon">
                    <i class="${widget.icon}"></i>
                </div>
                <div class="widget-info">
                    <h4>${widget.name}</h4>
                    <span class="widget-category">${widget.category}</span>
                </div>
            </div>
            <p class="widget-description">${widget.description}</p>
            <div class="widget-preview-slideshow">
                <div class="slideshow-container">
                    ${this.generateSlideshowHTML(widget.preview)}
                </div>
                <div class="slideshow-nav">
                    <button class="nav-btn prev" onclick="event.stopPropagation(); app.changeSlide('${id}', -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="nav-btn next" onclick="event.stopPropagation(); app.changeSlide('${id}', 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="slideshow-indicators">
                    ${this.generateIndicatorsHTML(widget.preview, id)}
                </div>
            </div>
            <div class="widget-features">
                ${widget.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        `;

        // Set up slideshow auto-play
        this.setupCardSlideshow(card, id, widget.preview);

        card.addEventListener('click', async () => {
            await this.openWidgetModal(id, widget);
        });

        return card;
    }

    filterWidgets(category) {
        const cards = document.querySelectorAll('.widget-card');

        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    async openWidgetModal(id, widget) {
        this.currentWidget = { id, ...widget };
        this.currentConfig = {};

        // Set modal content
        document.getElementById('modalTitle').textContent = `${widget.name} Configuration`;
        document.getElementById('widgetDescription').textContent = widget.description;

        // Setup modal slideshow
        const modalContainer = document.querySelector('.modal-slideshow-container');
        if (modalContainer && widget.preview) {
            modalContainer.innerHTML = this.generateModalSlideshowHTML(widget.preview);

            // Show small preview by default (first image)
            this.changeModalSlide('small', 0);

            // Set up slideshow for small size by default
            this.setupModalSlideshow('small');
        } else {
            console.error('Modal container not found or widget preview not available');
        }

        // Set features
        const featuresList = document.getElementById('widgetFeatures');
        featuresList.innerHTML = widget.features.map(feature => `<li>${feature}</li>`).join('');

        // Generate configuration form
        this.generateConfigForm(widget.config);

        // Generate initial code
        await this.generateCode();

        // Show modal
        document.getElementById('widgetModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    generateConfigForm(config) {
        const form = document.getElementById('configForm');
        form.innerHTML = '';

        Object.entries(config).forEach(([key, field]) => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const label = document.createElement('label');
            label.textContent = field.label;
            if (field.required) {
                label.innerHTML += ' <span style="color: var(--error-color);">*</span>';
            }

            let input;
            switch (field.type) {
                case 'text':
                case 'password':
                case 'number':
                case 'date':
                    input = document.createElement('input');
                    input.type = field.type;
                    input.placeholder = field.placeholder || '';
                    input.value = field.default || '';
                    break;

                case 'select':
                    input = document.createElement('select');
                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.label;
                        if (option.value === field.default) {
                            optionElement.selected = true;
                        }
                        input.appendChild(optionElement);
                    });
                    break;

                case 'checkbox':
                    input = document.createElement('input');
                    input.type = 'checkbox';
                    input.checked = field.default || false;
                    break;

                case 'textarea':
                    input = document.createElement('textarea');
                    input.placeholder = field.placeholder || '';
                    input.value = field.default || '';
                    input.rows = 3;
                    break;
            }

            input.id = `config-${key}`;
            input.addEventListener('change', () => {
                this.updateConfig(key, input.type === 'checkbox' ? input.checked : input.value);
            });

            formGroup.appendChild(label);
            formGroup.appendChild(input);

            if (field.help) {
                const helpText = document.createElement('div');
                helpText.className = 'help-text';
                helpText.textContent = field.help;
                formGroup.appendChild(helpText);
            }

            form.appendChild(formGroup);

            // Set initial config value
            this.updateConfig(key, input.type === 'checkbox' ? input.checked : input.value);
        });
    }

    updateConfig(key, value) {
        this.currentConfig[key] = value;
        this.generateCode(); // This is okay - we don't need to await here
    }

    async generateCode() {
        if (!this.currentWidget) return;

        let code;

        // Load template from external file if templateFile is specified
        if (this.currentWidget.templateFile) {
            try {
                const response = await fetch(this.currentWidget.templateFile);
                code = await response.text();
            } catch (error) {
                console.error('Failed to load template file:', error);
                code = '// Error loading template file';
            }
        } else {
            // Fallback to embedded template
            code = this.currentWidget.template || '// No template available';
        }

        // Replace template variables
        Object.entries(this.currentConfig).forEach(([key, value]) => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            code = code.replace(regex, value);
        });

        // Clean up any remaining placeholders with empty values
        code = code.replace(/\\{\\{\\w+\\}\\}/g, '');

        // Update code display
        const codeElement = document.getElementById('generatedCode');
        codeElement.textContent = code;

        // Highlight syntax
        if (window.Prism) {
            window.Prism.highlightElement(codeElement);
        }
    } changePreviewSize(size) {
        if (!this.currentWidget) return;

        // Show the first image of the selected size
        this.changeModalSlide(size, 0);

        // Start slideshow for this size category
        this.setupModalSlideshow(size);
    }

    changeModalSlide(size, imageIndex) {
        const modalSlides = document.querySelectorAll('.modal-slideshow-container .slide');

        // Remove active class from all slides
        modalSlides.forEach(slide => slide.classList.remove('active'));

        // Find and activate the target slide
        const targetSlide = document.querySelector(`.modal-slideshow-container .slide[data-size="${size}"][data-image-index="${imageIndex}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
    }

    setupModalSlideshow(size) {
        // Clear any existing interval
        if (this.modalSlideshowInterval) {
            clearInterval(this.modalSlideshowInterval);
        }

        if (!this.currentWidget) return;

        const sizeImages = this.currentWidget.preview[size];
        if (sizeImages.length <= 1) return; // No need for slideshow if only one image

        let currentIndex = 0;
        this.modalSlideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sizeImages.length;
            this.changeModalSlide(size, currentIndex);
        }, 3000); // Change every 3 seconds
    }

    updateActiveSizeBtn(activeBtn) {
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    copyCode() {
        const code = document.getElementById('generatedCode').textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                this.showToast('Code copied to clipboard!', 'success');
            }).catch(() => {
                this.fallbackCopyCode(code);
            });
        } else {
            this.fallbackCopyCode(code);
        }
    }

    fallbackCopyCode(code) {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            this.showToast('Code copied to clipboard!', 'success');
        } catch (err) {
            this.showToast('Failed to copy code', 'error');
        }

        document.body.removeChild(textarea);
    }

    downloadCode() {
        if (!this.currentWidget) return;

        const code = document.getElementById('generatedCode').textContent;
        const filename = `${this.currentWidget.id}-widget.js`;

        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
        this.showToast('Code downloaded!', 'success');
    }

    generateQRCode() {
        if (!this.currentWidget) return;

        const code = document.getElementById('generatedCode').textContent;
        const canvas = document.getElementById('qrCanvas');

        // Create a GitHub Gist URL or use a paste service
        const encodedCode = encodeURIComponent(code);
        const scriptableURL = `scriptable:///run?scriptName=${this.currentWidget.name}&code=${encodedCode}`;

        window.QRCode.toCanvas(canvas, scriptableURL, {
            width: 256,
            margin: 2,
            color: {
                dark: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
                light: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim()
            }
        }, (error) => {
            if (error) {
                this.showToast('Failed to generate QR code', 'error');
                console.error(error);
            } else {
                document.getElementById('qrModal').classList.add('active');
                this.showToast('QR code generated!', 'success');
            }
        });
    }

    downloadQRCode() {
        const canvas = document.getElementById('qrCanvas');
        const link = document.createElement('a');
        link.download = `${this.currentWidget.id}-qr.png`;
        link.href = canvas.toDataURL();
        link.click();

        this.showToast('QR code downloaded!', 'success');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = 'auto';

        // Clear modal slideshow interval
        if (this.modalSlideshowInterval) {
            clearInterval(this.modalSlideshowInterval);
            this.modalSlideshowInterval = null;
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const icon = toast.querySelector('.toast-icon');
        const messageElement = toast.querySelector('.toast-message');

        // Set message
        messageElement.textContent = message;

        // Set icon based on type
        switch (type) {
            case 'success':
                icon.className = 'toast-icon fas fa-check-circle';
                break;
            case 'error':
                icon.className = 'toast-icon fas fa-exclamation-circle';
                break;
            case 'info':
            default:
                icon.className = 'toast-icon fas fa-info-circle';
                break;
        }

        // Set type class
        toast.className = `toast ${type}`;

        // Show toast
        toast.classList.add('active');

        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    showLoading() {
        document.getElementById('loading').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loading').classList.remove('active');
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    // Special handling for widgets grid
                    if (entry.target.classList.contains('widgets-grid')) {
                        // Animate widget cards with stagger effect
                        setTimeout(() => {
                            const cards = entry.target.querySelectorAll('.widget-card');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.animationDelay = `${index * 0.1}s`;
                                    card.style.animationPlayState = 'running';
                                }, index * 100);
                            });
                        }, 200);
                    }

                    // Special handling for filters
                    if (entry.target.classList.contains('filters')) {
                        setTimeout(() => {
                            const filterBtns = entry.target.querySelectorAll('.filter-btn');
                            filterBtns.forEach((btn, index) => {
                                setTimeout(() => {
                                    btn.style.animationDelay = `${index * 0.1}s`;
                                    btn.style.animationPlayState = 'running';
                                }, index * 50);
                            });
                        }, 300);
                    }
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.section-header, .filters, .widgets-grid');
        animatedElements.forEach(el => observer.observe(el));

        // Add scroll event for additional effects
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero');

        if (hero) {
            // Parallax effect for hero background
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;

            // Fade out hero content on scroll
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                const opacity = Math.max(0, 1 - (scrollY / (hero.offsetHeight * 0.8)));
                heroContent.style.opacity = opacity;
            }
        }
    }    // Slideshow functionality
    setupCardSlideshow(card, widgetId, preview) {
        const totalImages = preview.small.length + preview.medium.length + preview.large.length;

        card.dataset.currentSlide = 0;
        card.dataset.widgetId = widgetId;
        card.dataset.totalSlides = totalImages;

        // Auto-play slideshow
        const interval = setInterval(() => {
            if (document.body.contains(card)) {
                this.changeSlide(widgetId, 1);
            } else {
                clearInterval(interval);
            }
        }, 3000); // Change slide every 3 seconds
    }

    changeSlide(widgetId, direction) {
        const card = document.querySelector(`[data-widget-id="${widgetId}"]`);
        if (!card) return;

        const slides = card.querySelectorAll('.slide');
        const indicators = card.querySelectorAll('.indicator');
        const currentSlide = parseInt(card.dataset.currentSlide) || 0;
        const totalSlides = parseInt(card.dataset.totalSlides) || slides.length;

        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Calculate new slide index
        let newSlide = currentSlide + direction;
        if (newSlide >= totalSlides) newSlide = 0;
        if (newSlide < 0) newSlide = totalSlides - 1;

        // Add active class to new slide and indicator
        slides[newSlide].classList.add('active');
        indicators[newSlide].classList.add('active');

        // Update current slide
        card.dataset.currentSlide = newSlide;
    }

    goToSlide(widgetId, slideIndex) {
        const card = document.querySelector(`[data-widget-id="${widgetId}"]`);
        if (!card) return;

        const slides = card.querySelectorAll('.slide');
        const indicators = card.querySelectorAll('.indicator');
        const currentSlide = parseInt(card.dataset.currentSlide) || 0;

        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Add active class to target slide and indicator
        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');

        // Update current slide
        card.dataset.currentSlide = slideIndex;
    }

    setupModalSlideshow() {
        const modalSlides = document.querySelectorAll('.modal-slideshow-container .slide');
        modalSlides.forEach((slide, index) => {
            slide.dataset.slideIndex = index;
        });
    }

    generateSlideshowHTML(preview) {
        const allImages = [...preview.small, ...preview.medium, ...preview.large];
        const sizeLabels = [
            ...preview.small.map(() => 'Small'),
            ...preview.medium.map(() => 'Medium'),
            ...preview.large.map(() => 'Large')
        ];

        return allImages.map((src, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}">
                <img src="${src}" alt="Widget preview" loading="lazy" onerror="this.src='images/placeholder.png'">
                <div class="slide-label">${sizeLabels[index]}</div>
            </div>
        `).join('');
    }

    generateIndicatorsHTML(preview, widgetId) {
        const totalImages = preview.small.length + preview.medium.length + preview.large.length;
        return Array.from({ length: totalImages }, (_, index) =>
            `<span class="indicator ${index === 0 ? 'active' : ''}" onclick="event.stopPropagation(); app.goToSlide('${widgetId}', ${index})"></span>`
        ).join('');
    }

    generateModalSlideshowHTML(preview) {
        const sizes = ['small', 'medium', 'large'];
        return sizes.map((size, sizeIndex) =>
            preview[size].map((src, imageIndex) => `
                <div class="slide ${sizeIndex === 0 && imageIndex === 0 ? 'active' : ''}" data-size="${size}" data-image-index="${imageIndex}">
                    <img src="${src}" alt="Widget preview" loading="lazy" onerror="this.src='images/placeholder.png'">
                </div>
            `).join('')
        ).join('');
    }

    // ...existing code...
}

// Global utility functions
function scrollToWidgets() {
    const widgetsSection = document.getElementById('widgetsSection');
    if (widgetsSection) {
        widgetsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ScriptablePlayground();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
