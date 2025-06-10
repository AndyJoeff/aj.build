// Get references to key elements
const laptopContainer = document.querySelector('.hero-section-laptop-container');
const laptop = document.querySelector('.hero-section-laptop');
const secondaryScreen = document.querySelector('.laptop-secondary-screen-container');
const backgroundImage = document.querySelector('.hero-background-image');

// Function to handle scroll animation based on the section's scroll progress
function animateOnScroll() {
    const laptopContainerRect = laptopContainer.getBoundingClientRect();
    const totalScrollDistance = laptopContainerRect.height - window.innerHeight;

    // Calculate how far we've scrolled within the specific section
    let scrollProgress = (window.scrollY - laptopContainer.offsetTop) / totalScrollDistance;

    // Clamp the scrollProgress to ensure it's between 0 and 1
    scrollProgress = Math.max(0, Math.min(scrollProgress, 1));

    // Scale the laptop element
    const scale = 1 - (scrollProgress * 0.1); // Adjust the 0.1 for more or less scaling
    laptop.style.transform = `scale3d(${scale}, ${scale}, 1)`;

    // Animate the secondary screen height
    const screenHeight = Math.min(scrollProgress * 2, 1) * 100;
    secondaryScreen.style.height = `${screenHeight}%`;

    // Adjust background image opacity only after secondary screen reaches 100%
    if (screenHeight >= 100) {
        const opacityProgress = (scrollProgress - 0.5) * 2; // Normalize progress for second half
        backgroundImage.style.opacity = Math.max(0, Math.min(opacityProgress, 1));
    } else {
        backgroundImage.style.opacity = 0;
    }
}

// Intersection Observer to start/stop scroll event listener based on section visibility
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        // If the laptop section is in view, activate the scroll animation
        window.addEventListener('scroll', animateOnScroll);
    } else {
        // If the section is out of view, remove the scroll animation listener
        window.removeEventListener('scroll', animateOnScroll);
    }
}, { threshold: 0.1 }); // Adjust threshold if needed to trigger animation earlier or later

// Start observing the section
observer.observe(laptopContainer);