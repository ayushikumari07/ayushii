// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced horizontal scrolling for work section
    const workSection = document.querySelector('.work');
    const workContainer = document.querySelector('.work-container');
    
    if (workSection && workContainer) {
        // Add scroll snap behavior
        workSection.style.scrollSnapType = 'x mandatory';
        
        // Add scroll indicator
        let isScrolling = false;
        
        workSection.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                
                // Update scroll indicator
                const scrollProgress = (workSection.scrollLeft / (workSection.scrollWidth - workSection.clientWidth)) * 100;
                
                setTimeout(() => {
                    isScrolling = false;
                }, 150);
            }
        });

        // Keyboard navigation for work section
        document.addEventListener('keydown', function(e) {
            if (document.activeElement.closest('.work')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    workSection.scrollBy({
                        left: -workSection.clientWidth,
                        behavior: 'smooth'
                    });
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    workSection.scrollBy({
                        left: workSection.clientWidth,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Add hover effects to work items
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero.offsetTop <= scrolled + window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add loading animation
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize first section
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
});

// Add touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const workSection = document.querySelector('.work');
        
        if (workSection && document.activeElement.closest('.work')) {
            if (diffX > 0) {
                // Swipe left - go to next
                workSection.scrollBy({
                    left: workSection.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                // Swipe right - go to previous
                workSection.scrollBy({
                    left: -workSection.clientWidth,
                    behavior: 'smooth'
                });
            }
        }
    }
}); 