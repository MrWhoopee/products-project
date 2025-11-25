export function toggleModalBtnText(toggleText, selector) {
  selector.children[0].textContent = toggleText ? "Remove from " : "Add to";
}
