const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

const saved = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", saved);
toggle.checked = saved === "dark";

toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});