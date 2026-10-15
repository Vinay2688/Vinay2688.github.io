// Theme toggle. The saved choice is applied early by a small script in <head>.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var label = btn.querySelector(".toggle-text");

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function paint() {
    var next = current() === "light" ? "dark" : "light";
    label.textContent = next === "light" ? "Light" : "Dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", current() === "light" ? "#f7f8fa" : "#0f1318");
  }

  btn.addEventListener("click", function () {
    var next = current() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });

  paint();
})();
