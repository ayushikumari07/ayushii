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
        workSection.style.scrollSnapType = 'y mandatory';
        
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
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    workSection.scrollBy({
                        top: -workSection.clientHeight,
                        behavior: 'smooth'
                    });
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    workSection.scrollBy({
                        top: workSection.clientHeight,
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

    // Reveal animation using IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target); // animate once
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    // Section observer for nav highlight and background color change
    const pageSections = document.querySelectorAll('section, .work-item');
    const navLinkMap = {};
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        navLinkMap[link.getAttribute('href')] = link;
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id') ? '#' + entry.target.getAttribute('id') : null;

                    // Update nav link active state
                    if (id && navLinkMap[id]) {
                        Object.values(navLinkMap).forEach((lnk) => lnk.classList.remove('active'));
                        navLinkMap[id].classList.add('active');
                    }

                    // Update body background from data-bg
                    if (entry.target.dataset && entry.target.dataset.bg) {
                        document.body.style.backgroundColor = entry.target.dataset.bg;
                    }
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    pageSections.forEach((sec) => sectionObserver.observe(sec));
});

// Add touch/swipe support for mobile (vertical)
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
    
    // Only handle vertical swipes
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
        const workSection = document.querySelector('.work');
        
        if (workSection && document.activeElement.closest('.work')) {
            if (diffY > 0) {
                // Swipe up - next slide
                workSection.scrollBy({
                    top: workSection.clientHeight,
                    behavior: 'smooth'
                });
            } else {
                // Swipe down - previous slide
                workSection.scrollBy({
                    top: -workSection.clientHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
}); 