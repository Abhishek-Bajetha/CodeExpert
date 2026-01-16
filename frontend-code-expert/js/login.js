const form = document.getElementById("loginForm");

document.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    let response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email:emailValue,
            password: passwordValue
        })
    })

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data))
        window.location.href = "../index.html";
    } else {
        alert("Invalid Credentials!!!")
    }

});

