import { nullable, ZodBoolean } from "astro:schema";
import type { LayoutType } from "../interfaces/layoutType";

let rickRoll = false;
let harrisAlive = true;

const deathSequence = [
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f1.webp",
		time: 1000,
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f2.webp",
		time: 1750,
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f3.webp",
		time: 1900,
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f4.webp",
		time: 2000,
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f6.webp",
		time: 2100,
		title: 'R.I.P. Harris'
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f6.webp",
		time: 10000,
		opacity: '.5'
	},
	{
		src: "/assets/images/harris/seasonal/default/death-sequence/f6.webp",
		time: 20000,
		opacity: '.2'
	},
	{
		src: null,
		time: 20000,
		opacity: '0'
	},
]

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
	'explorerClickablemobile': () => {
		// If the screen is mobile, then get the bottom section and hide it.
		const bottom = document.getElementsByClassName('bottom');
		if (bottom && bottom[0]) {
			(bottom[0] as HTMLElement).style.display = 'none';
			// Change the main-content view to 80vh
			const mainContent = document.getElementById('main-content');
			if (mainContent) {
				mainContent.style.height = '85vh'
			}
		}
	},
	'searchClickablemobile': () => {
		// TODO: Open up the Search function.
		console.log("Not yet implemented...");
	},
	'devpostClickablemobile': () => {
		openLink('https://devpost.com/zmb6893')
	},
	'githubClickablemobile': () => {
		openLink('https://github.com/AdventureSlugg')
	},
	'linkedinClickablemobile': () => {
		openLink('https://www.linkedin.com/in/zoe-bingham/')
	},
	'explorerClickabledesktop': () => {
		// Expand/Minimize the Explorer side-bar.
		const explorerElement = document.getElementById('explorer-section-desktop') as HTMLElement;
		explorerElement.style.display = explorerElement.style.display === 'none' ? 'flex' : 'none';
		const explorer = document.querySelector('.explorer');
		(explorer as HTMLElement).style.width = '';
	},
	'searchClickabledesktop': () => {
		// TODO: Open up the Search function.
		console.log("Not yet implemented...");
	},
	'devpostClickabledesktop': () => {
		openLink('https://devpost.com/zmb6893')
	},
	'githubClickabledesktop': () => {
		openLink('https://github.com/AdventureSlugg')
	},
	'linkedinClickabledesktop': () => {
		openLink('https://www.linkedin.com/in/zoe-bingham/')
	},
	'exit-option-mobile': () => {
		alert('Oh no you don\'t! Get back there!');
	},
	'exit-option-desktop': () => {
		alert('Oh no you don\'t! Get back there!');
	},
	'minimize-option-mobile': () => {
		flipScreen();
	},
	'minimize-option-desktop': () => {
		flipScreen();
	},
	'hide-option-mobile': () => {
		rickRollAction({layout: 'mobile'})
	},
	'hide-option-desktop': () => {
		rickRollAction({layout: 'desktop'})
	},
	'harris': async () => {
		if (harrisAlive) {
			let harrisElement = document.getElementById('harris') as HTMLImageElement;
			deathSequence.forEach( async frame => {
				setTimeout(() => {
					if (frame.src){
						harrisElement.src = frame.src;
						harrisElement.style.opacity = frame.opacity ? frame.opacity : '1';
						if (frame.title) harrisElement.title = frame.title;
					} else {
						harrisElement.remove();
					}
					
				}, frame.time)
			})
			
		}
		harrisAlive = false;
	}

}

const clickables = document.querySelectorAll('div.clickable');
const buttonClickables = document.querySelectorAll('button.clickable');
const imageClickables = document.querySelectorAll('img.clickable')

const allClickables = [
	...clickables,
	...buttonClickables,
	...imageClickables
]

allClickables.forEach(clickable => {
	clickable.addEventListener('click', () => {
		// TODO: Highlight the clickable option and remove highlight from all other clickables
		actionMap[clickable.id]();
	})
})

function flipScreen () {
	document.getElementsByClassName('upside-down').length > 0 ?
	document.getElementById('base')!.classList.replace('upside-down', 'right-side-up') :
	document.getElementById('base')!.classList.replace('right-side-up', 'upside-down');
}

function rickRollAction (layoutType: LayoutType) {
	const hide = document.getElementById(`hide-option-${layoutType.layout}`);

	const warning =  "DO NOT PRESS! Last chance... I'M WARNING YOU!";
	const toldYouSo = "... What did I tell you?"
	
	if (!rickRoll) {
		if (layoutType.layout === 'desktop') {
			hide!.title = warning;
		} else {
			alert(warning);
		}
		rickRoll = true;
	} else {
		if (layoutType.layout === 'desktop') {
			hide!.title = toldYouSo;
		} else {
			alert(toldYouSo)
		}
		openLink('https://www.youtube.com/watch?v=E4WlUXrJgy4', false);
	}
}