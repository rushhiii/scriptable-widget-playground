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
            <img class="widget-preview-img" src="${widget.preview.medium}" alt="${widget.name} preview" loading="lazy" onerror="this.src='images/placeholder.png'">
            <div class="widget-features">
                ${widget.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => {
            this.openWidgetModal(id, widget);
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

    openWidgetModal(id, widget) {
        this.currentWidget = { id, ...widget };
        this.currentConfig = {};

        // Set modal content
        document.getElementById('modalTitle').textContent = `${widget.name} Configuration`;
        document.getElementById('widgetDescription').textContent = widget.description;
        document.getElementById('previewImage').src = widget.preview.medium;

        // Set features
        const featuresList = document.getElementById('widgetFeatures');
        featuresList.innerHTML = widget.features.map(feature => `<li>${feature}</li>`).join('');

        // Generate configuration form
        this.generateConfigForm(widget.config);

        // Generate initial code
        this.generateCode();

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
        this.generateCode();
    }

    generateCode() {
        if (!this.currentWidget) return;

        let code = this.currentWidget.template;

        // Replace template variables
        Object.entries(this.currentConfig).forEach(([key, value]) => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            code = code.replace(regex, value);
        });

        // Clean up any remaining placeholders
        code = code.replace(/\\{\\{\\w+\\}\\}/g, '');

        // Update code display
        const codeElement = document.getElementById('generatedCode');
        codeElement.textContent = code;

        // Highlight syntax
        if (window.Prism) {
            window.Prism.highlightElement(codeElement);
        }
    }

    changePreviewSize(size) {
        if (!this.currentWidget) return;

        const previewImage = document.getElementById('previewImage');
        previewImage.src = this.currentWidget.preview[size] || this.currentWidget.preview.medium;
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
}

// Utility functions
function scrollToWidgets() {
    const widgetsSection = document.getElementById('widgetsSection');
    const headerHeight = document.querySelector('.header').offsetHeight;

    // Calculate target position with some offset
    const targetPosition = widgetsSection.offsetTop - headerHeight - 20;

    // Use requestAnimationFrame for smoother scrolling
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // milliseconds
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    }

    // Ease function for smooth animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animateScroll);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScriptablePlayground();
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
