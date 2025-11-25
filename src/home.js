import { onCategoriesClick, onFormSubmit, onProductClick } from "./js/handlers";
import { onModalClick } from "./js/modal";
import { getCategories, getProducts } from "./js/products-api";
import {
  categoriesListEl,
  modalEl,
  modalEl,
  productsListEl,
  modalEl,
  searchFormEl,
} from "./js/refs";
import { renderCategories, renderProducts } from "./js/render-function";

async function init() {
  const storageCart = loadLocalStorage(CART_LS) || [];
  updateCartCount(storageCart.length);
  const {
    data: { products, total },
  } = await getProducts();

  const { data: categories } = await getCategories();
  if (total / LIMIT_PAGE > 1) {
    loadMoreBtnToggle();
  }

  renderAllProduct(products);
  renderCategories(categories);
}

init();

categoriesListEl.addEventListener("click", onCategoriesClick);

productsListEl.addEventListener("click", onProductClick);

modalEl.addEventListener("click", onModalClick);

searchformEl.addEventListener("submit", onFormSubmit);
searchInputEl.addEventListener("input", toggleClearButton);
searchClearBtnEl.addEventListener("click", onClearClick);
loadMoreBtn.addEventListener("click", onLoadMoreClick);
