
// DYNAMIC HEADER WITH RESPONSIVE CHECK
const blueHeader = document.querySelector('.header-wrapper');
const whiteHeader = document.querySelector('.scrolled-header');
const bottomMenu = document.querySelector('.bottom-menu');
const scrolledMenu = document.querySelector('.scrolled-menu');
let scrollThreshold = 70;

function handleHeaderSwitch(){
    const scrollPosition = window.scrollY;
    const isXLScreen = window.innerWidth >= 1280; // XL screen breakpoint

    if(scrollPosition > scrollThreshold){
        // Hide blue header, show white header
        blueHeader.style.display = 'none';
        whiteHeader.style.display = 'flex';
        
        // Only show/hide menus on XL screens and above
        if (isXLScreen) {
            scrolledMenu.style.display = 'flex';
            bottomMenu.style.display = 'none';
        } else {
            // On smaller screens, keep menus hidden
            scrolledMenu.style.display = 'none';
            bottomMenu.style.display = 'none';
        }
    }
    else{
        // Show blue header, hide white header
        blueHeader.style.display = 'flex';
        whiteHeader.style.display = 'none';
        
        // Only show/hide menus on XL screens and above
        if (isXLScreen) {
            scrolledMenu.style.display = 'none';
            bottomMenu.style.display = 'flex';
        } else {
            // On smaller screens, keep menus hidden
            scrolledMenu.style.display = 'none';
            bottomMenu.style.display = 'none';
        }
    }
}

// Handle both scroll and resize events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleHeaderSwitch();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);
window.addEventListener('resize', requestTick); // Add resize listener

// Initialize on page load
handleHeaderSwitch();


// SORTING FUNCTION
const sortButtons = document.querySelectorAll('.sort-btn');
const sortContents = document.querySelectorAll('.product-wrapper');
const selector = document.querySelector('.selector');

sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnRect = btn.getBoundingClientRect();
        const containerRect = btn.parentElement.getBoundingClientRect();
        
        // Calculate the exact position relative to the container
        const leftPosition = btnRect.left - containerRect.left;
        
        // Position the selector exactly where the button is
        selector.style.transform = `translateX(${leftPosition}px)`;
        selector.style.width = `${btnRect.width}px`; // Match button width exactly
        
        // Update active states
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.dataset.tab;

        sortContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(target).classList.add('active');
    });
});

function positionSelector() {
    const activeBtn = document.querySelector('.sort-btn.active') || sortButtons[0];
    if (activeBtn) {
        const btnRect = activeBtn.getBoundingClientRect();
        const containerRect = activeBtn.parentElement.getBoundingClientRect();
        const leftPosition = btnRect.left - containerRect.left;
        
        selector.style.transform = `translateX(${leftPosition}px)`;
        selector.style.width = `${btnRect.width}px`;
    }
}

// Set initial position on page load
window.addEventListener('DOMContentLoaded', positionSelector);

// Reposition selector when window is resized
window.addEventListener('resize', positionSelector);

// Optional: Set initial position on page load
window.addEventListener('DOMContentLoaded', () => {
    const activeBtn = document.querySelector('.sort-btn.active') || sortButtons[0];
    if (activeBtn) {
        activeBtn.click(); // This will trigger the positioning
    }
});

// DROPDOWN FUNCTION
document.querySelectorAll('.dropdown-container').forEach(container => {
    const content = container.querySelector('.dropdown-content');
    const arrow = container.querySelector('.arrow');
    container.addEventListener('click', () => {
        content.classList.toggle('show');
        if (arrow.classList.contains('rotate-down')) {
            arrow.classList.remove('rotate-down');
            arrow.classList.add('rotate-up');
        } else {
            arrow.classList.remove('rotate-up');
            arrow.classList.add('rotate-down');
        }
    });
});