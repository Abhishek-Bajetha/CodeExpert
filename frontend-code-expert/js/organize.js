var organizeBtn = document.getElementById("organizeBtn");

if (organizeBtn) {
  organizeBtn.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const outputBox = document.getElementById("codeOutput");
    const button = document.getElementById("organizeBtn");

    if (!code) {
      alert("Please enter some code.");
      return;
    }

    button.innerText = "Organizing...";
    button.disabled = true;
    outputBox.value = "";

    const prompt = `Organize the following code.
        Code:
        ${code}

        NOTE:
        1. Fix indentation and formatting.
        2. Make the code clean and readable.
        3. Do not add comments or explanations.
        4. Do not wrap the code in backticks or any code formatting.
        `;

    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const userId = user.id;

    const response = await fetch("http://localhost:8080/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        userId: userId.toString(),
        toolType: "Organizer",
        inputCode: code,
      }),
    });

    if (response.ok) {
      const data = await response.text();
      outputBox.value = data;
    } else {
      outputBox.value = "Error: Failed to organize code.";
    }

    button.innerText = "Organize";
    button.disabled = false;
  });
}
