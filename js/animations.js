/* ==========================================================================
   TPGIT Vidyut - Animations Module
   Handles all animations, transitions, and interactive effects
   ========================================================================== */

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.intersectionObserver = null;
        this.scrollEffects = [];
        this.init();
    }
    
    init() {
        // Initialize Intersection Observer for scroll animations
        this.initIntersectionObserver();
        
        // Initialize scroll effects
        this.initScrollEffects();
        
        // Initialize hover effects
        this.initHoverEffects();
        
        // Initialize loading animations
        this.initLoadingAnimations();
        
        // Initialize page transitions
        this.initPageTransitions();
        
        // Initialize particle effects
        this.initParticleEffects();
        
        // Initialize floating animations
        this.initFloatingAnimations();
        
        // Initialize typing animations
        this.initTypingAnimations();
    }
    
    initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateElement(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '50px'
                }
            );
            
            // Observe elements with animation classes
            document.querySelectorAll('[data-animate]').forEach(element => {
                this.intersectionObserver.observe(element);
            });
        }
    }
    
    initScrollEffects() {
        // Parallax effects
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            this.scrollEffects.push({
                element,
                speed,
                update: (scrollY) => {
                    const yPos = -(scrollY * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
        
        // Sticky elements
        const stickyElements = document.querySelectorAll('[data-sticky]');
        stickyElements.forEach(element => {
            const offset = parseInt(element.dataset.sticky) || 0;
            this.scrollEffects.push({
                element,
                offset,
                update: (scrollY) => {
                    if (scrollY > offset) {
                        element.classList.add('sticky-active');
                    } else {
                        element.classList.remove('sticky-active');
                    }
                }
            });
        });
        
        // Progress bars
        const progressElements = document.querySelectorAll('[data-progress]');
        progressElements.forEach(element => {
            const targetValue = parseInt(element.dataset.progress) || 100;
            this.scrollEffects.push({
                element,
                targetValue,
                update: (scrollY) => {
                    const rect = element.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    if (rect.top < viewportHeight && rect.bottom > 0) {
                        const progress = Math.min(100, Math.max(0, 
                            ((viewportHeight - rect.top) / viewportHeight) * 100
                        ));
                        
                        const currentValue = (progress / 100) * targetValue;
                        element.style.width = `${currentValue}%`;
                        element.setAttribute('aria-valuenow', currentValue);
                    }
                }
            });
        });
        
        // Add scroll event listener
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.scrollEffects.forEach(effect => {
                effect.update(scrollY);
            });
        });
    }
    
    initHoverEffects() {
        // 3D tilt effect
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = ((x - centerX) / centerX) * 10;
                const rotateX = ((centerY - y) / centerY) * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
        
        // Ripple effect for buttons
        const rippleButtons = document.querySelectorAll('[data-ripple]');
        rippleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple-effect');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Glow effect on hover
        const glowElements = document.querySelectorAll('[data-glow]');
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glow-active');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('glow-active');
            });
        });
    }
    
    initLoadingAnimations() {
        // Skeleton loading
        const skeletonElements = document.querySelectorAll('[data-skeleton]');
        skeletonElements.forEach(element => {
            this.createSkeletonAnimation(element);
        });
        
        // Progress bar loading
        const progressLoaders = document.querySelectorAll('[data-loader="progress"]');
        progressLoaders.forEach(loader => {
            this.createProgressLoader(loader);
        });
        
        // Spinner loading
        const spinnerLoaders = document.querySelectorAll('[data-loader="spinner"]');
        spinnerLoaders.forEach(loader => {
            this.createSpinnerLoader(loader);
        });
    }
    
    initPageTransitions() {
        // Fade in page content
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('page-loaded');
        });
        
        // Smooth page transitions
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.target === '_blank' || link.hasAttribute('download')) {
                    return;
                }
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Add page transition
                document.body.classList.add('page-exit');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }
    
    initParticleEffects() {
        const particleContainers = document.querySelectorAll('[data-particles]');
        particleContainers.forEach(container => {
            const count = parseInt(container.dataset.particles) || 50;
            this.createParticles(container, count);
        });
    }
    
    initFloatingAnimations() {
        const floatElements = document.querySelectorAll('[data-float]');
        floatElements.forEach(element => {
            const duration = parseFloat(element.dataset.float) || 3;
            const delay = Math.random() * 2;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    initTypingAnimations() {
        const typingElements = document.querySelectorAll('[data-typing]');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    // Animation Methods
    animateElement(element) {
        const animationType = element.dataset.animate;
        
        switch(animationType) {
            case 'fade-in':
                this.fadeIn(element);
                break;
            case 'slide-up':
                this.slideUp(element);
                break;
            case 'slide-left':
                this.slideLeft(element);
                break;
            case 'slide-right':
                this.slideRight(element);
                break;
            case 'scale-up':
                this.scaleUp(element);
                break;
            case 'rotate-in':
                this.rotateIn(element);
                break;
            default:
                this.fadeIn(element);
        }
        
        // Mark as animated
        element.classList.add('animated');
    }
    
    fadeIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    slideUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    slideLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    slideRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    scaleUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        });
    }
    
    // Loading Animations
    createSkeletonAnimation(element) {
        const duration = 1.5;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const shimmer = document.createElement('div');
        shimmer.className = 'skeleton-shimmer';
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer ${duration}s infinite;
        `;
        
        element.appendChild(shimmer);
        
        // Add CSS animation
        if (!document.querySelector('#skeleton-animation')) {
            const style = document.createElement('style');
            style.id = 'skeleton-animation';
            style.textContent = `
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createProgressLoader(container) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-loader';
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: var(--border-color);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background: var(--primary-color);
            animation: progressLoad 2s ease-in-out infinite;
        `;
        
        progressBar.appendChild(progressFill);
        container.appendChild(progressBar);
        
        // Add CSS animation
        if (!document.querySelector('#progress-animation')) {
            const style = document.createElement('style');
            style.id = 'progress-animation';
            style.textContent = `
                @keyframes progressLoad {
                    0% { width: 0%; left: 0%; }
                    50% { width: 100%; left: 0%; }
                    100% { width: 0%; left: 100%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createSpinnerLoader(container) {
        const spinner = document.createElement('div');
        spinner.className = 'spinner-loader';
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        container.appendChild(spinner);
        
        // Add CSS animation if not already present
        if (!document.querySelector('#spin-animation')) {
            const style = document.createElement('style');
            style.id = 'spin-animation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Particle Effects
    createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            container.appendChild(particle);
        }
        
        // Add particle animation
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10%, 90% {
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                        opacity: 0.8;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Utility Methods
    debounce(func, wait) {
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
    
    throttle(func, limit) {
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
    
    // Public Methods
    startAnimation(element, animationName, duration = 0.6) {
        element.style.animation = `${animationName} ${duration}s ease`;
    }
    
    stopAnimation(element) {
        element.style.animation = 'none';
    }
    
    createConfetti() {
        const confettiCount = 150;
        const colors = ['#2e86c1', '#8e44ad', '#f39c12', '#e74c3c', '#27ae60', '#3498db'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 3 + 2;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${Math.random() * 100}vw;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${duration}s ease-in forwards;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
        
        // Add confetti animation
        if (!document.querySelector('#confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createPulseEffect(element) {
        element.classList.add('pulse');
        
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 600);
    }
}

// Initialize Animation Manager
const animations = new AnimationManager();

// Export to global scope
window.Animations = animations;

// Add CSS for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation classes */
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .slide-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .slide-up.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scale-in {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scale-in.animated {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Page transitions */
        .page-loaded {
            animation: pageFadeIn 0.5s ease;
        }
        
        .page-exit {
            animation: pageFadeOut 0.3s ease forwards;
        }
        
        @keyframes pageFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pageFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* Ripple effect */
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Glow effect */
        .glow-active {
            box-shadow: 0 0 20px rgba(0, 86, 179, 0.5);
        }
        
        /* Pulse effect */
        .pulse {
            animation: pulse 0.6s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Float animation */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        /* Sticky elements */
        .sticky-active {
            position: fixed;
            top: 0;
            z-index: 1000;
            animation: stickySlideDown 0.3s ease;
        }
        
        @keyframes stickySlideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});