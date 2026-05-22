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

  const validateContactForm = (nameInput, emailInput, messageInput) => {
    let isValid = true;

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) input.classList.remove("border-red-500");
    });

    if (!nameInput?.value.trim()) {
      nameInput.classList.add("border-red-500");
      isValid = false;
    }

    if (!emailInput?.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add("border-red-500");
      isValid = false;
    }

    if (!messageInput?.value.trim()) {
      messageInput.classList.add("border-red-500");
      isValid = false;
    }

    return isValid;
  };

  modalCloseButton?.addEventListener("click", hideModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector("input[type='text']");
    const emailInput = contactForm.querySelector("input[type='email']");
    const messageInput = contactForm.querySelector("textarea");

    if (!validateContactForm(nameInput, emailInput, messageInput)) {
      return;
    }

    const formAction = contactForm.dataset.formAction;
    const successMessage = contactForm.dataset.successMessage || "Thank you, your message has been sent!";
    const errorMessage = contactForm.dataset.errorMessage || "Sorry! Something went wrong.";

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
