document.getElementById("convertBtn").addEventListener("click", async () => {
  const code = document.getElementById("codeInput").value;
  const targetLanguage = document.getElementById("targetLang").value;
  const outputBox = document.getElementById("codeOutput");
  const button = document.getElementById("convertBtn");

  if (!code) {
    alert("Please enter some code.");
    return;
  }

  if (!targetLanguage) {
    alert("Please select a target language.");
    return;
  }

  button.innerText = "Converting...";
  button.disabled = true;
  outputBox.value = "";

  const prompt = `Convert the following code to ${targetLanguage} with the complete program structure.
        Code:
        ${code}

        NOTE:
        1. Do not explain the code.
        2. Do not use comments.
        3. Do not describe the target programming language.
        4. If the program requires user input, automatically provide appropriate random input where necessary.
        5. Do not wrap the converted code in backticks or any code formatting.
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
        toolType: "Converter",
        inputCode: code,
      }),
    }
  );

  console.log("before response");

  if (response.ok) {
    console.log("yes");
    const data = await response.text();
    outputBox.value = data;
  }

  button.innerText = "Convert";
  button.disabled = false;
});
