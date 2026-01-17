var docBtn = document.getElementById("docBtn");

if (docBtn) {
  docBtn.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const outputBox = document.getElementById("codeOutput");
    const button = document.getElementById("docBtn");

    if (!code) {
      alert("Please enter some code.");
      return;
    }

    button.innerText = "Generating...";
    button.disabled = true;
    outputBox.value = "";

    const prompt = `Add documentation to the following code.
        Code:
        ${code}

        NOTE:
        1. Do not write the code.
        2. Describe the step by steps explanation of the logic only (Not step by steps explanation of the code or keywords).
        3. The explanation should be in the form of a step by step algorithm
        3. Do not give any conclusion, any example.
        4. Provide me only the small overview of the code at the starting.
        5. Do not change the code functionality.
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
          toolType: "Documentation",
          inputCode: code,
        }),
      }
    );

    if (response.ok) {
      const data = await response.text();
      outputBox.value = data;
    } else {
      outputBox.value = "Error: Failed to generate documentation.";
    }

    button.innerText = "Generate";
    button.disabled = false;
  });
}
