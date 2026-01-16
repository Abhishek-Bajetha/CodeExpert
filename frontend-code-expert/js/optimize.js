var optimizeBtn = document.getElementById("optimizeBtn");

if (optimizeBtn) {
  optimizeBtn.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const outputBox = document.getElementById("codeOutput");
    const button = document.getElementById("optimizeBtn");

    if (!code) {
      alert("Please enter some code.");
      return;
    }

    button.innerText = "Optimizing...";
    button.disabled = true;
    outputBox.value = "";

    const prompt = `Optimize the following code.
        Code:
        ${code}

        NOTE: 
        1. if it has any error return me the error message.
        2. Do not explain about the code.
        3. Do not use comments.
        4. Also check the case senstivity of the program if it has any error.
        5. Do not wrap the code in backticks or any code formatting.
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
        toolType: "Optimizer",
        inputCode: code,
      }),
    });

    if (response.ok) {
      const data = await response.text();
      outputBox.value = data;
    } else {
      outputBox.value = "Error: Failed to optimize code.";
    }

    button.innerText = "Optimize";
    button.disabled = false;
  });
}
