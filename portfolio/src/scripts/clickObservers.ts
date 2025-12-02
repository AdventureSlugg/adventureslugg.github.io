let rickRoll = false;

const openLink = (url: string, confirmation: boolean = true) => {
	const link = document.createElement('a');
	link.href = url;
	link.target = "_blank"

	if (!confirmation) {
		link.click();
	} else if (confirm(`You are being redirected to ${url}. Would you like to proceed?`)) {
		link.click();
	} 

	document.removeChild(link);

}

const actionMap: Record<string, CallableFunction> = {
	'explorerClickable': () => {
		// Expand/Minimize the Explorer side-bar.
		const explorerElement = document.getElementById('explorer-section') as HTMLElement;
		explorerElement.style.display = explorerElement.style.display === 'none' ? 'block' : 'none'
	},
	'searchClickable': () => {
		// TODO: Open up the Search function.
		console.log("Not yet implemented...");
	},
	'devpostClickable': () => {
		openLink('https://devpost.com/zmb6893')
	},
	'githubClickable': () => {
		openLink('https://github.com/AdventureSlugg')
	},
	'linkedinClickable': () => {
		openLink('https://www.linkedin.com/in/zoe-bingham/')
	},
	'exit-option': () => {
		alert('Oh no you don\'t! Get back there!');
	},
	'minimize-option': () => {
		document.getElementsByClassName('upside-down').length > 0 ?
		document.getElementById('base')!.classList.replace('upside-down', 'right-side-up') :
		document.getElementById('base')!.classList.replace('right-side-up', 'upside-down');
	},
	'hide-option': () => {
		const hide = document.getElementById('hide-option');

		if (!rickRoll) {
			hide!.title = "Last chance... I'M WARNING YOU!"
			rickRoll = true;
		} else {
			hide!.title = "... What did I tell you?"
			openLink('https://www.youtube.com/watch?v=E4WlUXrJgy4', false);
		}
	}

}

const clickables = document.querySelectorAll('div.clickable');
const buttonClickables = document.querySelectorAll('button.clickable');

clickables.forEach(clickable => {
	clickable.addEventListener('click', () => {
		// TODO: Highlight the clickable option and remove highlight from all other clickables
		actionMap[clickable.id]();
	})
})

buttonClickables.forEach(clickable => {
	clickable.addEventListener('click', () => {
		actionMap[clickable.id]();
	})
})