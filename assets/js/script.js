// // Preloader
// window.addEventListener("load", function () {
// 	const preloader = document.querySelector(".preloader");
// 	preloader.classList.add("fade-out");
// 	setTimeout(function () {
// 		preloader.style.display = "none";
// 	}, 100);
// });
//
// // scroll spy
// // var scrollSpy = new bootstrap.ScrollSpy(document.body, {
// // 	target: '#navbarNav'
// //   })
//
//
// // header
// const halfHeight = window.innerHeight / 2;
// window.addEventListener("scroll", () => {
// 	const menu = document.getElementById("menu");
// 	if (window.scrollY > halfHeight) {
// 		menu.classList.add("navbar-dark");
// 		menu.classList.add("bg-gray");
// 	} else {
// 		menu.classList.remove("navbar-dark");
// 		menu.classList.remove("bg-gray");
// 	}
// });
//
// //Skill bar
// const skillElements = document.querySelectorAll("#skills .skill-bar .skillbar");
//
// skillElements.forEach((item) => {
// 	level = item.getAttribute("data-level");
// 	item.firstElementChild.style.width = level;
// });
//
// // footer
// const currentDate = new Date();
// const currentYear = currentDate.getFullYear();
// const year = document.getElementById("current-year");
// year.innerText = currentYear;
//
// // Contact
//
// const form = document.getElementById("contactform");
// const sumbit = document.getElementById("send-msg");
// const icon = document.getElementById("send-icon");
// const nameInput = form.querySelector("input[type='text']");
// const emailInput = form.querySelector("input[type='email']");
// const messageInput = form.querySelector("textarea");
// const FORM =
// 	"https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse";
// const modal = document.getElementById("modal");
// const contentModal = document.getElementById("message");
// // const bootstrapModal = new bootstrap.Modal(modal);
// contentModal.innerText = "";
//
// window.addEventListener("load", (event) => {
// 	event.preventDefault();
// 	form.reset();
// });
//
// sumbit.addEventListener("click", (e) => {
// 	icon.classList.replace("fa-paper-plane", "spinner");
// });
// form.addEventListener("submit", function (event) {
// 	event.preventDefault();
// 	if (!validateForm()) {
// 		icon.classList.replace("spinner", "fa-paper-plane");
// 		return;
// 	}
//
// 	const formData = new FormData(form);
//
// 	fetch(FORM, {
// 		method: "POST",
// 		mode: "no-cors",
// 		body: formData,
// 	})
// 		.then((response) => {
// 			if (response.status === 0 || response.ok) {
// 				contentModal.classList.remove("text-danger");
// 				contentModal.innerText = "Thank you, message sent!";
// 				// bootstrapModal.show();
// 				form.reset();
// 				icon.classList.replace("spinner", "fa-paper-plane");
// 			} else {
// 				if (response.status === 403) {
// 					contentModal.classList.add("text-danger");
// 					contentModal.innerText = "Sorry! Something went wrong";
// 					// bootstrapModal.show();
// 					icon.classList.replace("spinner", "fa-paper-plane");
// 				}
// 			}
// 		})
// 		.catch((error) => {
// 			contentModal.innerText = "Form Submission error!";
// 			contentModal.classList.add("text-danger");
// 			// bootstrapModal.show();
// 			icon.classList.replace("spinner", "fa-paper-plane");
// 		});
// });
//
// function validateForm() {
// 	// Reset previous validation errors
// 	nameInput.classList.remove("border-danger");
// 	emailInput.classList.remove("border-danger");
// 	messageInput.classList.remove("border-danger");
//
// 	let isValid = true;
//
// 	// Validate name field
// 	if (nameInput.value.trim() === "") {
// 		nameInput.classList.add("border-danger");
// 		isValid = false;
// 	}
//
// 	// Validate email field
// 	if (emailInput.value.trim() === "") {
// 		emailInput.classList.add("border-danger");
// 		isValid = false;
// 	} else if (!isValidEmail(emailInput.value.trim())) {
// 		emailInput.classList.add("border-danger");
// 		isValid = false;
// 	}
//
// 	// Validate message field
// 	if (messageInput.value.trim() === "") {
// 		messageInput.classList.add("border-danger");
// 		isValid = false;
// 	}
//
// 	return isValid;
// }
//
// function isValidEmail(email) {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	return emailRegex.test(email);
// }
//
// // document.querySelectorAll('*').forEach(el => {
// //   if (el.offsetWidth > document.documentElement.offsetWidth) {
// //       el.style.backgroundColor='#f00'
// //       console.log('Found the worst element ever: ', el);
// //   }
// // });
// Preloader
window.addEventListener("load", function () {
	const preloader = document.querySelector(".preloader");
	preloader.classList.add("fade-out");
	setTimeout(function () {
		preloader.style.display = "none";
	}, 100);
});

// scroll spy
// var scrollSpy = new bootstrap.ScrollSpy(document.body, { // Bootstrap JS removed, this will error
// 	target: '#navbarNav'
//   })


// header
// const halfHeight = window.innerHeight / 2; // Old header scroll effect logic, classes likely obsolete
// window.addEventListener("scroll", () => {
// 	const menu = document.getElementById("menu");
// 	if (window.scrollY > halfHeight) {
// 		menu.classList.add("navbar-dark");
// 		menu.classList.add("bg-gray");
// 	} else {
// 		menu.classList.remove("navbar-dark");
// 		menu.classList.remove("bg-gray");
// 	}
// });

//Skill bar
// const skillElements = document.querySelectorAll("#skills .skill-bar .skillbar"); // Old skill bar logic
// skillElements.forEach((item) => {
// 	level = item.getAttribute("data-level");
// 	item.firstElementChild.style.width = level;
// });

// footer
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const year = document.getElementById("current-year");
if (year) { // Add check for element existence
    year.innerText = currentYear;
}


// Contact

const form = document.getElementById("contactform");
const sumbit = document.getElementById("send-msg"); // submit (typo in original variable name)
const icon = document.getElementById("send-icon");
// const nameInput = form.querySelector("input[type='text']"); // Re-query if form exists
// const emailInput = form.querySelector("input[type='email']"); // Re-query if form exists
// const messageInput = form.querySelector("textarea"); // Re-query if form exists

const FORM_URL = // Renamed variable to avoid conflict if FORM is a global elsewhere
	"https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse";
const modal = document.getElementById("modal");
const contentModal = document.getElementById("message");
// const bootstrapModal = new bootstrap.Modal(modal); // Bootstrap JS removed, this will error. Modal needs re-implementation if kept.

if (form) { // Ensure form exists before adding listeners
    const nameInput = form.querySelector("input[type='text']");
    const emailInput = form.querySelector("input[type='email']");
    const messageInput = form.querySelector("textarea");

    window.addEventListener("load", (event) => {
        // event.preventDefault(); // This should not be here on global load
        form.reset();
    });

    if (sumbit) { // Ensure submit button exists
        sumbit.addEventListener("click", (e) => {
            if (icon) icon.classList.replace("fa-paper-plane", "spinner");
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateForm(nameInput, emailInput, messageInput)) {
            if (icon) icon.classList.replace("spinner", "fa-paper-plane");
            return;
        }

        const formData = new FormData(form);

        fetch(FORM_URL, {
            method: "POST",
            mode: "no-cors",
            body: formData,
        })
            .then((response) => {
                if (response.status === 0 || response.ok) {
                    if (contentModal) {
                        contentModal.classList.remove("text-red-500"); // Example Tailwind error class
                        contentModal.innerText = "Thank you, message sent!";
                    }
                    // bootstrapModal.show(); // Bootstrap JS removed. Implement custom modal or remove.
                    alert("Thank you, message sent!"); // Simple alert fallback
                    form.reset();
                    if (icon) icon.classList.replace("spinner", "fa-paper-plane");
                } else {
                    // if (response.status === 403) { // This check might not be reliable with no-cors
                        if (contentModal) {
                            contentModal.classList.add("text-red-500"); // Example Tailwind error class
                            contentModal.innerText = "Sorry! Something went wrong";
                        }
                        // bootstrapModal.show(); // Bootstrap JS removed
                        alert("Sorry! Something went wrong"); // Simple alert fallback
                        if (icon) icon.classList.replace("spinner", "fa-paper-plane");
                    // }
                }
            })
            .catch((error) => {
                if (contentModal) {
                    contentModal.innerText = "Form Submission error!";
                    contentModal.classList.add("text-red-500"); // Example Tailwind error class
                }
                // bootstrapModal.show(); // Bootstrap JS removed
                alert("Form Submission error!"); // Simple alert fallback
                if (icon) icon.classList.replace("spinner", "fa-paper-plane");
            });
    });
}


function validateForm(nameInput, emailInput, messageInput) {
	// Reset previous validation errors (assuming Tailwind focus rings or borders for errors)
    if(nameInput) nameInput.classList.remove("border-red-500"); // Example Tailwind error class
    if(emailInput) emailInput.classList.remove("border-red-500");
    if(messageInput) messageInput.classList.remove("border-red-500");

	let isValid = true;

	// Validate name field
	if (nameInput && nameInput.value.trim() === "") {
		nameInput.classList.add("border-red-500");
		isValid = false;
	}

	// Validate email field
	if (emailInput && emailInput.value.trim() === "") {
		emailInput.classList.add("border-red-500");
		isValid = false;
	} else if (emailInput && !isValidEmail(emailInput.value.trim())) {
		emailInput.classList.add("border-red-500");
		isValid = false;
	}

	// Validate message field
	if (messageInput && messageInput.value.trim() === "") {
		messageInput.classList.add("border-red-500");
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


// Theme switcher logic
const themeToggle = () => {
  const htmlEl = document.documentElement;
  const currentTheme = localStorage.getItem('theme');
  let newTheme;

  if (currentTheme === 'dark') {
    htmlEl.classList.remove('dark');
    newTheme = 'light';
  } else {
    htmlEl.classList.add('dark');
    newTheme = 'dark';
  }
  localStorage.setItem('theme', newTheme);
};

const applyInitialTheme = () => {
  const htmlEl = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && osPrefersDark)) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark'); // Explicitly set light if not dark
  }
};

applyInitialTheme();

// Make themeToggle globally accessible if it's called from an inline onclick,
// or attach it to an event listener on the button later.
window.themeToggle = themeToggle;
