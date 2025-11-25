import { loadMoreBtn } from "./refs";

export function toggleModalBtnText(toggleText, selector) {
  selector.children[0].textContent = toggleText ? "Remove from " : "Add to";
}

export function loadMoreBtnToggle(isHidden = false) {
  loadMoreBtn.classList.remove("is-hidden");
  if (isHidden) {
    loadMoreBtn.classList.add("is-hidden");
  }
}
