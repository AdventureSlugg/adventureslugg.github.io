import { hideMobileExplorer } from "./clickObservers";

// Get the mobile and desktop layouts
const mobileLayout = document.getElementById('mobile-layout');
const desktopLayout = document.getElementById('desktop-layout');
const parentOfLayout = document.getElementById('parent-layout')

// Determine the initial layout
determineLayout();

// When the window gets resized, reapply the layout.
window.addEventListener('resize', () => {
	determineLayout()
})

function determineLayout() {
	// When the width is less than 1023, show the mobile view and hide the desktop layout.
	if (window.innerWidth <= 1023) {
		if( window.innerWidth > 550) {
			// Top should take up 60vw, bottom 40vw
		}
		desktopLayout!.remove();
		parentOfLayout!.appendChild(mobileLayout!);
		
		// Hide the mobile explorer by default
		hideMobileExplorer();
	} else { // Otherwise, show the desktop view
		mobileLayout!.remove();
		parentOfLayout!.appendChild(desktopLayout!)
	}
}