import { nullable } from "astro:schema";

let rickRoll = false;
let harrisAlive = true;

const deathSequence = [
	{
		src: "/public/spider/death-sequence/f1.png",
		time: 1000,
	},
	{
		src: "/public/spider/death-sequence/f2.png",
		time: 1750,
	},
	{
		src: "/public/spider/death-sequence/f3.png",
		time: 1900,
	},
	{
		src: "/public/spider/death-sequence/f4.png",
		time: 2000,
	},
	{
		src: "/public/spider/death-sequence/f6.png",
		time: 2100,
		title: 'R.I.P. Harris'
	},
	{
		src: "/public/spider/death-sequence/f6.png",
		time: 10000,
		opacity: '.5'
	},
	{
		src: "/public/spider/death-sequence/f6.png",
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
	'explorerClickable': () => {
		

		// If the screen is mobile, then get the bottom section and hide it.
		const bottom = document.getElementsByClassName('bottom');
		if (bottom && bottom[0]) {
			(bottom[0] as HTMLElement).style.display = 'none';
			// Change the main-content view to 80vh
			const mainContent = document.getElementById('main-content');
			if (mainContent) {
				mainContent.style.height = '85vh'
			}
		} else {
			// Expand/Minimize the Explorer side-bar.
			const explorerElement = document.getElementById('explorer-section') as HTMLElement;
			explorerElement.style.display = explorerElement.style.display === 'none' ? 'flex' : 'none';
			const explorer = document.querySelector('.explorer');
			(explorer as HTMLElement).style.width = '';
		}
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
	},
	'harris': async () => {
		console.log("Harris clicked")
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
