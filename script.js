const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

fetch("https://crc-counter-fn.azurewebsites.net/api/counter")
  .then(response => response.json())
  .then(data => {
    document.getElementById("counter").innerText = data.count;
  })
  .catch(error => {
    console.error("Error fetching visitor count:", error);
    document.getElementById("counter").innerText = "—";
  });
