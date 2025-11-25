// #region INITIAL STATES
// The scroll begins at the landing section
let currentSectionID = 'landing';
const sections = ["contact", "landing", "philosophy", "process", "projects"]
// #endregion INITIAL STATES


// #region EVENT LISTENER SETUP
// #region Listen for scrolling into a new section
const observerOptions = {
	root: document.querySelector("#main-content"),
	rootMargin: "0px",
	threshold: 0.5
};

// Setup the intersection observer to listen for when a section is in view
const observer = new IntersectionObserver( entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			currentSectionID = entry.target.id;
			setSectionByID(currentSectionID, true);
		}
	})
}, observerOptions)

// apply the listener to each section
sections.forEach(section => {
	const element = document.querySelector(`#${section}`)
	if (element) observer.observe(element)
})
// #endregion Listen for scrolling into a new section

// #region Listen for selecting a tab
const tabs = document.querySelectorAll('div.tab');
tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		setSectionByID(tab.id.split('-tab')[0]);
	}
)})

// #endregion Listen for selecting a tab

// #region Listen for selecting a tree node
// Add event listeners to each of the TreeNodes
const treeNodes = document.querySelectorAll('div.treenode');
treeNodes.forEach(node => {
	node.addEventListener('click', () => {
		// Prevent the events from being propogated up the dom tree. Only want the child click event.
		event?.stopPropagation()

		// Toggle the view of the node
		toggleView(node.id.split('-node')[0]);

		setSectionByID(node.id.split('-node')[0]);
	})
})
// #endregion Listen for selecting a tree node

// #endregion EVENT LISTENER SETUP

// #region FUNCTION DEFINITIONS
/**
 * Sets the display of each of the children to none if hidden and block if displayed.
 * @param parentID The ID of the parent HTML element
 */
function toggleView (parentID: string) {
	// Change the display name of the directory ▶ or ⛛ based on whether or not it's toggled
	const parent = document.getElementById(`${parentID}-text`) as HTMLElement;
	if (parent.id == "undefined-text") return

	if (parent) {
		const children = document.getElementsByClassName(parentID);
		let isToggled = false;

		// for every child under the parentID, hide the view
		for (let i = 0; i <= children.length - 1; i++) {	
			// If already toggled, set display back to block, otherwise, set to none
			isToggled = (children[i] as HTMLElement).style.display === 'none';
			(children[i] as HTMLElement).style.display = isToggled ? 'block' : 'none';
		}
		
		parent.innerText = parent.innerText.split('').map(c => c === '▶' ? '⛛' : c === '⛛' ? '▶' : c).join().replaceAll(',', '');
	}
}

/**
 * Highlight the node in the explorer by its ID.
 * @param node The ID or HTMLElement of the node to highlight
 */
function highlightNodeByID(node: string | HTMLElement) {
	// If a string ID is passed, get the HTMLElement of the node
	if (typeof node === 'string') node = document.getElementById(`${node}-node`) as HTMLElement;

	// If the section exists, deselect all other nodes and highlight this one
	if (node) {
		treeNodes.forEach(n => n.classList.remove('highlighted'));
		node.classList.add('highlighted')
	}
}

/**
 * Highlight the tab in the tab bar by its ID.
 * @param tabID 
 */
function selectTabByID(tabID: string) { 
	const tabs = document.querySelectorAll('div.tab');
	const tab = document.getElementById(`${tabID.toLowerCase()}-tab`);
	if (tab) {
		tabs.forEach(t => t.classList.remove('selected-tab'));
		tab.classList.add('selected-tab');
	}
}

/**
 * Scroll to the section in the main content by its ID.
 * @param sectionID 
 */
function scrollToSectionByID(sectionID: string, scrollBehavior: ScrollBehavior = 'instant') {
	const section = document.getElementById(sectionID);
	const mainContent = document.getElementById('main-content');
	if (section && mainContent) {
		mainContent.scrollTo({
			top: section.offsetTop - mainContent.offsetTop,
			behavior: scrollBehavior
		});
	}
}

/**
 * Updates the file path display at the top of the explorer.
 * @param sectionID 
 */
function updateFilePath(sectionID: string) {
	const filePath = document.getElementById('file-path') as HTMLInputElement;
	filePath.innerText = sectionID != 'undefined' ? `Zoes-Playground > ${sectionID}` : 'Zoes-Playground';
}

/**
 * Synchronizing the section in view with the tab bar and explorer.
 * @param sectionID 
 */
function setSectionByID(sectionID: string, byScroll: boolean = false) {
	scrollToSectionByID(sectionID, byScroll ? 'smooth' : 'instant');
	highlightNodeByID(sectionID);
	selectTabByID(sectionID);
	updateFilePath(sectionID);
}

// #endregion FUNCTION DEFINITIONS
