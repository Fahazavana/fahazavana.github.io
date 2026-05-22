(function () {
  const contactForm = document.getElementById("contactform");
  const submitButton = document.getElementById("send-msg");
  const submitIcon = document.getElementById("send-icon");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseButton = document.getElementById("modal-close-btn");
  const modalContent = document.getElementById("modal-content");

  if (!contactForm) {
    return;
  }

  const showModal = (message) => {
    if (!modal || !modalMessage || !modalContent) return;

    modalMessage.textContent = message;
    modal.classList.remove("hidden");

    setTimeout(() => {
      modalContent.classList.remove("-translate-y-10", "scale-95");
      modalContent.classList.add("translate-y-0", "scale-100");
    }, 10);
  };

  const hideModal = () => {
    if (!modal || !modalContent) return;

    modalContent.classList.add("-translate-y-10", "scale-95");
    modalContent.classList.remove("translate-y-0", "scale-100");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameRequiredMessage = contactForm.dataset.nameRequired || "Please enter your name.";
  const emailInvalidMessage = contactForm.dataset.emailInvalid || "Please enter a valid email address.";
  const messageRequiredMessage = contactForm.dataset.messageRequired || "Please enter a message.";

  const setFieldError = (input, message) => {
    if (!input) return;

    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.add("border-red-500");
    input.setAttribute("aria-invalid", "true");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
  };

  const clearFieldError = (input) => {
    if (!input) return;

    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.remove("border-red-500");
    input.removeAttribute("aria-invalid");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
  };

  const validateContactForm = (nameInput, emailInput, messageInput) => {
    let isValid = true;
    let firstInvalidInput = null;

    [nameInput, emailInput, messageInput].forEach((input) => {
      clearFieldError(input);
    });

    if (!nameInput?.value.trim()) {
      setFieldError(nameInput, nameRequiredMessage);
      firstInvalidInput ||= nameInput;
      isValid = false;
    }

    if (!emailInput?.value.trim() || !isValidEmail(emailInput.value.trim())) {
      setFieldError(emailInput, emailInvalidMessage);
      firstInvalidInput ||= emailInput;
      isValid = false;
    }

    if (!messageInput?.value.trim()) {
      setFieldError(messageInput, messageRequiredMessage);
      firstInvalidInput ||= messageInput;
      isValid = false;
    }

    return { isValid, firstInvalidInput };
  };

  modalCloseButton?.addEventListener("click", hideModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });

  [contactForm.querySelector("input[type='text']"), contactForm.querySelector("input[type='email']"), contactForm.querySelector("textarea")]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("input", () => clearFieldError(input));
    });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector("input[type='text']");
    const emailInput = contactForm.querySelector("input[type='email']");
    const messageInput = contactForm.querySelector("textarea");

    const { isValid, firstInvalidInput } = validateContactForm(nameInput, emailInput, messageInput);
    if (!isValid) {
      firstInvalidInput?.focus();
      return;
    }

    const formAction = contactForm.dataset.formAction;
    const successMessage = contactForm.dataset.successMessage || "Thank you, your message has been sent!";
    const errorMessage = contactForm.dataset.errorMessage || "Sorry! Something went wrong.";

    if (!formAction) {
      showModal(errorMessage);
      return;
    }

    submitButton.disabled = true;
    if (submitIcon) {
      submitIcon.classList.remove("fa-paper-plane");
      submitIcon.classList.add("fa-spinner", "fa-spin");
    }

    fetch(formAction, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(contactForm),
    })
      .then(() => {
        showModal(successMessage);
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach((input) => clearFieldError(input));
      })
      .catch(() => {
        showModal(errorMessage);
      })
      .finally(() => {
        submitButton.disabled = false;
        if (submitIcon) {
          submitIcon.classList.remove("fa-spinner", "fa-spin");
          submitIcon.classList.add("fa-paper-plane");
        }
      });
  });
})();
