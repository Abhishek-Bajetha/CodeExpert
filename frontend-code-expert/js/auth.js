document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const user = localStorage.getItem("user");

  if (user) {
    authLink.innerText = "Logout";
    authLink.classList.add("logout-btn");
    authLink.href = "#";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.reload(); 
    });
  } else {
    authLink.innerText = "Sign Up";
    authLink.classList.add("signup-btn");
    authLink.href = "register.html";
  }
});
