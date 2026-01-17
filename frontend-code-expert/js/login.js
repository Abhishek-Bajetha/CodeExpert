const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

document.addEventListener("submit", async function (event) {
  event.preventDefault();

  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  loginBtn.disabled = true;
  loginBtn.innerText = "Please wait...";
  try {
  let response = await fetch(
    "https://code-expert-80jn.onrender.com/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "../index.html";
  } else {
    alert("Invalid Credentials!!!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during login.");
  } finally {
    loginBtn.disabled = false;
    loginBtn.innerText = "Log in";
  }
});
