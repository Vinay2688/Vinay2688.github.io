// Email buttons: copy the address on click, so it still works when the visitor
// has no mail app set up (the mailto link also opens a mail app when one exists).
(function () {
  var links = document.querySelectorAll("[data-copy-email]");

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var box = document.createElement("textarea");
      box.value = text;
      box.setAttribute("readonly", "");
      box.style.position = "fixed";
      box.style.opacity = "0";
      document.body.appendChild(box);
      box.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(box);
      ok ? resolve() : reject();
    });
  }

  Array.prototype.forEach.call(links, function (link) {
    var original = link.textContent;
    var timer;
    link.addEventListener("click", function () {
      copyText(link.getAttribute("data-copy-email")).then(function () {
        link.textContent = "Email address copied";
        clearTimeout(timer);
        timer = setTimeout(function () { link.textContent = original; }, 2200);
      }, function () {});
    });
  });
})();

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
