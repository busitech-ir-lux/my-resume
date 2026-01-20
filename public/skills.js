window.addEventListener("load", () => {
  document.querySelectorAll(".skill-fill").forEach((bar) => {
    const level = bar.dataset.level;
    requestAnimationFrame(() => {
      bar.style.width = level + "%";
    });
  });
});

window.addEventListener("load", () => {
  // existing animation
  document.querySelectorAll(".skill-fill").forEach((bar) => {
    const level = bar.dataset.level;
    requestAnimationFrame(() => {
      bar.style.width = level + "%";
    });
  });

  // filtering
  const input = document.getElementById("skillSearch");
  const skills = Array.from(document.querySelectorAll(".skill"));

  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      skills.forEach((el) => {
        const name = el.dataset.name || "";
        const tags = el.dataset.tags || "";
        const ok = !q || name.includes(q) || tags.includes(q);
        el.style.display = ok ? "" : "none";
      });
    });
  }
});
