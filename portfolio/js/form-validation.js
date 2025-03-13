// Utility function to validate fields and show error or success messages
function validateField(id, errorId, condition, errorMessage, successMessage) {
  const input = document.getElementById(id);
  const errorElement = document.getElementById(errorId);

  if (input.value.trim() === "") {
      errorElement.textContent = "This field is required"; // Generic required message
      errorElement.style.color = "red"; // Set error message color to red
      input.style.borderColor = "red"; // Change border color to red for invalid input
      return false; // Invalid
  } else if (!condition) {
      errorElement.textContent = errorMessage; // Show specific error message
      errorElement.style.color = "red"; // Set error message color to red
      input.style.borderColor = "red"; // Change border color to red for invalid input
      return false; // Invalid
  } else {
      errorElement.textContent = successMessage; // Show success message
      errorElement.style.color = "green"; // Set success message color to green
      input.style.borderColor = "green"; // Change border color to green for valid input
      return true; // Valid
  }
}

// Validation patterns
const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email format

// Function to validate all fields
function validateAllFields() {
  const nameValid = validateField(
      "name",
      "nameError",
      namePattern.test(document.getElementById("name").value.trim()),
      "Name must contain only letters and spaces",
      "Name is valid"
  );
  const emailValid = validateField(
      "email",
      "emailError",
      emailPattern.test(document.getElementById("email").value.trim()),
      "Invalid email address",
      "Email is valid"
  );
  const subjectValid = validateField(
      "subject",
      "subjectError",
      document.getElementById("subject").value.trim().length >= 5,
      "Subject should be at least 5 characters",
      "Subject is valid"
  );
  const messageValid = validateField(
      "message",
      "messageError",
      document.getElementById("message").value.trim().length >= 5,
      "Message should be at least 5 characters",
      "Message is valid"
  );

  // Enable or disable the submit button
  document.querySelector("input[type='submit']").disabled = !(nameValid && emailValid && subjectValid && messageValid);

  return nameValid && emailValid && subjectValid && messageValid;
}

// Add oninput validation for all fields
document.getElementById("name").oninput = validateAllFields;
document.getElementById("email").oninput = validateAllFields;
document.getElementById("subject").oninput = validateAllFields;
document.getElementById("message").oninput = validateAllFields;

// Handle form submission
document.getElementById("gform").onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission

  if (validateAllFields()) {
      const userInfo = {
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          subject: document.getElementById("subject").value.trim(),
          message: document.getElementById("message").value.trim(),
      };

      // Replace this with your EmailJS code
      emailjs.send("service_uuzsaag", "template_ofks44h", userInfo)
          .then(() => {
              alert("Email sent successfully!");

              // Clear all input fields, borders, and error/success messages
              document.getElementById("gform").reset(); // Reset the form
              document.querySelectorAll("input, textarea").forEach(field => {
                  field.style.borderColor = ""; // Reset border color
              });
              document.querySelectorAll(".error").forEach(errorElement => {
                  errorElement.textContent = ""; // Clear all error/success messages
              });
          })
          .catch(() => {
              alert("Failed to send email. Please try again.");
          });
  }
};
