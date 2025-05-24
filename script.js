document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation items and content sections
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Set initial active section
    let activeSection = document.getElementById('about-me');
    let activeNavItem = document.querySelector('[data-section="about-me"]');
    activeNavItem.classList.add('active');
    
    // Initialize typing animation for initial active section
    setTimeout(() => {
        animateTypingTexts(activeSection);
    }, 1500); // Start after heading animation
    
    // Add click event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the section ID from the data attribute
            const sectionId = item.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            // Skip if clicking the already active section
            if (targetSection === activeSection) return;
            
            // Remove active class from current active elements
            activeNavItem.classList.remove('active');
            activeSection.classList.remove('active');
            
            // Add active class to clicked nav item and corresponding section
            item.classList.add('active');
            targetSection.classList.add('active');
            
            // Reset and start animations for the new section
            resetTypingEffects(targetSection);
            setTimeout(() => {
                animateTypingTexts(targetSection);
            }, 1500); // Start after heading animation
            
            // Update active references
            activeSection = targetSection;
            activeNavItem = item;
        });
    });
    
    // Function to animate the typing texts in a section
    function animateTypingTexts(section) {
        const typingTexts = section.querySelectorAll('.typing-text');
        const subOffers = section.querySelectorAll('.sub-offer');
        
        // First, ensure all sub-offers are reset
        subOffers.forEach(subOffer => {
            subOffer.classList.remove('active');
        });
        
        // Animate main text items
        typingTexts.forEach((text, index) => {
            // Add animation with delay based on index
            setTimeout(() => {
                text.style.animation = 'fadeInUp 0.5s ease forwards';
            }, index * 200); // Stagger the animations
        });
        
        // Activate all sub-offers with a delay after texts start animating
        setTimeout(() => {
            subOffers.forEach(subOffer => {
                subOffer.classList.add('active');
            });
        }, typingTexts.length * 50 + 80); // Wait for most texts to appear
    }
    
    // Function to reset typing effects for a section
    function resetTypingEffects(section) {
        // Reset heading animation
        const heading = section.querySelector('.typing-effect');
        heading.style.animation = 'none';
        heading.offsetHeight; // Trigger reflow
        heading.style.animation = 'typing 1.5s steps(20, end) forwards, blink 0.75s step-end infinite';
        
        // Reset paragraph animations
        const typingTexts = section.querySelectorAll('.typing-text');
        typingTexts.forEach(text => {
            text.style.animation = 'none';
            text.style.opacity = '0';
            text.style.transform = 'translateY(10px)';
        });
        
        // Reset sub-offers
        const subOffers = section.querySelectorAll('.sub-offer');
        subOffers.forEach(subOffer => {
            subOffer.classList.remove('active');
        });
    }
    
    // Add cursor hover effect for subtle mouse trail
    document.addEventListener('mousemove', (e) => {
        // Create cursor effect at a reduced frequency for performance
        if (Math.random() > 0.4) { // Only create effects 20% of the time for lightweight trail
            const cursor = document.createElement('div');
            cursor.classList.add('cursor-effect');
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
            
            // Make the effect smaller and more subtle
            cursor.style.opacity = '0.5'; // Lower opacity
            cursor.style.width = '3px';
            cursor.style.height = '3px';
            
            document.body.appendChild(cursor);
            
            // Remove after animation completes
            setTimeout(() => {
                cursor.remove();
            }, 400);
        }
    });
});
