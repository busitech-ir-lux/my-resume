window.addEventListener("load", () => {
  document.querySelectorAll(".skill-fill").forEach(bar => {
    const level = bar.dataset.level;
    requestAnimationFrame(() => {
      bar.style.width = level + "%";
    });
  });
});