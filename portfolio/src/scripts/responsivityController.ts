// Get the screen size and determine whether or not to show the mobile or desktop view
console.log(window.innerWidth);

// Get the mobile and desktop layouts
const mobileLayout = document.getElementById('mobile-layout');
const desktopLayout = document.getElementById('desktop-layout');

// Determine the initial layout
determineLayout();

// When the window gets resized, reapply the layout.
window.addEventListener('resize', () => {
	determineLayout()
})

function determineLayout() {
	// When the width is less than 1023, show the mobile view and hide the desktop layout.
	if (window.innerWidth < 1023) {
		desktopLayout!.style.display = 'none';
		mobileLayout!.style.display = 'flex';
	} else { // Otherwise, show the desktop view
		mobileLayout!.style.display = 'none';
		desktopLayout!.style.display = 'block';
	}
}