// Main JavaScript for JobHatch

document.addEventListener('DOMContentLoaded', function() {
    // Preload images
    preloadImages();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // --- Onboarding 全屏页面逻辑 ---
    const onboardingPage = document.getElementById('onboardingPage');
    const homeTab = document.getElementById('home');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const onboardingSteps = [
        document.getElementById('onboardingStep1'),
        document.getElementById('onboardingStep2'),
        document.getElementById('onboardingStep3'),
        document.getElementById('onboardingStep4'),
        document.getElementById('onboardingComplete')
    ];
    let onboardingState = {
        role: null,
        status: null,
        clarity: null,
        urgency: null,
        resume: null
    };
    function showOnboardingStep(idx) {
        onboardingSteps.forEach((step, i) => {
            if (step) step.style.display = (i === idx) ? 'block' : 'none';
        });
    }
    if (getStartedBtn && onboardingPage && homeTab) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            homeTab.style.display = 'none';
            onboardingPage.style.display = 'flex';
            showOnboardingStep(0);
        });
    }
    // Step 1
    if (onboardingSteps[0]) {
        onboardingSteps[0].querySelectorAll('.onboarding-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                onboardingState.role = this.getAttribute('data-role');
                if (onboardingState.role === 'mentor') {
                    showOnboardingStep(4);
                } else {
                    showOnboardingStep(1);
                }
            });
        });
    }
    // Step 2
    if (onboardingSteps[1]) {
        onboardingSteps[1].querySelectorAll('.onboarding-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                onboardingState.status = this.getAttribute('data-status');
                if (onboardingState.status === 'notnow') {
                    showOnboardingStep(4);
                } else {
                    showOnboardingStep(2);
                }
            });
        });
    }
    // Step 3
    const resumeUploadSection = document.getElementById('resumeUploadSection');
    const resumeUploadInput = document.getElementById('resumeUploadInput');
    const resumeUploadBtn = document.getElementById('resumeUploadBtn');
    if (onboardingSteps[2]) {
        onboardingSteps[2].querySelectorAll('.onboarding-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                onboardingState.clarity = this.getAttribute('data-clarity');
                if (onboardingState.clarity === 'notSure' && resumeUploadSection) {
                    resumeUploadSection.style.display = 'block';
                } else {
                    if (resumeUploadSection) resumeUploadSection.style.display = 'none';
                    showOnboardingStep(3);
                }
            });
        });
    }
    if (resumeUploadBtn && resumeUploadInput) {
        resumeUploadBtn.addEventListener('click', function() {
            resumeUploadInput.click();
        });
    }
    if (resumeUploadInput) {
        resumeUploadInput.addEventListener('change', function() {
            if (resumeUploadInput.files.length > 0) {
                onboardingState.resume = resumeUploadInput.files[0];
                showOnboardingStep(4);
            }
        });
    }
    const noResumeBtn = document.getElementById('noResumeBtn');
    if (noResumeBtn) {
        noResumeBtn.addEventListener('click', function() {
            alert('将跳转到AI Agent，帮助你定制求职方向和简历！');
            showOnboardingStep(4);
        });
    }
    // Step 4
    if (onboardingSteps[3]) {
        onboardingSteps[3].querySelectorAll('.onboarding-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                onboardingState.urgency = this.getAttribute('data-urgency');
                showOnboardingStep(4);
            });
        });
    }
    // Finish
    const onboardingFinishBtn = document.getElementById('onboardingFinishBtn');
    if (onboardingFinishBtn) {
        onboardingFinishBtn.addEventListener('click', function() {
            onboardingPage.style.display = 'none';
            homeTab.style.display = '';
        });
    }

    // Get all tab links
    const tabLinks = document.querySelectorAll('.tab-link');
    
    // Add click event listener to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target tab ID
            const targetTabId = this.getAttribute('data-tab');
            
            // Deactivate all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tab links
            tabLinks.forEach(tabLink => {
                tabLink.classList.remove('active');
            });
            
            // Activate the clicked tab and tab link
            const targetTab = document.getElementById(targetTabId);
            if (targetTab) {
                targetTab.classList.add('active');
                this.classList.add('active');
                
                // Update URL hash for direct linking
                window.location.hash = targetTabId;
                
                // Scroll to top to ensure content isn't hidden behind the nav bar
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });
            }
        });
    });
    
    // Check for hash in URL and activate corresponding tab
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const hashLink = document.querySelector(`.tab-link[data-tab="${hash}"]`);
        
        if (hashLink) {
            hashLink.click();
        }
    }
    
    // Always scroll to top when page loads to ensure content isn't hidden
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
});

// Preload all important images to ensure they display properly
function preloadImages() {
    const imagesToPreload = [
        'src/assets/images/jobhatch-logo.svg',
        'src/assets/images/chick.svg',
        'src/assets/images/egg.svg',
        'src/assets/images/ai-icon.svg',
        'src/assets/images/mission-icon.svg',
        'src/assets/images/buddy-icon.svg',
        'src/assets/images/goals-icon.svg',
        'src/assets/images/missions-icon.svg',
        'src/assets/images/buddies-icon.svg',
        'src/assets/images/pet-icon.svg',
        'src/assets/images/success-icon.svg',
        'src/assets/images/avatar-1.svg',
        'src/assets/images/avatar-2.svg',
        'src/assets/images/avatar-3.svg',
        'src/assets/images/avatar-4.svg',
        'src/assets/images/google-icon.svg',
        'src/assets/images/favicon.svg',
        'src/assets/images/Chicken.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const dots = document.querySelectorAll('.slider-dot');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (!dots.length || !testimonials.length) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all testimonials and dots
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current testimonial and dot
            if (testimonials[index]) {
                testimonials[index].classList.add('active');
            }
            dot.classList.add('active');
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    let currentIndex = 0;
    
    function rotateTestimonials() {
        currentIndex = (currentIndex + 1) % dots.length;
        dots[currentIndex].click();
    }
    
    // Start auto-rotation
    let interval = setInterval(rotateTestimonials, 5000);
    
    // Pause auto-rotation when user interacts with testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            clearInterval(interval);
            interval = setInterval(rotateTestimonials, 5000);
        });
    }
}

// Helper function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Handle About page Get Started button
    const aboutGetStartedBtn = document.getElementById('aboutGetStarted');
    if (aboutGetStartedBtn) {
        aboutGetStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html#getStartedBtn';
        });
    }
});

// Handle floating elements animation on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for hero section
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    }
    
    // Adjust floating bubble animations based on scroll
    const bubbles = document.querySelectorAll('.feature-bubble');
    bubbles.forEach((bubble, index) => {
        const speed = 0.03 + (index * 0.01);
        const yOffset = Math.sin(scrollPosition * speed) * 10;
        bubble.style.transform = `translateY(${yOffset}px)`;
    });
}); 