export function onModalClick(e) {
  const modal = e.currentTarget;
  if (e.target === modal) {
    toggleModal(modal);
    return;
  }
  if (e.target.nodeName !== "BUTTON") return;

  const currentBtn = e.target;

  if (currentBtn.classList.contains("modal__close-btn")) {
    toggleModal(modal);
  }

  if (currentBtn.classList.contains("modal-product__btn--wishlist")) {
    addToCart();
  }

  if (currentBtn.classList.contains("modal-product__btn--cart")) {
    addToWishlist();
  }
}

export function toggleModal(selector) {
  selector.classList.toggle("modal--is-open");
}

export function addToCart() {
  console.log("added to cart");
}

export function addToWishlist() {
  console.log("added to wishlist");
}
