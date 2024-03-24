// Preloader
window.addEventListener("load", function () {
	const preloader = document.querySelector(".preloader");
	preloader.classList.add("fade-out");
	setTimeout(function () {
		preloader.style.display = "none";
	}, 100);
});

// header
const halfHeight = window.innerHeight / 2;
window.addEventListener("scroll", () => {
	const menu = document.getElementById("menu");
	if (window.scrollY > halfHeight) {
		menu.classList.add("navbar-dark");
		menu.classList.add("bg-gray");
	} else {
		menu.classList.remove("navbar-dark");
		menu.classList.remove("bg-gray");
	}
});

//Skill bar
const skillElements = document.querySelectorAll("#skills .skill-bar .skillbar");

skillElements.forEach((item) => {
	level = item.getAttribute("data-level");
	item.firstElementChild.style.width = level;
});

// footer
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const year = document.getElementById("current-year");
year.innerText = currentYear;

// Contact

const form = document.getElementById("contactform");
const sumbit = document.getElementById("send-msg");
const icon = document.getElementById("send-icon");
const nameInput = form.querySelector("input[type='text']");
const emailInput = form.querySelector("input[type='email']");
const messageInput = form.querySelector("textarea");
const FORM =
	"https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse";
const modal = document.getElementById("modal");
const contentModal = document.getElementById("message");
const bootstrapModal = new bootstrap.Modal(modal);
contentModal.innerText = "";

window.addEventListener("load", (event) => {
	event.preventDefault();
	form.reset();
});

sumbit.addEventListener("click", (e) => {
	icon.classList.replace("fa-paper-plane", "spinner");
});
form.addEventListener("submit", function (event) {
	event.preventDefault();
	if (!validateForm()) {
		icon.classList.replace("spinner", "fa-paper-plane");
		return;
	}

	const formData = new FormData(form);

	fetch(FORM, {
		method: "POST",
		mode: "no-cors",
		body: formData,
	})
		.then((response) => {
			if (response.status === 0 || response.ok) {
				contentModal.classList.remove("text-danger");
				contentModal.innerText = "Thank you, message sent!";
				bootstrapModal.show();
				form.reset();
				icon.classList.replace("spinner", "fa-paper-plane");
			} else {
				if (response.status === 403) {
					contentModal.classList.add("text-danger");
					contentModal.innerText = "Sorry! Something went wrong";
					bootstrapModal.show();
					icon.classList.replace("spinner", "fa-paper-plane");
				}
			}
		})
		.catch((error) => {
			contentModal.innerText = "Form Submission error!";
			contentModal.classList.add("text-danger");
			bootstrapModal.show();
			icon.classList.replace("spinner", "fa-paper-plane");
		});
});

function validateForm() {
	// Reset previous validation errors
	nameInput.classList.remove("border-danger");
	emailInput.classList.remove("border-danger");
	messageInput.classList.remove("border-danger");

	let isValid = true;

	// Validate name field
	if (nameInput.value.trim() === "") {
		nameInput.classList.add("border-danger");
		isValid = false;
	}

	// Validate email field
	if (emailInput.value.trim() === "") {
		emailInput.classList.add("border-danger");
		isValid = false;
	} else if (!isValidEmail(emailInput.value.trim())) {
		emailInput.classList.add("border-danger");
		isValid = false;
	}

	// Validate message field
	if (messageInput.value.trim() === "") {
		messageInput.classList.add("border-danger");
		isValid = false;
	}

	return isValid;
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// document.querySelectorAll('*').forEach(el => {
//   if (el.offsetWidth > document.documentElement.offsetWidth) {
//       el.style.backgroundColor='#f00'
//       console.log('Found the worst element ever: ', el);
//   }
// });
