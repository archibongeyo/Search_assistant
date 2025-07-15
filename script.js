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

    const data = await response.json();
    resultsDiv.innerHTML = "";

    if (data.results && data.results.length > 0) {
      data.results.forEach(result => {
        const item = document.createElement("div");
        item.className = "result";
        item.innerHTML = `
          <h3><a href="${result.link}" target="_blank" rel="noopener">${result.title}</a></h3>
          <p>${result.summary}</p>
        `;
        resultsDiv.appendChild(item);
      });
    } else {
      resultsDiv.innerHTML = "<p>❌ No results found. Try another query.</p>";
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>⚠️ Something went wrong. Please try again.</p>";
  }
});

// Light/Dark mode toggle
const toggle = document.getElementById("modeToggle");
const label = document.getElementById("modeLabel");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  label.textContent = document.body.classList.contains("dark") ? "Dark Mode" : "Light Mode";
});
