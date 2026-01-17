const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch(
      "https://code-expert-80jn.onrender.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    if (response.ok) {
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    } else {
      const errorData = await response.text();
      alert("Registration failed: " + errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during registration.");
  }
});
