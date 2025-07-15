// Replace this with your actual Make.com webhook URL
const WEBHOOK_URL = "https://hook.eu2.make.com/ledww13ifyd64hw4hpo2ssnm2p4dwp6r";

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("queryInput").value.trim();
  if (!query) return;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>🔄 Searching, please wait...</p>";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    // ✅ Use .text() because your scenario returns plain text
    const text = await response.text();

    // ✅ Show the plain text nicely with line breaks preserved
    resultsDiv.innerHTML = `<pre>${text}</pre>`;

    if (!text.trim()) {
      resultsDiv.innerHTML = "<p>❌ No results found. Try another query.</p>";
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>⚠️ Something went wrong. Please try again.</p>";
  }
});

// ✅ Light/Dark mode toggle remains the same
const toggle = document.getElementById("modeToggle");
const label = document.getElementById("modeLabel");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  label.textContent = document.body.classList.contains("dark") ? "Dark Mode" : "Light Mode";
});
