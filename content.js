(() => {
  "use strict";
  const marker = "data-fb-popup-remover";
  let scheduled = false;

  // Leave intentional login, signup, recovery and security pages alone.
  const isLoginPage = () => /^\/(login|reg|r\.php|recover|checkpoint|two_step_verification)(\/|\.|$)/i.test(location.pathname);
  const normalize = text => (text || "").replace(/\s+/g, " ").trim();

  function isLoginPrompt(dialog) {
    if (!dialog.querySelector('input[type="password"]')) return false;
    const text = normalize(dialog.textContent);
    return /see more on facebook/i.test(text) ||
      (/log in to facebook/i.test(text) && /create new account|forgotten password|forgot password/i.test(text));
  }

  function hide(element) {
    element.setAttribute(marker, "hidden");
    element.style.setProperty("display", "none", "important");
  }

  function removeSeparateBackdrops() {
    // Inspect layers under screen points instead of scanning every div.
    const candidates = new Set();
    for (const [x, y] of [[0.1, 0.1], [0.5, 0.5], [0.9, 0.9]]) {
      for (const element of document.elementsFromPoint(innerWidth * x, innerHeight * y)) candidates.add(element);
    }
    for (const element of candidates) {
      if (element === document.body || element === document.documentElement || element.hasAttribute(marker)) continue;
      if (normalize(element.textContent)) continue;
      if (element.matches('img, video, canvas, svg, iframe, input, button, a') ||
          element.querySelector('img, video, canvas, svg, iframe, input, button, a, [role="dialog"]')) continue;
      const style = getComputedStyle(element);
      if (!['fixed', 'absolute'].includes(style.position) || style.pointerEvents === 'none') continue;
      const bounds = element.getBoundingClientRect();
      if (bounds.left > 2 || bounds.top > 2 || bounds.right < innerWidth - 2 || bounds.bottom < innerHeight - 2) continue;
      // Require a translucent colored backdrop, not an ordinary page container.
      const rgba = style.backgroundColor.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/);
      const alpha = rgba ? Number(rgba[1]) : (style.backgroundColor.startsWith('rgb(') ? 1 : 0);
      const effectiveAlpha = alpha * Number(style.opacity);
      if (style.backgroundImage !== 'none' || effectiveAlpha <= 0 || effectiveAlpha >= 1) continue;
      hide(element);
    }
  }

  function removePrompts() {
    scheduled = false;
    if (isLoginPage()) return;
    let found = false;
    for (const dialog of document.querySelectorAll('[role="dialog"], [aria-modal="true"]')) {
      if (dialog.hasAttribute(marker) || !isLoginPrompt(dialog)) continue;
      found = true;
      let layer = dialog;
      // Facebook usually wraps the dialog and blank dimming backdrop in one layer.
      // Only climb through containers whose text belongs entirely to this prompt.
      const promptText = normalize(dialog.textContent);
      for (let parent = dialog.parentElement; parent && parent !== document.body && parent !== document.documentElement; parent = parent.parentElement) {
        if (normalize(parent.textContent) !== promptText) break;
        if (parent.querySelectorAll('[role="dialog"], [aria-modal="true"]').length > 1) break;
        const style = getComputedStyle(parent);
        if (style.position === "fixed") layer = parent;
      }
      hide(layer);
      hide(dialog);
    }
    if (!found && !document.querySelector(`[${marker}]`)) return;
    removeSeparateBackdrops();
    for (const element of [document.documentElement, document.body]) {
      if (!element) continue;
      const style = getComputedStyle(element);
      if ([style.overflow, style.overflowY].some(value => value === "hidden" || value === "clip")) {
        element.style.setProperty("overflow", "auto", "important");
        element.style.setProperty("overflow-y", "auto", "important");
      }
    }
  }

  // Batch DOM updates; public pages may recreate the prompt after navigation.
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(removePrompts);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  removePrompts();
})();
