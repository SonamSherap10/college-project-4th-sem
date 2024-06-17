function toggleForm(tab) {
  if (tab === "login") {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-toggler").classList.add("active");
    document.getElementById("signup-toggler").classList.remove("active");
  } else if (tab === "signup") {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-toggler").classList.remove("active");
    document.getElementById("signup-toggler").classList.add("active");
  }
}

function validateForm(formType) {
  if (formType === "login") {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return false;
    }

    // Email validation
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      alert("Password should be 8 digit long");
      return false;
    }

    // Additional validation logic for login
    // For example, checking password strength
  } else if (formType === "signup") {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document
      .getElementById("signup-confirm-password")
      .value.trim();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields.");
      return false;
    }

    // Email validation
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      alert("Password Should be 8 digit long");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    // Additional validation logic for signup
    // For example, checking password strength
  }

  // Form is valid, proceed with submission or other actions
  return true;
}

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
