// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Create particles background
    createParticles();

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add shake animation to hamburger
        hamburger.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            hamburger.style.animation = '';
        }, 500);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Add ripple effect
            createRipple(this, event);
        });
    });

    // Navbar scroll effect with progress bar
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add glow effect to target
                target.classList.add('glow');
                setTimeout(() => {
                    target.classList.remove('glow');
                }, 2000);
            }
        });
    });

    // Enhanced counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    entry.target.textContent = Math.floor(current);

                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                        
                        // Add celebration effect
                        entry.target.style.animation = 'bounce 0.6s ease';
                        setTimeout(() => {
                            entry.target.style.animation = '';
                        }, 600);
                    }
                }, 20);

                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Enhanced fade in animation for elements
    const fadeElements = document.querySelectorAll('.feature-card, .value-card, .service-card, .trainer-card, .plan-card, .benefit-item');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                    
                    // Add floating animation to some elements
                    if (entry.target.classList.contains('feature-card') || 
                        entry.target.classList.contains('benefit-item')) {
                        entry.target.classList.add('floating');
                    }
                }, index * 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeObserver.observe(element);
    });

    // Enhanced contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Enhanced form submission with loading animation
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitButton.disabled = true;
            submitButton.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';

            // Simulate API call with enhanced feedback
            setTimeout(() => {
                // Success animation
                submitButton.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
                submitButton.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                // Show success message with animation
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 2000);
            }, 2000);
        });

        // Add real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField.call(this);
                }
            });
        });
    }

    // Enhanced page navigation with scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('.html')) {
                setTimeout(() => {
                    scrollToTop();
                }, 100);
            }
        });
    });

    // Enhanced logo click functionality
    document.querySelector('.logo').addEventListener('click', function() {
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        } else {
            scrollToTop();
        }
        
        // Add pulse effect
        this.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });

    // Enhanced loading animation
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(pageLoader);

    // Hide loader when page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.remove();
            }, 300);
        }, 800);
    });

    // Enhanced back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button with animation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'flex';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'scale(1)';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // Enhanced back to top functionality
    backToTopButton.addEventListener('click', function() {
        scrollToTop();
        
        // Add rocket effect
        this.innerHTML = '<i class="fas fa-rocket"></i>';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-arrow-up"></i>';
        }, 1000);
    });

    // Add interactive hover effects to cards
    document.querySelectorAll('.feature-card, .service-card, .trainer-card, .plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Helper Functions

// Create ripple effect
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Form validation
function validateField() {
    const value = this.value.trim();
    const type = this.type;
    const required = this.hasAttribute('required');
    
    let isValid = true;
    let errorMessage = '';
    
    if (required && !value) {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    } else if (type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
    } else if (type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'يرجى إدخال رقم هاتف صحيح';
    }
    
    if (isValid) {
        this.classList.remove('error');
        removeErrorMessage(this);
        this.style.borderColor = '#27ae60';
    } else {
        this.classList.add('error');
        showErrorMessage(this, errorMessage);
        this.style.borderColor = '#e74c3c';
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Show error message
function showErrorMessage(field, message) {
    removeErrorMessage(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        animation: fadeInUp 0.3s ease;
    `;
    field.parentNode.appendChild(errorDiv);
}

// Remove error message
function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #27ae60, #2ecc71)' : 'linear-gradient(45deg, #3498db, #2980b9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add CSS animations
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
}

.notification {
    font-family: 'Cairo', sans-serif;
    font-weight: 500;
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);