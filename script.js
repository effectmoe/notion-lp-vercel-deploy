document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    // Add fade-in effect for hero section
    setTimeout(() => {
        heroText.style.opacity = '1';
    }, 300);
    
    setTimeout(() => {
        heroImage.style.opacity = '1';
    }, 600);
    
    // Mobile menu toggle
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if(mainNav.classList.contains('active')) {
                mainNav.style.display = 'block';
            } else {
                mainNav.style.display = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('inquiry-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if(!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if(isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.submit-btn');
                submitButton.textContent = '送信中...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    alert('お問い合わせありがとうございます。近日中にご連絡いたします。');
                    contactForm.reset();
                    submitButton.textContent = '無料相談を申し込む';
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Add an intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.feature-card, .why-card, .testimonial-card');
    
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // Add reveal class style
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
});