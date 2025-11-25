import { CART_LS } from "./constants";
import { toggleModalBtnText } from "./helpers";
import {
  checkLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from "./storage";

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

  if (currentBtn.classList.contains("modal-product__btn--cart")) {
    const productId = document.querySelector(".modal-product__content").dataset
      .productId;
    const isInCart = checkLocalStorage(CART_LS, productId);

    toggleCart(productId, isInCart);
    //! COSTYL IS HERE
    toggleModalBtnText(!isInCart, currentBtn);
  }

  if (currentBtn.classList.contains("modal-product__btn--wishlist")) {
    addToWishlist();
  }
}

export function toggleModal(selector) {
  selector.classList.toggle("modal--is-open");
}

export function toggleCart(id, bool) {
  const products = loadLocalStorage(CART_LS);

  if (bool) {
    const filteredProducts = products.filter((productId) => productId !== id);
    saveLocalStorage(CART_LS, filteredProducts);
    return;
  }

  if (products === null) {
    saveLocalStorage(CART_LS, [id]);
    return;
  }

  if (!checkLocalStorage(CART_LS, id))
    saveLocalStorage(CART_LS, [...products, id]);
}

export function addToWishlist() {
  console.log("added to wishlist");
}
