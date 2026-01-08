/* ==========================================================================
   TPGIT Vidyut - Main JavaScript
   Common functionality across all pages
   ========================================================================== */

// Global variables
let currentTheme = 'dark';
let fontSize = 16;
let highContrast = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accessibility features
    setupAccessibility();
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initialize modals
    setupModals();
    
    // Initialize tooltips
    setupTooltips();
    
    // Initialize animations
    initAnimations();
    
    // Check for user preferences
    loadUserPreferences();
    
    // Set up service worker for PWA
    if ('serviceWorker' in navigator) {
        setupServiceWorker();
    }
    
    // Set up offline detection
    setupOfflineDetection();
});

// Accessibility Setup
function setupAccessibility() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // High contrast mode
    const highContrastBtn = document.getElementById('highContrastBtn');
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', toggleHighContrast);
        
        // Load saved preference
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
            highContrast = true;
        }
    }
    
    // Text size adjustment
    const textSizeBtn = document.getElementById('textSizeBtn');
    if (textSizeBtn) {
        textSizeBtn.addEventListener('click', adjustTextSize);
        
        // Load saved preference
        const savedSize = localStorage.getItem('fontSize');
        if (savedSize) {
            fontSize = parseInt(savedSize);
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    }
    
    // Read aloud feature
    const readAloudBtn = document.getElementById('readAloudBtn');
    if (readAloudBtn) {
        readAloudBtn.addEventListener('click', readAloud);
    }
}

// Theme Management
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update icon
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Dispatch theme change event
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

// High Contrast Mode
function toggleHighContrast() {
    highContrast = !highContrast;
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', highContrast);
}

// Text Size Adjustment
function adjustTextSize() {
    fontSize += 2;
    if (fontSize > 24) fontSize = 16; // Reset if too large
    document.documentElement.style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', fontSize);
    
    // Show notification
    showNotification(`Text size set to ${fontSize}px`, 'info');
}

// Read Aloud Feature
function readAloud() {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance();
        
        // Get main content
        const title = document.title;
        const mainHeading = document.querySelector('h1')?.textContent || '';
        const firstParagraph = document.querySelector('p')?.textContent || '';
        
        speech.text = `${title}. ${mainHeading}. ${firstParagraph}`;
        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;
        
        window.speechSynthesis.speak(speech);
        
        // Show notification
        showNotification('Reading page content...', 'info');
    } else {
        showNotification('Speech synthesis not supported in this browser', 'warning');
    }
}

// Navigation Setup
function setupNavigation() {
    // Set active navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage.includes(href.replace('.html', '')) && href !== 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
    
    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth > 768) {
                    e.preventDefault();
                    menu.classList.toggle('show');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('mobile-open');
        });
    }
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
        
        // Alt + C for high contrast
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            const highContrastBtn = document.getElementById('highContrastBtn');
            if (highContrastBtn) highContrastBtn.click();
        }
        
        // Alt + P for print
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Alt + H for home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });
    
    // Show shortcuts help
    const shortcutsBtn = document.getElementById('keyboardShortcutsBtn');
    if (shortcutsBtn) {
        shortcutsBtn.addEventListener('click', showKeyboardShortcuts);
    }
}

function showKeyboardShortcuts() {
    const shortcuts = `
        <div class="shortcuts-modal">
            <h3>Keyboard Shortcuts</h3>
            <div class="shortcuts-list">
                <div class="shortcut-item">
                    <kbd>Alt</kbd> + <kbd>T</kbd>
                    <span>Toggle Theme</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Alt</kbd> + <kbd>C</kbd>
                    <span>Toggle High Contrast</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Alt</kbd> + <kbd>P</kbd>
                    <span>Print Current Page</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Alt</kbd> + <kbd>H</kbd>
                    <span>Go to Home</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Esc</kbd>
                    <span>Close Modals/Dropdowns</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Alt</kbd> + <kbd>R</kbd>
                    <span>Read Aloud (Current Page)</span>
                </div>
            </div>
            <p class="shortcuts-note">Shortcuts work when no form fields are focused.</p>
        </div>
    `;
    
    showModal('Keyboard Shortcuts', shortcuts);
}

// Modal Management
function setupModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Close modals with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showModal(title, content) {
    const modal = document.getElementById('genericModal') || createGenericModal();
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    modal.classList.add('active');
}

function createGenericModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'genericModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Tooltips
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = this.title;
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
    tooltip.style.top = rect.top - 10 + 'px';
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.left = (rect.left + (rect.width / 2) - (tooltipRect.width / 2)) + 'px';
    tooltip.style.top = (rect.top - tooltipRect.height - 10) + 'px';
    
    this.tooltipElement = tooltip;
}

function hideTooltip() {
    if (this.tooltipElement) {
        this.tooltipElement.remove();
        this.tooltipElement = null;
    }
}

// Animations
function initAnimations() {
    // Add scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }
}

// User Preferences
function loadUserPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
    
    // Load text size
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        fontSize = parseInt(savedSize);
        document.documentElement.style.fontSize = fontSize + 'px';
    }
    
    // Load high contrast
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
        document.body.classList.add('high-contrast');
        highContrast = true;
    }
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to notification container or create one
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    return notification;
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Service Worker Setup (PWA)
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
}

// Offline Detection
function setupOfflineDetection() {
    window.addEventListener('online', function() {
        showNotification('You are back online', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('You are offline. Some features may be limited.', 'warning');
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateTPGITEmail(email) {
    return email.endsWith('@tpgit.ac.in');
}

// Export functionality
function exportData(data, filename, type = 'application/json') {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Print functionality
function printPage(elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print - ${document.title}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            @media print {
                                body { margin: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        ${element.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
            return;
        }
    }
    window.print();
}

// Share functionality
async function shareContent(title, text, url) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: text,
                url: url || window.location.href
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url || window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Export to global scope
window.TPGIT = {
    showNotification,
    exportData,
    printPage,
    shareContent,
    validateEmail,
    validateTPGITEmail,
    debounce,
    throttle
};