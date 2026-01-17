var debugBtn = document.getElementById("debugBtn");

if (debugBtn) {
  debugBtn.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const outputBox = document.getElementById("codeOutput");
    const button = document.getElementById("debugBtn");

    if (!code) {
      alert("Please enter some code.");
      return;
    }

    button.innerText = "Debugging...";
    button.disabled = true;
    outputBox.value = "";

    const prompt = `Debug the following code.
        Code:
        ${code}

        NOTE:
        1. Explain the bugs found.
        2. Provide the corrected code.
        3. Do not wrap the code in backticks or any code formatting.
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
          toolType: "Debugger",
          inputCode: code,
        }),
      }
    );

    if (response.ok) {
      const data = await response.text();
      outputBox.value = data;
    } else {
      outputBox.value = "Error: Failed to debug code.";
    }

    button.innerText = "Debug";
    button.disabled = false;
  });
}
