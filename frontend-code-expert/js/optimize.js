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
        1. If code have any syntax errors then return the Error message:"You have some error in the code Please remove your error by using Code-Debug".
        2. if it has any error return me the error message.
        3. Do not explain about the code.
        4. Do not use comments.
        5. Also check the case senstivity of the program if it has any error.
        6. Do not wrap the code in backticks or any code formatting.
        `;

    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const userId = user.id;

    const response = await fetch(
      "https://code-expert-80jn.onrender.com/api/ai/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          userId: userId.toString(),
          toolType: "Optimizer",
          inputCode: code,
        }),
      }
    );

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
