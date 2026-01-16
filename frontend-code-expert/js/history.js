document.addEventListener("DOMContentLoaded", async () => {
  // 1. Get User ID
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    alert("You are not logged in!");
    window.location.href = "login.html";
    return;
  }
  const user = JSON.parse(userJson);
  const userId = user.id;

  // 2. Fetch History
  try {
    const response = await fetch(`http://localhost:8080/api/history/${userId}`);
    const historyList = await response.json();

    // 3. Populate Table
    const tableBody = document.getElementById("historyTableBody");
    tableBody.innerHTML = ""; // Clear loading text

    historyList.forEach((item) => {
      const row = document.createElement("tr");

      // Format date (optional cleanup)
      const date = new Date(item.timestamp).toLocaleString();

      // Truncate code if it's too long (for display purposes)
      const shortInput =
        item.inputCode.length > 50
          ? item.inputCode.substring(0, 50) + "..."
          : item.inputCode;

      row.innerHTML = `
                <td>${date}</td>
                <td>${item.toolType}</td>
                <td><pre>${shortInput}</pre></td>
                <td><button onclick="viewResult('${item.id}')">View Full Result</button></td>
            `;

      // Note: Ideally you'd build a modal to view the full result,
      // but for now, the button is just a placeholder or could alert the output.
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching history:", error);
  }
});

// Simple helper to view the full output (optional)
function viewResult(id) {
  alert("Functionality to view full code snippet #" + id + " coming soon!");
}
