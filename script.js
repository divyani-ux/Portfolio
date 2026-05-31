// Tab navigation for the About section (Skills / Education)
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Asynchronous AJAX Contact Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Show sending loading state
      const submitButton = form.querySelector(".btnSubmit");
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "SENDING...";

      status.className = "form-status";
      status.style.display = "none";
      status.textContent = "";

      const formData = new FormData(form);
      const actionUrl = "https://formsubmit.co/ajax/kumaredivyani@gmail.com";

      fetch(actionUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .then(data => {
        // Success state
        status.textContent = "Thank you! Your message has been sent successfully.";
        status.className = "form-status success";
        form.reset();
      })
      .catch(error => {
        // Error state
        status.textContent = "Oops! There was a problem sending your message. Please try again.";
        status.className = "form-status error";
      })
      .finally(() => {
        // Reset submit button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      });
    });
  }
});
