import emailjs from '@emailjs/browser';

const formElement = document.getElementById('email-form');
const emailStatusElement = document.getElementById('email-status-banner')

function updateMessageBanner(successful) {
	if (successful) {
		emailStatusElement.classList.add('success');
		emailStatusElement.textContent = 'Your message has been sent!'
	} else {
		emailStatusElement.classList.add('failed');
		emailStatusElement.textContent = 'Please try again later.'
	}
	emailStatusElement.classList.toggle('invisible');

	setTimeout( () => {
		emailStatusElement.classList.toggle('invisible');
	}, 5000)
}

formElement.addEventListener('submit', async (e) => {
	e.preventDefault();

	const confirmed = confirm('Just making sure... Are you ready to send your message?')

	if (!confirmed) return;

	const pubKey = '0G6BsIJ-HEwjOODlk';
	const serviceID = 'service_khbbqpj';
	const templateID = 'template_e5jpnav';
	
	emailjs.init(pubKey)

	const name = formElement.sender.value;
	const title = formElement.subject.value;
	const email = formElement.replyTo.value;
	const message = formElement.message.value;
	const time = (new Date()).toISOString();

	// Send the email with the template parameters
	const sent = await emailjs.send(
		serviceID,
		templateID,
		{
			name,
			title,
			email,
			message,
			time
		}
	)

	const successful = sent.status === 200;

	updateMessageBanner(successful);

	formElement.reset();
})